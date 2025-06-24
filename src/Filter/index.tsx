import { Button, Grid, Tag, Text } from "@inubekit/inubekit";
import { MdOutlineFilterAlt, MdOutlineFilterAltOff } from "react-icons/md";
import { BorderStack } from "./BorderStack";
import { IFilter } from "./types/IFilter";
import { Box } from "./Box";

const Filter = (props: IFilter) => {
  const {
    appliedFilters,
    onClear,
    onClick,
    noFiltersLabel,
    titleClearFilter,
    titleFilter,
  } = props;
  const filters = !appliedFilters || appliedFilters.length === 0;
  return (
    <Box borderRadius="8px" width="100%">
      <Grid gap="12px" templateColumns="1fr auto auto" width="100%">
        <BorderStack
          background
          borderRadius="8px"
          height="100%"
          direction="row"
          gap="8px"
          alignItems="center"
          padding="0px 8px"
          border
        >
          {filters ? (
            <Text size="small" type="label" appearance="gray">
              {noFiltersLabel}
            </Text>
          ) : (
            appliedFilters?.map((filter) => (
              <Tag
                key={filter.label}
                appearance="primary"
                displayIcon
                removable
                icon={filter.icon}
                label={filter.label}
                onClose={filter.onClose}
              />
            ))
          )}
        </BorderStack>
        <Button
          cursorHover
          disabled={filters}
          iconBefore={<MdOutlineFilterAltOff />}
          onClick={onClear}
          variant="outlined"
        >
          {titleClearFilter}
        </Button>
        <Button
          cursorHover
          iconBefore={<MdOutlineFilterAlt />}
          onClick={onClick}
          variant="outlined"
        >
          {titleFilter}
        </Button>
      </Grid>
    </Box>
  );
};

export { Filter };
