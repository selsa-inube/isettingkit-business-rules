import { TLinkItem } from "./TLinkItem";

interface IDropdownMenu {
  isOpen: boolean;
  links: TLinkItem[];
  onClick: () => void;
  title: string;
  activeId?: string;
}

export type { IDropdownMenu };
