import  {  useContext } from "react";
import { RuleFormContext } from "./RuleFormContext";

const useRuleFormContext = () => {
  const context = useContext(RuleFormContext);
  if (!context) throw new Error("RuleFormContext is missing");
  return context;
};

export { useRuleFormContext };