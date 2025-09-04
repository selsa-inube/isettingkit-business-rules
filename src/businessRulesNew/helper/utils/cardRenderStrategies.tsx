import { renderLoadingCard } from "../strategies/loadingCard";

import { renderDecisionCard } from "../strategies/decisionCard";
import { renderAddCard } from "../strategies/addCard";
import { IRenderCard } from "../../../businessRules/types/helper";
import { JSX } from "react";

const cardRenderStrategies: Record<
  IRenderCard["type"],
  (props: IRenderCard) => JSX.Element | null
> = {
  loading: renderLoadingCard,
  decision: renderDecisionCard,
  add: renderAddCard,
};

export { cardRenderStrategies };
