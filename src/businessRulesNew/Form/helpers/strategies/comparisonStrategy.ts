import { string, number } from "yup";
import { ValueDataType } from "@isettingkit/input";

const comparisonStrategy = (value: string | number, dataType: string) => {
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
