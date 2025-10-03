import { OperatorStrategy } from "../types/operators/OperatorStrategy";
import { TContext } from "../types/TContext";

class EqualsStrategy implements OperatorStrategy<unknown> {
  matches(operator: string) { return operator === "equals"; }
  evaluate(context: TContext, field: string, value: unknown): boolean {
    return (context as any)?.[field] === value;
  }
}

export { EqualsStrategy };