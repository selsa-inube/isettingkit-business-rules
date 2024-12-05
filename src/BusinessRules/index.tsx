import { MdAdd } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { BusinessRuleCard } from "./Cards/BusinessRuleCard";
import { BusinessRuleView } from "./BusinessRuleView";
import { Text } from "@inubekit/text";
import { ModalRules } from "./ModalRules";
import { IRuleDecision } from "@isettingkit/input";
import {
  StyledEmptyCardContainer,
  StyledFadeInStack,
  StyledGridContainer,
  StyledScrollContainer,
} from "./styles";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { IRulesFormTextValues } from "./Form/types";
import { RulesForm } from "./Form";

interface IBusinessRules {
  controls?: boolean;
  decisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  isModalOpen: boolean;
  selectedDecision: IRuleDecision | null;
  loading: boolean;
  handleOpenModal: (decision?: IRuleDecision | null) => void;
  handleCloseModal: () => void;
  handleSubmitForm: (dataDecision: IRuleDecision) => void;
  handleDelete: (id: string) => void;
}

const BusinessRules = ({
  controls = true,
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
}: IBusinessRules) => {
  const smallScreen = useMediaQuery("(max-width: 681px)");
  return (
    <>
      <StyledGridContainer>
        <StyledScrollContainer>
          <Stack direction="column" gap="16px" padding="6px">
            {decisions.length === 0 && !loading && (
              <Text as="span" type="label" size="large" appearance="gray">
                Aún no tienes definidas tasas de interés efectivas. Presiona{" "}
                <Text
                  as="span"
                  type="label"
                  size="large"
                  appearance="gray"
                  weight="bold"
                >
                  “+ Agregar decisión”
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
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <BusinessRuleCard
                      key={`loading-card-${index}`}
                      id={`loading-card-${index}`}
                      handleDelete={() => {}}
                      handleView={() => handleOpenModal()}
                      controls={false}
                    >
                      <BusinessRuleView loading />
                    </BusinessRuleCard>
                  ))
                : decisions.map((decision) => (
                    <StyledFadeInStack key={decision.id}>
                      <Stack
                        key={decision.id}
                        direction="column"
                        gap="4px"
                        width="100%"
                        padding="0 0 12px 0"
                      >
                        <Text
                          type="title"
                          size="medium"
                          appearance="gray"
                          weight="bold"
                        >
                          {decision.id}
                        </Text>
                        <BusinessRuleCard
                          id={decision.id!}
                          handleDelete={() => handleDelete(decision.id!)}
                          handleView={() => handleOpenModal(decision)}
                          controls={controls}
                        >
                          <BusinessRuleView
                            decision={decision}
                            textValues={textValues}
                          />
                        </BusinessRuleCard>
                      </Stack>
                    </StyledFadeInStack>
                  ))}

              {(decisions.length === 0 ||
                decisions.length < Math.floor(window.innerWidth / 300)) &&
                !loading &&
                controls && (
                  <StyledFadeInStack key={`add-decision-${decisions.length}`}>
                    <Stack
                      key={`add-decision-${decisions.length}`}
                      direction="column"
                      gap="4px"
                      width="100%"
                      height="100%"
                    >
                      <Text
                        type="title"
                        size="medium"
                        appearance="gray"
                        weight="bold"
                      >
                        Nueva decisión
                      </Text>
                      <StyledEmptyCardContainer
                        onClick={() => handleOpenModal()}
                      >
                        <BusinessRuleCard
                          id={`add-decision-${decisions.length}`}
                          handleDelete={() => {}}
                          handleView={() => handleOpenModal()}
                          controls={false}
                        >
                          <Stack
                            direction="column"
                            gap="12px"
                            alignItems="center"
                          >
                            <Icon
                              appearance="gray"
                              icon={<MdAdd />}
                              size="35px"
                            />
                            <Text appearance="gray" type="body" size="large">
                              Agregar decisión
                            </Text>
                          </Stack>
                        </BusinessRuleCard>
                      </StyledEmptyCardContainer>
                    </Stack>
                  </StyledFadeInStack>
                )}
            </Grid>
          </Stack>
        </StyledScrollContainer>
      </StyledGridContainer>

      {isModalOpen && (
        <ModalRules
          portalId="modal-portal"
          onCloseModal={handleCloseModal}
          title={selectedDecision ? "Editar Decisión" : "Nueva decisión"}
        >
          {/* <RulesForm
            id={
              selectedDecision
                ? selectedDecision.id!
                : `Decisión ${decisions.length + 1}`
            }
            decision={selectedDecision || decisionTemplate}
            onCloseModal={handleCloseModal}
            onSubmitEvent={handleSubmitForm}
            textValues={textValues}
            onCancel={() => handleCloseModal()}
          /> */}
          <RulesForm
            decision={selectedDecision || decisionTemplate}
            onSubmitEvent={handleSubmitForm}
            textValues={textValues}
            onCancel={() => handleCloseModal()}
          />
        </ModalRules>
      )}
    </>
  );
};

export { BusinessRules };
export type { IBusinessRules };
