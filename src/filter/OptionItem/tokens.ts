import { inube } from "@inubekit/inubekit";

const tokens = {
  border: {
    color: {
      regular: inube.palette.neutral.N40,
      disabled: inube.palette.neutral.N40,
      focus: inube.palette.blue.B300,
      invalid: inube.palette.red.R400,
    },
  },
  background: {
    color: {
      regular: inube.palette.neutral.N0,
      disabled: inube.palette.neutral.N10,
    },
  },
  content: {
    color: {
      regular: inube.palette.neutral.N900,
      disabled: inube.palette.neutral.N70,
    },
  },
  placeholder: {
    color: {
      regular: inube.palette.neutral.N300,
    },
  },
  message: {
    appearance: "danger",
  },
  required: {
    appearance: "danger",
  },
  option: {
    appearance: {
      regular: "dark",
      hover: "primary",
    },
    background: {
      regular: inube.palette.neutral.N0,
      hover: inube.palette.neutral.N30,
    },
  },
};

export { tokens };
