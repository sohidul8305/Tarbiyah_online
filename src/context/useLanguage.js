import { useState, useEffect } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("languageChange", handleStorageChange);
    return () => {
      window.removeEventListener("languageChange", handleStorageChange);
    };
  }, []);

  // সহজে টেক্সট বদলানোর জন্য একটি হেল্পার ফাংশন
  // ব্যবহার: t({ en: "Hello", bn: "হ্যালো" })
  const t = (translations) => {
    return translations[language] || translations["en"];
  };

  return { language, t };
};
