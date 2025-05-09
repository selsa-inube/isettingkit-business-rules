interface IModalRules {
  children: React.ReactNode;
  onCloseModal: () => void;
  portalId: string;
  title: string;
}

export type { IModalRules };
