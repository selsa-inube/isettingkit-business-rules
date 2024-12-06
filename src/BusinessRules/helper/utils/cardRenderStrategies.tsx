import { renderLoadingCard } from "../strategies/loadingCard";
import { RenderCardParams } from "../types";
import { renderDecisionCard } from "../strategies/decisionCard";
import { renderAddCard } from "../strategies/addCard";

const cardRenderStrategies: Record<
  RenderCardParams["type"],
  (params: RenderCardParams) => JSX.Element | null
> = {
  loading: renderLoadingCard,
  decision: renderDecisionCard,
  add: renderAddCard,
};

export { cardRenderStrategies };
