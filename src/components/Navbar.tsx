import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import logo from "../assets/logo-cim.png";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const translations = {
    fr: { home: "Accueil", services: "Services", calculator: "Calculateur", quote: "Devis", about: "À Propos", contact: "Contact" },
    en: { home: "Home", services: "Services", calculator: "Calculator", quote: "Quote", about: "About", contact: "Contact" },
    ar: { home: "الرئيسية", services: "خدمات", calculator: "حاسبة", quote: "عرض سعر", about: "معلومات عنا", contact: "اتصال" },
  };

  const t = translations[language as keyof typeof translations];

  const handleLanguageChange = (lang: "fr" | "en" | "ar") => {
    setLanguage(lang);
    setShowLangMenu(false); // close menu after selection
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="CIM Déménagement" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">{t.home}</Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">{t.services}</Link>
            <Link to="/calculator" className="text-foreground hover:text-primary transition-colors font-medium">{t.calculator}</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">{t.about}</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">{t.contact}</Link>
          </div>

          <div className="hidden md:flex items-center gap-4 relative">
            {/* Language Switcher */}
            <div 
              onMouseEnter={() => setShowLangMenu(true)}
              onMouseLeave={() => setShowLangMenu(false)}
              className="relative"
            >
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-24 bg-background border border-border rounded shadow-lg z-50">
                  <button className="block w-full px-3 py-2 text-left hover:bg-primary/10" onClick={() => handleLanguageChange("fr")}>FR</button>
                  <button className="block w-full px-3 py-2 text-left hover:bg-primary/10" onClick={() => handleLanguageChange("en")}>EN</button>
                  <button className="block w-full px-3 py-2 text-left hover:bg-primary/10" onClick={() => handleLanguageChange("ar")}>AR</button>
                </div>
              )}
            </div>

            <Link to="/quote">
              <Button variant="hero" size="lg">{t.quote}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link to="/" className="block text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>{t.home}</Link>
            <Link to="/services" className="block text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>{t.services}</Link>
            <Link to="/calculator" className="block text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>{t.calculator}</Link>
            <Link to="/about" className="block text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>{t.about}</Link>
            <Link to="/contact" className="block text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>{t.contact}</Link>

            {/* Mobile language selector */}
            <div className="flex gap-2 pt-4">
              <button className="flex-1 border border-border rounded px-2 py-1" onClick={() => handleLanguageChange("fr")}>FR</button>
              <button className="flex-1 border border-border rounded px-2 py-1" onClick={() => handleLanguageChange("en")}>EN</button>
              <button className="flex-1 border border-border rounded px-2 py-1" onClick={() => handleLanguageChange("ar")}>AR</button>
            </div>

            <Link to="/quote" onClick={() => setIsOpen(false)}>
              <Button variant="hero" size="lg" className="w-full">{t.quote}</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
