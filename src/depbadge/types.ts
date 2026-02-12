export type Badge = {
  schemaVersion: 1;
  label: string;
  message: string;
  color: string;
};

export type BadgeMap = Record<string, Badge>;

export type ManifestFile =
  | "package.json"
  | "pyproject.toml"
  | "Cargo.toml"
  | "pom.xml";

export type Badgesrc<T = unknown> = T & {
  target?: string;
  signature?: string;
  manifestFile: ManifestFile;
  readmePath: string;
  generateBadgesPreview: boolean;
  generateBadgesJson: boolean;
};

export type Data<T = any> = {
  badgesJson: BadgeMap;
  badgesMD: string;
  signature: string;
  manifest: T;
};

export type ManifestHandlers = Map<string, () => Data>;
