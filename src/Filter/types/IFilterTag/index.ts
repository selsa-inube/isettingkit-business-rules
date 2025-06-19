interface IFilterTag {
  icon: JSX.Element;
  label: string;
  onClose?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export type { IFilterTag };
