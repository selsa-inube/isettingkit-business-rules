import { useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { BusinessRules } from "..";
import { IRulesFormTextValues } from "../Form/types";

interface IBusinessRulesController {
  initialDecisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  loading?: boolean;
}

const BusinessRulesController = ({
  initialDecisions,
  textValues,
  decisionTemplate,
  loading = false,
}: IBusinessRulesController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<IRuleDecision[]>(initialDecisions);
  // const [loading] = useState<boolean>(false);

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
          id: `Decisión ${decisions.length + 1}`,
          conditions: decisionTemplate.conditions!.map(
            (conditionTemplate, index) => ({
              ...conditionTemplate,
              value:
                dataDecision.conditions![index]?.value ||
                conditionTemplate.value,
            }),
          ),
        };

    setDecisions((prevDecisions) =>
      isEditing
        ? prevDecisions.map((decision) =>
            decision.id === selectedDecision!.id ? newDecision : decision,
          )
        : [...prevDecisions, newDecision],
    );

    handleCloseModal();
  };

  useEffect(() => {
    console.log("Updated decisions:", JSON.stringify(decisions, null, 2));
  }, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prevDecisions) =>
      prevDecisions.filter((decision) => decision.id !== id),
    );
  };

  return (
    <BusinessRules
      decisions={decisions}
      textValues={textValues}
      decisionTemplate={decisionTemplate}
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
