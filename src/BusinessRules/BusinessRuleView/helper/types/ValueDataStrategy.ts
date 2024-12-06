import { IValue } from "@isettingkit/input";

enum ValueHowToSetUp {
  EQUAL = "equal",
  GREATER_THAN = "greater_than",
  LESS_THAN = "less_than",
  LIST_OF_VALUES = "list_of_values",
  LIST_OF_VALUES_MULTI = "list_of_values_multi",
  RANGE = "range",
}

type ValueReturnType =
  | string
  | number
  | string[]
  | { from: string; to: string }
  | undefined;
type ValueHandler = (data: IValue) => ValueReturnType;
export { ValueHowToSetUp };
export type { ValueReturnType, ValueHandler };
