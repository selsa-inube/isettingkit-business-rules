import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { MdOutlineApps, MdOutlineCategory } from "react-icons/md";
import type { Decorator } from "@storybook/react";
import { FormFilter } from ".";
import { IOption } from "@inubekit/inubekit";
import { IFormFilter } from "../types/IFormFilter";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const story = {
  component: FormFilter,
  decorators: [withRouter],
  title: "components/Filter/FormFilter",
};

const Template: StoryFn<IFormFilter> = (args: IFormFilter) => (
  <FormFilter {...args} />
);

const Default = Template.bind({});
Default.args = {
  fields: [
    {
      icon: <MdOutlineApps />,
      label: "Aplicaciones",
      name: "apps",
      options: [
        { id: "app1", label: "Aplicación 1", value: "app1" },
        { id: "app2", label: "Aplicación 2", value: "app2" },
      ] as IOption[],
      values: "app1",
    },
    {
      icon: <MdOutlineCategory />,
      label: "Suites",
      name: "suites",
      options: [
        { id: "suite", label: "Suite Clientes", value: "suite" },
        { id: "cartera", label: "Cartera", value: "cartera" },
      ] as IOption[],
      values: "suite",
    },
  ],
  onChange: (name: string, value: string) => {
    console.log("Changed:", name, value);
  },
};

export { Default };
export default story;
