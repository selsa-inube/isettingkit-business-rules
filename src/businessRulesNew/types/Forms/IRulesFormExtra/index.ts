import { IRuleDecision } from "@isettingkit/input";

interface IRulesFormExtra {
  onRemoveCondition?: (conditionName: string) => void;
  onRestoreConditions?: (conditionNames: string[]) => void;
  fullTemplate?: IRuleDecision;
  timeUnit?: string;
  withTerm?: boolean;
}

export type { IRulesFormExtra };
