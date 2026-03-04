import fs from "fs";

import { outputMarkdownPreview } from "./output-markdown-preview";

jest.mock("fs");

describe("outputMarkdownPreview", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => jest.clearAllMocks());

  const bind = (storeOverrides: any = {}) => {
    const store = {
      dependencies: { layout: {} },
      devDependencies: { layout: {} },
      peerDependencies: { layout: {} },
      statusBadges: { layout: {} },
      ...storeOverrides,
    } as any;

    return outputMarkdownPreview(store);
  };

  it("writes markdown preview file for simple badges", () => {
    const run = bind();
    run("BADGES", { dependencies: ["badge1", "badge2"] });

    expect(mockedFs.mkdirSync).toHaveBeenCalledWith(".depbadge", { recursive: true });
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(".depbadge/BADGES.md", "badge1\nbadge2");
  });

  it("adds header when showHeader is true", () => {
    const run = bind({ dependencies: { layout: { showHeader: true, header: "Deps" } } });
    run("BADGES", { dependencies: ["badge"] });

    // Matches exact newlines from implementation
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(".depbadge/BADGES.md", "# Deps\n\nbadge");
  });

  it("wraps content with alignment div when position exists", () => {
    const run = bind({ dependencies: { layout: { position: "center" } } });
    run("BADGES", { dependencies: ["badge"] });

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      ".depbadge/BADGES.md",
      '<div align="center">\n\n\nbadge\n\n</div>',
    );
  });

  it("wraps content with header + alignment div", () => {
    const run = bind({
      dependencies: { layout: { showHeader: true, header: "Deps", position: "center" } },
    });
    run("BADGES", { dependencies: ["badge"] });

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      ".depbadge/BADGES.md",
      '<div align="center">\n\n# Deps\n\nbadge\n\n</div>',
    );
  });

  it("supports custom output directory", () => {
    const run = bind();
    run("BADGES", { dependencies: ["badge"] }, "preview");

    expect(mockedFs.mkdirSync).toHaveBeenCalledWith("preview", { recursive: true });
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith("preview/BADGES.md", "badge");
  });

  it("does nothing when markdown map is empty", () => {
    const run = bind();
    run("BADGES", {});

    expect(mockedFs.mkdirSync).not.toHaveBeenCalled();
    expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
  });
});
