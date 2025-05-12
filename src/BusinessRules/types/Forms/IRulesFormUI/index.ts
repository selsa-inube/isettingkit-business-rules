/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRulesForm } from "../IRulesForm";

interface IRulesFormUI extends IRulesForm {
  formik: any;
  visibleConditions: IRulesForm["decision"]["conditionsThatEstablishesTheDecision"];
  normalizedDecision: any;
  handleToggleNoneChange: (value: boolean) => void;
  handleConditionToggleChange: (
    conditionName: string,
    isMulti: boolean,
  ) => (checked: boolean) => void;
  showConditionsError: boolean;
  onCancel: () => void;
  termStartStatus?: "valid" | "invalid";
  termEndStatus?: "valid" | "invalid";
  textValues: IRulesForm["textValues"];
}

export type { IRulesFormUI };
