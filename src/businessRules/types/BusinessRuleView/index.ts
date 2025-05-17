import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";

interface IBusinessRuleView {
  decision?: IRuleDecision;
  loading?: boolean;
  textValues?: IRulesFormTextValues;
}

export type { IBusinessRuleView };
