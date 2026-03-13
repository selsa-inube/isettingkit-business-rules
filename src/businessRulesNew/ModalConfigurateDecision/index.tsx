import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import {
  Blanket,
  Button,
  Divider,
  Fieldset,
  IOption,
  OptionItem,
  Toggle,
} from "@inubekit/inubekit";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/inubekit";

import { StyledContainer } from "../ModalRules/styles";
import { StyledConditionsContainer, StyledMain, StyledModal } from "./styles";
import { useConfigurateDecisionModal } from "../helper/utils/useConfigurateDecisionModal";

interface IModalConfigurateDecision {
  options: IOption[];
  onCloseModal: () => void;
  onOpenRulesModal: (checkedItems: IOption[]) => void;
  portalId: string;
}
const ModalConfigurateDecision = (props: IModalConfigurateDecision) => {
  const { options, portalId, onCloseModal, onOpenRulesModal } = props;
  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const {
    onToggleAnyCondition,
    onToggleAllConditions,
    isAllConditionsChecked,
    isAnyConditionChecked,
    checkedItems,
    handleCheckboxChange,
  } = useConfigurateDecisionModal({ options });

  return createPortal(
    <StyledContainer>
      <Blanket>
        <StyledModal>
          <Stack direction="column" gap="24px">
            <Stack direction="column" gap="24px">
              <Stack alignItems="center" justifyContent="space-between">
                <Stack direction="column" gap="8px">
                  <Text
                    type="title"
                    size="medium"
                    appearance="dark"
                    weight="bold"
                  >
                    {"Condiciones"}
                  </Text>
                  <Text size="medium" appearance="gray">
                    {
                      "Antes de agregar una decisión, selecciona las condiciones que la determinan."
                    }
                  </Text>
                </Stack>
                <MdClear size="24px" cursor="pointer" onClick={onCloseModal} />
              </Stack>
              <Divider dashed />
            </Stack>
            <StyledMain>
              <Stack direction="column" gap="20px">
                <Text type="title" size="medium" weight="normal">
                  {"    ¿Qué condiciones determinan la decisión?"}
                </Text>
                <Stack justifyContent="space-between">
                  <Toggle
                    onChange={onToggleAnyCondition}
                    checked={isAnyConditionChecked}
                  >
                    {"Ninguna"}
                  </Toggle>
                  <Toggle
                    onChange={onToggleAllConditions}
                    checked={isAllConditionsChecked}
                  >
                    {"Todas"}
                  </Toggle>
                </Stack>
                <Fieldset legend={"Condiciones específicas"}>
                  <StyledConditionsContainer>
                    {options.map((optionItem) => (
                      <OptionItem
                        key={optionItem.id}
                        id={optionItem.id}
                        label={optionItem.label}
                        checked={checkedItems.includes(optionItem)}
                        onCheckboxChange={() =>
                          handleCheckboxChange(optionItem.id)
                        }
                        picker
                      />
                    ))}
                  </StyledConditionsContainer>
                </Fieldset>
              </Stack>
            </StyledMain>
            <Stack justifyContent="flex-end" gap="12px">
              <Button appearance="gray" onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button onClick={() => onOpenRulesModal(checkedItems)}>
                Continuar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node,
  );
};

export { ModalConfigurateDecision };
