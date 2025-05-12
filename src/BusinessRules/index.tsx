import { Grid, Text, useMediaQuery, Stack } from "@inubekit/inubekit";
import { ModalRules } from "./ModalRules";
import { StyledGridContainer, StyledScrollContainer } from "./styles";
import { getBusinessRulesLayout } from "./helper/getBusinessRulesLayout";
import { renderCard } from "./helper/renderCard";
import { IBusinessRules } from "./types/IBusinessRules";
import { RulesForm } from "..";

const BusinessRules = (props: IBusinessRules) => {
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
  } = props;

  const mediumScreen = useMediaQuery("(max-width: 681px)");
  const smallScreen = useMediaQuery("(max-width: 400px)");
  const { renderedCards, shouldRenderAddCard } = getBusinessRulesLayout({
    controls,
    customTitleContentAddCard,
    decisions,
    loading,
    handleOpenModal,
    handleDelete,
    textValues,
  });

  const shouldRenderEmptyMessage = decisions?.length === 0 && !loading;
  return (
    <>
      <StyledGridContainer>
        <StyledScrollContainer>
          <Stack direction="column" gap="16px" padding="6px">
            {shouldRenderEmptyMessage && (
              <Text as="span" type="label" size="large" appearance="gray">
                {customMessageEmptyDecisions
                  ? customMessageEmptyDecisions
                  : "Aún NO tienes definidas tasas de interés efectivas"}
                . Presiona
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
              </Text>
            )}
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
                renderCard({
                  type: "add",
                  index: decisions?.length,
                  controls,
                  customTitleContentAddCard,
                  loading,
                  handleOpenModal,
                  handleDelete,
                  textValues,
                })}
            </Grid>
          </Stack>
        </StyledScrollContainer>
      </StyledGridContainer>

      {isModalOpen && (
        <ModalRules
          portalId="modal-portal"
          onCloseModal={handleCloseModal!}
          title={selectedDecision ? "Editar Decisión" : "Nueva decisión"}
        >
          <RulesForm
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

export { BusinessRules };
