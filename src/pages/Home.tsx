import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Truck,
  Globe2,
  Building2,
  Package,
  Shield,
  Users,
  Clock,
  ThumbsUp,
  Calculator,
  MessageSquare,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero-moving.jpg";
import { useLanguage } from "../context/LanguageContext";
import { homeTranslations } from "../translations/home";

const Home = () => {
  const { language } = useLanguage();
  const t = homeTranslations[language];

  // Icons for the services remain the same, but we map them dynamically from the translation file
  const serviceIcons = [Truck, Globe2, Building2, Package];

  const whyChooseUs = [
    {
      icon: Shield,
      title: language === "ar" ? "موثوقية مضمونة" : language === "en" ? "Guaranteed Reliability" : "Fiabilité Garantie",
      description:
        language === "ar"
          ? "تأمين كامل وخدمة احترافية."
          : language === "en"
          ? "Full insurance and professional service."
          : "Assurance complète et service professionnel.",
    },
    {
      icon: Users,
      title: language === "ar" ? "فريق خبير" : language === "en" ? "Expert Team" : "Équipe Experte",
      description:
        language === "ar"
          ? "فريق مدرب وذو خبرة."
          : language === "en"
          ? "Trained and experienced staff."
          : "Personnel formé et expérimenté.",
    },
    {
      icon: Clock,
      title: language === "ar" ? "الالتزام بالمواعيد" : language === "en" ? "On-Time Delivery" : "Respect des Délais",
      description:
        language === "ar"
          ? "نضمن الدقة والسرعة."
          : language === "en"
          ? "Punctuality and efficiency guaranteed."
          : "Ponctualité et efficacité assurées.",
    },
    {
      icon: ThumbsUp,
      title: language === "ar" ? "رضا العملاء" : language === "en" ? "Customer Satisfaction" : "Satisfaction Client",
      description:
        language === "ar"
          ? "أكثر من 95٪ من العملاء راضون."
          : language === "en"
          ? "Over 95% satisfied clients."
          : "Plus de 95% de clients satisfaits.",
    },
  ];

  
  return (
    <div className={`min-h-screen ${language === "ar" ? "text-right" : "text-left"}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Moving services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/calculator">
              <Button variant="hero" size="lg" className="gap-2 bg-background text-primary hover:bg-background/90">
                <Calculator className="h-5 w-5" />
                {t.calcButton}
              </Button>
            </Link>
            <Link to="/quote">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <MessageSquare className="h-5 w-5" />
                {t.quoteButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{t.introTitle}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.introText}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t.servicesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border"
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" size="lg">
                {t.viewAllServices}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t.whyChooseTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    {/* Testimonials */}
       { /* <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t.testimonialsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-bold text-foreground">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <Link to="/quote">
            <Button size="lg" className="bg-background text-primary hover:bg-background/90">
              {t.ctaButton}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
