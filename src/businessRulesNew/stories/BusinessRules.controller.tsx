/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { BusinessRulesNew } from "..";
import { sortDisplayDataSwitchPlaces } from "../helper/utils/sortDisplayDataSwitchPlaces";
import { sortDisplayDataSampleSwitchPlaces } from "../helper/utils/sortDisplayDataSampleSwitchPlaces";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";
import { formatDecisionForBackend } from "../helper/utils/formatDecisionForBackend";
import { parseRangeFromString } from "../helper/utils/parseRangeFromString";
import { Button, Fieldset, Stack } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";
import type { IOption } from "@inubekit/inubekit";
import { StyledMultipleChoiceContainer } from "./styles";
import { getConditionsByGroup } from "../helper/utils/getConditionsByGroup";
import { mapByGroup } from "../helper/utils/mapByGroup";
import { Checkpicker } from "../../checkpicker";

interface IBusinessRulesNewController {
  controls?: boolean;
  customTitleContentAddCard?: string;
  customMessageEmptyDecisions?: string;
  initialDecisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  loading?: boolean;
  terms?: boolean;
}

const BusinessRulesNewController = ({
  controls,
  customMessageEmptyDecisions,
  customTitleContentAddCard,
  initialDecisions,
  textValues,
  decisionTemplate,
  loading = false,
}: IBusinessRulesNewController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<any[]>(
    initialDecisions.map((decision) => ({
      ...decision,
      value: parseRangeFromString(decision.value),
      conditionsThatEstablishesTheDecision: mapByGroup(
        getConditionsByGroup(decision),
        (condition: {
          value: string | number | IValue | string[] | undefined;
        }) => ({
          ...condition,
          value: parseRangeFromString(condition.value),
        }),
      ),
    })),
  );

  const multipleChoicesOptions: IOption[] = useMemo(() => {
    const groups = getConditionsByGroup(decisionTemplate);
    return Object.values(groups)
      .flat()
      .map((c: any) => ({
        id: c.conditionName,
        label: c.labelName,
        value: c.conditionName,
      }));
  }, [decisionTemplate]);

  const [selectedConditionsCSV, setSelectedConditionsCSV] =
    useState<string>("");

  const selectedIds = useMemo(
    () => new Set(selectedConditionsCSV.split(",").filter(Boolean)),
    [selectedConditionsCSV],
  );

  const handleMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditionsCSV(valueCSV);
    const ids = valueCSV.split(",").filter(Boolean);
    const selected = multipleChoicesOptions.filter((o) => ids.includes(o.id));
    console.log("Selected conditions:", selected);
  };

  const handleOpenModal = (decision: IRuleDecision | null = null) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const handleSubmitForm = (dataDecision: any) => {
    const isEditing = selectedDecision !== null;

    const base = isEditing
      ? { ...selectedDecision, ...dataDecision }
      : {
          ...decisionTemplate,
          ...dataDecision,
          decisionId: `Decisión ${decisions.length + 1}`,
        };

    const tplGroups = getConditionsByGroup(decisionTemplate);
    const dataGroups = getConditionsByGroup(dataDecision) as Record<
      string,
      any[]
    >;

    const mergedGroups = Object.fromEntries(
      Object.entries(tplGroups).map(([group, tplList]) => {
        const dataList = dataGroups[group] ?? [];
        const merged = (tplList as any).map((tplItem: any) => {
          const match = dataList.find(
            (d: any) => d.conditionName === tplItem.conditionName,
          );
          return {
            ...tplItem,
            value: match?.value ?? tplItem.value,
            listOfPossibleValues:
              match?.listOfPossibleValues ?? tplItem.listOfPossibleValues,
          };
        });

        const finalList =
          selectedIds.size === 0
            ? merged
            : merged.filter((m: any) => selectedIds.has(m.conditionName));

        return [group, finalList];
      }),
    );

    const newDecision: IRuleDecision = {
      ...base,
      conditionsThatEstablishesTheDecision: mergedGroups,
    };

    const backendFormattedDecision = formatDecisionForBackend({
      decision: newDecision,
      template: decisionTemplate,
      fallbackId: newDecision.decisionId!,
    });
    console.log("Formatted for backend:", backendFormattedDecision);

    setDecisions((prev) =>
      isEditing
        ? prev.map((d) => {
            const sameByBusinessRule =
              selectedDecision?.businessRuleId &&
              d.businessRuleId === selectedDecision.businessRuleId;
            const sameByDecisionId =
              selectedDecision?.decisionId &&
              d.decisionId === selectedDecision.decisionId;
            return sameByBusinessRule || sameByDecisionId ? newDecision : d;
          })
        : [...prev, newDecision],
    );

    handleCloseModal();
  };

  useEffect(() => {}, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  const filteredDecisionTemplate = useMemo(() => {
    const tpl = sortDisplayDataSampleSwitchPlaces({ decisionTemplate });
    if (selectedIds.size === 0) return tpl;

    const groups = tpl.conditionsThatEstablishesTheDecision || {};
    const filtered = Object.fromEntries(
      Object.entries(groups).map(([group, list]) => [
        group,
        (list as any[]).filter((c) => selectedIds.has(c.conditionName)),
      ]),
    );

    return { ...tpl, conditionsThatEstablishesTheDecision: filtered };
  }, [decisionTemplate, selectedIds]);

  return (
    <Stack direction="column" gap="24px">
      {decisions.length === 0 && (
        <>
          <Fieldset legend="Condiciones que determinan las decisiones">
            <StyledMultipleChoiceContainer>
              <Checkpicker
                id="conditionsPicker"
                name="conditionsPicker"
                label=""
                placeholder="Seleccione una o varias condiciones"
                options={multipleChoicesOptions}
                required={false}
                values={selectedConditionsCSV}
                onChange={handleMultipleChoicesChange}
                size="wide"
                fullwidth
              />
            </StyledMultipleChoiceContainer>
          </Fieldset>
          <Stack justifyContent="flex-end">
            <Button iconBefore={<MdAdd />} onClick={() => handleOpenModal()}>
              Agregar plazo
            </Button>
          </Stack>
        </>
      )}

      <BusinessRulesNew
        controls={controls}
        customTitleContentAddCard={customTitleContentAddCard}
        customMessageEmptyDecisions={customMessageEmptyDecisions}
        decisions={sortDisplayDataSwitchPlaces({ decisions })}
        textValues={textValues}
        decisionTemplate={filteredDecisionTemplate as any}
        isModalOpen={isModalOpen}
        selectedDecision={selectedDecision}
        loading={loading}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleSubmitForm={handleSubmitForm}
        handleDelete={handleDelete}
      />
    </Stack>
  );
};

export { BusinessRulesNewController };
export type { IBusinessRulesNewController };
