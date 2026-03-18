import fs from "fs";
import { Mocked, MockedFunction } from "vitest";

import { findFile } from "../shared/find-file.ts";

import { applyMarkdownToTarget } from "./apply-markdown-to-target.ts";
import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC } from "./depbadgerc.type.ts";

vi.mock("fs");
vi.mock("../shared/find-file");

describe("applyMarkdownToTarget", () => {
  const mockFs = fs as Mocked<typeof fs>;
  const mockFindFile = findFile as MockedFunction<typeof findFile>;

  const makeMockStore = (overrides: Partial<DepbadgeRC> = {}): Readonly<DepbadgeRC & Methods> => ({
    manifest: "package.json",
    target: "README.md",

    // Each section includes layout for headers
    dependencies: {
      items: [],
      layout: { showHeader: true, header: "Dependencies", position: "left" },
    },
    devDependencies: {
      items: [],
      layout: {
        showHeader: true,
        header: "Dev Dependencies",
        position: "center",
      },
    },
    peerDependencies: {
      items: [],
      layout: {
        showHeader: false,
        header: "Peer Dependencies",
        position: "right",
      },
    },
    statusBadges: {
      items: [],
      layout: { showHeader: true, header: "Status Badges", position: "center" },
    },
    output: undefined,

    // methods mocked
    processManifest: vi.fn(),
    getDependencies: vi.fn(),
    getStatusBadges: vi.fn(),
    hydrateDependencyBadges: vi.fn(),
    outputShieldioBadgesJson: vi.fn(),
    hydrateStatusBadges: vi.fn(),
    mapBadgesToMarkdown: vi.fn(),
    applyMarkdownToTarget: vi.fn(),
    mapStatusBadgesToMarkdown: vi.fn(),
    computeStateIntegrity: vi.fn(),
    outputMarkdownPreview: vi.fn(),

    ...overrides,
  });

  beforeEach(() => vi.resetAllMocks());

  it("renders multiple markdown sections into the DEPBADGE block", () => {
    const store = makeMockStore();
    const boundApply = applyMarkdownToTarget(store);

    const markdowns: Record<string, string[]>[] = [
      { dependencies: ["- dep1", "- dep2"] },
      { devDependencies: ["- dev1"] },
      { peerDependencies: ["- peer1"] },
      { statusBadges: ["- status1"] },
    ];

    mockFindFile.mockReturnValue("/fake/README.md");
    mockFs.readFileSync.mockReturnValue(
      "Start content\n<!-- DEPBADGE:START -->\nOld badges\n<!-- DEPBADGE:END -->\nEnd content",
    );

    boundApply(...markdowns);

    const written = mockFs.writeFileSync.mock.calls[0][1] as string;

    expect(written).toContain("Dependencies");
    expect(written).toContain("Dev Dependencies");
    expect(written).toContain("Status Badges");

    expect(written).toContain("- dep1");
    expect(written).toContain("- dep2");
    expect(written).toContain("- dev1");
    expect(written).toContain("- peer1");
    expect(written).toContain("- status1");

    expect(written).toContain('<div align="left">');
    expect(written).toContain('<div align="center">');
    expect(written).toContain('<div align="right">');
  });

  it("renders a single markdown object correctly", () => {
    const store = makeMockStore();
    const boundApply = applyMarkdownToTarget(store);

    mockFindFile.mockReturnValue("/fake/README.md");
    mockFs.readFileSync.mockReturnValue("Old content\n<!-- DEPBADGE:START -->\nOld\n<!-- DEPBADGE:END -->\nEnd");

    boundApply({ dependencies: ["- onlyDep"] });

    const written = mockFs.writeFileSync.mock.calls[0][1] as string;

    expect(written).toContain("Dependencies"); // header now appears
    expect(written).toContain("- onlyDep");
    expect(written).toContain('<div align="left">');
    expect(written).toContain("<!-- DEPBADGE:START -->");
    expect(written).toContain("<!-- DEPBADGE:END -->");
  });

  it("does nothing if target file is not found", () => {
    const store = makeMockStore();
    const boundApply = applyMarkdownToTarget(store);

    mockFindFile.mockReturnValue(null);

    boundApply({ dependencies: ["- dep1"] });

    expect(mockFs.readFileSync).not.toHaveBeenCalled();
    expect(mockFs.writeFileSync).not.toHaveBeenCalled();
  });
});
