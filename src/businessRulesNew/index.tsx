import { Grid, Text, Stack, Fieldset, Icon } from "@inubekit/inubekit";

import { StyledGridContainer, StyledScrollContainer } from "./styles";
import { getBusinessRulesLayoutNew } from "./helper/getBusinessRulesLayout";
import { renderCardNew } from "./helper/renderCard";
import { IBusinessRules } from "./types/IBusinessRules";
import { MdOutlineInfo } from "react-icons/md";
import { useState } from "react";
import { ModalRulesNew } from "./ModalRules";
import { RulesForm } from "./Form";

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
    baseDecisionTemplate,
    shouldRenderEmptyMessage = true,
    withEditOption,
    withTerm,
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

  const shouldRenderAddCardEmpty = decisions?.length === 0 && !loading;

  return (
    <>
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
                <Grid
                  templateColumns="1fr"
                  autoFlow="row dense"
                  gap="16px"
                  alignItems="start"
                  justifyContent="center"
                  autoRows="auto"
                  justifyItems="center"
                  padding="6px"
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
              ))}
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
            fullTemplate={baseDecisionTemplate ?? decisionTemplate}
            onSubmitEvent={handleSubmitForm!}
            textValues={textValues}
            onCancel={() => (handleCloseModal ? handleCloseModal() : () => {})}
            onRemoveCondition={onRemoveCondition}
            onRestoreConditions={onRestoreConditions}
            withTerm={withTerm}
          />
        </ModalRulesNew>
      )}
    </>
  );
};

export { BusinessRulesNew };
