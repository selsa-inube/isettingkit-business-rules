import { IOption } from "@inubekit/inubekit";

interface IOptionItem {
  id: IOption["id"];
  label: IOption["label"];
  leadingIcon?: React.ReactNode;
  onClose?: () => void;
}

export type { IOptionItem };
