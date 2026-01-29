/* eslint-disable @typescript-eslint/no-explicit-any */
import { string, number, object, mixed } from "yup";
import { ValueDataType } from "@isettingkit/input";
import { buildRangeNumberSchema } from "../utils/buildRangeNumberSchema";

const isOptionObject = (v: any) =>
  v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  "value" in v &&
  v.value !== "" &&
  v.value != null;

const comparisonStrategy = (value: unknown, dataType: string) => {
  if (isOptionObject(value)) {
    return {
      schema: mixed().test(
        "required-option",
        "Por favor selecciona una opcion",
        (v) => isOptionObject(v),
      ),
      value,
    };
  }

  if (value && typeof value === "object" && "from" in value && "to" in value) {
    const rangeValue = value as { from?: unknown; to?: unknown };

    if (dataType === ValueDataType.PERCENTAGE) {
      return {
        schema: buildRangeNumberSchema({ min: 0, max: 100 }),
        value: rangeValue,
      };
    }

    return {
      schema: object({
        from: string().required("Requerido"),
        to: string().required("Requerido"),
      }),
      value: rangeValue,
    };
  }

  if (dataType === ValueDataType.PERCENTAGE) {
    return {
      schema: number()
        .required("El campo porcentaje es requerido")
        .min(0, "El porcentaje no puede ser menor a 0")
        .max(100, "El porcentaje no puede ser mayor a 100"),
      value,
    };
  }

  return {
    schema: mixed().test("required", "Requerido", (v) => {
      if (v === undefined || v === null) return false;
      if (typeof v === "string") return v.trim().length > 0;
      if (typeof v === "number") return !Number.isNaN(v);
      return false;
    }),
    value,
  };
};

export { comparisonStrategy };
