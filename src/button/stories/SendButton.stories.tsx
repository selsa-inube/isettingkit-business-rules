import { BrowserRouter } from "react-router-dom";
import { MdOutlineSend } from "react-icons/md";

import { ElementType } from "react";

import { IButton, SendButton } from "..";

const story = {
  title: "inputs/SendButton",
  components: SendButton,
  decorators: [
    (Story: ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = (args: IButton) => <SendButton {...args} />;

Default.args = {
  children: "Enviar",
  appearance: "primary",
  path: "/privilege",
  iconBefore: <MdOutlineSend />,
  loading: false,
  disabled: false,
  type: "SendButton",
  spacing: "wide",
  variant: "filled",
  fullwidth: false,
  width: "",
  onClick: () => console.log("clicked from Default-story"),
  cursorHover: false,
  parentHover: false,
};

export { Default };
export default story;
