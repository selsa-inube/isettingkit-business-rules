import { createContext } from "react";
import type { TRuleFormContext } from "../types/TRuleFormContext";

const RuleFormContext = createContext<TRuleFormContext | null>(null);
RuleFormContext.displayName = "RuleFormContext";

export { RuleFormContext };