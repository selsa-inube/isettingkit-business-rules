import axios from "axios";
import { getCachedTranslation, setCachedTranslation } from "../cache";
import { isThrottled } from "../utils/throttle";
import { detectLang } from "../utils/detectLang";

const TRANSLATE_URL = "https://api.mymemory.translated.net/get";

const translateText = async (
  text: string,
  targetLang: string,
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
    const { data } = await axios.get(TRANSLATE_URL, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
    });

    const translated = data?.responseData?.translatedText || text;
    setCachedTranslation(text, targetLang, translated);
    return translated;
  } catch (error) {
    console.warn(`[Translation] Failed for: "${text}"`, error);
    return text;
  }
};

export { translateText };
