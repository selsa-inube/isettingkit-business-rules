import { IRevertSortedData } from "../../../../businessRules/types/helper/utils/IRevertSortedData";

const revertSortedDataSwitchPlaces = (props: IRevertSortedData) => {
  const { decisions } = props;

  return decisions?.map((decision) => {
    const hiddenCondition = decision.conditionsThatEstablishesTheDecision?.find(
      (condition) => condition.hidden,
    );

    if (hiddenCondition) {
      return {
        ...decision,
        ruleName: decision.ruleName,
        labelName: decision.labelName,
        decisionDataType: decision.decisionDataType,
        value: decision.value,
        howToSetTheDecision: decision.howToSetTheDecision,
        conditionsThatEstablishesTheDecision:
          decision.conditionsThatEstablishesTheDecision!.map((condition) =>
            condition.hidden
              ? { ...hiddenCondition, hidden: false }
              : condition,
          ),
      };
    }

    return decision;
  });
};

export { revertSortedDataSwitchPlaces };
