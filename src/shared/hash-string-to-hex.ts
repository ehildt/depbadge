import { colord } from "colord";

export function hashStringToHex(str: string): string {
  if (!str?.length) str = "default";
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = str.charCodeAt(i) + ((h << 5) - h);
  }

  const hue = ((h % 360) + 360) % 360;
  const sat = 60 + (Math.abs(h >> 8) % 20);
  const lit = 40 + (Math.abs(h >> 16) % 15);

  // Convert to Hex and remove the '#' for Shields.io compatibility
  return colord({ h: hue, s: sat, l: lit }).toHex().replace("#", "");
}
