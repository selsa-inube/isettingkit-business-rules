import { IInputStatus } from "@isettingkit/input";

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

export type { IValue };
