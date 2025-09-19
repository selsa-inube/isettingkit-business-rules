import { IRevertSortedData } from "../../../../businessRules/types/helper/utils/IRevertSortedData";

// Narrow helpers
type Condition = {
  conditionName: string;
  labelName: string;
  conditionDataType: any; // replace with your enum/type
  value: any;
  howToSetTheCondition: any; // replace with your enum/type
  hidden?: boolean;
  switchPlaces?: boolean;
};

type Grouped = Record<string, Condition[]>;

const isGrouped = (v: unknown): v is Grouped =>
  !!v && !Array.isArray(v) && typeof v === "object";

const sortDisplayDataSampleSwitchPlaces = (props: IRevertSortedData) => {
  const { decisionTemplate } = props;
  const data = { ...decisionTemplate };
  const source = data.conditionsThatEstablishesTheDecision as
    | Condition[]
    | Grouped
    | undefined;

  if (!source) return data;

  // 1) Find the first condition with switchPlaces
  let chosen: Condition | undefined;
  let chosenGroupKey: string | undefined;

  if (Array.isArray(source)) {
    chosen = source.find((c) => c.switchPlaces);
  } else if (isGrouped(source)) {
    for (const [gk, arr] of Object.entries(source)) {
      const hit = arr.find((c) => c.switchPlaces);
      if (hit) {
        chosen = hit;
        chosenGroupKey = gk;
        break;
      }
    }
  }

  if (!chosen) return data;

  // 2) Hide the chosen condition in its collection
  let nextConditions: typeof source;

  if (Array.isArray(source)) {
    nextConditions = source.map((c) =>
      c.conditionName === chosen!.conditionName ? { ...c, hidden: true } : c
    );
  } else {
    nextConditions = Object.fromEntries(
      Object.entries(source).map(([gk, arr]) => [
        gk,
        arr.map((c) =>
          gk === chosenGroupKey && c.conditionName === chosen!.conditionName
            ? { ...c, hidden: true }
            : c
        ),
      ])
    );
  }

  // 3) Promote chosen condition fields to decision-level
  return {
    ...data,
    ruleName: chosen.conditionName,
    labelName: chosen.labelName,
    decisionDataType: chosen.conditionDataType,
    value: chosen.value,
    howToSetTheDecision: chosen.howToSetTheCondition,
    conditionsThatEstablishesTheDecision: nextConditions as any,
  };
};

export { sortDisplayDataSampleSwitchPlaces };
