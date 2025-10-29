import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";

const buildEsConditionSentence = (opts: {
  label: string;
  howToSet: EValueHowToSetUp;
  isFirst?: boolean;
}): string => {
  const { label, howToSet, isFirst = false } = opts;

  const clean = normalizeSpaces(label);
  const hasArticle = startsWithArticle(clean);

  const connector = isFirst ? "Que" : "Y que";
  const nounPhrase = hasArticle ? clean : `${chooseArticle(clean)} ${clean}`;
  const tail = tailForHowToSet(howToSet);

  return `${connector} ${nounPhrase} ${tail}`;
};

const ARTICLE_RE = /^(el|la|los|las)\s/i;

function startsWithArticle(s: string) {
  return ARTICLE_RE.test(s);
}

function normalizeSpaces(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function chooseArticle(label: string): "el" | "la" | "los" | "las" {
  const head = extractHeadNoun(label).toLowerCase();

  const isPlural =
    /\b(s|es)\b/.test(lastToken(label).toLowerCase()) && !head.endsWith("és");

  const exceptions: Record<string, "m" | "f"> = {
    mano: "f",
    día: "m",
    mapa: "m",
    sofá: "m",
    idioma: "m",
    tema: "m",
    clima: "m",
    antigüedad: "f",
    antiguedad: "f",
    puntaje: "m",
  };

  const gender = exceptions[head] ?? guessGenderFromSuffix(head);
  if (gender === "f") return isPlural ? "las" : "la";
  return isPlural ? "los" : "el";
}

function extractHeadNoun(label: string): string {
  const lowered = label.toLowerCase();
  const cut = lowered.split(
    /\bdel\b|\bde la\b|\bde los\b|\bde las\b|\bde\b/,
  )[0];
  const first = cut.trim().split(/\s+/)[0] ?? "";
  return first.normalize("NFD").replace(/^[^a-záéíóúüñ]+/i, "");
}

function lastToken(label: string): string {
  const tokens = label.trim().split(/\s+/);
  return tokens[tokens.length - 1] || "";
}

function guessGenderFromSuffix(word: string): "m" | "f" {
  if (
    /(?:dad|tad|tud|umbre|ción|sión|ie|sis|itis)$/.test(word) ||
    word.endsWith("ez") ||
    word.endsWith("eza")
  )
    return "f";

  if (/(?:aje|or|án|ambre)$/.test(word)) return "m";

  if (word.endsWith("a")) return "f";
  return "m";
}

function tailForHowToSet(how: EValueHowToSetUp): string {
  switch (how) {
    case EValueHowToSetUp.EQUAL:
      return "sea";
    case EValueHowToSetUp.GREATER_THAN:
      return "sea mayor a";
    case EValueHowToSetUp.LESS_THAN:
      return "sea menor a";
    case EValueHowToSetUp.RANGE:
      return "esté entre";
    case EValueHowToSetUp.LIST_OF_VALUES:
    case EValueHowToSetUp.LIST_OF_VALUES_MULTI:
      return "esté en";
    default:
      return "sea";
  }
}

export { buildEsConditionSentence };
