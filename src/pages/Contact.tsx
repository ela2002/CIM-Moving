import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import contactTranslations from "../translations/contact";

const Contact = () => {
  const { language } = useLanguage();
  const t = contactTranslations[language];
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
type LocationKey = "tunisia" | "algeria" | "london";

const [selectedMap, setSelectedMap] = useState<LocationKey>("tunisia");


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: t.successTitle,
        description: t.successDesc,
      });
      setLoading(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  const whatsappNumber = "+21612345678";
  const whatsappMessage = t.whatsapp;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Google Maps for each site
  const mapUrls : Record<LocationKey, string> = {
    tunisia:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51208.22164494981!2d10.303188!3d36.852946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sCarthage%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1234567890",
    algeria:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6398.986733476234!2d3.04197!3d36.75377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb3e62b2630d1%3A0x33cfefbfbd0c4e1a!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sus!4v1234567890",
    london:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19806.79384169868!2d-0.134154!3d51.509865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3337cf7d2d%3A0xb0a81dd53a7b2c91!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 mt-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.heroTitle}</h1>
        <p className="text-xl max-w-2xl mx-auto">
          {t.heroDesc} 🌍 {t.expandedText}
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{t.phone}</h3>
                  <a href="tel:+21612345678" className="text-muted-foreground hover:text-primary">
                    +216 12 345 678
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{t.email}</h3>
                  <a
                    href="mailto:contact@cim-demenagement.com"
                    className="text-muted-foreground hover:text-primary break-all"
                  >
                    contact@cim-demenagement.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Multiple Locations */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">{t.address}</h3>
                   <p className="text-muted-foreground">
  <strong>Tunisia:</strong> {t.locations.tunisia} <br />
  <strong>Algeria:</strong> {t.locations.algeria} <br />
  <strong>United Kingdom:</strong> {t.locations.london}
</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant={selectedMap === "tunisia" ? "default" : "outline"}
                    onClick={() => setSelectedMap("tunisia")}
                  >
                    Tunisia
                  </Button>
                  <Button
                    variant={selectedMap === "algeria" ? "default" : "outline"}
                    onClick={() => setSelectedMap("algeria")}
                  >
                    Algeria
                  </Button>
                  <Button
                    variant={selectedMap === "london" ? "default" : "outline"}
                    onClick={() => setSelectedMap("london")}
                  >
                    London
                  </Button>
                </div>
              </CardContent>
            </Card>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{t.whatsapp}</h3>
                    <p className="text-muted-foreground">{t.clickToChat}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-foreground">{t.formTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.fullName}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.emailPlaceholder}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.phonePlaceholder}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.message}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.messagePlaceholder}
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                    {loading ? t.sending : t.sendMessage}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic Map Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {t.mapTitle} — {selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                key={selectedMap}
                src={mapUrls[selectedMap]}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${selectedMap} Location Map`}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
