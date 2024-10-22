export const parameters = {
  docs: {
    description: {
      component: "Component to handle the validity of a product or service",
    },
  },
  controls: {
    exclude: ["value", "state"],
  },
};

export const props = {
  onHandleStartChange: {
    description: "Function to handle the start date change",
  },
  onHandleEndChange: {
    description: "Function to handle the end date change",
  },
  labelStart: {
    description: "Label for the start date",
  },
  labelEnd: {
    description: "Label for the end date",
  },
  checkedClosed: {
    description: "Boolean to check if the validity is closed",
  },
  required: {
    description: "Boolean to check if the validity is required",
  },
  valueStart: {
    description: "Value of the start date",
  },
  valueEnd: {
    description: "Value of the end date",
  },
};
