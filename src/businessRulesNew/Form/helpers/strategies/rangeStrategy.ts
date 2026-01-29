import { number, object } from "yup";

const REQUIRED_MSG = "Por favor escribe un valor";
const GE_ZERO_MSG = "Por favor escribe un valor mayor o igual que 0";
const FROM_LE_TO_MSG = "El valor desde no puede ser mayor que el valor hasta";

const toUndefinedIfEmpty = (value: unknown, originalValue: unknown) => {
  if (originalValue === "") return undefined;
  return value;
};

const rangeStrategy = (value: { from?: number; to?: number }) => {
  return {
    schema: object({
      from: number()
        .transform(toUndefinedIfEmpty)
        .typeError(REQUIRED_MSG)
        .required(REQUIRED_MSG)
        .min(0, GE_ZERO_MSG),

      to: number()
        .transform(toUndefinedIfEmpty)
        .typeError(REQUIRED_MSG)
        .required(REQUIRED_MSG)
        .min(0, GE_ZERO_MSG),
    }).test("from<=to", FROM_LE_TO_MSG, function (range) {
      const from = range?.from;
      const to = range?.to;

      if (from === undefined || to === undefined) return true;

      if (from > to) {
        return this.createError({
          path: `${this.path}.from`,
          message: FROM_LE_TO_MSG,
        });
      }

      return true;
    }),

    value: { from: value?.from, to: value?.to },
  };
};

export { rangeStrategy };
