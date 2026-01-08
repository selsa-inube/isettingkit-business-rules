/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@inubekit/inubekit";
import { resolvePath } from "../../engine/utils/resolvePath";
import { IEntriesGridRenderer } from "../../../verification/engine/types/IEntriesGridRenderer";
import { columnsAttribute } from "../../../verification/engine/utils/columnsAttribute";
import { rowsAttribute } from "../../../verification/engine/utils/rowsAttribute";
import { BoxAttribute } from "../../../boxAttributes";
import { BoxContainer } from "../../../boxContainer";
import { EComponentAppearance } from "../../../verification/enum/appearances";
import { isEmptyEntryValue } from "../../../verification/engine/utils/isEmptyEntryValue";

function EntriesGridRenderer<TData, TEntry>(props: IEntriesGridRenderer<TData, TEntry>) {
  const { ctx, node } = props;

  const layout = node.layout ?? {};
  // const gap = layout.gapToken ? (tokens.spacing as any)[layout.gapToken] : tokens.spacing.s200;

  const entries = resolvePath(node.entries, ctx.data) as TEntry[] | undefined;
  if (!entries || entries.length === 0) return null;

  const content = (
    <Grid
      key={node.id}
      width="100%"
      height="auto"
      templateColumns={columnsAttribute(entries as any, ctx.isMobile)}
      templateRows={rowsAttribute(entries as any, ctx.isMobile)}
      autoRows="unset"
      gap="8px 16px"
    >
      {entries.map((entry: any) => {
        const value = node.valueOf(entry);
        if (isEmptyEntryValue(value)) {
          return null;
        }

        return (
          <BoxAttribute
            key={node.keyOf(entry)}
            direction="column"
            label={node.labelOf(entry)}
            value={value}
          />
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

export { EntriesGridRenderer };
