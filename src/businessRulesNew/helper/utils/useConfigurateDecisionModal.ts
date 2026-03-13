import { IOption } from "@inubekit/inubekit";

import { useState } from "react";

interface IConfigurateDecisionModal {
  options: IOption[];
}

const useConfigurateDecisionModal = (props: IConfigurateDecisionModal) => {
  const { options } = props;

  const [checkedItems, setCheckedItems] = useState<IOption[]>([]);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prevChecked) => {
      const isAlreadyChecked = prevChecked.some((item) => item.id === id);

      if (isAlreadyChecked) {
        return prevChecked.filter((item) => item.id !== id);
      }

      const optionToAdd = options.find((opt) => opt.id === id);
      return optionToAdd ? [...prevChecked, optionToAdd] : prevChecked;
    });
  };

  const onToggleAnyCondition = () => {
    setCheckedItems([]);
  };
  const onToggleAllConditions = () => {
    setCheckedItems(options);
  };
  const isAnyConditionChecked = checkedItems.length === 0;
  const isAllConditionsChecked = checkedItems.length === options.length;

  return {
    onToggleAllConditions,
    isAllConditionsChecked,
    isAnyConditionChecked,
    onToggleAnyCondition,
    checkedItems,
    handleCheckboxChange,
  };
};

export { useConfigurateDecisionModal };
