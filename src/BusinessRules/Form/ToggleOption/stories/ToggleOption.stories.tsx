import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { ToggleOption, IToggleOption } from "..";
import { Select } from "@inubekit/select";
import { MultipleChoices } from "@isettingkit/input";

const meta: Meta<typeof ToggleOption> = {
  title: "components/form/ToggleOption",
  component: ToggleOption,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof ToggleOption>;

export const Default: Story = (args: IToggleOption) => (
  <ToggleOption {...args} />
);
Default.args = {
  checked: false,
  children: (
    <MultipleChoices
      id="10"
      options={[
        { id: "1", label: "Option 1", checked: true },
        { id: "2", label: "Option 2", checked: true },
        { id: "3", label: "Option 3", checked: true },
      ]}
      labelSelect={""}
      labelSelected={""}
      onHandleSelectCheckChange={() => true}
      placeholderSelect="Seleccione opciones"
    />
  ),
  handleToggleChange: () => {},
  id: "toggle",
  labelToggle: "Opciones",
  name: "name",
  valueToggle: "value",
};

export const Other: Story = (args: IToggleOption) => <ToggleOption {...args} />;

Other.args = {
  checked: false,
  children: (
    <Select
      id="10"
      name="name"
      label="Select"
      onChange={() => true}
      options={[
        { id: "1", label: "Option 1", value: "Option 1" },
        { id: "2", label: "Option 2", value: "Option 2" },
        { id: "3", label: "Option 3", value: "Option 3" },
      ]}
      value={""}
    />
  ),
  handleToggleChange: () => {},
  id: "toggle",
  labelToggle: "Opciones",
  name: "name",
  valueToggle: "value",
};

export default meta;
