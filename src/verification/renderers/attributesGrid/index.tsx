/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@inubekit/inubekit";
import { resolvePath } from "../../engine/utils/resolvePath";
import { BoxContainer } from "../../../boxContainer";
import { BoxAttribute } from "../../../boxAttributes";
import { EComponentAppearance } from "../../../verification/enum/appearances";
import { IAttributesGridRenderer } from "../../../verification/engine/types/IAttributesGridRenderer";

function AttributesGridRenderer<TData>(props: IAttributesGridRenderer<TData>) {
  const { ctx, node } = props;

  const layout = node.layout ?? {};
  //const gap = layout.gapToken ? (tokens.spacing as any)[layout.gapToken] : tokens.spacing.s200;

  const isSingleItem = node.items.length === 1;

  const columns = isSingleItem
    ? "1fr"
    : ctx.isMobile
      ? layout.columns?.mobile ?? "1fr"
      : layout.columns?.desktop ?? "repeat(2, 1fr)";

  const content = (
    <Grid width="100%" templateColumns={columns} gap="8px 16px" autoRows="unset">
      {node.items.map((item) => {
        const raw = resolvePath(item.value, ctx.data);
        const valueNode = item.render ? item.render(raw, ctx) : String(raw ?? "");
        const shouldUseChildren = Boolean(item.withTag);
        return (
          <BoxAttribute
            key={item.id}
            direction="column"
            label={item.label}
            value={shouldUseChildren ? "" : (valueNode as any)}
            withTag={item.withTag}
          >
            {shouldUseChildren ? valueNode : null}
          </BoxAttribute>
        );
      })}
    </Grid>
  );

  if (layout.variant === "lightCard") {
    return (
      <BoxContainer
        direction="column"
        borderRadius="8px"
        width="100%"
        backgroundColor={EComponentAppearance.LIGHT}
        boxSizing="initial"
      >
        {content}
      </BoxContainer>
    );
  }

  return content;
}

export { AttributesGridRenderer };
