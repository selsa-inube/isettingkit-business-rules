/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";

interface IBusinessRuleView {
  decision?: IRuleDecision | any;
  loading?: boolean;
  textValues?: IRulesFormTextValues;
  position?: number;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export type { IBusinessRuleView };
