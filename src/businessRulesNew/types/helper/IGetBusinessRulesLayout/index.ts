import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../../Forms/IRulesFormTextValues";

interface IGetBusinessRulesLayout {
  cardTitle?: boolean;
  controls: boolean;
  customTitleContentAddCard?: string;
  decisions?: IRuleDecision[];
  loading: boolean;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  handleDelete?: (id: string) => void;
  textValues: IRulesFormTextValues;
  isOpenFor?: (index: number) => boolean;
  toggleAt?: (index: number) => void;
}

export type { IGetBusinessRulesLayout };
