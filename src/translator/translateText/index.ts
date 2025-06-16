import axios from "axios";
import { getCachedTranslation, setCachedTranslation } from "../cache";
import { isThrottled } from "../utils/throttle";
import { detectLang } from "../utils/detectLang";
import { ITranslateOptions } from "../types/translateText/TranslateOptions";

const translateText = async (
  text: string,
  targetLang: string,
  { url, apiKey }: ITranslateOptions,
): Promise<string> => {
  const key = `${targetLang}:${text}`;
  const cached = getCachedTranslation(text, targetLang);
  if (cached) return cached;

  if (isThrottled(key)) {
    console.warn(`[Throttle] Skipped translation for: "${text}"`);
    return text;
  }

  const sourceLang = detectLang(text);

  try {
    const { data } = await axios.post(
      url,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
        api_key: apiKey,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const translated = data?.translatedText || text;
    setCachedTranslation(text, targetLang, translated);
    return translated;
  } catch (error) {
    console.warn(`[Translation] Failed for: "${text}"`, error);
    return text;
  }
};

export { translateText };
