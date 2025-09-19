import { IOption } from "@inubekit/inubekit";

import { Select } from "../select";
import { ICheckpickerSize } from "./props";

interface ICheckpicker {
  disabled?: boolean;
  fullwidth?: boolean;
  id?: string;
  invalid?: boolean;
  label?: string;
  maxItems?: number;
  message?: string;
  name: string;
  onChange: (name: string, values: string) => void;
  options: IOption[];
  placeholder?: string;
  required?: boolean;
  size?: ICheckpickerSize;
  values: string;
}

const Checkpicker = (props: ICheckpicker) => {
  const {
    disabled = false,
    fullwidth = false,
    id,
    invalid = false,
    label,
    maxItems = 5,
    message,
    name,
    onChange,
    options,
    placeholder,
    required = false,
    size = "wide",
    values,
  } = props;

  return (
    <Select
      disabled={disabled}
      fullwidth={fullwidth}
      id={id}
      invalid={invalid}
      label={label}
      maxItems={maxItems}
      message={message}
      name={name}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      required={required}
      size={size}
      value={values}
      picker={true}
    />
  );
};

export { Checkpicker };
export type { ICheckpicker };
