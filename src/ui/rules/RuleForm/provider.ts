import { TRuleFormContext } from "../types/TRuleFormContext";

const RuleFormProvider = (props: TRuleFormContext & { children: React.ReactNode }) => {
  const { children, onChange, value } = props;
  return (
    <RuleFormContext.Provider value={{ onChange, value }}>
      {children}
    </RuleFormContext.Provider>
  );
};

export { RuleFormProvider };