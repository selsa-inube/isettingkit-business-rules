/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TRegistry } from "../../types/TRegistry";
import { TSchemaNode } from "../../types/TSchemaNode";
import { IRenderCtx } from "../../types/IRenderCtx";
import { canRender } from "../../utils/canRender";
import { JsonFallback } from "../../../../verification/renderers/json/jsonFallBack";

function renderNode<TData>(
  node: TSchemaNode<TData, any>,
  ctx: IRenderCtx<TData>,
  registry?: TRegistry<TData>,
): React.ReactNode {
  if (!canRender(node, ctx.data)) return null;

  if (!registry) {
    return <JsonFallback key={node.id} value={node} />;
  }

  const renderer = registry[node.type];

  if (!renderer) {
    return <JsonFallback key={node.id} value={node} />;
  }

  return <React.Fragment key={node.id}>{renderer(node, ctx)}</React.Fragment>;
}

export { renderNode };
