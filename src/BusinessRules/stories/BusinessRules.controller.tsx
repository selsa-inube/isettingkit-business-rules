import { useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { BusinessRules } from "..";
import { sortDisplayDataSwitchPlaces } from "../helper/utils/sortDisplayDataSwitchPlaces";
import { sortDisplayDataSampleSwitchPlaces } from "../helper/utils/sortDisplayDataSampleSwitchPlaces";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";

interface IBusinessRulesController {
  controls?: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  initialDecisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  loading?: boolean;
}

const BusinessRulesController = ({
  controls,
  customMessageEmptyDecisions,
  customTitleContentAddCard,
  initialDecisions,
  textValues,
  decisionTemplate,
  loading = false,
}: IBusinessRulesController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<IRuleDecision[]>(initialDecisions);

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
            decisionTemplate.conditionsThatEstablishesTheDecision!.map(
              (conditionTemplate, index) => ({
                ...conditionTemplate,
                value:
                  dataDecision.conditionsThatEstablishesTheDecision![index]
                    ?.value || conditionTemplate.value,
              }),
            ),
        };

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

  useEffect(() => {
    // console.log("Updated decisions:", JSON.stringify(decisions, null, 2));
  }, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prevDecisions) =>
      prevDecisions.filter((decision) => decision.decisionId !== id),
    );
  };

  return (
    <BusinessRules
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

export { BusinessRulesController };
export type { IBusinessRulesController };
