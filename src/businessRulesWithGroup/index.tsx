import { Grid, Text, useMediaQuery, Stack, Button } from "@inubekit/inubekit";
import { ModalRules } from "./ModalRules";
import { StyledGridContainer, StyledScrollContainer } from "./styles";

import { renderCardwithGroup } from "./helper/renderCard";
import { IBusinessRules } from "./types/IBusinessRules";
import { MdAdd } from "react-icons/md";
import { RulesFormWithGroup } from "./Form";
import { getBusinessRulesLayoutWithGroup } from "./helper/getBusinessRulesLayout";

const BusinessRulesWithGroup = (props: IBusinessRules) => {
  const {
    controls = true,
    customTitleContentAddCard,
    customMessageEmptyDecisions,
    decisions,
    textValues,
    decisionTemplate,
    isModalOpen,
    selectedDecision,
    loading,
    handleOpenModal,
    handleCloseModal,
    handleSubmitForm,
    handleDelete,
    terms = true,
  } = props;

  const mediumScreen = useMediaQuery("(max-width: 681px)");
  const smallScreen = useMediaQuery("(max-width: 400px)");
  const { renderedCards, shouldRenderAddCard } =
    getBusinessRulesLayoutWithGroup({
      controls,
      customTitleContentAddCard,
      decisions,
      loading,
      handleOpenModal,
      handleDelete,
      textValues,
    });

  const shouldRenderEmptyMessage = decisions?.length === 0 && !loading;
  const title = customTitleContentAddCard
    ? customTitleContentAddCard
    : "Agregar decisión";
  return (
    <>
      <StyledGridContainer>
        <StyledScrollContainer>
          <Stack direction="column" gap="16px" padding="6px">
            {shouldRenderEmptyMessage ? (
              <Stack
                direction="column"
                gap="28px"
                width="100%"
                height={mediumScreen ? "auto" : "435px"}
                justifyContent="center"
                alignItems="center"
              >
                <Text as="span" type="label" size="large" appearance="gray">
                  {customMessageEmptyDecisions ? (
                    customMessageEmptyDecisions
                  ) : (
                    <>
                      Aún NO tienes definidas tasas de interés efectivas .
                      Presiona
                      <Text
                        as="span"
                        type="label"
                        size="large"
                        appearance="gray"
                        weight="bold"
                      >
                        “
                        {customTitleContentAddCard
                          ? customTitleContentAddCard
                          : "+ Agregar decisión"}
                        ”
                      </Text>
                      para empezar.
                    </>
                  )}
                </Text>
                <Button
                  iconBefore={<MdAdd />}
                  onClick={() => (handleOpenModal ? handleOpenModal() : null)}
                >
                  {title}
                </Button>
              </Stack>
            ) : (
              <Grid
                templateColumns={
                  smallScreen
                    ? "repeat(auto-fill, minmax(200px, 1fr))"
                    : "repeat(auto-fill, minmax(300px, 1fr))"
                }
                autoFlow="row dense"
                gap="24px"
                alignItems="start"
                justifyContent="center"
                autoRows="1fr"
                justifyItems="center"
                padding="6px"
                height={mediumScreen ? "auto" : "484px"}
              >
                {renderedCards}
                {shouldRenderAddCard &&
                  renderCardwithGroup({
                    type: "add",
                    index: decisions?.length,
                    controls,
                    customTitleContentAddCard,
                    customMessageEmptyDecisions,
                    loading,
                    handleOpenModal,
                    handleDelete,
                    textValues,
                    shouldRenderEmptyMessage,
                    terms,
                  })}
              </Grid>
            )}
          </Stack>
        </StyledScrollContainer>
      </StyledGridContainer>

      {isModalOpen && (
        <ModalRules
          portalId="modal-portal"
          onCloseModal={handleCloseModal!}
          title={selectedDecision ? "Editar Decisión" : "Nueva decisión"}
        >
          <RulesFormWithGroup
            decision={selectedDecision ? selectedDecision : decisionTemplate}
            onSubmitEvent={handleSubmitForm!}
            textValues={textValues}
            onCancel={() => (handleCloseModal ? handleCloseModal() : () => {})}
          />
        </ModalRules>
      )}
    </>
  );
};

export { BusinessRulesWithGroup };
