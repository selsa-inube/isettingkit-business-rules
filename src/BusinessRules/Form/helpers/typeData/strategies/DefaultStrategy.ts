import { string } from "yup";

const DefaultStrategy = (value: string) => {
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

export { DefaultStrategy };
