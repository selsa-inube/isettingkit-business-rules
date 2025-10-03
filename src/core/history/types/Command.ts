interface Command {
  label: string;
  do(): void;
  undo(): void;
}

export type { Command };