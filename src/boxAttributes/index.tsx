import { Stack, Text, Grid, useMediaQuery } from "@inubekit/inubekit";

import { ButtonAttribute } from "./ButtonAttribute";
import { ContainerAttribute } from "./containerAttribute";
import { IBoxAttribute } from "../verification/engine/types/IBoxAttribute";
import { BoxContainer } from "../boxContainer";
import { EComponentAppearance } from "../verification/enum/appearances";

const BoxAttribute = (props: IBoxAttribute) => {
  const {
    label,
    value,
    withButton,
    buttonIcon,
    buttonValue,
    direction,
    onClickButton,
    withTag,
    children,
  } = props;

  const isMobile = useMediaQuery("(max-width: 1281px)");

  return (
    <BoxContainer
      alignItems="center"
      borderRadius="8px"
      padding={
        isMobile
          ? "8px"
          : `6px 16px`
      }
      boxSizing="border-box"
      backgroundColor={EComponentAppearance.GRAY}
    >
      <Grid
        templateColumns={direction === "column" ? "1fr" : "auto 1fr"}
        templateRows="auto auto"
        width="100%"
        gap="4px"
        alignItems="center"
        justifyContent="space-between"
        height="auto"
      >
        <Text
          type="label"
          size={isMobile ? "small" : "medium"}
          appearance={EComponentAppearance.DARK}
          weight="bold"
          as="span"
        >
          {label}
        </Text>

        <Stack
          alignItems="center"
          justifyContent={direction === "column" ? "flex-start" : "flex-end"}
        >
          {withButton ? (
            <ButtonAttribute
              icon={buttonIcon}
              value={buttonValue}
              onClick={onClickButton}
            />
          ) : (
            <>
              <ContainerAttribute
                withTag={withTag ?? false}
                isMobile={isMobile}
                direction={direction}
                value={value}
              >
                {children}
              </ContainerAttribute>
            </>
          )}
        </Stack>
      </Grid>
    </BoxContainer>
  );
};

export { BoxAttribute };
