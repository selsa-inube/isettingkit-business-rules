function toTitle(path: string) {
  const last = path.split(".").pop() ?? path;
  const spaced = last.replace(/([A-Z])/g, " $1").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export { toTitle };