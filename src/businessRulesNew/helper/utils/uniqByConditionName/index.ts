/* eslint-disable @typescript-eslint/no-explicit-any */

const isRecordOfArrays = (v: unknown): v is Record<string, any[]> =>
  !!v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.values(v as Record<string, unknown>).every(Array.isArray);

const uniqByConditionName = (list: any[]) => {
  const seen = new Set<string>();
  const out: any[] = [];
  for (const item of list) {
    const key = String(item?.conditionName ?? "");
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
};

export { uniqByConditionName, isRecordOfArrays };