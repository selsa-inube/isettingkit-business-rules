import { IRevertSortedData } from "src/BusinessRules/types/helper/utils/IRevertSortedData";

const sortDisplayDataSwitchPlaces = (props: IRevertSortedData) => {
  const { decisions } = props;

  return decisions?.map((decision) => {
    const conditionToDisplay =
      decision.conditionsThatEstablishesTheDecision?.find(
        (condition) => condition.switchPlaces,
      );

    if (conditionToDisplay) {
      return {
        ...decision,
        ruleName: conditionToDisplay.conditionName,
        labelName: conditionToDisplay.labelName,
        decisionDataType: conditionToDisplay.conditionDataType,
        value: conditionToDisplay.value,
        howToSetTheDecision: conditionToDisplay.howToSetTheCondition,
        conditionsThatEstablishesTheDecision:
          decision.conditionsThatEstablishesTheDecision!.map((condition) =>
            condition.conditionName === conditionToDisplay.conditionName
              ? { ...condition, hidden: true }
              : condition,
          ),
      };
    }

    return decision;
  });
};

export { sortDisplayDataSwitchPlaces };
