import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";

interface IBusinessRuleView {
  cardTitle?: boolean;
  controls?: boolean;
  decision?: IRuleDecision;
  loading?: boolean;
  textValues?: IRulesFormTextValues;
  position?: number;
  isOpen?: boolean;
  onToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editionMode?: "classic" | "versioned";
  withEditOption?: boolean;
}

export type { IBusinessRuleView };
