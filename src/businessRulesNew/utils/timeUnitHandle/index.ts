interface ITimeUnit {
  label: string;
  labelView: string;
}

const TIME_UNIT_MAP: Record<string, ITimeUnit> = {
  Year: { label: "en años", labelView: "años" },
  Month: { label: "en meses", labelView: "meses" },
  Day: { label: "en días", labelView: "días" },
};

const timeUnitHandle = (labelName: string, timeUnit?: string, view = false): string => {
  const unit = TIME_UNIT_MAP[timeUnit ?? ""];

  if (!unit) return labelName;

  return view
    ? `${labelName} ${unit.labelView}`
    : `${labelName} ${unit.label}`;
};

export { timeUnitHandle };
