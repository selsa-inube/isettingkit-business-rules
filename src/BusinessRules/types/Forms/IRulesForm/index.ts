import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../IRulesFormTextValues";

interface IRulesForm {
  decision: IRuleDecision;
  onCancel?: () => void;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
  textValues: IRulesFormTextValues;
}

export type { IRulesForm };
