const parameters = {
  docs: {
    description: {
      component:
        "The OptionList container is used within the Select component to display a list of options. It manages the visibility of the options and handles user interactions such as selecting an option or closing the dropdown.",
    },
  },
};

const props = {
  handleSelect: {
    description:
      "A callback function triggered when an option is selected. It determines the behavior after the user chooses an option, typically sending the selected option's value back to the parent component for further processing.",
  },
  isOpenOptions: {
    description:
      "A boolean that controls the visibility of the option list. When set to `true`, the options are displayed in the dropdown. When `false`, the options are hidden, usually because the dropdown has been closed.",
  },
  onClick: {
    description:
      "An optional callback function that handles the click event on the OptionList. It defines the custom behavior that should occur when the user interacts with the option list, and it is not mandatory to provide this function.",
  },
  onCloseOptions: {
    description:
      "A callback function that is triggered when an option is selected, and the dropdown needs to be closed. It defines what should happen when the user selects an option and the dropdown is expected to disappear.",
  },
  options: {
    description:
      "An array of objects that represent the options available within the OptionList. Each object in the array should have a predefined structure, including attributes like `id`, `label`, and `value`, to uniquely identify and display each option.",
  },
};

export { parameters, props };
