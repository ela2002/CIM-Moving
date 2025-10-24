import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext"; // <-- import it

createRoot(document.getElementById("root")!).render(
  <LanguageProvider> {/* <-- wrap the whole app */}
    <App />
  </LanguageProvider>
);
