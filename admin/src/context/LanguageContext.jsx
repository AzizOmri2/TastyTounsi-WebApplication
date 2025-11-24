import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "English";
    setLanguage(savedLang);
  }, []);

  // Save language to localStorage whenever it changes
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
