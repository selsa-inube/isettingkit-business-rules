import { IRuleDecision } from "@isettingkit/input";
import { IBusinessRuleView } from "..";

interface IBusinessRuleViewUI {
  decision: IBusinessRuleView["decision"];
  decisionDateElement: {
    element: IRuleDecision;
    valueData: unknown;
  } | null;
  decisionMapper: IRuleDecision | null;
  loading: boolean;
  skeleton: unknown[];
  terms: boolean;
  textValues: IBusinessRuleView["textValues"];
  visibleConditions: NonNullable<
    IBusinessRuleView["decision"]
  >["conditionsThatEstablishesTheDecision"];
}

export type { IBusinessRuleViewUI };
