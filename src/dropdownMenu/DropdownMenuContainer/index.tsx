import React from "react";
import { useLocation } from "react-router-dom";
import { DropdownMenu } from "..";
import { TLinkItem } from "../types/TLinkItem";
import { IDropdownMenuContainer } from "../types/IDropdownMenuContainer";
import { StyledDropdownContainer } from "./styles";
import { Stack } from "@inubekit/inubekit";
import { findActiveGroupId } from "../utils/findActiveGroupId";

const DropdownMenuContainer = (props: IDropdownMenuContainer) => {
  const { collapseOnNavigate = false, defaultOpenId = null, groups } = props;

  const location = useLocation();
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId);

  const lastPathRef = React.useRef(location.pathname);

  const getActiveId = React.useCallback(
    (links: TLinkItem[]) => links.find((l) => l.path === location.pathname)?.id,
    [location.pathname],
  );

  const isHeaderActive = React.useCallback(
    (groupPath?: string) =>
      !!groupPath &&
      (location.pathname === groupPath ||
        location.pathname.startsWith(groupPath + "/")),
    [location.pathname],
  );

  React.useEffect(() => {
    const pathChanged = lastPathRef.current !== location.pathname;
    if (!pathChanged) return;

    lastPathRef.current = location.pathname;

    if (collapseOnNavigate) {
      setOpenId(null);
      return;
    }

    const activeGroupId = findActiveGroupId(location.pathname, groups);
    if (activeGroupId) {
      setOpenId(activeGroupId);
      return;
    }
    if (defaultOpenId) setOpenId(defaultOpenId);
  }, [collapseOnNavigate, defaultOpenId, groups, location.pathname]);

  return (
    <StyledDropdownContainer $background>
      <Stack direction="column" gap="8px" padding="12px" height="100%">
        {groups.map((group) => (
          <DropdownMenu
            key={group.id}
            activeId={getActiveId(group.links)}
            headerPath={group.path}
            headerActive={isHeaderActive(group.path)}
            isOpen={openId === group.id}
            links={group.links}
            onClick={() =>
              setOpenId((prev) => (prev === group.id ? null : group.id))
            }
            title={group.title}
          />
        ))}
      </Stack>
    </StyledDropdownContainer>
  );
};

export { DropdownMenuContainer };
