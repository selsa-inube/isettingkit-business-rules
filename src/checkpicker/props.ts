const sizes = ["wide", "compact"] as const;
type ICheckpickerSize = (typeof sizes)[number];

const parameters = {
  docs: {
    description: {
      component:
        "The Checkpicker component allows users to select multiple options from a predefined list. It supports various configurations such as disabled, required, and the number of visible options before a scrollbar appears.",
    },
  },
};

const props = {
  disabled: {
    description:
      "Determines whether the Checkpicker component is disabled. When set to `true`, the dropdown cannot be opened, and the user will not be able to interact with the checkboxes. The field will also be visually styled as disabled.",
    table: {
      defaultValue: { summary: false },
    },
  },
  fullwidth: {
    description:
      "Specifies whether the Checkpicker component should expand to fill the full width of its parent container. When set to `true`, the dropdown will stretch to fit the width of the container.",
    table: {
      defaultValue: { summary: false },
    },
  },
  id: {
    description:
      "A unique identifier for the Checkpicker component. This ID connects the label element to the input element through the `htmlFor` attribute, ensuring proper accessibility and interaction.",
  },
  invalid: {
    description:
      "Indicates whether the current value of the Checkpicker component is invalid. When set to `true`, the component will visually indicate an error state, often paired with a `message` to describe the error.",
    table: {
      defaultValue: { summary: false },
    },
  },
  label: {
    description:
      "Text that appears as a label for the Checkpicker component. This label prompts the user with instructions or context about what value they should select from the dropdown.",
  },
  maxItems: {
    description:
      "Defines the maximum number of items that will be visible in the dropdown list at one time. If the number of options exceeds this value, a scrollbar will appear to allow the user to scroll through additional options.",
    table: {
      defaultValue: { summary: 5 },
    },
  },
  name: {
    description:
      "Specifies the name attribute of the input element within the Checkpicker component. This name is used to identify the form data after submission and is often required for backend processing.",
  },
  onBlur: {
    description:
      "A callback function that is triggered when the Checkpicker component loses focus. This event handler allows you to define custom behavior, such as validation or styling, when the user clicks away from the input field.",
  },
  onChange: {
    description:
      "A callback function that handles changes to the selected values in the dropdown. This function is essential for managing the selected options in a controlled component, where the parent component maintains the state.",
  },
  onClick: {
    description:
      "An optional callback function that defines custom behavior when the Checkpicker component is clicked. This function can be used to handle various user interactions, such as opening the dropdown, logging interactions, or triggering other UI changes.",
  },
  onFocus: {
    description:
      "A callback function that is triggered when the Checkpicker component gains focus. This allows you to perform actions such as highlighting the field or displaying additional information when the user interacts with the input.",
  },
  options: {
    description:
      "An array of objects that represent the options available in the dropdown. Each object should have a predefined structure, typically including an `id`, `label`, and `value` to uniquely identify and display each option.",
  },
  placeholder: {
    description:
      "Text displayed inside the input field when no value is selected. The placeholder provides a hint or example of the expected input, helping guide the user in making a selection.",
  },
  required: {
    description:
      "Marks the Checkpicker component as a required field in a form. If set to `true`, the form cannot be submitted without a valid selection in this field, and the user will be prompted to make a selection.",
    table: {
      defaultValue: { summary: false },
    },
  },
  size: {
    description:
      "Determines the size of the Checkpicker component. The `wide` size offers a more expansive input field, while `compact` provides a smaller, more concise field. Choose based on the amount of space available and the desired UI design.",
    control: { type: "select" },
    options: ["wide", "compact"],
  },
  values: {
    description:
      "Represents the currently selected values of the Checkpicker component. This value should be controlled by the parent component, ensuring that the selected options are correctly managed and updated in response to user interaction.",
  },
};

export { parameters, props };
export type { ICheckpickerSize };
