import { renderLoadingCard } from "../strategies/loadingCard";

import { renderDecisionCard } from "../strategies/decisionCard";
import { renderAddCard } from "../strategies/addCard";
import { IRenderCard } from "../../../BusinessRules/types/helper";

const cardRenderStrategies: Record<
  IRenderCard["type"],
  (props: IRenderCard) => JSX.Element | null
> = {
  loading: renderLoadingCard,
  decision: renderDecisionCard,
  add: renderAddCard,
};

export { cardRenderStrategies };
