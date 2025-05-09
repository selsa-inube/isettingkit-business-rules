import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../../../BusinessRules/Form/types";

interface IBusinessRules {
  controls?: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  decisions?: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  isModalOpen: boolean;
  selectedDecision: IRuleDecision | null;
  loading: boolean;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  handleCloseModal?: () => void;
  handleSubmitForm?: (dataDecision: IRuleDecision) => void;
  handleDelete?: (id: string) => void;
}

export type { IBusinessRules };
