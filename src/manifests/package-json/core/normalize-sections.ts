import { WithPackageJsonArgs } from "../package-json.types";

import { Badgesrc } from "@/depbadge/types";

/**
 * Normalizes a raw RC object into a Sections object with arrays for each section.
 */
export function normalizeSections(
  badgesrc: Badgesrc<WithPackageJsonArgs>,
): WithPackageJsonArgs {
  return {
    dependencies: Array.isArray(badgesrc.dependencies)
      ? badgesrc.dependencies
      : [],
    devDependencies: Array.isArray(badgesrc.devDependencies)
      ? badgesrc.devDependencies
      : [],
    peerDependencies: Array.isArray(badgesrc.peerDependencies)
      ? badgesrc.peerDependencies
      : [],
    internalDependencies: Array.isArray(badgesrc.internalDependencies)
      ? badgesrc.internalDependencies
      : [],
  };
}
