/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Divider,
  Stack,
  SkeletonLine,
  Text,
  Tag,
  Icon,
  SkeletonIcon,
  Tabs,
} from "@inubekit/inubekit";
import {
  DecisionViewConditionRendererNew,
  IDecisionViewConditionRenderer,
} from "@isettingkit/view";
import { IBusinessRuleViewUI } from "../types/BusinessRuleView/IBusinessRuleViewUI";
import { strategyFactoryHandlerManagerNew } from "./helper";
import {
  MdExpandLess,
  MdExpandMore,
  MdOutlineCreate,
  MdOutlineDelete,
} from "react-icons/md";
import { BorderStack } from "../../filter/BorderStack";
import {
  StyledDecisionContainer,
  StyledRecordCardContainer,
  StyledTagContainer,
} from "./styles";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";

const BusinessRuleViewUI = (props: IBusinessRuleViewUI) => {
  const {
    controls,
    conditionsAlignment,
    decision,
    decisionMapper,
    loading,
    textValues,
    tagLabel,
    isOpen,
    onToggle,
    hasEffectiveFrom,
    hasValidUntil,
    effectiveFromRenderer,
    validUntilRenderer,
    onEdit,
    onDelete,
    tabs,
    selectedTab,
    onTabChange,
    currentConditions,
    hasMultipleGroups,
    editionMode = "versioned",
    withEditOption = "false",
  } = props;
  if (loading) {
    return (
      <Stack direction="column" gap="16px">
        <StyledRecordCardContainer onClick={onToggle}>
          <Stack
            key={decision!.ruleName}
            alignItems="start"
            justifyContent="space-between"
          >
            <Stack gap="12px">
              <StyledTagContainer>
                <Tag
                  id="tag"
                  appearance="gray"
                  label={tagLabel}
                  displayIcon={false}
                />
              </StyledTagContainer>

              <StyledDecisionContainer>
                <DecisionViewConditionRendererNew
                  element={decisionMapper!}
                  valueData={
                    strategyFactoryHandlerManagerNew(
                      decisionMapper!,
                    ) as IDecisionViewConditionRenderer["valueData"]
                  }
                  type="decision"
                  editionMode={editionMode}
                />
              </StyledDecisionContainer>
            </Stack>
            <Stack gap="12px">
              {controls && (
                <>
                  {withEditOption && (
                    <Icon
                      appearance="primary"
                      icon={<MdOutlineCreate />}
                      size="24px"
                      cursorHover
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.();
                      }}
                    />
                  )}

                  <Icon
                    appearance="danger"
                    icon={<MdOutlineDelete />}
                    size="24px"
                    cursorHover
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                  />
                </>
              )}
              <Icon
                appearance="dark"
                icon={isOpen ? <MdExpandLess /> : <MdExpandMore />}
                size="24px"
                cursorHover
              />
            </Stack>
          </Stack>
        </StyledRecordCardContainer>

        {isOpen && (
          <>
            <Divider dashed />
            {hasMultipleGroups ? (
              <Tabs
                tabs={tabs!}
                selectedTab={selectedTab!}
                onChange={onTabChange!}
              />
            ) : (
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
            )}

            <Stack direction="column" gap="20px">
              <Stack
                direction="column"
                gap="8px"
                justifyContent={conditionsAlignment}
              >
                {currentConditions!.map((condition: any) => (
                  <BorderStack
                    key={condition.conditionName}
                    direction="column"
                    padding="6px 12px"
                    borderRadius="8px"
                    background
                  >
                    <DecisionViewConditionRendererNew
                      element={{
                        ...condition,
                        value: condition.value,
                        howToSetTheCondition:
                          condition.howToSetTheCondition ===
                          EValueHowToSetUp.LIST_OF_VALUES
                            ? EValueHowToSetUp.LIST_OF_VALUES_MULTI
                            : condition.howToSetTheCondition,
                      }}
                      valueData={
                        strategyFactoryHandlerManagerNew(
                          condition,
                        ) as IDecisionViewConditionRenderer["valueData"]
                      }
                      editionMode={editionMode}
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
                      editionMode={editionMode}
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
                      editionMode={editionMode}
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
