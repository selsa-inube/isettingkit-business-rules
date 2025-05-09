import { defaultStrategy } from "../strategies/defaultStrategy";
import { strategies } from "./handlers";

const strategyFormFactoryHandlerManager = (type: keyof typeof strategies) => {
  return strategies[type] || defaultStrategy;
};

export { strategyFormFactoryHandlerManager };
