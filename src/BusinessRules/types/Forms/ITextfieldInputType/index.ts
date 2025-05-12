declare const inputTypes: readonly [
  "alphabetical",
  "currency",
  "date",
  "number",
  "percentage",
];

declare type ITextfieldInputType = (typeof inputTypes)[number];

export type { ITextfieldInputType };
