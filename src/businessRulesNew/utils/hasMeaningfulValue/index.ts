/* eslint-disable @typescript-eslint/no-explicit-any */
const hasMeaningfulValue = (v: any): boolean => {
  if (v === null || v === undefined) return false;
  if (typeof v === "number") return !Number.isNaN(v);
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object") {
    const keys = Object.keys(v);
    if (keys.length === 0) return false;
    const maybeFrom = (v as any).from ?? (v as any).min ?? (v as any).start;
    const maybeTo = (v as any).to ?? (v as any).max ?? (v as any).end;
    if (maybeFrom !== undefined || maybeTo !== undefined) {
      return hasMeaningfulValue(maybeFrom) || hasMeaningfulValue(maybeTo);
    }
    return true; 
  }
  return false;
};

export { hasMeaningfulValue };