import { Select, ISelect } from "..";
import { SelectController } from "./SelectController";
import { props, parameters } from "../props";

const story = {
  title: "Inputs/Select",
  component: [Select],
  parameters,
  argTypes: {
    ...props,
    onchange: { action: "Select" },
  },
};

const options = [
  { id: "col", label: "Colombia", value: "colombia" },
  {
    id: "usa",
    label: "United States of America",
    value: "united-states-of-america",
  },
  { id: "per", label: "Peru", value: "peru" },
];

const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  id: `option-${i + 1}`,
  label: `Option ${i + 1}`,
  value: `option-${i + 1}`,
}));

const Default = (args: ISelect) => <SelectController {...args} />;

Default.args = {
  label: "Country",
  name: "country",
  id: "id",
  placeholder: "Select your country",
  value: "",
  disabled: false,
  options: options,
  required: false,
  size: "wide",
  fullwidth: false,
  showOptions: false,
  picker: false,
  clearable: true,
  message: "El campo no puede estar vacio",
};

const WithManyOptions = (args: ISelect) => <SelectController {...args} />;

WithManyOptions.args = {
  label: "Many Options",
  name: "manyOptions",
  id: "manyOptionsId",
  placeholder: "Select an option",
  value: "",
  disabled: false,
  options: manyOptions,
  required: false,
  size: "wide",
  fullwidth: false,
  maxItems: 5,
  clearable: false,
};

export default story;
export { Default, WithManyOptions };
