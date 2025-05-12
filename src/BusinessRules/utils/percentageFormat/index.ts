const percentageFormat = (percentage: number): string => {
  if (percentage === 0 || !percentage) {
    return "0%";
  }
  return `${percentage.toFixed(0)}%`;
};

export { percentageFormat };
