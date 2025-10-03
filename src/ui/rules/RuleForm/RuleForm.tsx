import { IRule } from "@src/core/rule-engine/types/IRule";
import { useRuleFormContext } from "./context";
import { RuleFormProvider } from "./provider";
import { editorFactory } from "@src/registry/EditorFactory";


type TRuleFormProps = {
  onChange: (next: IRule) => void;
  value: IRule;
};

function Header() {
  const { value } = useRuleFormContext();
  return <div style={{ padding: 8, fontWeight: 600 }}>Rule: {value.id}</div>;
}

function ConditionList() {
  const { onChange, value } = useRuleFormContext();

  const handleChange = (index: number, nextValue: unknown) => {
    const next = { ...value };
    next.conditions = value.conditions.map((c, i) => i === index ? { ...c, value: nextValue } : c);
    onChange(next);
  };

  return (
    <ul style={{ padding: 8 }}>
      {value.conditions.map((condition, index) => {
        const Editor = editorFactory.resolve<any>(condition.operator);
        if (!Editor) return <li key={index}>No editor for op "{condition.operator}"</li>;
        return (
          <li key={index} style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 12 }}>{condition.field}</label>
            <Editor value={condition.value} onChange={(nv) => handleChange(index, nv)} />
          </li>
        );
      })}
    </ul>
  );
}

function Actions() {
  return (
    <div style={{ display: "flex", gap: 8, padding: 8, justifyContent: "flex-end" }}>
      <button type="button">Undo</button>
      <button type="button">Redo</button>
      <button type="button">Save</button>
    </div>
  );
}

export function RuleForm(props: TRuleFormProps) {
  const { onChange, value } = props;
  return (
    <RuleFormProvider onChange={onChange} value={value}>
      <div data-testid="rule-form" style={{ border: "1px solid #eee", borderRadius: 8 }}>
        <RuleForm.Header />
        <RuleForm.ConditionList />
        <RuleForm.Actions />
      </div>
    </RuleFormProvider>
  );
}

RuleForm.Header = Header;
RuleForm.ConditionList = ConditionList;
RuleForm.Actions = Actions;
