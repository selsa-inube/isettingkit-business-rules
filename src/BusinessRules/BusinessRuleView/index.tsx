/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { DecisionViewConditionRenderer } from "@isettingkit/view";

import {
  ICondition,
  IDecision,
  IRuleDecision,
  IValue,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";
import { IRulesFormTextValues } from "../Form/types";
import { getValueData } from "./helper/getValueData";

interface IBusinessRuleView {
  decision?: IRuleDecision;
  loading?: boolean;
  textValues?: IRulesFormTextValues;
}

const BusinessRuleView = (props: IBusinessRuleView) => {
  const { decision, loading = false, textValues } = props;

  const isNonEmptyObject = (obj: string[] | IValue) =>
    obj && Object.keys(obj).length > 0;

  const mapper: IDecision | ICondition = {
    name: decision?.name || "",
    dataType: decision?.dataType || "alphabetical",
    value: getValueData(decision),
    valueUse: decision?.valueUse || "equal",
  };

  return !loading && decision && textValues ? (
    <Stack direction="column" gap="12px">
      {decision && (
        <Stack key={decision.name} direction="column" alignItems="center">
          <DecisionViewConditionRenderer
            element={mapper as any}
            valueData={getValueData(mapper)}
            type="decision"
          />
        </Stack>
      )}
      <Divider dashed />
      <StyledScrollContainer>
        <Stack
          direction="column"
          gap="12px"
          justifyContent="space-between"
          height="203px"
        >
          <Text
            type="label"
            size="large"
            appearance="dark"
            weight="bold"
            textAlign="center"
          >
            {textValues.factsThatConditionIt}
          </Text>
          {decision.conditions &&
            decision.conditions.map((condition) => {
              if (condition.hidden) return null;
              const conditionValue = condition.value as
                | string
                | number
                | string[]
                | undefined;
              return (
                ((typeof conditionValue === "object" &&
                  isNonEmptyObject(conditionValue)) ||
                  (conditionValue !== undefined &&
                    typeof conditionValue === "string" &&
                    conditionValue.length > 0)) && (
                  <StyledConditionContainer key={condition.name}>
                    <Stack direction="column" padding="8px">
                      <DecisionViewConditionRenderer
                        element={{
                          ...condition,
                          value: conditionValue,
                        }}
                        valueData={getValueData(condition)}
                      />
                    </Stack>
                  </StyledConditionContainer>
                )
              );
            })}
          <Divider dashed />
          <Stack direction="column" gap="12px">
            {decision?.startDate && decision?.endDate && (
              <DecisionViewConditionRenderer
                key={textValues.terms}
                element={{
                  name: textValues.terms,
                  value: String(decision.startDate),
                  valueUse: ValueHowToSetUp.RANGE,
                  dataType: ValueDataType.DATE,
                }}
                valueData={getValueData({
                  name: textValues.terms,
                  value: {
                    from: String(decision.startDate),
                    to: String(decision.endDate),
                  },
                  valueUse: ValueHowToSetUp.RANGE,
                  dataType: ValueDataType.DATE,
                })}
                type="decision"
              />
            )}
            {decision?.startDate && !decision?.endDate && (
              <DecisionViewConditionRenderer
                key={textValues.terms}
                element={{
                  name: textValues.terms,
                  value: String(decision.startDate),
                  valueUse: ValueHowToSetUp.EQUAL,
                  dataType: ValueDataType.DATE,
                }}
                valueData={getValueData({
                  name: textValues.terms,
                  value: String(decision.startDate),
                  valueUse: ValueHowToSetUp.EQUAL,
                  dataType: ValueDataType.DATE,
                })}
                type="decision"
              />
            )}
          </Stack>
        </Stack>
      </StyledScrollContainer>
    </Stack>
  ) : (
    <Stack direction="column" gap="12px">
      <Stack key="loading" direction="column" alignItems="center" gap="4px">
        <SkeletonLine animated width="180px" />
        <SkeletonLine animated width="85px" />
      </Stack>
      <Stack direction="column" gap="12px" alignItems="center">
        <Divider dashed />
        <SkeletonLine animated width="150px" />
      </Stack>

      <StyledScrollContainer>
        <Stack
          direction="column"
          gap="12px"
          justifyContent="space-between"
          height="203px"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <StyledConditionContainer key={`condition-${index}`}>
              <Stack
                direction="column"
                gap="12px"
                alignItems="start"
                padding="8px"
              >
                <SkeletonLine animated width="180px" />
                <SkeletonLine animated width="85px" />
              </Stack>
            </StyledConditionContainer>
          ))}
        </Stack>
      </StyledScrollContainer>
    </Stack>
  );
};

export { BusinessRuleView };
export type { IBusinessRuleView };
