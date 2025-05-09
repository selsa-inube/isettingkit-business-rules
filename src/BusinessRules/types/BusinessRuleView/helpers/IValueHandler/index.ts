import { IValue } from "../../IValue";
import { IValueReturn } from "../IValueReturn";

type IValueHandler = (data: IValue) => IValueReturn;

export type { IValueHandler };
