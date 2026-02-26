// ------------------ DepbadgeRC Manifest Contract ---------------

/**
 * Sections of dependencies that any manifest adapter must provide. \
 * These define the required keys in the object returned by \
 * `hydrateDepbadgeDependencies`, independent of how the underlying \
 * manifest organizes its data.
 */
export type ManifestContractSection = "dependencies" | "devDependencies" | "peerDependencies";
export type ManifestDependencyMap = Record<ManifestContractSection, Record<string, string>>;

/**
 * Contract for integrating a manifest source (e.g., package.json)
 * with depbadge.
 *
 * Implementations must:
 *  - expose the manifest/project version
 *  - return a set of dependencies filtered and organized according
 *    to the depbadgerc configuration
 *
 * The manifest format is arbitrary; implementers decide how to map
 * its data to the standardized sections required by depbadge.
 */
export type ManifestContract = {
  /**
   * Returns the version of the project/application as declared
   * in the manifest.
   *
   * @returns The semantic version string of the manifest (e.g., "1.4.2").
   */
  getVersion(): string;

  /**
   * Returns the dependencies of the manifest file.
   *
   * @returns an object of dependencies satisfying the contract
   *
   * @example
   * {
   *  dependencies: { react: "^19.0.1", ... },
   *  devDependencies: { eslint: "^10.0.2", ... },
   *  peerDependencies: { ... }
   * }
   */
  getDependencies(): Record<ManifestContractSection, Record<string, string>>;
};
