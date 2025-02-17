import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";
import { ModalRules } from "./ModalRules";
import { IRuleDecision } from "@isettingkit/input";
import { StyledGridContainer, StyledScrollContainer } from "./styles";
import { useMediaQuery } from "@inubekit/hooks";
import { IRulesFormTextValues } from "./Form/types";
import { RulesForm } from "./Form";
import { getBusinessRulesLayout } from "./helper/getBusinessRulesLayout";
import { renderCard } from "./helper/renderCard";

interface IBusinessRules {
  controls?: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  decisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  isModalOpen: boolean;
  selectedDecision: IRuleDecision | null;
  loading: boolean;
  handleOpenModal?: (decision?: IRuleDecision | null) => void;
  handleCloseModal?: () => void;
  handleSubmitForm?: (dataDecision: IRuleDecision) => void;
  handleDelete?: (id: string) => void;
}

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

  const smallScreen = useMediaQuery("(max-width: 681px)");

  const { renderedCards, shouldRenderAddCard } = getBusinessRulesLayout({
    controls,
    customTitleContentAddCard,
    decisions,
    loading,
    handleOpenModal,
    handleDelete,
    textValues,
  });

  return (
    <>
      <StyledGridContainer>
        <StyledScrollContainer>
          <Stack direction="column" gap="16px" padding="6px">
            {decisions.length === 0 && !loading && (
              <Text as="span" type="label" size="large" appearance="gray">
                {customMessageEmptyDecisions
                  ? customMessageEmptyDecisions
                  : "Aún NO tienes definidas tasas de interés efectivas"}
                . Presiona{" "}
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
                </Text>{" "}
                para empezar.
              </Text>
            )}
            <Grid
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              autoFlow="row dense"
              gap="24px"
              alignItems="start"
              justifyContent="center"
              autoRows="1fr"
              justifyItems="center"
              padding="6px"
              height={smallScreen ? "auto" : "484px"}
            >
              {renderedCards}
              {shouldRenderAddCard &&
                renderCard({
                  type: "add",
                  index: decisions.length,
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
export type { IBusinessRules };
