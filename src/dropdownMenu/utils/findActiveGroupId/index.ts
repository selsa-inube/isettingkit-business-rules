import { TLinkItem } from "../../../dropdownMenu/types/TLinkItem";

const findActiveGroupId = (
  pathname: string,
  groups: Array<{ id: string; path?: string; links: TLinkItem[] }>,
): string | null => {
  for (const g of groups) {
    if (g.path && (pathname === g.path || pathname.startsWith(g.path + "/")))
      return g.id;
    if (g.links?.some((l) => l.path === pathname)) return g.id;
  }
  return null;
};

export { findActiveGroupId };
