import { IDropdownMenuGroup } from "./IDropdownMenuGroup";

interface IDropdownMenuContainer {
  collapseOnNavigate?: boolean;
  defaultOpenId?: string | null;
  groups: IDropdownMenuGroup[];
}

export type { IDropdownMenuContainer };
