interface IModalRules {
  children: React.ReactNode;
  description?: string;
  onCloseModal: () => void;
  portalId: string;
  title: string;
}

export type { IModalRules };
