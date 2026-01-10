import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";

interface IBusinessRules {
  cardTitle?: boolean;
  controls?: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  decisions?: IRuleDecision[];
  editionMode?: "classic" | "versioned";
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  isModalOpen: boolean;
  selectedDecision: IRuleDecision | null;
  loading: boolean;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  handleCloseModal?: () => void;
  handleSubmitForm?: (dataDecision: IRuleDecision) => void;
  handleDelete?: (id: string) => void;
  terms?: boolean;
  onRemoveCondition?: (conditionName: string) => void;
  onRestoreConditions?: (conditionNames: string[]) => void;
  baseDecisionTemplate?: IRuleDecision;
  shouldRenderEmptyMessage?: boolean;
}

export type { IBusinessRules };
