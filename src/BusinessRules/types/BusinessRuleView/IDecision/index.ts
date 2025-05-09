import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { IValue } from "../IValue";

interface IDecision {
  endDate?: Date;
  valueUse: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  name: string;
  value?: string | string[] | number | IValue | undefined;
  possibleValue?: IValue;
  startDate?: Date;
  dataType: (typeof ValueDataType)[keyof typeof ValueDataType];
}

export type { IDecision };
