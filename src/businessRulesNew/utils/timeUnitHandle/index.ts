const timeUnitHandle = (labelName: string, timeUnit: string): string => {
  switch (timeUnit) {
    case "Year":
      return `${labelName} en años`;
    case "Month":
      return `${labelName} en meses`;
    case "Day":
      return `${labelName} en días`;
    default:
      return `${labelName}`;
  }
};
export { timeUnitHandle };
