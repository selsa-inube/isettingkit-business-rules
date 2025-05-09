interface ITerm {
  onHandleStartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckClosedChange?: (isClosed: boolean) => void;
  labelStart: string;
  labelEnd: string;
  checkedClosed?: boolean;
  required?: boolean;
  valueStart?: string | Date;
  valueEnd?: string | Date;
  messageStart?: string;
  messageEnd?: string;
  statusStart?: string;
  statusEnd?: string;
}

export type { ITerm };
