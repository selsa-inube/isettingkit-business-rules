interface ILayout {
  columns?: { desktop: string; mobile: string };
  gapToken?: string;
  variant?: "lightCard" | "none";
}

export type { ILayout };