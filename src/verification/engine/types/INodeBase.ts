import { ICondition } from "./ICondition";

interface INodeBase<TData> {
  id: string;
  when?: ICondition<TData>;
}

export type { INodeBase };