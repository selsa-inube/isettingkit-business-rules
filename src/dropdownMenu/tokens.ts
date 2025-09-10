import { inube } from "@inubekit/inubekit";

const tokens = {
  item: {
    content: "dark",
    background: {
      active: inube.palette.blue.B50,
      inactive: inube.palette.neutral.N0,
      hover: inube.palette.neutral.N20,
      disabled: inube.palette.neutral.N20,
    },
  },
  border: {
    expanded: {
      color: inube.palette.blue.B400,
    },
    contracted: {
      color: inube.palette.neutral.N0,
    },
  },
};

export { tokens };
