import { ITextfieldInputType } from "../../../businessRules/types/Forms/ITextfieldInputType";
import { formatters } from "../formatters";

const formatValue = (value: number | string, type: ITextfieldInputType) => {
  const formatter = formatters[type] || ((v: number) => v);
  return formatter(value);
};

export { formatValue };
