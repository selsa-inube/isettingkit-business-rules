import { franc } from "franc-min";

const detectLang = (text: string): string => {
  const langCode = franc(text);
  const map: Record<string, string> = {
    spa: "es",
    eng: "en",
    deu: "de",
    fra: "fr",
    ita: "it",
    por: "pt",
  };
  return map[langCode] || "en";
};

export { detectLang };
