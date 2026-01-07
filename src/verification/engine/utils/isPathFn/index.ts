import { IPathFn } from "../../types/IPathFn";

function isPathFn<TData>(value: unknown): value is IPathFn<TData> {
  return typeof value === "function";
}

export { isPathFn };
