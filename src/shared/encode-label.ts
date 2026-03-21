export const encodeLabel = (s: string) => {
  return (s ?? "").replace(/^@/, "").replace(/_/g, "__").replace(/\//g, "-").replace(/\s+/g, "_");
};
