export type Manifest = {
  package: {
    name: string;
    version: string;
    edition: string;
    authors?: string[];
    description?: string;
  };

  dependencies?: Record<string, string | { version: string; optional?: boolean; features?: string[] }>;
  "dev-dependencies"?: Record<string, string | { version: string; optional?: boolean; features?: string[] }>;
  features?: Record<string, string[]>; // feature name → list of dependencies activated by feature
};
