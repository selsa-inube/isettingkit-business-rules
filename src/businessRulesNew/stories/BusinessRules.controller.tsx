import { useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { BusinessRulesNew } from "..";
import { sortDisplayDataSwitchPlaces } from "../helper/utils/sortDisplayDataSwitchPlaces";
import { sortDisplayDataSampleSwitchPlaces } from "../helper/utils/sortDisplayDataSampleSwitchPlaces";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";
import { formatDecisionForBackend } from "../helper/utils/formatDecisionForBackend";
import { parseRangeFromString } from "../helper/utils/parseRangeFromString";

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
      ? {
          ...selectedDecision,
          ...dataDecision,
        }
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

    setDecisions((prevDecisions) =>
      isEditing
        ? prevDecisions.map((decision) =>
            decision.businessRuleId === selectedDecision!.businessRuleId
              ? newDecision
              : decision,
          )
        : [...prevDecisions, newDecision],
    );

    handleCloseModal();
  };

  useEffect(() => {}, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prevDecisions) =>
      prevDecisions.filter((decision) => decision.decisionId !== id),
    );
  };

  return (
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
  );
};

export { BusinessRulesNewController };
export type { IBusinessRulesNewController };
