import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { ReasonForChange, IReasonForChange } from "..";

const meta: Meta<typeof ReasonForChange> = {
  title: "components/form/ReasonForChange",
  component: ReasonForChange,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof ReasonForChange>;

export const Default: Story = (args: IReasonForChange) => (
  <ReasonForChange {...args} />
);
Default.args = {
  label: "Motivo del cambio",
  labelText: "Cambio",
  onHandleChange: () => {},
  placeholder: "Escribe aquí el motivo del cambio",
  required: false,
  value: "",
};

export default meta;
