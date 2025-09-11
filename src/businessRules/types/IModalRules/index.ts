interface IModalRules {
  children: React.ReactNode;
  onCloseModal: () => void;
  portalId: string;
  title: string;
  description?: string;
}

export type { IModalRules };
