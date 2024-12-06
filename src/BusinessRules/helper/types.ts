import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Form/types";

interface RenderCardParams {
  type: "loading" | "decision" | "add";
  decision?: IRuleDecision;
  index?: number;
  controls: boolean;
  loading: boolean;
  handleOpenModal: (decision?: IRuleDecision | null) => void;
  handleDelete: (id: string) => void;
  textValues: IRulesFormTextValues;
}

export type { RenderCardParams };
