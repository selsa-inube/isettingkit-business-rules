declare const inputTypes: readonly [
  "alphabetical",
  "currency",
  "date",
  "number",
  "percentage",
  "monetary",
];

declare type ITextfieldInputType = (typeof inputTypes)[number];

export type { ITextfieldInputType };
