import { IRuleDecision } from "@isettingkit/input";

interface IUseRulesFormUtils {
  decision: IRuleDecision;
  onSubmitEvent?: (dataDecision: IRuleDecision) => void;
}

export type { IUseRulesFormUtils };
