import { string, number } from "yup";
import { ValueDataType } from "@isettingkit/input";

const comparisonStrategy = (value: string | number, dataType: string) => {
  if (dataType === ValueDataType.PERCENTAGE) {
    return {
      schema: number()
        .required("El campo tipo porcentaje es requerido")
        .min(0, "El campo tipo porcentaje no puede ser menor que 0")
        .max(100, "El campo tipo porcentaje no puede ser mayor que 100"),
      value,
    };
  }

  return {
    schema: string().required("Requerido"),
    value,
  };
};

export { comparisonStrategy };
