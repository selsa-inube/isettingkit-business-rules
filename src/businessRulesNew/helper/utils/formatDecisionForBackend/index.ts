/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { convertRangeToString } from "../convertRangeToString";

type TCond = {
  conditionName: string;
  value?: any;
  [k: string]: any;
};

const toArray = (input: any): TCond[] => {
  if (!input) return [];
  if (Array.isArray(input)) return input as TCond[];
  if (typeof input === "object") {
    // grouped object: { groupKey: TCond[] }
    return Object.values(input).flat() as TCond[];
  }
  return [];
};

const formatValue = (val: any) => {
  if (val && typeof val === "object" && "from" in val && "to" in val) {
    return convertRangeToString(val);
  }
  return val;
};

const formatDecisionForBackend = (props: {
  decision: IRuleDecision;
  fallbackId: string;
  template: IRuleDecision;
}) => {
  const { decision, fallbackId, template } = props;

  const incomingConds = toArray(
    (decision as any).conditionsThatEstablishesTheDecision,
  );
  const templateConds = toArray(
    (template as any).conditionsThatEstablishesTheDecision,
  );

  const tplByName = new Map<string, TCond>();
  templateConds.forEach((c) => tplByName.set(c.conditionName, c));

  const formattedConditions = incomingConds
    .map((incoming) => {
      const val = incoming?.value;
      const isEmpty =
        val === undefined ||
        val === null ||
        (typeof val === "string" && val.trim() === "") ||
        (Array.isArray(val) && val.length === 0);

      if (isEmpty) return null;

      const tpl = tplByName.get(incoming.conditionName);

      return {
        ...(tpl ?? {}),
        ...incoming,
        value: formatValue(val),
      };
    })
    .filter(Boolean);
  return {
    ...template,
    ...decision,
    decisionId: decision.decisionId ?? fallbackId,
    value: formatValue((decision as any).value),
    conditionsThatEstablishesTheDecision: formattedConditions,
  };
};

export { formatDecisionForBackend };
