import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../../../../BusinessRules/Form/types";

interface IGetBusinessRulesLayout {
  controls: boolean;
  customTitleContentAddCard?: string;
  decisions: IRuleDecision[];
  loading: boolean;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  handleDelete?: (id: string) => void;
  textValues: IRulesFormTextValues;
}

export type { IGetBusinessRulesLayout };
