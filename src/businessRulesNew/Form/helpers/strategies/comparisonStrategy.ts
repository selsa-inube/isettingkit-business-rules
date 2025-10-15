import { string, number, object } from "yup";
import { ValueDataType } from "@isettingkit/input";

const comparisonStrategy = (value: unknown, dataType: string) => {
  if (
    typeof value === "object" &&
    value !== null &&
    "from" in value &&
    "to" in value
  ) {
    const rangeValue = value as { from: string | number; to: string | number };

    if (dataType === ValueDataType.PERCENTAGE) {
      return {
        schema: object({
          from: number()
            .required("El campo desde es requerido")
            .min(0, "El porcentaje no puede ser menor a 0")
            .max(100, "El porcentaje no puede ser mayor a 100"),
          to: number()
            .required("El campo hasta es requerido")
            .min(0, "El porcentaje no puede ser menor a 0")
            .max(100, "El porcentaje no puede ser mayor a 100"),
        }),
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
    schema: string().required("Requerido"),
    value,
  };
};

export { comparisonStrategy };
