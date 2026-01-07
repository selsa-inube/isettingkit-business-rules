import { TAnyRecord } from "../../types/TAnyRecord";
import { safeString } from "../safeString";
import { toTitleSchema } from "../toTitleSchema";

function buildAttributesItemsFromObject(basePath: string, obj: TAnyRecord) {
  const keys = Object.keys(obj);

  return keys.map((key) => ({
    id: `${basePath}.${key}`,
    label: toTitleSchema(key),
    value: `${basePath}.${key}`,
    render: (v: unknown) => safeString(v),
  }));
}

export { buildAttributesItemsFromObject };