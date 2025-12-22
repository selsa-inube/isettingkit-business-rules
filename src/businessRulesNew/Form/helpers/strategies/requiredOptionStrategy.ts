/* eslint-disable @typescript-eslint/no-explicit-any */
import { mixed } from "yup";

const hasDecisionOptions = (d: any) =>
  Array.isArray(d?.listOfPossibleValues?.list) && d.listOfPossibleValues.list.length > 0;

const requiredOptionSchema = mixed().test(
  "required-option",
  "Por favor selecciona una opcion",
  (val) => {
    if (val === undefined || val === null) return false;

    if (typeof val === "object") {
      const v = (val as any).value;
      return v !== undefined && v !== null && String(v).trim() !== "";
    }

    if (typeof val === "string") return val.trim().length > 0;
    if (typeof val === "number") return !Number.isNaN(val);

    return false;
  },
);
 export { hasDecisionOptions, requiredOptionSchema };