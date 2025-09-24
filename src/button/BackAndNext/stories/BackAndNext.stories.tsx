import { BrowserRouter } from "react-router-dom";
import { MdOutlineSend } from "react-icons/md";

import { ElementType } from "react";

import { BackAndNextButton } from "..";
import { IBackAndNextButton } from "../../types/IBackAndNextButton";

const story = {
  title: "inputs/BackAndNextButton",
  components: BackAndNextButton,
  decorators: [
    (Story: ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = (args: IBackAndNextButton) => <BackAndNextButton {...args} />;

Default.args = {
  textValues: {
    back: "Atrás",
    next: "Siguiente",
  },
  handleBack: () => console.log("clicked back from Default-story"),
  handleNext: () => console.log("clicked next from Default-story"),
  appearance: "primary",
  iconBefore: <MdOutlineSend />,
  loading: false,
  disabled: false,
  disabledBack: false,
  disabledNext: false,
  type: "SendButton",
  spacing: "wide",
  variant: "filled",
  fullwidth: false,
  width: "",
  cursorHover: false,
  parentHover: false,
};

export { Default };
export default story;
