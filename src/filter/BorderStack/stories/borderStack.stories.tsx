import { Meta, StoryFn } from "@storybook/react";
import { BorderStack } from "..";

const Template: StoryFn = (args) => (
  <BorderStack {...args}>
    <BorderStack background={true} padding="5px" width="100%">
      Contenido
    </BorderStack>
  </BorderStack>
);

const meta: Meta = {
  title: "Components/BorderStack",
  component: BorderStack,
  argTypes: {
    background: { control: "color" },
    border: { control: "text" },
    height: { control: "text" },
    width: { control: "text" },
    gap: { control: "text" },
    margin: { control: "text" },
    padding: { control: "text" },
    direction: {
      control: {
        type: "select",
        options: ["row", "column", "row-reverse", "column-reverse"],
      },
    },
    justifyContent: {
      control: {
        type: "select",
        options: [
          "flex-start",
          "flex-end",
          "center",
          "space-between",
          "space-around",
          "space-evenly",
        ],
      },
    },
    alignItems: {
      control: {
        type: "select",
        options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
      },
    },
    wrap: {
      control: {
        type: "select",
        options: ["nowrap", "wrap", "wrap-reverse"],
      },
    },
  },
};

const Default = Template.bind({});
Default.args = {
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  background: "#f0f0f0",
  border: "1px solid #ccc",
  height: "auto",
};

export { Default };
export default meta;
