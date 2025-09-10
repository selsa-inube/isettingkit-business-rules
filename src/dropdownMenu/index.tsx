import React from "react";
import { Icon, Stack, Text } from "@inubekit/inubekit";
import { MdArrowRight, MdChevronRight, MdExpandMore } from "react-icons/md";

import { BorderStack } from "../filter/BorderStack";
import {
  StyledBoxContainer,
  StyledHeaderOptionContainer,
  StyledMainOptionContainer,
  StyledMenuItem,
  StyledHeaderTitleLink,
  StyledHeaderTitleButton,
  StyledItemLink,
  StyledLinksColumn,
} from "./styles";
import { IDropdownMenu } from "./types/IDropdownMenu";

const DropdownMenu = (props: IDropdownMenu) => {
  const { isOpen, links, onClick, title, activeId, headerPath, headerActive } =
    props;

  const handleCaretKey = (eventCaret: React.KeyboardEvent<HTMLDivElement>) => {
    if (eventCaret.key === "Enter" || eventCaret.key === " ") {
      eventCaret.preventDefault();
      onClick();
    }
  };

  const handleCaretClickInsideLink = (
    eventCaretClickInside: React.MouseEvent<HTMLDivElement>,
  ) => {
    eventCaretClickInside.preventDefault();
    eventCaretClickInside.stopPropagation();
    onClick();
  };
  const handleCaretKeyInsideLink = (
    eventCaretKeyInsideLink: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      eventCaretKeyInsideLink.key === "Enter" ||
      eventCaretKeyInsideLink.key === " "
    ) {
      eventCaretKeyInsideLink.preventDefault();
      eventCaretKeyInsideLink.stopPropagation();
      onClick();
    }
  };

  const headerAppearance = isOpen || headerActive ? "primary" : "dark";
  const headerWeight = isOpen || headerActive ? "bold" : "normal";
  const controlsId = React.useId();

  return (
    <StyledBoxContainer $active={isOpen}>
      <BorderStack border borderRadius="8px" width="100%">
        <StyledMainOptionContainer
          $active={isOpen && links.length > 0}
          aria-controls={controlsId}
          aria-expanded={isOpen}
          onClick={handleCaretClickInsideLink}
          onKeyDown={handleCaretKeyInsideLink}
        >
          {headerPath ? (
            <StyledHeaderTitleLink to={headerPath}>
              <BorderStack
                alignItems="center"
                borderRadius="8px"
                direction="row"
                gap="12px"
                padding="12px 8px"
              >
                <Icon
                  appearance={headerAppearance}
                  cursorHover
                  icon={
                    isOpen && links.length > 0 ? (
                      <MdExpandMore />
                    ) : (
                      <MdChevronRight />
                    )
                  }
                />

                <StyledHeaderOptionContainer>
                  <Text
                    appearance={headerAppearance}
                    cursorHover
                    size="small"
                    type="title"
                    weight={headerWeight}
                  >
                    {title}
                  </Text>
                </StyledHeaderOptionContainer>
              </BorderStack>
            </StyledHeaderTitleLink>
          ) : (
            <BorderStack
              alignItems="center"
              borderRadius="8px"
              direction="row"
              gap="12px"
              padding="12px 8px"
            >
              <Icon
                appearance={headerAppearance}
                cursorHover
                icon={
                  isOpen && links.length > 0 ? (
                    <MdExpandMore />
                  ) : (
                    <MdChevronRight />
                  )
                }
              />
              <StyledHeaderOptionContainer>
                <StyledHeaderTitleButton
                  aria-controls={controlsId}
                  aria-expanded={isOpen}
                  onClick={onClick}
                  onKeyDown={handleCaretKey}
                >
                  <Text
                    appearance={headerAppearance}
                    cursorHover
                    size="small"
                    type="title"
                    weight={headerWeight}
                  >
                    {title}
                  </Text>
                </StyledHeaderTitleButton>
              </StyledHeaderOptionContainer>
            </BorderStack>
          )}
        </StyledMainOptionContainer>

        {isOpen && links.length > 0 && (
          <StyledLinksColumn id={controlsId}>
            {links.map((item) => {
              const isActive = item.id === activeId;
              return (
                <StyledItemLink key={item.id} to={item.path}>
                  <StyledMenuItem $active={isActive}>
                    <Stack
                      alignItems="center"
                      direction="row"
                      gap="8px"
                      padding={isActive ? "8px 4px" : "8px 32px"}
                    >
                      {isActive && (
                        <Icon appearance="primary" icon={<MdArrowRight />} />
                      )}
                      <Text
                        appearance={isActive ? "primary" : "dark"}
                        size="small"
                        type="title"
                        weight={isActive ? "bold" : "normal"}
                      >
                        {item.label}
                      </Text>
                    </Stack>
                  </StyledMenuItem>
                </StyledItemLink>
              );
            })}
          </StyledLinksColumn>
        )}
      </BorderStack>
    </StyledBoxContainer>
  );
};

export { DropdownMenu };
