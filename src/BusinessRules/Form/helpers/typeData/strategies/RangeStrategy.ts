import { number, object } from "yup";

const RangeStrategy = (value: { from?: number; to?: number }) => {
  const fromNumber = value?.from ?? 0;
  const toNumber = value?.to ?? 0;

  return {
    schema: object({
      from: number()
        .required("Range From is required")
        .max(toNumber, `'Range From' cannot be greater than 'Range To'`)
        .min(0, `'Range From' cannot be less than 0`),
      to: number()
        .required("Range To is required")
        .min(fromNumber, `'Range To' cannot be less than 'Range From'`)
        .min(0, "'Range To' cannot be less than 0"),
    }),
    value: { from: fromNumber, to: toNumber },
  };
};

export { RangeStrategy };
