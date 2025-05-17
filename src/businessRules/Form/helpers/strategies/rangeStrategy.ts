import { number, object } from "yup";

const rangeStrategy = (value: { from?: number; to?: number }) => {
  const fromNumber = value?.from ?? 0;
  const toNumber = value?.to ?? 0;

  return {
    schema: object({
      from: number()
        .required("Range From is required")
        .max(toNumber, `'Range From' cannot be greater than 'Range To'`)
        .min(0, `'Range From' cannot be less than 0`),
      to: number()
        .min(0, "To value must be greater than or equal to 0")
        .required("To value is required")
        .test(
          "is-greater",
          "To value must be greater than From value",
          function (to) {
            const { from } = this.parent;
            return to > from;
          },
        ),
    }),
    value: { from: fromNumber, to: toNumber },
  };
};

export { rangeStrategy };
