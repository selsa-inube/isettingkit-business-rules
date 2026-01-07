import { Stack, Text, Icon } from "@inubekit/inubekit";
import { StyledContainer } from "./styles";
import { EComponentAppearance } from "../../verification/enum/appearances";
import { IButtonAttribute } from "../../verification/engine/types/IButtonAttribute";

const ButtonAttribute = (props: IButtonAttribute) => {
  const { onClick, icon, value } = props;
  return (
    <StyledContainer onClick={onClick}>
      {icon && (
        <Stack
          justifyContent="center"
          alignItems="center"
          padding="2px"
        >
          <Icon icon={icon} appearance={EComponentAppearance.DARK} />
        </Stack>
      )}

      <Text size="small" as="span">{value}</Text>
    </StyledContainer>
  );
};

export { ButtonAttribute };
