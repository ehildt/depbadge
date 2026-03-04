// apply-markdown-to-target.spec.ts
import fs from "fs";

import { findFile } from "../shared/find-file";

import { applyMarkdownToTarget } from "./apply-markdown-to-target";
import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";

jest.mock("fs");
jest.mock("../shared/find-file");

describe("applyMarkdownToTarget", () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockFindFile = findFile as jest.MockedFunction<typeof findFile>;

  const makeMockStore = (overrides: Partial<DepbadgeRC> = {}): Readonly<DepbadgeRC & Methods> => ({
    manifest: "package.json",
    target: "README.md",

    // Each section includes layout for headers
    dependencies: { items: [], layout: { showHeader: true, header: "Dependencies", position: "left" } },
    devDependencies: { items: [], layout: { showHeader: true, header: "Dev Dependencies", position: "center" } },
    peerDependencies: { items: [], layout: { showHeader: false, header: "Peer Dependencies", position: "right" } },
    statusBadges: { items: [], layout: { showHeader: true, header: "Status Badges", position: "center" } },
    output: undefined,

    // methods mocked
    processManifest: jest.fn(),
    getDependencies: jest.fn(),
    getStatusBadges: jest.fn(),
    hydrateDependencyBadges: jest.fn(),
    outputShieldioBadgesJson: jest.fn(),
    hydrateStatusBadges: jest.fn(),
    mapBadgesToMarkdown: jest.fn(),
    applyMarkdownToTarget: jest.fn(),
    mapStatusBadgesToMarkdown: jest.fn(),
    computeStateIntegrity: jest.fn(),
    outputMarkdownPreview: jest.fn(),

    ...overrides,
  });

  beforeEach(() => jest.resetAllMocks());

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
