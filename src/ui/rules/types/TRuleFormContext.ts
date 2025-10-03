import { IRule } from "@core/rule-engine/types/IRule";

type TRuleFormContext = {
  onChange: (next: IRule) => void;
  value: IRule;
};

export type { TRuleFormContext };