/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPath } from "../../types/IPath";
import { isPathFn } from "../isPathFn";

function resolvePath<TData>(path: IPath<TData>, data: TData) {
  if (isPathFn<TData>(path)) {
    return path(data);
  }

  return path
    .split(".")
    .reduce<any>((acc, key) => (acc ? acc[key] : undefined), data as any);
}

export { resolvePath };
