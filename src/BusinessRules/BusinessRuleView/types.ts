import {
  IInputStatus,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

interface ICondition {
  valueUse: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  name: string;
  value?: string | string[] | number | IValue | undefined;
  dataType: (typeof ValueDataType)[keyof typeof ValueDataType];
  possibleValue?: IValue;
}

interface IDecision {
  endDate?: Date;
  valueUse: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  name: string;
  value?: string | string[] | number | IValue | undefined;
  possibleValue?: IValue;
  startDate?: Date;
  dataType: (typeof ValueDataType)[keyof typeof ValueDataType];
}

interface IRuleDecision {
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

interface IValue {
  list?: string[];
  listSelected?: string[];
  labelFrom?: string;
  labelTo?: string;
  from?: number | string | Date;
  to?: number | string | Date;
  value?: string | number | string[];
  messageFrom?: string;
  messageTo?: string;
  statusFrom?: IInputStatus;
  statusTo?: IInputStatus;
}

export type { ICondition, IDecision, IRuleDecision, IValue };
