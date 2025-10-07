import { useEffect, useState } from "react";
import { Toggle, Text, Stack } from "@inubekit/inubekit";
import { IToggleOption } from "../../../businessRules/types/Forms/IToggleOption";

const ToggleOption = (props: IToggleOption) => {
  const {
    checked,
    children,
    handleToggleChange,
    id,
    labelToggle,
    name,
    valueToggle = "",
  } = props;
  const [toogleCheck, setToogleCheck] = useState(checked);
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToogleCheck(e.target.checked);
    handleToggleChange(e);
  };

  return (
    <>
      <Stack>
        <Toggle
          checked={toogleCheck}
          id={id}
          name={name}
          onChange={handleToggle}
          size="small"
          value={valueToggle}
        >
          <Text size="medium" type="label" weight="bold">
            {labelToggle}
          </Text>
        </Toggle>
      </Stack>

      {toogleCheck && <>{children}</>}
    </>
  );
};

export { ToggleOption };
