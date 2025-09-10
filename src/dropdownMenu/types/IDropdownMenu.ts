import { TLinkItem } from "./TLinkItem";

interface IDropdownMenu {
  isOpen: boolean;
  headerActive?: boolean;
  headerPath?: string;
  links: TLinkItem[];
  onClick: () => void;
  title: string;
  activeId?: string;
}

export type { IDropdownMenu };
