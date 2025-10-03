import { ICondition } from "./ICondition";

interface IRule<TValue = unknown> {
  id: string;
  conditions: Array<ICondition<TValue>>;
  effect?: 'allow' | 'deny' | string;
}

export type { IRule };