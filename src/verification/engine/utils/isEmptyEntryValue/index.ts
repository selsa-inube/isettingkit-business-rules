function isEmptyEntryValue(v: unknown): boolean {
  if (v === "" || v === null || v === undefined) return true;
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

export { isEmptyEntryValue };