import { RenderCardParams } from "./types";
import { cardRenderStrategies } from "./utils/cardRenderStrategies";

function renderCard(params: RenderCardParams): JSX.Element | null {
  const { type } = params;
  const strategy = cardRenderStrategies[type];
  return strategy ? strategy(params) : null;
}

export { renderCard };
