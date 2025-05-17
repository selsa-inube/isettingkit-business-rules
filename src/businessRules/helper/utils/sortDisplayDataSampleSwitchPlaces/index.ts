import { IRevertSortedData } from "../../../../businessRules/types/helper/utils/IRevertSortedData";

const sortDisplayDataSampleSwitchPlaces = (props: IRevertSortedData) => {
  const { decisionTemplate } = props;
  const data = { ...decisionTemplate };
  const conditionToDisplay = data.conditionsThatEstablishesTheDecision?.find(
    (condition) => condition.switchPlaces,
  );

  if (conditionToDisplay) {
    return {
      ...data,
      ruleName: conditionToDisplay.conditionName,
      labelName: conditionToDisplay.labelName,
      decisionDataType: conditionToDisplay.conditionDataType,
      value: conditionToDisplay.value,
      howToSetTheDecision: conditionToDisplay.howToSetTheCondition,
      conditionsThatEstablishesTheDecision:
        data.conditionsThatEstablishesTheDecision!.map((condition) =>
          condition.conditionName === conditionToDisplay.conditionName
            ? { ...condition, hidden: true }
            : condition,
        ),
    };
  }

  return data;
};

export { sortDisplayDataSampleSwitchPlaces };
