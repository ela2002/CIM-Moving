import * as React from "react";
import { ResponsiveContainer, Tooltip as RechartsTooltip, Legend as RechartsLegend } from "recharts";
import { cn } from "../../lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

// -----------------------------
// Chart Config
// -----------------------------
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within <ChartContainer>");
  return context;
}

// -----------------------------
// Chart Container
// -----------------------------
interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ReactNode;
  id?: string;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-chart={chartId}
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <ResponsiveContainer>{children}</ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

// -----------------------------
// Chart Style (CSS Variables)
// -----------------------------
interface ChartStyleProps {
  id: string;
  config: ChartConfig;
}
const ChartStyle: React.FC<ChartStyleProps> = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.color || cfg.theme);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, cfg]) => {
    const color = cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color;
    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`)
          .join("\n"),
      }}
    />
  );
};

// -----------------------------
// Chart Tooltip
// -----------------------------
interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "dot" | "line" | "dashed";
  labelClassName?: string;
  nameKey?: string;
  labelKey?: string;
  className?: string;
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ active, payload, hideLabel = false, hideIndicator = false, indicator = "dot", labelClassName, nameKey, className }, ref) => {
    const { config } = useChart();
    if (!active || !payload?.length) return null;

    const tooltipLabel = !hideLabel && payload[0] ? (
      <div className={cn("font-medium", labelClassName)}>
        {config[payload[0].dataKey]?.label || payload[0].name}
      </div>
    ) : null;

    return (
      <div ref={ref} className={cn("grid min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, idx) => {
            const key = nameKey || item.dataKey || item.name || `value-${idx}`;
            const cfg = config[key] || {};
            const color = item.color || cfg.color;

            return (
              <div key={idx} className={cn("flex w-full flex-wrap items-stretch gap-2", indicator === "dot" && "items-center")}>
                {!hideIndicator && (
                  <div
                    className={cn("shrink-0 rounded-[2px]", {
                      "h-2.5 w-2.5": indicator === "dot",
                      "w-1 h-full": indicator === "line",
                      "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                    })}
                    style={{ backgroundColor: color }}
                  />
                )}
                <div className="flex flex-1 justify-between leading-none items-center">
                  <span className="text-muted-foreground">{cfg.label || item.name}</span>
                  {item.value !== undefined && (
                    <span className="font-mono font-medium tabular-nums text-foreground">{item.value.toLocaleString()}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

// -----------------------------
// Chart Legend
// -----------------------------
interface ChartLegendContentProps {
  payload?: any[];
  verticalAlign?: "top" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
  className?: string;
}
const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ payload, verticalAlign = "bottom", hideIcon = false, nameKey, className }, ref) => {
    const { config } = useChart();
    if (!payload?.length) return null;

    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
        {payload.map((item, idx) => {
          const key = nameKey || item.dataKey || "value";
          const cfg = config[key] || {};
          return (
            <div key={idx} className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground">
              {cfg.icon && !hideIcon ? <cfg.icon /> : <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
              {cfg.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

// -----------------------------
// Exports
// -----------------------------
export {
  ChartContainer,
  RechartsTooltip,
  ChartTooltipContent,
  RechartsLegend,
  ChartLegendContent,
  ChartStyle,
};
