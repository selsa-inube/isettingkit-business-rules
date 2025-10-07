/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";

const normalizeDecisionGroups = (
  decision: IRuleDecision | any,
  defaultGroupId = "group-primary",
  preserveIncomingShape = true, // set false if you always want an object shape
): IRuleDecision => {
  // Legacy flat array (older payloads)
  const legacy = (decision as any).conditionsThatEstablishesTheDecision ?? [];

  // Support both array/object shapes for conditionGroups
  const incomingCg = (decision as any).conditionGroups;
  const primaryCg = Array.isArray(incomingCg) ? incomingCg[0] : incomingCg;

  const groupId =
    primaryCg?.ConditionGroupId ?? defaultGroupId;

  const grouped =
    primaryCg?.conditionsThatEstablishesTheDecision ?? [];

  // Prefer grouped if present; otherwise fallback to legacy flat
  const merged = (grouped && grouped.length ? grouped : legacy) ?? [];

  // Build a clean base object without legacy keys (no unused var)
  const rest: any = { ...(decision as any) };
  delete rest.conditionsThatEstablishesTheDecision;

  // If you want to also drop incoming conditionGroups before overwriting:
  // delete rest.conditionGroups;

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
