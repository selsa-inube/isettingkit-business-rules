import { ArgTypes } from "@storybook/react";
import { IRulesForm } from "..";

export const parameters = {
  docs: {
    description: {
      component:
        "This component is a modal that allows the user to edit a decision.",
    },
  },
  controls: {
    exclude: ["value", "state"],
  },
};

export const props: Partial<ArgTypes<IRulesForm>> = {
  decision: {
    description: "The decision to be edited",
    table: {
      type: {
        summary: "RuleDecision",
      },
    },
    onCloseModal: {
      description: "Function to close the modal",
      table: {
        type: {
          summary: "Function",
        },
      },
    },
    onCancel: {
      description: "Function to cancel the edit",
      table: {
        type: {
          summary: "Function",
        },
      },
    },
    onSubmitEvent: {
      description: "Function to submit the edited decision",
      table: {
        type: {
          summary: "Function",
        },
      },
    },
    portalId: {
      description: "The id of the portal",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
};
