import fs from "node:fs";
import { parseArgs } from "node:util";

import yaml from "yaml";

import { findFile } from "../shared/find-file.ts";
import { hashStringToHex } from "../shared/hash-string-to-hex.ts";
import { resolveYamlMergeKey } from "../shared/resolve-yaml-merge-key.ts";

import type { BadgeStyle, DepbadgeRC, DependencyItem, Layout, OutputFormat } from "./depbadgerc.type.ts";

type Section = {
  layout?: Layout;
  badgeStyle?: BadgeStyle;
  items: any[];
};

export function mergeLayout(defaultLayout?: Layout, sectionLayout?: Layout): Layout | undefined {
  return defaultLayout || sectionLayout ? { ...defaultLayout, ...sectionLayout } : undefined;
}

export function mergeStyle(defaultStyle?: BadgeStyle, sectionStyle?: BadgeStyle): BadgeStyle | undefined {
  return defaultStyle || sectionStyle ? { ...defaultStyle, ...sectionStyle } : undefined;
}

export function applySectionDefaults<T extends Section>(
  section: T,
  defaultLayout?: Layout,
  defaultStyle?: BadgeStyle,
): T {
  const layout = mergeLayout(defaultLayout, section.layout);
  const badgeStyle = mergeStyle(defaultStyle, section.badgeStyle);

  return {
    ...section,
    layout,
    badgeStyle,
    items: section.items.map((item) => {
      const merged = { ...defaultStyle, ...section.badgeStyle, ...item };
      return {
        ...merged,
        color: merged.color ?? hashStringToHex(merged.name),
        logoColor: merged.logoColor ?? hashStringToHex(merged.name),
        labelColor: merged.labelColor ?? hashStringToHex(merged.labelColor),
      } as DependencyItem;
    }),
  };
}

export function withDefaults(rc: DepbadgeRC): DepbadgeRC {
  return {
    ...rc,
    dependencies: applySectionDefaults(rc.dependencies, rc.dependenciesLayout, rc.dependenciesStyle),

    devDependencies: rc.devDependencies
      ? applySectionDefaults(rc.devDependencies, rc.devDependenciesLayout, rc.devDependenciesStyle)
      : undefined,

    peerDependencies: rc.peerDependencies
      ? applySectionDefaults(rc.peerDependencies, rc.peerDependenciesLayout, rc.peerDependenciesStyle)
      : undefined,

    statusBadges: rc.statusBadges
      ? applySectionDefaults(rc.statusBadges, rc.statusBadgesLayout, rc.statusBadgesStyle)
      : undefined,
  };
}

/**
 * Reads depbadgerc.yml and parses it as DepbadgeRC
 */
export function readDepbadgeRC(path = "depbadgerc.yml"): DepbadgeRC {
  const filePath = findFile(path);
  if (!filePath) throw new Error(`${path} not found`);
  const rc = resolveYamlMergeKey(yaml.parse(fs.readFileSync(filePath, "utf8"))) as DepbadgeRC;
  return rc;
}

export function withArgs(rc: DepbadgeRC): DepbadgeRC {
  rc.output ??= [];
  const { values } = parseArgs({
    options: {
      g: {
        type: "string",
        multiple: true,
      },
      generate: {
        type: "string",
        multiple: true,
      },
    },
  });
  const arrayfy = (v?: string | string[]) => (v ? (Array.isArray(v) ? v : [v]) : []);
  const gSet = new Set([...arrayfy(values.g), ...arrayfy(values.generate)]);
  (["json", "markdown"] as OutputFormat[]).forEach((t) => gSet.has(t) && !rc.output!.includes(t) && rc.output!.push(t));
  return rc;
}

export const getDepbadgeRC = () => withArgs(withDefaults(readDepbadgeRC()));
