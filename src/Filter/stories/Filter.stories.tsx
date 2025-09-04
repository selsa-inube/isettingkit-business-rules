import { BrowserRouter } from "react-router-dom";
import { FilterController } from "./Filter.controller";
import type { Decorator } from "@storybook/react";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const story = {
  component: FilterController,
  decorators: [withRouter],
  title: "components/Filter/Filter",
};

const Default = () => <FilterController />;

export { Default };
export default story;
