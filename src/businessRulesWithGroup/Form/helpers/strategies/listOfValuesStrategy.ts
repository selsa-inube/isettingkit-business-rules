import { mixed } from "yup";
import { IValue } from "@isettingkit/input";

const listOfValuesStrategy = (value: IValue) => {
  return {
    schema: mixed().test(
      "isArrayOrString",
      "Debe ser un array de strings/numbers o un solo string",
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

export { listOfValuesStrategy };
