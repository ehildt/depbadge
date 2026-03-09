const REGEX = /[^a-zA-Z0-9]/g;
export const encodeLabel = (s: string) => encodeURIComponent((s ?? "").replace(REGEX, "_"));
