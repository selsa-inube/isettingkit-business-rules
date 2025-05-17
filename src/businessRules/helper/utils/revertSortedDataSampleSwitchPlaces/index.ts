import { IRevertSortedData } from "../../../types/helper/utils/IRevertSortedData";

const revertSortedDataSampleSwitchPlaces = (props: IRevertSortedData) => {
  console.log(props);
  const { dataDecision, originalDecision } = props;
  const conditionToRestore = {
    conditionName: dataDecision!.ruleName || "",
    labelName: dataDecision!.labelName || "",
    conditionDataType: dataDecision!.decisionDataType || "alphabetical",
    value: dataDecision!.value || "",
    howToSetTheCondition: dataDecision!.howToSetTheDecision || "EqualTo",
    switchPlaces: true,
    hidden: false,
  };

  return {
    ...originalDecision,
    conditionsThatEstablishesTheDecision:
      originalDecision!.conditionsThatEstablishesTheDecision!.map(
        (condition) =>
          condition.hidden ? { ...conditionToRestore } : condition,
      ),
  };
};

export { revertSortedDataSampleSwitchPlaces };
