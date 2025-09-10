import React from "react";
import { useLocation } from "react-router-dom";
import { DropdownMenu } from "..";

type TLinkItem = { id: string; label: string; path: string };

interface DropdownMenuControllerProps {
  defaultOpen?: boolean;
  links: TLinkItem[];
  title: string;
  collapseOnNavigate?: boolean;
}

const DropdownMenuController = (props: DropdownMenuControllerProps) => {
  const {
    defaultOpen = false,
    links,
    title,
    collapseOnNavigate = false,
  } = props;
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const location = useLocation();

  const activeId = React.useMemo(() => {
    const match = links.find((l) => l.path === location.pathname);
    return match?.id ?? links[0]?.id;
  }, [links, location.pathname]);

  React.useEffect(() => {
    if (collapseOnNavigate) setIsOpen(false);
  }, [location.pathname, collapseOnNavigate]);

  return (
    <DropdownMenu
      activeId={activeId}
      isOpen={isOpen}
      links={links}
      onClick={() => setIsOpen((v) => !v)}
      title={title}
    />
  );
};

export { DropdownMenuController };
