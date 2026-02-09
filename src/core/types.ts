export type Badge = {
  schemaVersion: 1;
  label: string;
  message: string;
  color: string;
};

export type Sections = {
  dependencies?: Array<string>;
  devDependencies?: Array<string>;
  peerDependencies?: Array<string>;
  internalDependencies?: Array<string>;
};

export type PackageDeps = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

export type BadgeMap = Record<string, Badge>;
export type Badgesrc = Sections & { signature?: string };
