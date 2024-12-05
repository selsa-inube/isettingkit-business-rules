import { string, number } from "yup";
import { ValueDataType } from "@isettingkit/input";

const ComparisonStrategy = (value: string | number, dataType: string) => {
  if (dataType === ValueDataType.PERCENTAGE) {
    return {
      schema: number()
        .required("Percentage is required")
        .min(0, "Percentage cannot be less than 0")
        .max(100, "Percentage cannot be greater than 100"),
      value,
    };
  }

  return {
    schema: string().required("Required"),
    value,
  };
};

export { ComparisonStrategy };
