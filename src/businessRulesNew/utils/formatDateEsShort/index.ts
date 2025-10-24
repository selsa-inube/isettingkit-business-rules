const formatDateEsShort=(input: string | Date | number | null | undefined): string => {
  if (input === null || input === undefined || input === "") return "";

  const MONTHS_ES_ABBR = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ] as const;

  const ymdMatch = typeof input === "string" && /^(\d{4})-(\d{2})-(\d{2})/.exec(input);
  if (ymdMatch) {
    const [, yStr, mStr, dStr] = ymdMatch;
    const year = Number(yStr);
    const monthIdx = Number(mStr) - 1;
    const day = Number(dStr);
    if (isFinite(year) && monthIdx >= 0 && monthIdx < 12 && isFinite(day)) {
      const dd = String(day).padStart(2, "0");
      return `${dd}/${MONTHS_ES_ABBR[monthIdx]}/${year}`;
    }
  }

  const date =
    input instanceof Date ? input :
    typeof input === "number" ? new Date(input) :
    new Date(input);

  if (isNaN(date.getTime())) return "";

  const day = date.getUTCDate();
  const monthIdx = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const dd = String(day).padStart(2, "0");
  const mon = MONTHS_ES_ABBR[monthIdx] ?? "";
  if (!mon) return "";

  return `${dd}/${mon}/${year}`;
}

export {formatDateEsShort};