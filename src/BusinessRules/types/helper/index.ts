import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";

interface IRenderCard {
  controls: boolean;
  customTitleContentAddCard?: string;
  decision?: IRuleDecision;
  handleDelete?: (id: string) => void;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  index?: number;
  loading: boolean;
  textValues: IRulesFormTextValues;
  type: "loading" | "decision" | "add";
}

export type { IRenderCard };
