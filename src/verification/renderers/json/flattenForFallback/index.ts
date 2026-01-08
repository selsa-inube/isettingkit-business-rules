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
 * - Skips empty primitive values ("" / null / undefined) for inner fields.
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

  function pushLeaf(path: string, leafValue: unknown) {
    items.push({
      id: path || "value",
      label: toTitle(path || "value"),
      value: leafValue,
    });
  }

  function isEmptyPrimitive(v: unknown) {
    return v === "" || v === null || v === undefined;
  }

  function walk(node: unknown, basePath: string, depth: number) {
    if (depth > maxDepth) {
      pushLeaf(basePath, "[MaxDepth]");
      return;
    }

    if ((node === null || node === undefined) && !basePath) {
      pushLeaf(basePath, node);
      return;
    }

    if (basePath && isEmptyPrimitive(node)) {
      return;
    }

    if (Array.isArray(node)) {
      if (node.length === 0) return; 

      const text = safeArrayToText(node);
      if (!text) return; 

      pushLeaf(basePath, text);
      return;
    }

    if (isRecord(node)) {
      if (seen.has(node)) {
        pushLeaf(basePath, "[Circular]");
        return;
      }
      seen.add(node);

      const entries = Object.entries(node);

      if (entries.length === 0) {
        if (!basePath) {
          pushLeaf(basePath, "");
        }
        return;
      }

      for (const [k, v] of entries) {
        if (!isRecord(v) && !Array.isArray(v) && isEmptyPrimitive(v)) {
          continue;
        }

        const nextPath = skipKeys.has(k) ? basePath : joinPath(basePath, k);

        if (isRecord(v) || Array.isArray(v)) {
          walk(v, nextPath, depth + 1);
        } else {
          pushLeaf(nextPath || k, v);
        }
      }
      return;
    }
    pushLeaf(basePath, node);
  }

  walk(value, "", 0);

  items.sort((a, b) => a.label.localeCompare(b.label));

  return items;
}

export { flattenForFallback };
