import { Divider, Icon, Stack, Tag, useMediaQuery } from "@inubekit/inubekit";
import { Checkpicker } from "@inubekit/inubekit";
import { IFormFilter } from "../types/IFormFilter";
import { BorderStack } from "../BorderStack";
import { MdOutlineFilterAlt } from "react-icons/md";

const FormFilter = (props: IFormFilter) => {
  const { appliedFilters, fields, onChange } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack direction="column" gap="16px">
      {isMobile && appliedFilters?.length && appliedFilters.length > 0 ? (
        <>
          <Stack gap="6px">
            <Icon appearance="primary" icon={<MdOutlineFilterAlt />} />
            <BorderStack
              background
              borderRadius="8px"
              height="100%"
              direction="row"
              gap="8px"
              alignItems="center"
              padding="0px 8px"
            >
              {appliedFilters?.map((filter) => (
                <Tag
                  key={filter.label}
                  appearance="primary"
                  displayIcon
                  icon={filter.icon}
                  label={filter.label!}
                />
              ))}
            </BorderStack>
          </Stack>
          <Divider dashed />
        </>
      ) : null}
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
