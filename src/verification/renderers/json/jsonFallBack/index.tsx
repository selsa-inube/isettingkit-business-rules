import { Grid } from "@inubekit/inubekit";
import { BoxAttribute } from "../../../../boxAttributes";
import { flattenForFallback } from "../flattenForFallback";
import { safeString } from "../../../../verification/engine/utils/safeString";

function JsonFallback(props: { value: unknown; isMobile?: boolean }) {
  const { value, isMobile } = props;

  const items = flattenForFallback(value, {
    skipKeys: ["values"],
    maxDepth: 4,
  });

  const columns = isMobile ? "1fr" : items.length === 1 ? "1fr" : "repeat(2, 1fr)";

  return (
    <Grid width="100%" templateColumns={columns} gap="8px" autoRows="unset">
      {items.map((it) => (
        <BoxAttribute
          key={it.id}
          direction="column"
          label={it.label}
          value={safeString(it.value)}
        />
      ))}
    </Grid>
  );
}

export { JsonFallback };
