import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";
import { IOption } from "@inubekit/inubekit";

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
  configureDecisionModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal?: () => void;
  handleSubmitForm?: (dataDecision: IRuleDecision) => void;
  handleOpenRulesModal: (checkedItems: IOption[]) => void;
  handleDelete?: (id: string) => void;
  terms?: boolean;
  onRemoveCondition?: (conditionName: string) => void;
  onRestoreConditions?: (conditionNames: string[]) => void;
  baseDecisionTemplate?: IRuleDecision;
  shouldRenderEmptyMessage?: boolean;
  withEditOption?: boolean;
  configurateDecisionOptions: IOption[];
  withTerm?: boolean;
  handleCloseConfigurationModal: () => void;
}

export type { IBusinessRules };
