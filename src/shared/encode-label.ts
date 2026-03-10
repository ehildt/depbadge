export const encodeLabel = (s: string) => {
  return (s ?? "").replace(/-/g, "--").replace(/_/g, "__").replace(/\s+/g, "_");
};
