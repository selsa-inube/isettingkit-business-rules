import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { FilterController } from "./Filter.controller";

const story = {
  component: FilterController,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <div id="portalModal" />
        <Story />
      </BrowserRouter>
    ),
  ],
  title: "components/Filter/Filter",
};

const Default = () => <FilterController />;

export { Default };
export default story;
