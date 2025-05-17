import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { IValue } from "../IValue";
import { ICondition } from "../ICondition";
import { IDecision } from "../IDecision";

interface IRule {
  id?: string;
  endDate?: Date | string;
  valueUse: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  name: string;
  value?: string | string[] | number | IValue | undefined;
  possibleValue?: IValue;
  startDate?: Date | string;
  dataType: (typeof ValueDataType)[keyof typeof ValueDataType];
  conditions?: ICondition[];
  decision?: IDecision;
  decisions?: IDecision[];
}

export type { IRule };
