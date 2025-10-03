import { TContext } from "../TContext";

interface OperatorStrategy<TValue = unknown> {
  matches(operator: string): boolean;
  evaluate(context: TContext, field: string, value: TValue): boolean;
}

export type { OperatorStrategy };