/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRevertSortedData } from "../../../../businessRules/types/helper/utils/IRevertSortedData";

type TCond = any;
type TGroupMap = Record<string, TCond[]>;

const GROUP_PRIMARY = "group-primary";

const toGrouped = (src: unknown): TGroupMap => {
  if (Array.isArray(src)) {
    return { [GROUP_PRIMARY]: src as TCond[] };
  }
  if (src && typeof src === "object") {
    const obj = src as Record<string, unknown>;
    const out: TGroupMap = {};
    for (const [k, v] of Object.entries(obj)) {
      if (Array.isArray(v)) out[k] = v as TCond[];
    }
    return out;
  }
  return {};
};

const fromGrouped = (
  grouped: TGroupMap,
  original: unknown,
): TCond[] | TGroupMap => {
  return Array.isArray(original) ? (grouped[GROUP_PRIMARY] ?? []) : grouped;
};

const sortDisplayDataSwitchPlaces = (props: IRevertSortedData) => {
  const { decisions } = props;

  return decisions?.map((decision: any) => {
    const original = decision?.conditionsThatEstablishesTheDecision;
    const grouped = toGrouped(original);

    const allConditions: TCond[] = ([] as TCond[]).concat(
      ...Object.values(grouped),
    );

    const switchCond = allConditions.find((c) => c?.switchPlaces);

    if (!switchCond) {
      return decision;
    }

    const updatedGrouped: TGroupMap = Object.fromEntries(
      Object.entries(grouped).map(([gk, arr]) => [
        gk,
        arr.map((c) =>
          c?.conditionName === switchCond.conditionName
            ? { ...c, hidden: true }
            : c,
        ),
      ]),
    );

    return {
      ...decision,
      ruleName: switchCond.conditionName,
      labelName: switchCond.labelName,
      decisionDataType: switchCond.conditionDataType,
      value: switchCond.value,
      howToSetTheDecision: switchCond.howToSetTheCondition,
      conditionsThatEstablishesTheDecision: fromGrouped(
        updatedGrouped,
        original,
      ),
    };
  });
};

export { sortDisplayDataSwitchPlaces };
