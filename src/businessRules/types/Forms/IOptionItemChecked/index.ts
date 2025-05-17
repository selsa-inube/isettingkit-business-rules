interface IOptionItemChecked {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { IOptionItemChecked };
