import { ITextfieldInputType } from "../types";

const currencyFormat = (price: number): string => {
  if (price === 0 || !price) {
    return "$ 0";
  }
  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const percentageFormat = (percentage: number): string => {
  if (percentage === 0 || !percentage) {
    return "0%";
  }
  return `${percentage.toFixed(0)}%`;
};

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

const formatValue = (value: number | string, type: ITextfieldInputType) => {
  const formatter = formatters[type] || ((v: number) => v);
  return formatter(value);
};

export { currencyFormat, percentageFormat, formatValue };
