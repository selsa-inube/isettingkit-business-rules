function joinPath(base: string, key: string) {
  return base ? `${base}.${key}` : key;
}
export { joinPath };