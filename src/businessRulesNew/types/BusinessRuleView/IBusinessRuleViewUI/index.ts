import { IStackJustifyContent } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { IBusinessRuleView } from "..";

interface IBusinessRuleViewUI {
  controls: boolean;
  conditionsAlignment: IStackJustifyContent;
  decision: IBusinessRuleView["decision"];
  decisionDateElement?: {
    element: IRuleDecision;
    valueData: unknown;
  } | null;
  decisionMapper: IRuleDecision | null;
  loading: boolean;
  skeleton: unknown[];
  terms?: boolean;
  textValues: IBusinessRuleView["textValues"];
  visibleConditions: NonNullable<
    IBusinessRuleView["decision"]
  >["conditionsThatEstablishesTheDecision"];
  tagLabel: string;
  isOpen?: boolean;
  onToggle?: () => void;
  effectiveFrom?: Date | null;
  validUntil?: Date | null;
  hasEffectiveFrom?: boolean;
  hasValidUntil?: boolean;
  effectiveFromRenderer?: {
    element: IRuleDecision;
    valueData: unknown;
  } | null;
  validUntilRenderer?: {
    element: IRuleDecision;
    valueData: unknown;
  } | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export type { IBusinessRuleViewUI };
