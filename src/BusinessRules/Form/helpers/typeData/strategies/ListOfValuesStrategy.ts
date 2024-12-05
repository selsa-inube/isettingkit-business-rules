import { mixed } from "yup";
import { IValue } from "@isettingkit/input";

const ListOfValuesStrategy = (value: IValue) => {
  return {
    schema: mixed().test(
      "isArrayOrString",
      "Must be an array of strings/numbers or a single string",
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

export { ListOfValuesStrategy };
