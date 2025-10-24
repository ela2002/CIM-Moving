import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Truck, Globe2, Building2, Package, FileText, Ship, Plane } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { servicesTranslations } from "../translations/services";

const Services = () => {
  const { language } = useLanguage();
  const t = servicesTranslations[language];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 mt-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{t.heroTitle}</h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in">{t.heroDesc}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {t.services.map((service, index) => {
              const icons = [Truck, Globe2, Building2, Package, FileText, Ship, Plane];
              const Icon = icons[index];
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button variant="hero" size="lg">{t.calcBtn}</Button>
            </Link>
            <Link to="/quote">
              <Button variant="outline" size="lg">{t.quoteBtn}</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
