import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { quoteTranslations } from "../translations/quote";

const Quote = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = quoteTranslations[language];

  const [volume, setVolume] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.volume) setVolume(location.state.volume);
  }, [location.state]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    fromCity: "",
    fromCountry: "",
    toCity: "",
    toCountry: "",
    movingDate: "",
    moveType: "",
    message: "",
    agreed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      toast({ title: t.errorAgreement, variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      const { supabase } = await import("../integrations/supabase/client");
      const { error } = await supabase.from("quotes").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        from_city: formData.fromCity,
        from_country: formData.fromCountry,
        to_city: formData.toCity,
        to_country: formData.toCountry,
        moving_date: formData.movingDate,
        move_type: formData.moveType,
        volume: volume ? parseFloat(volume) : null,
        message: formData.message,
        status: "pending",
      });
      if (error) throw error;

      toast({ title: t.successTitle, description: t.successDescription });

      setFormData({ fullName: "", email: "", phone: "", fromCity: "", fromCountry: "", toCity: "", toCountry: "", movingDate: "", moveType: "", message: "", agreed: false });
      setVolume("");
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({ title: t.errorSubmit, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative py-20 mt-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{t.heroTitle}</h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in">{t.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-3xl text-foreground">{t.formTitle}</CardTitle>
              {volume && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-lg text-foreground">
                    <span className="font-bold">{t.estimatedVolume}:</span> {volume} m³
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{t.personalInfoTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.fullName}</Label>
                      <Input id="fullName" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email}</Label>
                      <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                </div>

                {/* Moving Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{t.movingDetailsTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromCity">{t.fromCity}</Label>
                      <Input id="fromCity" value={formData.fromCity} onChange={e => setFormData({ ...formData, fromCity: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromCountry">{t.fromCountry}</Label>
                      <Input id="fromCountry" value={formData.fromCountry} onChange={e => setFormData({ ...formData, fromCountry: e.target.value })} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="toCity">{t.toCity}</Label>
                      <Input id="toCity" value={formData.toCity} onChange={e => setFormData({ ...formData, toCity: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toCountry">{t.toCountry}</Label>
                      <Input id="toCountry" value={formData.toCountry} onChange={e => setFormData({ ...formData, toCountry: e.target.value })} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="movingDate">{t.movingDate}</Label>
                      <Input id="movingDate" type="date" value={formData.movingDate} onChange={e => setFormData({ ...formData, movingDate: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="moveType">{t.moveType}</Label>
                      <Select value={formData.moveType} onValueChange={value => setFormData({ ...formData, moveType: value })}>
                        <SelectTrigger><SelectValue placeholder={t.moveType} /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(t.moveTypeOptions).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {!volume && (
                    <div className="space-y-2">
                      <Label htmlFor="volume">{t.estimatedVolumeInput}</Label>
                      <Input id="volume" type="number" step="0.1" value={volume} onChange={e => setVolume(e.target.value)} placeholder={t.volumePlaceholder} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.message}</Label>
                    <Textarea id="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} />
                  </div>
                </div>

                {/* Agreement */}
                <div className="flex items-start gap-2">
                  <Checkbox id="agreed" checked={formData.agreed} onCheckedChange={checked => setFormData({ ...formData, agreed: checked as boolean })} />
                  <Label htmlFor="agreed" className="text-sm text-muted-foreground cursor-pointer">{t.agreement}</Label>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? t.submittingButton : t.submitButton}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-muted-foreground">
            <p className="text-sm">
              <a href="/calculator" className="text-primary hover:underline font-medium">{t.calculatorLink}</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
