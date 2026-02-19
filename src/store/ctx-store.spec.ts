import { DepbadgeRC } from "../depbadgerc/depbadgerc.type";

import { useCtxStore } from "./ctx-store";

describe("useCtxStore with updated YAML layout", () => {
  const parsedYaml: DepbadgeRC = {
    integrity: "fb3a8144c7cb040fb8955d7660c7dc14ae921a2d3cabb0a6d17b2dcf8a97d06a",
    target: "README.md",
    manifest: "package.json",
    output: ["json", "markdown"],
    defaultLayout: { position: "center", header: false, theme: "dark" },
    defaultDependencyBadgeStyle: {
      color: "#4CAF50",
      labelColor: "#222222",
      isError: false,
      namedLogo: "npm",
      logoSvg: "",
      logoColor: "white",
      logoWidth: 40,
      style: "for-the-badge",
      cacheSeconds: 3600,
      link: "https://www.npmjs.com/package/example_package",
      tile: false,
    },
    defaultDevDependencyBadgeStyle: {
      color: "#4CAF50",
      labelColor: "#333333",
      isError: false,
      namedLogo: "npm",
      logoSvg: "",
      logoColor: "white",
      logoWidth: 40,
      style: "flat-square",
      cacheSeconds: 3600,
      link: "https://www.npmjs.com/package/example_package",
      tile: false,
    },
    defaultPeerDependencyBadgeStyle: {
      color: "#4CAF50",
      labelColor: "#444444",
      isError: false,
      namedLogo: "npm",
      logoSvg: "",
      logoColor: "white",
      logoWidth: 40,
      style: "flat",
      cacheSeconds: 3600,
      link: "https://www.npmjs.com/package/example_package",
      tile: false,
    },
    defaultStatusBadgeStyle: {
      color: "#0078D4",
      labelColor: "#222222",
      isError: false,
      namedLogo: "",
      logoSvg: "",
      logoColor: "white",
      logoWidth: 40,
      style: "for-the-badge",
      cacheSeconds: 3600,
      link: "https://something.com",
      tile: false,
    },
    dependencies: {
      layout: { position: "center", header: false, theme: "dark" },
      badgeStyle: {
        color: "#4CAF50",
        labelColor: "#222222",
        isError: false,
        namedLogo: "npm",
        logoSvg: "",
        logoColor: "white",
        logoWidth: 40,
        style: "for-the-badge",
        cacheSeconds: 3600,
        link: "https://www.npmjs.com/package/example_package",
        tile: false,
      },
      items: [{ name: "chalk" }, { name: "js-yaml" }],
    },
    devDependencies: {
      layout: { position: "center", header: false, theme: "dark" },
      badgeStyle: {
        color: "#4CAF50",
        labelColor: "#333333",
        isError: false,
        namedLogo: "npm",
        logoSvg: "",
        logoColor: "white",
        logoWidth: 40,
        style: "flat-square",
        cacheSeconds: 3600,
        link: "https://www.npmjs.com/package/example_package",
        tile: false,
      },
      items: [{ name: "typescript" }, { name: "eslint" }],
    },
    peerDependencies: {
      layout: { position: "center", header: false, theme: "white" },
      badgeStyle: {
        color: "#4CAF50",
        labelColor: "#444444",
        isError: false,
        namedLogo: "npm",
        logoSvg: "",
        logoColor: "white",
        logoWidth: 40,
        style: "flat",
        cacheSeconds: 3600,
        link: "https://www.npmjs.com/package/example_package",
        tile: false,
      },
      items: [{ name: "eslint" }],
    },
    statusBadges: {
      layout: { position: "center", header: false, theme: "dark" },
      badgeStyle: {
        color: "#0078D4",
        labelColor: "#222222",
        isError: false,
        namedLogo: "",
        logoSvg: "",
        logoColor: "white",
        logoWidth: 40,
        style: "for-the-badge",
        cacheSeconds: 3600,
        link: "https://something.com",
        tile: false,
      },
      items: [
        { name: "github", metric: "release", user: "ehildt", repo: "depbadge", branch: "main", namedLogo: "npm" },
        { name: "docker", metric: "pulls", user: "ehildt", image: "myimage", tag: null },
        { name: "codecov", user: "ehildt", repo: "depbadge", branch: "main", flag: "c" },
      ],
    },
  };

  it("creates a frozen store with correct updated layout structure", () => {
    const store = useCtxStore(parsedYaml);

    // immutability
    expect(Object.isFrozen(store)).toBe(true);

    // top-level keys
    expect(store.integrity).toBe(parsedYaml.integrity);
    expect(store.target).toBe(parsedYaml.target);
    expect(store.manifest).toBe(parsedYaml.manifest);

    // dependencies (optional)
    expect(store.dependencies).toBeDefined();
    expect(store.dependencies!.items).toHaveLength(2);
    expect(store.dependencies!.items[0].name).toBe("chalk");

    // devDependencies (optional)
    expect(store.devDependencies).toBeDefined();
    expect(store.devDependencies!.items).toHaveLength(2);

    // peerDependencies (optional)
    expect(store.peerDependencies).toBeDefined();
    expect(store.peerDependencies!.items).toHaveLength(1);

    // layout inside dependencies (optional)
    expect(store.dependencies!.layout).toBeDefined();
    expect(store.dependencies!.layout!.position).toBe("center");
    expect(store.dependencies!.layout!.header).toBe(false);

    // statusBadges (optional)
    expect(store.statusBadges).toBeDefined();
    expect(store.statusBadges!.items).toHaveLength(3);

    // layout inside statusBadges (optional)
    expect(store.statusBadges!.layout).toBeDefined();
    expect(store.statusBadges!.layout!.position).toBe("center");
    expect(store.statusBadges!.layout!.header).toBe(false);

    // first status badge
    expect(store.statusBadges!.items[0]).toHaveProperty("metric", "release");
  });

  it("binds a method correctly when using factories", () => {
    type Methods = { getManifestVersion(): string };

    const methodFactories = {
      getManifestVersion: (store: DepbadgeRC & Methods) => () => store.manifest,
    };

    const storeWithMethods = useCtxStore(parsedYaml, methodFactories);

    expect(storeWithMethods.getManifestVersion()).toBe("package.json");
    expect(Object.isFrozen(storeWithMethods)).toBe(true);
  });
});
