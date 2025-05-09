import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { IValue } from "../IValue";

interface ICondition {
  valueUse: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  name: string;
  value?: string | string[] | number | IValue | undefined;
  dataType: (typeof ValueDataType)[keyof typeof ValueDataType];
  possibleValue?: IValue;
}

export type { ICondition };
