import { IValue } from "@isettingkit/input";

enum ValueHowToSetUp {
  EQUAL = "EqualTo",
  GREATER_THAN = "GreaterThan",
  LESS_THAN = "LessThan",
  LIST_OF_VALUES = "ListOfValues",
  LIST_OF_VALUES_MULTI = "ListOfValuesMulti",
  RANGE = "Range",
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
