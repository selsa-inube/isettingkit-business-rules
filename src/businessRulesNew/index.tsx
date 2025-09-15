import {
  Grid,
  Text,
  useMediaQuery,
  Stack,
  Fieldset,
  Icon,
} from "@inubekit/inubekit";

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

  return (
    <>
      <StyledGridContainer>
        <StyledScrollContainer>
          <Stack direction="column" gap="16px" padding="6px">
            {shouldRenderEmptyMessage ? (
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
                        <Text
                          as="span"
                          size="medium"
                          appearance="gray"
                          weight="bold"
                        >
                          {customTitleContentAddCard
                            ? customTitleContentAddCard
                            : ` "Agregar decisión"`}
                        </Text>
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
