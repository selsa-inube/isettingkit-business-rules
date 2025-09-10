import {
  Divider,
  Stack,
  SkeletonLine,
  Text,
  Tag,
  Icon,
  SkeletonIcon,
} from "@inubekit/inubekit";
import {
  DecisionViewConditionRendererNew,
  IDecisionViewConditionRenderer,
} from "@isettingkit/view";
import { IBusinessRuleViewUI } from "../types/BusinessRuleView/IBusinessRuleViewUI";
import { strategyFactoryHandlerManager } from "./helper";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { BorderStack } from "../../filter/BorderStack";

const BusinessRuleViewUI = (props: IBusinessRuleViewUI) => {
  const {
    conditionsAlignment,
    decision,
    decisionMapper,
    loading,
    textValues,
    visibleConditions,
    tagLabel,
    isOpen,
    onToggle,
    hasEffectiveFrom,
    hasValidUntil,
    effectiveFromRenderer,
    validUntilRenderer,
  } = props;
  if (loading) {
    return (
      <Stack direction="column" gap="16px">
        <Stack
          key={decision!.ruleName}
          alignItems="start"
          justifyContent="space-between"
        >
          <DecisionViewConditionRendererNew
            element={decisionMapper!}
            valueData={
              strategyFactoryHandlerManager(
                decisionMapper!,
              ) as IDecisionViewConditionRenderer["valueData"]
            }
            type="decision"
          />
          <Stack gap="8px">
            <Tag appearance="gray" label={tagLabel} displayIcon={false} />
            <Icon
              appearance="dark"
              icon={isOpen ? <MdExpandLess /> : <MdExpandMore />}
              onClick={onToggle}
              size="24px"
              cursorHover
            />
          </Stack>
        </Stack>
        {isOpen && (
          <>
            <Divider dashed />
            <Stack direction="column" gap="12px">
              <Text
                type="label"
                size="large"
                appearance="dark"
                weight="bold"
                textAlign="start"
                padding="0 12px"
              >
                {textValues!.factsThatConditionIt}
              </Text>
              <Stack
                direction="column"
                gap="8px"
                justifyContent={conditionsAlignment}
              >
                {visibleConditions!.map((condition) => (
                  <BorderStack
                    key={condition.conditionName}
                    direction="column"
                    padding="6px 12px"
                    borderRadius="8px"
                    background
                  >
                    <DecisionViewConditionRendererNew
                      element={{ ...condition, value: condition.value }}
                      valueData={
                        strategyFactoryHandlerManager(
                          condition,
                        ) as IDecisionViewConditionRenderer["valueData"]
                      }
                    />
                  </BorderStack>
                ))}
                {hasEffectiveFrom && effectiveFromRenderer && (
                  <BorderStack
                    direction="column"
                    padding="6px 12px"
                    borderRadius="8px"
                    background
                  >
                    <DecisionViewConditionRendererNew
                      key="effectiveFrom"
                      element={effectiveFromRenderer.element}
                      valueData={
                        effectiveFromRenderer.valueData as IDecisionViewConditionRenderer["valueData"]
                      }
                    />
                  </BorderStack>
                )}

                {hasValidUntil && validUntilRenderer && (
                  <BorderStack
                    direction="column"
                    padding="6px 12px"
                    borderRadius="8px"
                    background
                  >
                    <DecisionViewConditionRendererNew
                      key="validUntil"
                      element={validUntilRenderer.element}
                      valueData={
                        validUntilRenderer.valueData as IDecisionViewConditionRenderer["valueData"]
                      }
                    />
                  </BorderStack>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    );
  }

  return (
    <Stack justifyContent="space-between">
      <Stack alignItems="center" gap="8px">
        <SkeletonLine animated width="150px" />
        <SkeletonLine animated width="70px" />
      </Stack>
      <Stack alignItems="center" gap="8px">
        <SkeletonLine animated width="50px" />
        <SkeletonIcon animated />
      </Stack>
    </Stack>
  );
};

export { BusinessRuleViewUI };
