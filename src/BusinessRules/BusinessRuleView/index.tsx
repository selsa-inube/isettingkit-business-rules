import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { DecisionViewConditionRenderer } from "@isettingkit/view";
import { getValueData } from "./helper";
import { IRulesFormTextValues } from "../Form/types";
import {
  IRuleDecision,
  IValue,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

interface IBusinessRuleView {
  decision: IRuleDecision;
  textValues: IRulesFormTextValues;
}

const BusinessRuleView = (props: IBusinessRuleView) => {
  const { decision, textValues } = props;

  const isNonEmptyObject = (obj: string[] | IValue) =>
    obj && Object.keys(obj).length > 0;

  const mapper = {
    name: decision.name,
    dataType: decision.dataType,
    value: decision.value as string | number | string[] | undefined,
    valueUse: decision.valueUse,
  };

  return (
    <Stack direction="column" gap="24px">
      <Stack direction="column" gap="16px">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {textValues.criteria}
        </Text>
        <Stack justifyContent="space-between">
          {decision && (
            <Stack key={decision.name} direction="column">
              <DecisionViewConditionRenderer
                element={mapper}
                valueData={getValueData(mapper)}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction="column" gap="16px" justifyContent="space-between">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {textValues.factsThatConditionIt}
        </Text>
        {decision.conditions &&
          decision.conditions.map((condition) => {
            const conditionValue = condition.value as
              | string
              | number
              | string[]
              | undefined;

            return (
              ((typeof conditionValue === "object" &&
                isNonEmptyObject(conditionValue)) ||
                conditionValue) && (
                <Stack key={condition.name} direction="column">
                  <DecisionViewConditionRenderer
                    element={{
                      ...condition,
                      value: conditionValue,
                    }}
                    valueData={getValueData(condition)}
                  />
                </Stack>
              )
            );
          })}
      </Stack>

      <Stack direction="column" gap="12px">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {textValues.terms}
        </Text>
        <Stack justifyContent="space-between">
          {decision?.startDate && (
            <DecisionViewConditionRenderer
              key="startDate"
              element={{
                name: "Fecha de inicio",
                value: String(decision.startDate),
                valueUse: ValueHowToSetUp.EQUAL,
                dataType: ValueDataType.DATE,
              }}
              valueData={new Date(decision.startDate).toLocaleDateString(
                "en-CA",
              )}
            />
          )}
          {decision?.endDate && (
            <DecisionViewConditionRenderer
              key="endDate"
              element={{
                name: "Fecha de final",
                value: String(decision.endDate),
                valueUse: ValueHowToSetUp.EQUAL,
                dataType: ValueDataType.DATE,
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
