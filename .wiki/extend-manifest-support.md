# Extend Manifest Support

Adding a manifest to depbadge is straightforward. First, create a folder for your manifest under `src/manifest/<your-manifest-filename>` (e.g., `src/manifest/package-json/`) to house all code for that manifest.

### Read and Parse the Manifest

Define a manifest interface. Full type safety isn’t required; it just needs enough typing to enable linting for versions and dependencies. Save the interface in a file such as `manifest.type.ts`. Then create `manifest.read.ts`. This module is responsible for loading and parsing the manifest, returning the result typed according to the defined interface. 

A working example is available in the following files:
- `src/manifest/package-json/manifest.type.ts` 
- `src/manifest/package-json/manifest.read.ts`

###  Manifest Context Store

Each manifest file has its own context store. Use the useCtxStore hook to create this context store. The context store must implement the manifest contract—an interface that defines two required functions:

```ts
getVersion(): string;
getDependencies(): Record<ManifestContractSection, Record<string, string>>;
```

- `getVersion` - returns the version of the app

```ts
getVersion() // v1.0.9
```

- `getDependencies` - returns an object of sections and its key/value-pairs

```ts
getDependencies();

/** 
 * { 
 *   dependencies: { react: "^19.2.0", vite: "v7.3.1"},
 *   devDependencies: {}, // empty object if unused
 *   peerDependencies: {}, // empty object if unused
 * }
 */
```

It doesn’t matter how your manifest files are structured; the only requirement is that they implement the manifest contract. A working example can be found in:

 - `src/manifest/package-json/get-version.ts`.
 - `src/manifest/package-json/get-dependencies.ts` 
 - `src/manifest/package-json/manifest.store.ts`

### Manifest Map

Each manifest context store must be registered in the manifest map located in `src/index.ts`. The map is a plain object where the key represents the manifest file name and the value references the corresponding manifest context store responsible for handling that manifest.

```ts
  const manifestMap = {
    "package.json": PackageJsonCtx,
    "pyproject.toml": PyProjectCtx,
    "Cargo.toml": CargoTomlCtx,
  } as const;
```

### DepbadgeRC Schema

After adding your code, update depbadgerc.schema.json to include your manifest in the enum list:

```json
"manifest": { "enum": ["package.json", "pyproject.toml", "Cargo.toml", "your-manifest-file"] }
```

### The Hallmarks of Good Engineers 😎

A friendly reminder for anyone brave enough to touch the code:

- Test your code – because your future self will hate you otherwise. 🧪
- Write docs – or at least leave breadcrumbs for the next poor soul. 📝
- Open decent PRs – no 500-line surprises, please. 👀
- Keep it simple – clever hacks are for wizards, not humans. 🧙‍♂️
- Think maintainable – your teammates are not psychic. 🔧
- Communicate – talk, don’t just push. 🗣️
- Review code like a human – be kind, but don’t let bad code sneak in. 🕵️
