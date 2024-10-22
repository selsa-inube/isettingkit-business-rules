import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { Term, ITermProps } from "..";

const meta: Meta<typeof Term> = {
  title: "components/form/Term",
  component: Term,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof Term>;

const style = {
  width: "402px",
};

export const Default: Story = (args: ITermProps) => (
  <div style={style}>
    <Term {...args} />
  </div>
);
Default.args = {
  onHandleStartChange: () => {},
  onHandleEndChange: () => {},
  labelStart: "Fecha de inicio",
  labelEnd: "Fecha de fin",
  checkedClosed: false,
  required: false,
  valueStart: "",
  valueEnd: "",
};

export default meta;
