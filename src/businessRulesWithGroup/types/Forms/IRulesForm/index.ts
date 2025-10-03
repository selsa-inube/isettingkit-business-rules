/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../IRulesFormTextValues";

interface IRulesForm {
  decision: IRuleDecision | any;
  onCancel?: () => void;
  onSubmitEvent?: (dataDecision: IRuleDecision) => void;
  textValues: IRulesFormTextValues;
}

export type { IRulesForm };
