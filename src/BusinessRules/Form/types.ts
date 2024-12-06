/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikValues } from "formik";
import { IRuleDecision, IValue } from "@isettingkit/input";

type FormikErrors = {
  value?: any;
};

type FormikTouched = {
  value?: any;
};

interface IOptionItemChecked {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface IRulesForm {
  decision: IRuleDecision;
  onCancel: () => void;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
  textValues: IRulesFormTextValues;
}

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
  checkClosed?: boolean;
  checkNone?: boolean;
  decision: IRuleDecision;
  formik: FormikValues;
  handleToggleChange: (conditionName: string, isChecked: boolean) => void;
  hasErrors: boolean;
  id: string;
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
  setCheckClosed: (value: boolean) => void;
  setCheckNone: (value: boolean) => void;
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
}

declare const inputTypes: readonly [
  "alphabetical",
  "currency",
  "date",
  "number",
  "percentage",
];

declare type ITextfieldInputType = (typeof inputTypes)[number];

export type {
  FormikErrors,
  FormikTouched,
  IRulesForm,
  IRulesFormTextValues,
  IRulesFormUI,
  ITextfieldInputType,
  IOptionItemChecked,
};
