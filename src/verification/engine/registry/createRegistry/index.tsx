/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRegistry } from "../../types/TRegistry";
import { EntriesGridRenderer } from "../../../../verification/renderers/entriesGrid";
import { GroupRenderer } from "../../../../verification/renderers/group";
import { JsonNodeRenderer } from "../../../../verification/renderers/json/JsonNodeRenderer";
import { AttributesGridRenderer } from "../../../../verification/renderers/attributesGrid";

function createRegistry<TData>(renderNode: any): TRegistry<TData> {
  return {
    attributesGrid: (node, ctx) => <AttributesGridRenderer ctx={ctx} node={node as any} />,
    entriesGrid: (node, ctx) => <EntriesGridRenderer ctx={ctx} node={node as any} />,
    group: (node, ctx) => <GroupRenderer ctx={ctx} node={node as any} renderNode={renderNode} />,
    json: (node, ctx) => <JsonNodeRenderer ctx={ctx} node={node as any} />,
  };
}

export { createRegistry };
