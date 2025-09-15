import { mixed } from "yup";
import { IValue } from "@isettingkit/input";

const listOfValuesMultiStrategy = (value: IValue) => {
  return {
    schema: mixed().test(
      "isArrayOrString",
      "Por favor selecciona al menos una opcion",
      (val) =>
        Array.isArray(val)
          ? val.every(
              (item) => typeof item === "string" || typeof item === "number",
            )
          : typeof val === "string",
    ),
    value,
  };
};

export { listOfValuesMultiStrategy };
