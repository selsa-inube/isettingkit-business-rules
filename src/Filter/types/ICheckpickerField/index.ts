import { IOption } from "@inubekit/inubekit";

interface ICheckpickerField {
  label?: string;
  name: string;
  options: IOption[];
  values: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  message?: string;
  invalid?: boolean;
}

export type { ICheckpickerField };
