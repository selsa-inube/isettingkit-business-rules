import { IRuleDecision } from "@isettingkit/input";

interface IRevertSortedData {
  decisionTemplate?: IRuleDecision;
  dataDecision?: IRuleDecision;
  decision?: IRuleDecision;
  decisions?: IRuleDecision[];
  originalDecision?: IRuleDecision;
}

export type { IRevertSortedData };
