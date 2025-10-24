import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo-cim.png";
import { useLanguage } from "../context/LanguageContext";
import { footerTranslations } from "../translations/footer";

const Footer = () => {
  const { language } = useLanguage();
  const t = footerTranslations[language];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="CIM Déménagement" className="h-12 w-auto" />
            <p className="text-sm opacity-90">
              CIM - Carthage International Moving. {language === "fr" ? "Votre partenaire de confiance pour tous vos déménagements nationaux et internationaux." : language === "en" ? "Your trusted partner for all national and international moves." : "شريكك الموثوق لجميع عمليات النقل المحلية والدولية."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary-foreground transition-colors">{t.home}</Link></li>
              <li><Link to="/services" className="text-sm hover:text-primary-foreground transition-colors">{t.services}</Link></li>
              <li><Link to="/calculator" className="text-sm hover:text-primary-foreground transition-colors">{t.calculator}</Link></li>
              <li><Link to="/about" className="text-sm hover:text-primary-foreground transition-colors">{t.about}</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary-foreground transition-colors">{t.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.ourServices}</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>{t.nationalMoving}</li>
              <li>{t.internationalMoving}</li>
              <li>{t.businessMoving}</li>
              <li>{t.packingStorage}</li>
              <li>{t.customsAssistance}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /><a href={`tel:${t.phone}`} className="hover:text-primary-foreground transition-colors">{t.phone}</a></li>
              <li className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /><a href={`mailto:${t.email}`} className="hover:text-primary-foreground transition-colors">{t.email}</a></li>
              <li className="flex items-start gap-2 text-sm"><MapPin className="h-4 w-4 mt-1" /><span>{t.address}</span></li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/cim.demenagement" className="hover:text-primary-foreground transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-foreground transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
<p>
  &copy; {new Date().getFullYear()} CIM Carthage International Moving. {t.copyright}.
</p>        </div>
      </div>
    </footer>
  );
};

export default Footer;
