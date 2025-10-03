/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";

interface IUseRulesFormUtils {
  decision: any;
  onSubmitEvent?: (dataDecision: IRuleDecision) => void;
}

export type { IUseRulesFormUtils };
