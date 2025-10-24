import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { notFoundTranslations } from "../translations/notfound";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = notFoundTranslations[language];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div
        className={`text-center ${language === "ar" ? "direction-rtl" : ""}`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
        <p className="mb-4 text-xl text-gray-600">{t.message}</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          {t.linkText}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
