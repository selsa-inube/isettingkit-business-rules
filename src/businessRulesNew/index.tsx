import { Grid, Text, Stack, Fieldset, Icon, Button } from "@inubekit/inubekit";

import { StyledGridContainer, StyledScrollContainer } from "./styles";
import { getBusinessRulesLayoutNew } from "./helper/getBusinessRulesLayout";
import { renderCardNew } from "./helper/renderCard";
import { IBusinessRules } from "./types/IBusinessRules";
import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { useState } from "react";
import { ModalRulesNew } from "./ModalRules";
import { RulesForm } from "./Form";
import { ModalConfigurateDecision } from "./ModalConfigurateDecision";

const BusinessRulesNew = (props: IBusinessRules) => {
  const {
    cardTitle = true,
    controls = true,
    customTitleContentAddCard,
    customMessageEmptyDecisions,
    decisions,
    textValues,
    decisionTemplate,
    editionMode,
    isModalOpen,
    selectedDecision,
    loading,
    handleOpenModal,
    handleCloseModal,

    handleSubmitForm,
    handleDelete,
    terms = true,
    onRemoveCondition,
    onRestoreConditions,
    handleOpenRulesModal,
    baseDecisionTemplate,
    shouldRenderEmptyMessage = true,
    withEditOption,
    withTerm,
    configurateDecisionOptions,
    configureDecisionModal,
    handleCloseConfigurationModal,
  } = props;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { renderedCards, shouldRenderAddCard } = getBusinessRulesLayoutNew({
    cardTitle,
    controls,
    customTitleContentAddCard,
    decisions,
    loading,
    handleOpenModal,
    handleDelete,
    textValues,
    isOpenFor: (i: number) => openIndex === i,
    toggleAt: (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
    editionMode,
    withEditOption,
  });
  const decisionNumber = (decisions?.length || 0) + 1;
  const shouldRenderAddCardEmpty = decisions?.length === 0 && !loading;

  return (
    <>
      <Stack justifyContent="space-between" padding="6px">
        <Text type="title" weight="bold" size="medium" appearance="gray">
          Consulta de las decisiones definidas
        </Text>
        <Button
          appearance="primary"
          cursorHover
          iconBefore={<MdAdd />}
          onClick={() => handleOpenModal()}
        >
          Agregar plazo
        </Button>
      </Stack>
      <StyledGridContainer>
        <StyledScrollContainer>
          <Stack direction="column" gap="16px" padding="6px">
            {shouldRenderEmptyMessage &&
              (shouldRenderAddCardEmpty ? (
                <Fieldset legend="Decisiones">
                  <Stack
                    direction="column"
                    gap="16px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      appearance="help"
                      icon={<MdOutlineInfo />}
                      size="40px"
                    />
                    <Text
                      type="title"
                      size="medium"
                      weight="bold"
                      appearance="dark"
                    >
                      Sin decisiones
                    </Text>
                    <Text as="span" size="medium" appearance="gray">
                      {customMessageEmptyDecisions ? (
                        customMessageEmptyDecisions
                      ) : (
                        <>
                          Aun no tienes decisiones definidas, para empezar haz
                          clic en
                          {customTitleContentAddCard
                            ? customTitleContentAddCard
                            : ` "Agregar decisión"`}
                        </>
                      )}
                    </Text>
                  </Stack>
                </Fieldset>
              ) : (
                <Fieldset legend={"Decisiones"} spacing="compact">
                  <Grid
                    templateColumns="1fr"
                    autoFlow="row dense"
                    gap="16px"
                    alignItems="start"
                    justifyContent="center"
                    autoRows="auto"
                    justifyItems="center"
                    width="100%"
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
                        editionMode,
                      })}
                  </Grid>
                </Fieldset>
              ))}
          </Stack>
        </StyledScrollContainer>
      </StyledGridContainer>
      {configureDecisionModal && (
        <ModalConfigurateDecision
          options={configurateDecisionOptions}
          onCloseModal={handleCloseConfigurationModal!}
          portalId={"modal-portal"}
          onOpenRulesModal={handleOpenRulesModal}
        ></ModalConfigurateDecision>
      )}

      {isModalOpen && (
        <ModalRulesNew
          portalId="modal-portal"
          onCloseModal={handleCloseModal!}
          title={selectedDecision ? "Editar Decisión" : "Configurar Decisión"}
          description="Diligencia los campos para configurar tu decisión."
        >
          <RulesForm
            decision={selectedDecision ? selectedDecision : decisionTemplate}
            fullTemplate={baseDecisionTemplate ?? decisionTemplate}
            onSubmitEvent={handleSubmitForm!}
            textValues={textValues}
            onCancel={() => (handleCloseModal ? handleCloseModal() : () => {})}
            onRemoveCondition={onRemoveCondition}
            onRestoreConditions={onRestoreConditions}
            withTerm={withTerm}
            decisionNumber={decisionNumber}
          />
        </ModalRulesNew>
      )}
    </>
  );
};

export { BusinessRulesNew };
