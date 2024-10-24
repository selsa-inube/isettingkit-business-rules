import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { DecisionViewConditionRenderer } from "@isettingkit/view";
import { getValueData } from "./helper";
import { IRulesFormTextValues } from "../Form/types";

interface IBusinessRuleView {
  decision: IRuleDecision;
  textValues: IRulesFormTextValues;
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
          {decision.decision && (
            <Stack key={decision.decision.name} direction="column">
              <DecisionViewConditionRenderer
                element={decision.decision}
                valueData={getValueData(decision.decision)!}
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
          decision.conditions.map((condition) => (
            <Stack key={condition.name} direction="column">
              <DecisionViewConditionRenderer
                element={condition}
                valueData={getValueData(condition)}
              />
            </Stack>
          ))}
      </Stack>

      <Stack direction="column" gap="12px">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {textValues.terms}
        </Text>
        <Stack justifyContent="space-between">
          {decision?.decision?.startDate && (
            <DecisionViewConditionRenderer
              key="startDate"
              element={{
                name: "startDate",
                description: textValues.termStart,
                value: String(decision.startDate),
                howToSetUp: ValueHowToSetUp.EQUAL,
                typeData: ValueDataType.DATE,
              }}
              valueData={new Date(
                decision.decision.startDate,
              ).toLocaleDateString("en-CA")}
            />
          )}
          {decision?.decision?.endDate && (
            <DecisionViewConditionRenderer
              key="endDate"
              element={{
                name: "endDate",
                description: textValues.termEnd,
                value: String(decision.endDate),
                howToSetUp: ValueHowToSetUp.EQUAL,
                typeData: ValueDataType.DATE,
              }}
              valueData={new Date(decision.decision.endDate).toLocaleDateString(
                "en-CA",
              )}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export { BusinessRuleView };
export type { IBusinessRuleView };
