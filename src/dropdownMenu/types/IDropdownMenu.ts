import { TLinkItem } from "./TLinkItem";

interface IDropdownMenu {
  isOpen: boolean;
  headerActive?: boolean;
  headerPath?: string;
  links: TLinkItem[];
  onClick: () => void;
  onBeforeNavigate?: (to: string, link: TLinkItem) => Promise<boolean> | boolean;
  title: string;
  activeId?: string;
}

export type { IDropdownMenu };
