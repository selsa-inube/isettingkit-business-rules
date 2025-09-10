import { StyledOptionItem } from "./styles";
import { MouseEvent, useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { tokens as InputTokens } from "./tokens";
import { Icon, Text, ITextAppearance, Grid } from "@inubekit/inubekit";
import { MdClose } from "react-icons/md";
import { IOptionItem } from "../types/IOptionItem";

const OptionItem = (props: IOptionItem) => {
  const { id, label, leadingIcon, onClose } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const theme = useContext(ThemeContext) as { input: typeof InputTokens };
  const hoverAppearance =
    (theme?.input?.option?.appearance?.hover as ITextAppearance) ??
    InputTokens.option.appearance.hover;
  const regularAppearance =
    (theme?.input?.option?.appearance?.regular as ITextAppearance) ??
    InputTokens.option.appearance.regular;

  return (
    <StyledOptionItem
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
      }}
    >
      <Grid
        alignItems="center"
        gap="8px"
        templateColumns="auto 1fr auto"
        width="100%"
      >
        {leadingIcon && (
          <Icon
            icon={leadingIcon}
            size="medium"
            appearance={isHovered ? hoverAppearance : regularAppearance}
          />
        )}

        <Text
          textAlign="start"
          size="medium"
          appearance={isHovered ? hoverAppearance : regularAppearance}
        >
          {label}
        </Text>

        <Icon
          icon={<MdClose />}
          size="small"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClose?.();
          }}
          appearance={isHovered ? hoverAppearance : regularAppearance}
          cursorHover
        />
      </Grid>
    </StyledOptionItem>
  );
};

export { OptionItem };
export type { IOptionItem };
