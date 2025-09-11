import { Grid, Text, useMediaQuery, Stack, Button } from "@inubekit/inubekit";

import { StyledGridContainer, StyledScrollContainer } from "./styles";
import { getBusinessRulesLayoutNew } from "./helper/getBusinessRulesLayout";
import { renderCardNew } from "./helper/renderCard";
import { IBusinessRules } from "./types/IBusinessRules";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { ModalRulesNew } from "./ModalRules";
import { RulesForm } from "./Form";

const BusinessRulesNew = (props: IBusinessRules) => {
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const mediumScreen = useMediaQuery("(max-width: 681px)");

  const { renderedCards, shouldRenderAddCard } = getBusinessRulesLayoutNew({
    controls,
    customTitleContentAddCard,
    decisions,
    loading,
    handleOpenModal,
    handleDelete,
    textValues,
    isOpenFor: (i: number) => openIndex === i,
    toggleAt: (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
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
                templateColumns="1fr"
                autoFlow="row dense"
                gap="16px"
                alignItems="start"
                justifyContent="center"
                autoRows="auto"
                justifyItems="center"
                padding="6px"
                height={mediumScreen ? "auto" : "484px"}
              >
                {renderedCards}
                {shouldRenderAddCard &&
                  renderCardNew({
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
        <ModalRulesNew
          portalId="modal-portal"
          onCloseModal={handleCloseModal!}
          title={selectedDecision ? "Editar Decisión" : "Configurar Decisión"}
          description="Diligencia los campos para configurar tu decisión."
        >
          <RulesForm
            decision={selectedDecision ? selectedDecision : decisionTemplate}
            onSubmitEvent={handleSubmitForm!}
            textValues={textValues}
            onCancel={() => (handleCloseModal ? handleCloseModal() : () => {})}
          />
        </ModalRulesNew>
      )}
    </>
  );
};

export { BusinessRulesNew };
