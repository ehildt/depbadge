import { colord } from "colord";
import fs from "fs";
import yaml from "js-yaml";

import { findFile } from "../shared/find-file.ts";
import { hashStringToHsl } from "../shared/hash-string-to-hsl.ts";

import { BadgeStyle, DepbadgeRC, DependencyItem, Layout } from "./depbadgerc.type.ts";

type Section = {
  layout?: Layout;
  badgeStyle?: BadgeStyle;
  items: any[];
};

function mergeLayout(defaultLayout?: Layout, sectionLayout?: Layout): Layout | undefined {
  return defaultLayout || sectionLayout ? { ...defaultLayout, ...sectionLayout } : undefined;
}

function mergeStyle(defaultStyle?: BadgeStyle, sectionStyle?: BadgeStyle): BadgeStyle | undefined {
  return defaultStyle || sectionStyle ? { ...defaultStyle, ...sectionStyle } : undefined;
}

function applySectionDefaults<T extends Section>(section: T, defaultLayout?: Layout, defaultStyle?: BadgeStyle): T {
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
        color: merged.color ? colord(merged.color).toHslString() : hashStringToHsl(merged.name),
        labelColor: merged.labelColor ? colord(merged.labelColor).toHslString() : undefined,
        logoColor: merged.logoColor ? colord(merged.logoColor).toHslString() : hashStringToHsl(merged.name),
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
  const rc = yaml.load(fs.readFileSync(filePath, "utf8")) as DepbadgeRC;
  return rc;
}

export const DEPBADGERC = withDefaults(readDepbadgeRC());
