import { ICondition } from "../../types/ICondition";

function canRender<TData>(node: { when?: ICondition<TData> }, data: TData) {
  if (!node.when) return true;
  return node.when(data);
}

export { canRender };
