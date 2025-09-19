import { MouseEvent, useContext, useState } from "react";
import { ThemeContext } from "styled-components";

import { tokens as InputTokens } from "../tokens";
import { Text, Checkbox, IOption, ITextAppearance } from "@inubekit/inubekit";
import { StyledOptionItem } from "./styles";

interface IOptionItem {
  id: IOption["id"];
  label: IOption["label"];
  picker?: boolean;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const OptionItem = (props: IOptionItem) => {
  const {
    id,
    label,
    picker = false,
    onCheckboxChange,
    checked = false,
  } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const theme = useContext(ThemeContext) as { input: typeof InputTokens };
  const hoverOptionAppearance =
    (theme?.input?.option?.appearance?.hover as ITextAppearance) ||
    InputTokens.option.appearance.hover;
  const regulaOptionAppearance =
    (theme?.input?.option?.appearance?.regular as ITextAppearance) ||
    InputTokens.option.appearance.regular;

  return (
    <StyledOptionItem
      id={id}
      as={picker ? "label" : "div"}
      htmlFor={picker ? `checkbox-${id}` : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e: MouseEvent<HTMLElement>) => {
        if (picker) {
          e.stopPropagation();
        }
      }}
    >
      {picker && (
        <Checkbox
          id={`checkbox-${id}`}
          value={id}
          checked={checked}
          onChange={onCheckboxChange!}
        />
      )}

      <Text
        margin={picker ? "0 0 0 9px" : "0px"}
        textAlign="start"
        size="medium"
        appearance={isHovered ? hoverOptionAppearance : regulaOptionAppearance}
      >
        {label}
      </Text>
    </StyledOptionItem>
  );
};

export { OptionItem };
export type { IOptionItem };
