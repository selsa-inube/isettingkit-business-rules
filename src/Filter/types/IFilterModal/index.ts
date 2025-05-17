interface IFilterModal {
  actionButtonLabel: string;
  cancelButtonLabel: string;
  children: React.ReactNode;
  loading?: boolean;
  onClick: () => void;
  onCloseModal: () => void;
  portalId: string;
  title: string;
}

export type { IFilterModal };
