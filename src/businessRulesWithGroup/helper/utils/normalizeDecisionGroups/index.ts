/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";

const normalizeDecisionGroups = (
  decision: IRuleDecision | any,
  defaultGroupId = "group-primary",
  preserveIncomingShape = true,
): IRuleDecision => {
  const legacy = (decision as any).conditionsThatEstablishesTheDecision ?? [];

  const incomingCg = (decision as any).conditionGroups;
  const primaryCg = Array.isArray(incomingCg) ? incomingCg[0] : incomingCg;

  const groupId =
    primaryCg?.ConditionGroupId ?? defaultGroupId;

  const grouped =
    primaryCg?.conditionsThatEstablishesTheDecision ?? [];

  const merged = (grouped && grouped.length ? grouped : legacy) ?? [];

  const rest: any = { ...(decision as any) };
  delete rest.conditionsThatEstablishesTheDecision;

  const normalizedGroup = {
    ConditionGroupId: groupId,
    conditionsThatEstablishesTheDecision: merged,
  };

  const nextConditionGroups =
    preserveIncomingShape && Array.isArray(incomingCg)
      ? [normalizedGroup]
      : normalizedGroup;

  return {
    ...rest,
    conditionGroups: nextConditionGroups,
  } as IRuleDecision;
};

export { normalizeDecisionGroups };
