import { IStack } from "@inubekit/inubekit";

interface IBorderStack extends IStack {
  background?: boolean;
  border?: boolean;
  borderRadius?: string;
  boxSizing?: string;
  boxShadow?: string;
  scroll?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export type { IBorderStack };
