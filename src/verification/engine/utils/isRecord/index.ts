import { TAnyRecord } from "../../types/TAnyRecord";

function isRecord(v: unknown): v is TAnyRecord {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export { isRecord };