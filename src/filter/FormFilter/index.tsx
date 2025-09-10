import {
  Divider,
  Icon,
  Stack,
  Tag,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";
import { Checkpicker } from "@inubekit/inubekit";
import { IFormFilter } from "../types/IFormFilter";
import { BorderStack } from "../BorderStack";
import { MdOutlineFilterAlt } from "react-icons/md";

const FormFilter = (props: IFormFilter) => {
  const { appliedFilters, fields, onChange, noFiltersLabel } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const hasAppliedFilters = !appliedFilters || appliedFilters.length === 0;
  return (
    <Stack direction="column" gap="16px">
      {isMobile && (
        <>
          <Stack gap="6px" width="100%" alignItems="center">
            <Icon appearance="gray" icon={<MdOutlineFilterAlt />} />
            <BorderStack
              background
              borderRadius="8px"
              direction="row"
              gap="8px"
              alignItems="center"
              padding="0px 8px"
              border
              width="100%"
              height="36px"
            >
              {hasAppliedFilters ? (
                <Text size="small" type="label" appearance="gray">
                  {noFiltersLabel}
                </Text>
              ) : (
                appliedFilters?.map((filter) => (
                  <Tag
                    key={filter.label}
                    appearance="primary"
                    displayIcon
                    icon={filter.icon}
                    label={filter.label!}
                    onClose={filter.onClose}
                    removable
                  />
                ))
              )}
            </BorderStack>
          </Stack>
          <Divider dashed />
        </>
      )}
      {fields.map((field) => (
        <Stack key={field.name} gap="6px" alignItems="center">
          <Stack padding="22px 0 0 0">
            <Icon appearance="primary" icon={field.icon} />
          </Stack>
          <Checkpicker
            key={field.name}
            disabled={field.disabled}
            invalid={field.invalid}
            label={field.label}
            message={field.message}
            name={field.name}
            onChange={onChange}
            options={field.options}
            placeholder={field.placeholder}
            required={field.required}
            values={field.values}
            fullwidth
          />
        </Stack>
      ))}
    </Stack>
  );
};

export { FormFilter };
