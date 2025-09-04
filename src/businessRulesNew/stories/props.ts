const parameters = {
  docs: {
    description: {
      component: "Component to handle the validity of a product or service",
    },
  },
  controls: {
    exclude: ["value", "state"],
  },
};

const props = {
  children: {
    description: "The criteria for the decision",
    table: {
      type: {
        summary: "React.ReactNode",
      },
    },
  },
  handleDelete: {
    description: "Function to handle the deletion of a rule",
    table: {
      type: {
        summary: "(id: string) => void",
      },
    },
  },
  handleView: {
    description: "Function to handle the viewing of a rule",
    table: {
      type: {
        summary: "(id: string) => void",
      },
    },
  },
  id: {
    description: "The id of the rule",
    table: {
      type: {
        summary: "string",
      },
    },
  },
};

export { parameters, props };
