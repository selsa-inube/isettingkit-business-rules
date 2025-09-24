// src/components/dropdownMenuContainer/controller/DropdownMenuContainerController.tsx
import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BackAndNextButton } from "../../../button/BackAndNext";
import { DropdownMenuContainer } from "..";

import { TLinkItem } from "../../../dropdownMenu/types/TLinkItem";
import { IDropdownMenuContainer } from "../../../dropdownMenu/types/IDropdownMenuContainer";

type TNavItem = {
  groupId: string;
  id: string;
  kind: "group" | "link";
  path: string;
};

const toSequence = (
  groups: Array<{
    id: string;
    title: string;
    path?: string;
    links: TLinkItem[];
  }>,
): TNavItem[] => {
  const out: TNavItem[] = [];
  for (const g of groups) {
    if (g.path)
      out.push({ kind: "group", groupId: g.id, id: g.id, path: g.path });
    for (const l of g.links || []) {
      if (!l?.path) continue;
      out.push({ kind: "link", groupId: g.id, id: l.id, path: l.path });
    }
  }
  return out;
};

const Placeholder = ({ label }: { label: string }) => (
  <div style={{ padding: 24 }}>
    <h3>{label}</h3>
    <p>
      Story page for <code>{label}</code>
    </p>
  </div>
);

const RoutesForGroups = ({
  groups,
}: {
  groups: IDropdownMenuContainer["groups"];
}) => {
  const firstHeader = groups.find((g) => Boolean(g.path))?.path;
  const firstLink = groups.find((g) => g.links.length > 0)?.links[0]?.path;
  const fallback = firstHeader || firstLink || "/";

  return (
    <Routes>
      {groups.map((g) => (
        <React.Fragment key={g.id}>
          {g.path && (
            <Route path={g.path} element={<Placeholder label={g.title} />} />
          )}
          {g.links.map((l) => (
            <Route
              key={l.id}
              path={l.path}
              element={<Placeholder label={l.label} />}
            />
          ))}
        </React.Fragment>
      ))}
      <Route path="*" element={<Navigate replace to={fallback} />} />
    </Routes>
  );
};

const DropdownMenuContainerController = (props: IDropdownMenuContainer) => {
  const { groups } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const sequence = React.useMemo(() => toSequence(groups), [groups]);
  const currentIndex = React.useMemo(
    () => sequence.findIndex((i) => i.path === location.pathname),
    [location.pathname, sequence],
  );

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;
  const nextIndex =
    currentIndex >= 0 && currentIndex < sequence.length - 1
      ? currentIndex + 1
      : -1;

  const handleBack = React.useCallback(() => {
    if (prevIndex >= 0) navigate(sequence[prevIndex].path);
  }, [navigate, prevIndex, sequence]);

  const handleNext = React.useCallback(() => {
    if (nextIndex >= 0) navigate(sequence[nextIndex].path);
  }, [navigate, nextIndex, sequence]);

  const disabledBack = currentIndex <= 0;
  const disabledNext = currentIndex < 0 || currentIndex >= sequence.length - 1;

  React.useEffect(() => {
    if (location.pathname === "/" && sequence[0]) {
      navigate(sequence[0].path, { replace: true });
    }
  }, [location.pathname, navigate, sequence]);

  return (
    <>
      <DropdownMenuContainer {...props} />
      <BackAndNextButton
        cursorHover
        disabledBack={disabledBack}
        disabledNext={disabledNext}
        handleBack={handleBack}
        handleNext={handleNext}
        loading={false}
        textValues={{ back: "Atrás", next: "Siguiente" }}
      />
      <RoutesForGroups groups={groups} />
    </>
  );
};

export { DropdownMenuContainerController };
