export type Manifest = {
  "build-system": {
    requires: string[];
    "build-backend": string;
  };

  project: {
    name: string;
    version: string;
    description?: string;
    readme?: string;
    "requires-python"?: string;
    dependencies?: string[];

    "optional-dependencies"?: {
      dev?: string[];
    } & Record<string, string[] | undefined>;
  };
};
