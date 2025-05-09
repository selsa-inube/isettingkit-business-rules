import { IRuleDecision } from "@isettingkit/input";
import { IBusinessRuleView } from "..";

interface IBusinessRuleViewUI {
  loading: boolean;
  textValues: IBusinessRuleView["textValues"];
  decision: IBusinessRuleView["decision"];
  decisionMapper: IRuleDecision | null;
  visibleConditions: NonNullable<
    IBusinessRuleView["decision"]
  >["conditionsThatEstablishesTheDecision"];
  decisionDateElement: {
    element: IRuleDecision;
    valueData: unknown;
  } | null;
  skeleton: unknown[];
}

export type { IBusinessRuleViewUI };
