import { IRulesFormTextValues } from "../Form/types";
import { IRuleDecision } from "@isettingkit/input";

interface RenderCardParams {
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

export type { RenderCardParams };
