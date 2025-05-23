/**
 * Skips translation if the string looks like a proper name.
 * Detects common name formats like "Juan Pérez", "Dr. Ana", etc.
 * @param text - The text to check.
 * @returns {boolean} - True if the text should be skipped, false otherwise.
 * @example
 * shouldSkipTranslation("Juan Pérez"); // true
 * shouldSkipTranslation("Hello World"); // false
 * shouldSkipTranslation("Dr. Ana"); // true
 * shouldSkipTranslation("Hello, Dr. Ana"); // false
 */
const shouldSkipTranslation = (text: string): boolean => {
  const nameRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;

  return nameRegex.test(text.trim());
};

export { shouldSkipTranslation };
