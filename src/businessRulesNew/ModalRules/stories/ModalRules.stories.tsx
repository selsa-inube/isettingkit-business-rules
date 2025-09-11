import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { MultipleChoices } from "@isettingkit/input";
import { JSX } from "react/jsx-runtime";
import { ModalRulesNew } from "..";
import type { Decorator } from "@storybook/react";
import { IModalRules } from "../../../businessRules/types/IModalRules";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
const meta: Meta<typeof ModalRulesNew> = {
  title: "components/modals/ModalRulesNew",
  component: ModalRulesNew,
  decorators: [withRouter],
};

const Template: StoryFn<IModalRules> = (
  args: JSX.IntrinsicAttributes & IModalRules,
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ModalRulesNew {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  title: "Rules Configuration",
  children: (
    <MultipleChoices
      id="10"
      labelSelect="Select"
      labelSelected="Selected"
      options={[
        { id: "1", label: "Option 1", value: "Option 1" },
        { id: "2", label: "Option 2", value: "Option 2" },
        { id: "3", label: "Option 3", value: "Option 3" },
      ]}
      placeholderSelect="Seleccione opciones"
      values={""}
      onChange={() => true}
    />
  ),
};

const TemplateWithPlannedAutomatic: StoryFn<IModalRules> = (
  args: JSX.IntrinsicAttributes & IModalRules,
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ModalRulesNew {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

const WithPlannedAutomaticExecution: StoryFn<IModalRules> =
  TemplateWithPlannedAutomatic.bind({});
WithPlannedAutomaticExecution.args = {
  portalId: "portal",
  title: "Rules Configuration",
  children: (
    <MultipleChoices
      id="10"
      labelSelect="Select"
      labelSelected="Selected"
      onChange={() => true}
      options={[
        { id: "1", label: "Option 1", value: "Option 1" },
        { id: "2", label: "Option 2", value: "Option 2" },
        { id: "3", label: "Option 3", value: "Option 3" },
      ]}
      placeholderSelect="Seleccione opciones"
      values={""}
    />
  ),
};

export { Default };
export { WithPlannedAutomaticExecution };
export default meta;
