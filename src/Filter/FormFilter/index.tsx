import { Icon, Stack } from "@inubekit/inubekit";
import { Checkpicker } from "@inubekit/inubekit";
import { IFormFilter } from "../types/IFormFilter";

const FormFilter = (props: IFormFilter) => {
  const { fields, onChange } = props;

  return (
    <Stack direction="column" gap="16px">
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
