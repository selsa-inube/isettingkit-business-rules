/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "../getConditionsByGroup";

const mapByGroupNew = (
  raw: any,
  mapFn: (condition: any) => any,
): Record<string, any[]> => {
  const groups = getConditionsByGroupNew(raw);
  return Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [g, (list as any[]).map(mapFn)])
  );
};

export { mapByGroupNew };