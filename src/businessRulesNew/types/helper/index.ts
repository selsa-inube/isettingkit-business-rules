import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Forms/IRulesFormTextValues";

interface IRenderCard {
  cardTitle?: boolean;
  controls: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  decision?: IRuleDecision;
  handleDelete?: (id: string) => void;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  index?: number;
  loading: boolean;
  textValues: IRulesFormTextValues;
  type: "loading" | "decision" | "add";
  shouldRenderEmptyMessage?: boolean;
  terms?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  editionMode?: "classic" | "versioned";
}

export type { IRenderCard };
