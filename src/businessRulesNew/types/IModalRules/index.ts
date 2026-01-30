interface IModalRules {
  children: React.ReactNode;
  description?: string;
  onCloseModal: () => void;
  portalId: string;
  title: string;
  size?: string;
}

export type { IModalRules };
