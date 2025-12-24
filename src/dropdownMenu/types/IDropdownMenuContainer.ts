import { IDropdownMenuGroup } from "./IDropdownMenuGroup";
import { TLinkItem } from "./TLinkItem";

interface IDropdownMenuContainer {
  collapseOnNavigate?: boolean;
  defaultOpenId?: string | null;
  groups: IDropdownMenuGroup[];
  onBeforeNavigate?: (to: string, link: TLinkItem) => Promise<boolean> | boolean;
}

export type { IDropdownMenuContainer };
