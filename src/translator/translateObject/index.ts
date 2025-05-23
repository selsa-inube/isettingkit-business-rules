import { translateText } from "../translateText";
/* eslint-disable @typescript-eslint/no-explicit-any */
const isTranslatable = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const translateObject = async (
  data: Record<string, any>,
  targetLang: string,
): Promise<Record<string, any>> => {
  const entries = await Promise.all(
    Object.entries(data).map(async ([key, value]) => {
      if (isTranslatable(value)) {
        const translated = await translateText(value, targetLang);
        return [key, translated];
      } else if (Array.isArray(value)) {
        const items = await Promise.all(
          value.map(async (item) =>
            typeof item === "object" && item !== null
              ? await translateObject(item, targetLang)
              : item,
          ),
        );
        return [key, items];
      } else if (typeof value === "object" && value !== null) {
        const nested = await translateObject(value, targetLang);
        return [key, nested];
      } else {
        return [key, value];
      }
    }),
  );

  return Object.fromEntries(entries);
};

export { translateObject };
