import { useEffect, useMemo, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { BusinessRulesNew } from "..";
import { sortDisplayDataSwitchPlaces } from "../helper/utils/sortDisplayDataSwitchPlaces";
import { sortDisplayDataSampleSwitchPlaces } from "../helper/utils/sortDisplayDataSampleSwitchPlaces";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";
import { formatDecisionForBackend } from "../helper/utils/formatDecisionForBackend";
import { parseRangeFromString } from "../helper/utils/parseRangeFromString";
import { Button, Fieldset, Stack } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";
import { MultipleChoices } from "@isettingkit/input";
import type { IOption } from "@inubekit/inubekit";
import { StyledMultipleChoiceContainer } from "./styles";

interface IBusinessRulesNewController {
  controls?: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  initialDecisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  loading?: boolean;
  terms?: boolean;
}

const BusinessRulesNewController = ({
  controls,
  customMessageEmptyDecisions,
  customTitleContentAddCard,
  initialDecisions,
  textValues,
  decisionTemplate,
  loading = false,
}: IBusinessRulesNewController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<IRuleDecision[]>(
    initialDecisions.map((decision) => ({
      ...decision,
      value: parseRangeFromString(decision.value),
      conditionsThatEstablishesTheDecision:
        decision.conditionsThatEstablishesTheDecision?.map((condition) => ({
          ...condition,
          value: parseRangeFromString(condition.value),
        })),
    })),
  );

  const multipleChoicesOptions: IOption[] = useMemo(() => {
    const list =
      decisionTemplate.conditionsThatEstablishesTheDecision ?? [];
    return list.map((c) => ({
      id: c.conditionName,
      label: c.labelName,
      value: c.conditionName,
    }));
  }, [decisionTemplate]);

  const [selectedConditionsCSV, setSelectedConditionsCSV] = useState<string>("");

  const handleMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditionsCSV(valueCSV);

    const ids = valueCSV.split(",").filter(Boolean);
    const selected = multipleChoicesOptions.filter((o) => ids.includes(o.id));
    console.log("Selected conditions:", selected);
  };

  const handleOpenModal = (decision: IRuleDecision | null = null) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const handleSubmitForm = (dataDecision: IRuleDecision) => {
    const isEditing = selectedDecision !== null;

    const newDecision = isEditing
      ? { ...selectedDecision, ...dataDecision }
      : {
        ...decisionTemplate,
        ...dataDecision,
        decisionId: `Decisión ${decisions.length + 1}`,
        conditions:
          decisionTemplate.conditionsThatEstablishesTheDecision?.map(
            (conditionTemplate, index) => ({
              ...conditionTemplate,
              value:
                dataDecision.conditionsThatEstablishesTheDecision?.[index]
                  ?.value ?? conditionTemplate.value,
            }),
          ) ?? [],
      };

    const backendFormattedDecision = formatDecisionForBackend({
      decision: newDecision,
      template: decisionTemplate,
      fallbackId: newDecision.decisionId!,
    });

    console.log("Formatted for backend:", backendFormattedDecision);

    setDecisions((prev) =>
      isEditing
        ? prev.map((d) =>
          d.businessRuleId === selectedDecision!.businessRuleId
            ? newDecision
            : d,
        )
        : [...prev, newDecision],
    );

    handleCloseModal();
  };

  useEffect(() => { }, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  return (
    <Stack direction="column" gap="24px">
      {decisions.length === 0 && (
        <>
          <Fieldset legend="Condiciones que determinan las decisiones">
            <StyledMultipleChoiceContainer>
              <MultipleChoices
                id="conditionsPicker"
                labelSelect=""
                labelSelected=""
                options={multipleChoicesOptions}
                placeholderSelect="Seleccione una o varias condiciones"
                required={false}
                values={selectedConditionsCSV}
                onChange={handleMultipleChoicesChange}
                size="wide"
              />
            </StyledMultipleChoiceContainer>
          </Fieldset>
          <Stack justifyContent="flex-end">
            <Button iconBefore={<MdAdd />} onClick={() => handleOpenModal()}>
              Agregar plazo
            </Button>
          </Stack>
        </>
      )}
      <BusinessRulesNew
        controls={controls}
        customTitleContentAddCard={customTitleContentAddCard}
        customMessageEmptyDecisions={customMessageEmptyDecisions}
        decisions={sortDisplayDataSwitchPlaces({ decisions })}
        textValues={textValues}
        decisionTemplate={sortDisplayDataSampleSwitchPlaces({ decisionTemplate })}
        isModalOpen={isModalOpen}
        selectedDecision={selectedDecision}
        loading={loading}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleSubmitForm={handleSubmitForm}
        handleDelete={handleDelete}
      />
    </Stack>
  );
};

export { BusinessRulesNewController };
export type { IBusinessRulesNewController };
