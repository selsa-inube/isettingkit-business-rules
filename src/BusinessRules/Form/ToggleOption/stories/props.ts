import { ArgTypes } from "@storybook/react";
import { IToggleOption } from "..";

export const parameters = {
  docs: {
    description: {
      component:
        "Select allows users to make a single selection or multiple selections from a list of option.",
    },
  },
  controls: {
    exclude: ["value", "state"],
  },
};

export const props: Partial<ArgTypes<IToggleOption>> = {
  checked: {
    description:
      "is a boolean attribute that indicates whether the **Toggle Component** is checked or not.",
  },
  children: {
    description:
      "is the content that will be displayed when the **Toggle Component** is checked.",
  },
  handleToggleChange: {
    description:
      "is a function that will be called when the **Toggle Component** value changes.",
  },
  id: {
    description:
      "uniquely identifies the **Textfield Component**, it will also allow the **label element** to be connected to the **input element** through the htmlFor of the label",
  },
  labelToggle: {
    description:
      "is the text that will be displayed as the label for the **Toggle Component**.",
  },
  name: {
    description:
      "is used to identify the **Textfield Component** in the form data submitted to the server.",
  },
};
