function isEmptyValue(raw: unknown): boolean {
  if (raw === "" || raw === null || raw === undefined) return true;

  if (Array.isArray(raw)) {
    return raw.length === 0;
  }

  if (typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    return Object.keys(obj).length === 0;
  }

  return false;
}

export { isEmptyValue };