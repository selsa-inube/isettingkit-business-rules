import { TLinkItem } from "./TLinkItem";

interface IDropdownMenuGroup {
  id: string;
  title: string;
  links: TLinkItem[];
  path?: string;
}

export type { IDropdownMenuGroup };
