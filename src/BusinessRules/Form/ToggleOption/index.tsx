import { useEffect, useState } from "react";
import { Toggle } from "@inubekit/inubekit";
import { Text } from "@inubekit/inubekit";
import { Stack } from "@inubekit/inubekit";

interface IToggleOption {
  checked: boolean;
  children: React.ReactNode;
  handleToggleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  labelToggle: string;
  name: string;
  valueToggle?: string;
}

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

  useEffect(() => {
    setToogleCheck(checked);
  }, [checked]);

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
export type { IToggleOption };
