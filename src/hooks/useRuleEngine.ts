import { useMemo } from "react";
import { TContext } from "@core/rule-engine/types/TContext";
import { OperatorRegistry } from "@core/rule-engine/operators/OperatorRegistry";
import { EqualsStrategy } from "@core/rule-engine/operators/EqualsStrategy";
import { IRule } from "@core/rule-engine/types/IRule";

const useRuleEngine = <C extends TContext>() => {
  const registry = useMemo(() => {
    const registry = new OperatorRegistry();
    registry.register(new EqualsStrategy());
    // register(new GtStrategy()); register(new InStrategy()); etc.
    return registry;
  }, []);

  const evaluate = (rule: IRule, context: C) =>
    rule.conditions.every((condition) => registry.get(condition.operator).evaluate(context, condition.field, condition.value));

  return { evaluate, registry };
}

export { useRuleEngine };