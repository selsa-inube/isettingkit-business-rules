import { BrowserRouter } from "react-router-dom";
import { TranslateObjectController } from "./translateObject.controller";
import type { Decorator } from "@storybook/react";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const story = {
  title: "translator/translateObject",
  component: TranslateObjectController,
  decorators: [withRouter],
};

const Default = () => <TranslateObjectController />;

export { Default };
export default story;
