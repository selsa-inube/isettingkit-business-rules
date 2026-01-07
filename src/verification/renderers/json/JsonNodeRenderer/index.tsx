import { resolvePath } from "../../../../verification/engine/utils/resolvePath";
import { IJsonNodeRenderer } from "../../../../verification/engine/types/IJsonNodeRenderer";
import { JsonFallback } from "../jsonFallBack";

function JsonNodeRenderer<TData>(props: IJsonNodeRenderer<TData>) {
  const { ctx, node } = props;
  const value = resolvePath(node.value, ctx.data);

  return <JsonFallback value={value} />;
}

export { JsonNodeRenderer };
