import { IButton } from "@inubekit/inubekit";

interface IBackAndNextButton
  extends Omit<IButton, "onClick" | "path" | "children"> {
  handleBack: () => void;
  handleNext: () => void;
  disabled: boolean;
  loading: boolean;
  textValues: {
    back: string;
    next: string;
  };
}

export type { IBackAndNextButton };
