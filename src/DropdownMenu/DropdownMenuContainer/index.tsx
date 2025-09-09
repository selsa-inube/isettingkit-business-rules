import React from "react";
import { useLocation } from "react-router-dom";
import { DropdownMenu } from "..";
import { TLinkItem } from "../types/TLinkItem";
import { IDropdownMenuContainer } from "../types/IDropdownMenuContainer";
import { Stack } from "@inubekit/inubekit";

const DropdownMenuContainer = (props: IDropdownMenuContainer) => {
  const { collapseOnNavigate = false, defaultOpenId = null, groups } = props;

  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId);
  const location = useLocation();

  React.useEffect(() => {
    if (collapseOnNavigate) setOpenId(null);
  }, [collapseOnNavigate, location.pathname]);

  const getActiveId = React.useCallback(
    (links: TLinkItem[]) =>
      links.find((links) => links.path === location.pathname)?.id,
    [location.pathname],
  );
  console.log(getActiveId(groups[0].links), location.pathname);
  return (
    <Stack direction="column" gap="8px">
      {groups.map((group) => (
        <DropdownMenu
          key={group.id}
          activeId={getActiveId(group.links)}
          isOpen={openId === group.id}
          links={group.links}
          onClick={() =>
            setOpenId((prev) => (prev === group.id ? null : group.id))
          }
          title={group.title}
        />
      ))}
    </Stack>
  );
};

export { DropdownMenuContainer };
