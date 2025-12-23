import { number, object } from "yup";

const REQUIRED_MSG = "Por favor escribe un valor";
const GT_ZERO_MSG = "Por favor escribe un valor mayor que 0";
const FROM_LE_TO_MSG = "El valor desde no puede ser mayor que el valor hasta";
const TO_GT_FROM_MSG = "El valor hasta debe ser mayor que el valor desde";

const toUndefinedIfEmpty = (value: unknown, originalValue: unknown) => {
  if (originalValue === "") return undefined;
  return value;
};

const rangeStrategy = (value: { from?: number; to?: number }) => {
  const fromNumber = value?.from ?? 0;
  const toNumber = value?.to ?? 0;

  return {
    schema: object({
      from: number()
        .transform(toUndefinedIfEmpty)
        .typeError(REQUIRED_MSG)
        .required(REQUIRED_MSG)
        .moreThan(0, GT_ZERO_MSG)
        .test("from<=to", FROM_LE_TO_MSG, function (from) {
          const { to } = this.parent as { to?: number };
          if (from === undefined || to === undefined) return true;
          return from <= to;
        }),

      to: number()
        .transform(toUndefinedIfEmpty)
        .typeError(REQUIRED_MSG)
        .required(REQUIRED_MSG)
        .moreThan(0, GT_ZERO_MSG)
        .test("to>from", TO_GT_FROM_MSG, function (to) {
          const { from } = this.parent as { from?: number };
          if (from === undefined || to === undefined) return true;
          return to > from;
        }),
    }),
    value: { from: fromNumber, to: toNumber },
  };
};

export { rangeStrategy };
