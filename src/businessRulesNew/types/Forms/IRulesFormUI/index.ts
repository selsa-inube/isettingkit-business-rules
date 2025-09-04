/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRulesForm } from "../IRulesForm";

interface IRulesFormUI extends IRulesForm {
  formik: any;
  handleConditionToggleChange: (
    conditionName: string,
    isMulti: boolean,
  ) => (checked: boolean) => void;
  handleToggleNoneChange: (value: boolean) => void;
  normalizedDecision: any;
  onCancel: () => void;
  showConditionsError: boolean;
  termEndStatus?: "valid" | "invalid";
  termStartStatus?: "valid" | "invalid";
  textValues: IRulesForm["textValues"];
  visibleConditions: IRulesForm["decision"]["conditionsThatEstablishesTheDecision"];
}

export type { IRulesFormUI };
