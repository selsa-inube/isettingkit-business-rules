import { toTitle } from "../../../../verification/engine/utils/toTitle";
import { IFlattenItem } from "../../../../verification/engine/types/IFlattenItem";
import { isRecord } from "../../../../verification/engine/utils/isRecord";
import { safeArrayToText } from "../../../../verification/engine/utils/safeArrayToText";
import { joinPath } from "../../../../verification/engine/utils/joinPath";

/**
 * - Flattens nested objects into a list of label/value pairs.
 * - Skips wrapper keys like "values".
 * - Arrays become a single comma-separated value (no indexes).
 * - Stops recursion on circular refs.
 */
function flattenForFallback(
  value: unknown,
  options?: {
    skipKeys?: string[];
    maxDepth?: number;
  },
): IFlattenItem[] {
  const skipKeys = new Set(options?.skipKeys ?? ["values"]);
  const maxDepth = options?.maxDepth ?? 4;

  const items: IFlattenItem[] = [];
  const seen = new WeakSet<object>();

  function walk(node: unknown, basePath: string, depth: number) {
    if (depth > maxDepth) {
      items.push({
        id: basePath || "value",
        label: toTitle(basePath || "value"),
        value: node,
      });
      return;
    }

    if (node === null || node === undefined) {
      items.push({
        id: basePath || "value",
        label: toTitle(basePath || "value"),
        value: node,
      });
      return;
    }

    if (Array.isArray(node)) {
      items.push({
        id: basePath || "value",
        label: toTitle(basePath || "value"),
        value: safeArrayToText(node),
      });
      return;
    }

    if (isRecord(node)) {
      if (seen.has(node)) {
        items.push({
          id: basePath || "value",
          label: toTitle(basePath || "value"),
          value: "[Circular]",
        });
        return;
      }
      seen.add(node);

      const entries = Object.entries(node);

      for (const [k, v] of entries) {
        const nextPath = skipKeys.has(k) ? basePath : joinPath(basePath, k);

        if (isRecord(v) || Array.isArray(v)) {
          walk(v, nextPath, depth + 1);
        } else {
          items.push({
            id: nextPath || k,
            label: toTitle(nextPath || k),
            value: v,
          });
        }
      }
      return;
    }

    items.push({
      id: basePath || "value",
      label: toTitle(basePath || "value"),
      value: node,
    });
  }

  walk(value, "", 0);

  items.sort((a, b) => a.label.localeCompare(b.label));

  return items;
}

export { flattenForFallback };