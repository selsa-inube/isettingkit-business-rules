/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITab } from "@inubekit/inubekit";
import { IRulesForm } from "../IRulesForm";

interface IRulesFormUI extends IRulesForm {
  activeTab?: string;
  conditionsErrorText?: string;
  currentConditions?: any[];
  onTabChange?: (_tab: string) => void;
  tabs?: ITab[];
  onClearCondition: (conditionName: string) => void;
  onEndBlur?: () => void;
  onRedefineCurrentTab?: () => void;
  onStartBlur?: () => void;
  formik: any;
  handleConditionToggleChange?: (
    conditionName: string,
    isMulti: boolean,
  ) => (checked: boolean) => void;
  handleToggleNoneChange?: (value: boolean) => void;
  normalizedDecision: any;
  onCancel: () => void;
  showConditionsError: boolean;
  termEndStatus?: "valid" | "invalid";
  termStartStatus?: "valid" | "invalid";
  textValues: IRulesForm["textValues"];
  visibleConditions: IRulesForm["decision"]["conditionsThatEstablishesTheDecision"];
  visibleConditionsByGroup?: { [group: string]: any[] };
  portalId?: string;
  showRedefineConfirm?: boolean;
  onOpenRedefineConfirm?: () => void;
  onCloseRedefineConfirm?: () => void;
  onConfirmRedefine?: () => void;
}

export type { IRulesFormUI };
