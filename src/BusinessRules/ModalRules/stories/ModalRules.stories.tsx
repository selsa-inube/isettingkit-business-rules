import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { MultipleChoices } from "@isettingkit/input";
import { JSX } from "react/jsx-runtime";
import { IModalRules, ModalRules } from "..";

const meta: Meta<typeof ModalRules> = {
  title: "components/modals/ModalRules",
  component: ModalRules,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<IModalRules> = (
  args: JSX.IntrinsicAttributes & IModalRules,
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ModalRules {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  title: "Rules Configuration",
  children: (
    <MultipleChoices
      id="10"
      labelSelect="Select"
      labelSelected="Selected"
      onHandleSelectCheckChange={() => true}
      options={[
        { id: "1", label: "Option 1", checked: false },
        { id: "2", label: "Option 2", checked: false },
        { id: "3", label: "Option 3", checked: false },
      ]}
      placeholderSelect="Seleccione opciones"
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
        <ModalRules {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const WithPlannedAutomaticExecution: StoryFn<IModalRules> =
  TemplateWithPlannedAutomatic.bind({});
WithPlannedAutomaticExecution.args = {
  portalId: "portal",
  title: "Rules Configuration",
  children: (
    <MultipleChoices
      id="10"
      labelSelect="Select"
      labelSelected="Selected"
      onHandleSelectCheckChange={() => true}
      options={[
        { id: "1", label: "Option 1", checked: false },
        { id: "2", label: "Option 2", checked: false },
        { id: "3", label: "Option 3", checked: false },
      ]}
      placeholderSelect="Seleccione opciones"
    />
  ),
};

export default meta;
