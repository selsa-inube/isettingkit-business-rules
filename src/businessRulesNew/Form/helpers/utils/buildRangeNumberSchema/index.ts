import { number, object } from "yup";

const REQUIRED_MSG = "Por favor escribe un valor";
const GE_ZERO_MSG = "Por favor escribe un valor mayor o igual que 0";
const FROM_LE_TO_MSG = "El valor desde no puede ser mayor que el valor hasta";

const toUndefinedIfEmpty = (value: unknown, originalValue: unknown) => {
  if (originalValue === "") return undefined;
  return value;
};

const buildRangeNumberSchema = ({
  min = 0,
  max,
  pathPrefix = "",
}: {
  min?: number;
  max?: number;
  pathPrefix?: string;
} = {}) =>
  object({
    from: number()
      .transform(toUndefinedIfEmpty)
      .typeError(REQUIRED_MSG)
      .required(REQUIRED_MSG)
      .min(min, GE_ZERO_MSG)
      .max(max ?? Number.POSITIVE_INFINITY),

    to: number()
      .transform(toUndefinedIfEmpty)
      .typeError(REQUIRED_MSG)
      .required(REQUIRED_MSG)
      .min(min, GE_ZERO_MSG)
      .max(max ?? Number.POSITIVE_INFINITY),
  }).test("from<=to", FROM_LE_TO_MSG, function (range) {
    const from = range?.from;
    const to = range?.to;

    if (from === undefined || to === undefined) return true;

    if (from > to) {
      const path = pathPrefix ? `${pathPrefix}.from` : "from";
      return this.createError({ path, message: FROM_LE_TO_MSG });
    }

    return true;
  });

export { buildRangeNumberSchema };
