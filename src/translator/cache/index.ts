const translationCache = new Map<string, string>();

const getCachedTranslation = (
  text: string,
  lang: string,
): string | undefined => {
  return translationCache.get(`${lang}:${text}`);
};

const setCachedTranslation = (
  text: string,
  lang: string,
  translation: string,
): void => {
  const key = `${lang}:${text}`;
  translationCache.set(key, translation);

  if (translationCache.size > 1000) {
    const firstKey = translationCache.keys().next().value;
    if (firstKey !== undefined) {
      translationCache.delete(firstKey);
    }
  }
};

export { getCachedTranslation, setCachedTranslation };
