import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { TranslateObjectController } from "./translateObject.controller";

const story = {
  title: "translator/translateObject",
  component: TranslateObjectController,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = () => <TranslateObjectController />;

export { Default };
export default story;
