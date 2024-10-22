import { useEffect, useState } from "react";
import { Toggle } from "@inubekit/toggle";
import { Text } from "@inubekit/text";

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
      <Toggle
        checked={toogleCheck}
        id={id}
        margin="10px"
        name={name}
        onChange={handleToggle}
        size="small"
        value={valueToggle}
      >
        <Text size="medium" type="label" weight="bold">
          {labelToggle}
        </Text>
      </Toggle>
      {toogleCheck && <>{children}</>}
    </>
  );
};

export { ToggleOption };
export type { IToggleOption };
