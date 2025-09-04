import { IRenderCard } from "../types/helper";
import { cardRenderStrategies } from "./utils/cardRenderStrategies";

const renderCardNew = (props: IRenderCard) => {
  const { type } = props;
  const strategy = cardRenderStrategies[type];
  return strategy ? strategy(props) : null;
};

export { renderCardNew };
