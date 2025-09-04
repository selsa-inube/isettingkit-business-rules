const convertRangeToString = (value: { from: number; to: number }): string => {
  const parts: string[] = [];

  if (value.from !== undefined && value.from !== null) {
    parts.push(`>${value.from}`);
  }

  if (value.to !== undefined && value.to !== null) {
    parts.push(`<${value.to}`);
  }

  return parts.join(";");
};

export { convertRangeToString };
