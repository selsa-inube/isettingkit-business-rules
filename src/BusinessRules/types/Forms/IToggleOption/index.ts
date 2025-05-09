interface IToggleOption {
  checked: boolean;
  children: React.ReactNode;
  handleToggleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  labelToggle: string;
  name: string;
  valueToggle?: string;
}

export type { IToggleOption };
