import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Shield, Target, Heart, Award, Users, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import aboutTranslations from "../translations/about";

const About = () => {
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  const values = t.values.map((v: any) => ({
    icon: v.icon === "Shield" ? Shield : v.icon === "Target" ? Target : Heart,
    title: v.title,
    description: v.description,
  }));

  const stats = t.stats.map((s: any) => ({
    icon:
      s.icon === "Users"
        ? Users
        : s.icon === "Globe"
        ? Globe
        : Award,
    number: s.number,
    label: s.label,
  }));

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 mt-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {t.heroTitle}
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in">
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6 text-lg text-muted-foreground">
            {t.story.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t.valuesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center border-border">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t.statsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {t.networkTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">{t.networkDesc}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {t.countries.map((country: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 bg-background rounded-full border border-border"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {t.ctaTitle}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            {t.ctaDesc}
          </p>
          <Link to="/quote">
            <Button variant="hero" size="lg">
              {t.ctaButton}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
