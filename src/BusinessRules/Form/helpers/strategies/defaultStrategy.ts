import { string } from "yup";

const defaultStrategy = (value: string) => {
  return {
    schema: string()
      .required("Required")
      .test(
        "non-empty",
        "Value cannot be empty",
        (val) => val !== undefined && val !== null && val.trim() !== "",
      ),
    value,
  };
};

export { defaultStrategy };
