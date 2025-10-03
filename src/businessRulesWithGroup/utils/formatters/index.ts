import { currencyFormat, percentageFormat } from "@isettingkit/input";
import { ITextfieldInputType } from "../../../businessRules/types/Forms/ITextfieldInputType";

const formatters: Record<
  ITextfieldInputType,
  (value: number | string) => string | number
> = {
  currency: (value) =>
    typeof value === "number" ? currencyFormat(value) : value,
  percentage: (value) =>
    typeof value === "number" ? percentageFormat(value) : value,
  number: (value) => value,
  alphabetical: (value) => value,
  date: (value) => value,
};

export { formatters };
