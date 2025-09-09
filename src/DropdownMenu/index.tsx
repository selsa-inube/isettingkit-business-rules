import { Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { Link } from "react-router-dom";
import { MdArrowRight, MdChevronRight, MdExpandMore } from "react-icons/md";

import { BorderStack } from "../Filter/BorderStack";
import {
  StyledBoxContainer,
  StyledHeaderOptionContainer,
  StyledMenuItem,
} from "./styles";
import { IDropdownMenu } from "./types/IDropdownMenu";

const DropdownMenu = (props: IDropdownMenu) => {
  const { isOpen, links, onClick, title, activeId } = props;

  const handleHeaderKey = (eventKey: React.KeyboardEvent<HTMLDivElement>) => {
    if (eventKey.key === "Enter" || eventKey.key === " ") {
      eventKey.preventDefault();
      onClick();
    }
  };

  return (
    <StyledBoxContainer $active={isOpen}>
      <BorderStack border borderRadius="8px" width="100%">
        <BorderStack
          alignItems="center"
          borderRadius="8px"
          direction="row"
          gap="12px"
          padding="12px 8px"
        >
          <StyledHeaderOptionContainer
            onClick={onClick}
            onKeyDown={handleHeaderKey}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-controls="dropdown-links"
          >
            <Icon
              appearance={isOpen ? "primary" : "dark"}
              cursorHover
              icon={isOpen ? <MdExpandMore /> : <MdChevronRight />}
            />
            <Text
              appearance={isOpen ? "primary" : "dark"}
              cursorHover
              size="small"
              type="title"
              weight={isOpen ? "bold" : "normal"}
            >
              {title}
            </Text>
          </StyledHeaderOptionContainer>
        </BorderStack>

        {isOpen && (
          <>
            <Divider />
            <Stack direction="column">
              {links.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    style={{ textDecoration: "none" }}
                  >
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
                  </Link>
                );
              })}
            </Stack>
          </>
        )}
      </BorderStack>
    </StyledBoxContainer>
  );
};

export { DropdownMenu };
