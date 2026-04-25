import { useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>("en");

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return { language, toggleLanguage };
};