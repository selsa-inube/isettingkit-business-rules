import { ICheckpicker } from "..";
import { parameters, props } from "../props";
import { CheckpickerController } from "./Checkpicker.controller";

const story = {
  title: "Inputs/Checkpicker",
  component: [CheckpickerController],
  parameters,
  argTypes: {
    ...props,
    onChange: { action: "Checkpicker" },
  },
};

const options = Array.from({ length: 20 }, (_, i) => ({
  id: `option-${i + 1}`,
  label: `Option ${i + 1}`,
  value: `option-${i + 1}`,
}));

const Default = (args: ICheckpicker) => <CheckpickerController {...args} />;

Default.args = {
  label: "Country",
  name: "country",
  id: "countryId",
  placeholder: "Select your country",
  disabled: false,
  options: options,
  required: false,
  size: "wide",
  fullwidth: false,
};

export default story;
export { Default };
