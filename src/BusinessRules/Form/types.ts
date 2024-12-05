import { FormikValues } from "formik";
import { IRuleDecision, IValue } from "@isettingkit/input";

interface IRulesFormTextValues {
  cancel: string;
  change: string;
  changePlaceholder: string;
  confirm: string;
  criteria: string;
  factsThatConditionIt: string;
  none: string;
  rangeMax: (label: string) => string;
  rangeMin: (label: string) => string;
  reasonForChange: string;
  selectOption: string;
  selectOptions: string;
  termEnd: string;
  terms: string;
  termStart: string;
}

interface IRulesFormUI {
  activeConditions?: string[];
  checkNone?: boolean;
  checkClosed?: boolean;
  decision: IRuleDecision;
  id: string;
  formik: FormikValues;
  handleToggleChange: (conditionName: string, isChecked: boolean) => void;
  hasErrors: boolean;
  onCancel: () => void;
  onChangeCondition: (
    value: string | number | string[] | IValue | Date,
    nameCondition: string,
  ) => void;
  onChangeDecision: (
    value: string | number | string[] | IValue | Date,
    nameDecision: string,
  ) => void;
  onEndChange: (value: string) => void;
  onStartChange: (value: string) => void;
  onSubmit: () => void;
  textValues: {
    cancel: string;
    change: string;
    changePlaceholder: string;
    confirm: string;
    criteria: string;
    factsThatConditionIt: string;
    none: string;
    rangeMax: (label: string) => string;
    rangeMin: (label: string) => string;
    reasonForChange: string;
    selectOption: string;
    selectOptions: string;
    termEnd: string;
    terms: string;
    termStart: string;
  };
  setCheckNone: (value: boolean) => void;
  setCheckClosed: (value: boolean) => void;
}

declare const inputTypes: readonly [
  "alphabetical",
  "date",
  "currency",
  "number",
  "percentage",
];

declare type ITextfieldInputType = (typeof inputTypes)[number];

export type { IRulesFormTextValues, IRulesFormUI, ITextfieldInputType };
