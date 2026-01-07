import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { BoxContainer } from "..";
import { IBoxContainer } from "../../verification/engine/types/IBoxContainer";
import { EComponentAppearance } from "../../verification/enum/appearances";


const meta: Meta<typeof BoxContainer> = {
  title: "layout/BoxContainer",
  component: BoxContainer,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const Template: StoryFn<IBoxContainer> = (args) => {
  return (
    <>
      <BoxContainer {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <div>Content</div>,
  height: "100px",
  width: "200px",
  backgroundColor: `${EComponentAppearance.GRAY}`,
  boxSizing: "border-box",
  borderRadius: "8px",
  borderColor: `${EComponentAppearance.DARK}`,
  padding: "8px",
};

export default meta;
