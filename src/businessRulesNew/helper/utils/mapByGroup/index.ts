/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroup } from "../getConditionsByGroup";

const mapByGroup = (
  raw: any,
  mapFn: (condition: any) => any,
): Record<string, any[]> => {
  const groups = getConditionsByGroup(raw);
  return Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [g, (list as any[]).map(mapFn)])
  );
};

export { mapByGroup };