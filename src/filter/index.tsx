import { Button, Grid, Tag, Text, OptionList } from "@inubekit/inubekit";
import { MdOutlineFilterAlt, MdOutlineFilterAltOff } from "react-icons/md";
import { BorderStack } from "./BorderStack";
import { IFilter } from "./types/IFilter";
import { Box } from "./Box";
import { useEffect, useRef, useState } from "react";
import { useVisibleTags } from "./hooks/useVisibleTags";
import {
  StyledAppliedFilterContainer,
  StyledOptionContainer,
  StyledOverFlowIndicator,
} from "./styles";
import { OptionItem } from "./OptionItem";

const Filter = (props: IFilter) => {
  const {
    appliedFilters = [],
    onClear,
    onClick,
    noFiltersLabel,
    titleClearFilter,
    titleFilter,
  } = props;
  const borderRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const {
    visible: visibleFilters,
    hidden: hiddenFilters,
    showOverflowIndicator,
    measurementRef,
  } = useVisibleTags(borderRef, appliedFilters);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutside =
        !dropdownRef.current?.contains(target) &&
        !toggleRef.current?.contains(target);

      if (clickedOutside) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [showDropdown]);

  const filtersEmpty = appliedFilters.length === 0;
  const shouldRenderDropdown = showDropdown && hiddenFilters.length > 0;

  const dropdownOptions = hiddenFilters.map((filter) => ({
    id: filter.label,
    value: filter.label,
    label: filter.label,
    icon: filter.icon,
  }));

  const handleDropdownClick = (value: string) => {
    hiddenFilters.find((filter) => filter.label === value)?.onClose?.();
    setShowDropdown(false);
  };

  return (
    <Box borderRadius="8px" width="100%">
      <StyledAppliedFilterContainer ref={measurementRef}>
        {appliedFilters.map((filter) => (
          <div key={filter.label} data-filter-tag="true">
            <Tag
              appearance="primary"
              displayIcon
              removable
              icon={filter.icon}
              label={filter.label}
              onClose={filter.onClose}
            />
          </div>
        ))}
      </StyledAppliedFilterContainer>

      <Grid gap="12px" templateColumns="1fr auto auto" width="100%">
        <BorderStack
          ref={borderRef}
          background
          borderRadius="8px"
          height="100%"
          direction="row"
          gap="8px"
          alignItems="center"
          padding="0px 8px"
          border
        >
          {filtersEmpty ? (
            <Text size="small" type="label" appearance="gray">
              {noFiltersLabel}
            </Text>
          ) : (
            <>
              {visibleFilters.map((filter) => (
                <Tag
                  key={filter.label}
                  data-filter-tag="true"
                  appearance="primary"
                  displayIcon
                  removable
                  icon={filter.icon}
                  label={filter.label}
                  onClose={filter.onClose}
                />
              ))}

              {showOverflowIndicator && (
                <div
                  ref={toggleRef}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <StyledOverFlowIndicator onClick={handleToggleDropdown}>
                    <Tag
                      appearance="primary"
                      label={`+${hiddenFilters.length}`}
                    />
                  </StyledOverFlowIndicator>

                  {shouldRenderDropdown && (
                    <StyledOptionContainer ref={dropdownRef}>
                      <OptionList
                        options={dropdownOptions}
                        onOptionClick={handleDropdownClick}
                      >
                        {hiddenFilters.map((filter) => (
                          <OptionItem
                            key={filter.label}
                            id={filter.label}
                            label={filter.label}
                            leadingIcon={filter.icon}
                            onClose={() => {
                              filter.onClose?.();
                              setShowDropdown(false);
                            }}
                          />
                        ))}
                      </OptionList>
                    </StyledOptionContainer>
                  )}
                </div>
              )}
            </>
          )}
        </BorderStack>

        <Button
          cursorHover
          disabled={filtersEmpty}
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
