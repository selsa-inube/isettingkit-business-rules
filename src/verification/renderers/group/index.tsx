/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@inubekit/inubekit";
import { IGroupRenderer } from "../../../verification/engine/types/IGroupRenderer";

function GroupRenderer<TData>(props: IGroupRenderer<TData>) {
  const { ctx, node, renderNode } = props;
  const { children } = node;

  return (
    <Stack direction="column" width="100%" gap="16px">
      {children.map((child) => renderNode(child, ctx) as any)}
    </Stack>
  );
}

export { GroupRenderer };
