import { string } from "yup";

const defaultStrategy = (value: string) => {
  return {
    schema: string()
      .required("Requerido")
      .test(
        "non-empty",
        "El valor no puede estar vacío",
        (val) => val !== undefined && val !== null && val.trim() !== "",
      ),
    value,
  };
};

export { defaultStrategy };
