/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { DecisionViewConditionRenderer } from "@isettingkit/view";

interface IBusinessRuleView {
  decision: IRuleDecision;
  textValues: {
    selectOptions: string;
    selectOption: string;
    rangeMin: (label: string) => string;
    rangeMax: (label: string) => string;
    reasonForChange: string;
    change: string;
    changePlaceholder: string;
    termStart: string;
    termEnd: string;
    cancel: string;
    confirm: string;
    none: string;
    FactsThatConditionIt: string;
    criteria: string;
    Terms: string;
  };
}

const BusinessRuleView = (props: IBusinessRuleView) => {
  const { decision, textValues } = props;

  return (
    <Stack direction="column" gap="24px">
      <Stack direction="column" gap="16px">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {textValues.criteria}
        </Text>
        <Stack justifyContent="space-between">
          {decision.decisions &&
            decision.decisions.map((item: any) => (
              <DecisionViewConditionRenderer
                key={item.name}
                element={item}
                valueData={item.value}
              />
            ))}
        </Stack>
      </Stack>
      <Stack direction="column">
        <Stack direction="column" gap="16px" justifyContent="space-between">
          <Text type="title" size="medium" appearance="gray" weight="bold">
            {textValues.FactsThatConditionIt}
          </Text>
          {decision.conditions &&
            decision.conditions.map((condition: any) => (
              <Stack key={condition.name} direction="column">
                <DecisionViewConditionRenderer
                  element={condition}
                  valueData={condition.value}
                />
              </Stack>
            ))}
        </Stack>
      </Stack>
      <Stack direction="column" gap="12px">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {textValues.Terms}
        </Text>
        <Stack justifyContent="space-between">
          {decision.startDate && (
            <DecisionViewConditionRenderer
              key="startDate"
              element={{
                name: "startDate",
                label: textValues.termStart,
                description: textValues.termStart,
                value: String(decision.startDate),
                howToSetUp: ValueHowToSetUp.EQUAL,
                typeData: ValueDataType.DATE,
              }}
              valueData={new Date(decision.startDate).toLocaleDateString(
                "en-CA",
              )}
            />
          )}
          {decision.endDate && (
            <DecisionViewConditionRenderer
              key="endDate"
              element={{
                name: "endDate",
                label: textValues.termEnd,
                description: textValues.termEnd,
                value: String(decision.endDate),
                howToSetUp: ValueHowToSetUp.EQUAL,
                typeData: ValueDataType.DATE,
              }}
              valueData={new Date(decision.endDate).toLocaleDateString("en-CA")}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export { BusinessRuleView };
export type { IBusinessRuleView };
