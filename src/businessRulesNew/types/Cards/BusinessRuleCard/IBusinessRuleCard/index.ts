interface IBusinessRuleCard {
  children: React.ReactNode;
  controls?: boolean;
  handleDelete: (id: string) => void;
  handleView: (id: string) => void;
  id: string;
  editionMode?: "classic" | "versioned";
}

export type { IBusinessRuleCard };
