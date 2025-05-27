const shouldSkipTranslation = (text: string): boolean => {
  const trimmed = text.trim();

  if (trimmed.length < 3) return false;

  const titleNameRegex =
    /^(Mr|Mrs|Ms|Dr|Sr|Sra)\.?\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/;
  if (titleNameRegex.test(trimmed)) return true;

  const fullNameRegex =
    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,2}$/;

  if (trimmed === trimmed.toUpperCase()) return false;

  return fullNameRegex.test(trimmed);
};

export { shouldSkipTranslation };
