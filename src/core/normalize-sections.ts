import { Sections } from "./types";

/**
 * Normalizes a raw RC object into a Sections object with arrays for each section.
 */
export function normalizeSections(rc: Record<string, any>): Sections {
  return {
    dependencies: Array.isArray(rc.dependencies) ? rc.dependencies : [],
    devDependencies: Array.isArray(rc.devDependencies)
      ? rc.devDependencies
      : [],
    peerDependencies: Array.isArray(rc.peerDependencies)
      ? rc.peerDependencies
      : [],
    internalDependencies: Array.isArray(rc.internalDependencies)
      ? rc.internalDependencies
      : [],
  };
}
