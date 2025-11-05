const labelForGroup = (groupKey: string, indexAlt: number) => {
  if (groupKey === "group-primary") return "Condición principal";
  return `Condición alterna N° ${String(indexAlt).padStart(2, "0")}`;
};

export { labelForGroup };