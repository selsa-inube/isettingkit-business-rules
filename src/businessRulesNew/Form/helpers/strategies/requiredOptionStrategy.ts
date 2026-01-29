/* eslint-disable @typescript-eslint/no-explicit-any */
import { mixed, object } from "yup";

const FROM_LE_TO_MSG = "El valor desde no puede ser mayor que el valor hasta";

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

const toNumber = (opt: any) => {
  const raw = opt?.value;
  if (raw === undefined || raw === null || String(raw).trim() === "") return undefined;
  const n = Number(raw);
  return Number.isNaN(n) ? undefined : n;
};

const rangeOptionSchema = object({
  from: requiredOptionSchema,
  to: requiredOptionSchema,
}).test("from<=to", FROM_LE_TO_MSG, function (range) {
  const fromN = toNumber((range as any)?.from);
  const toN = toNumber((range as any)?.to);

  if (fromN === undefined || toN === undefined) return true;

  if (fromN > toN) {
    return this.createError({ path: "from", message: FROM_LE_TO_MSG });
  }

  return true;
});

export { hasDecisionOptions, requiredOptionSchema, rangeOptionSchema };
