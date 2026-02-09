import fs from "fs";
import yaml from "js-yaml";

/**
 * Writes a badgesrc YAML file, adding the given signature,
 * with a blank line between each top-level section.
 */
export function writeBadgesrc(
  badgesrc: Record<string, any>,
  signature: string,
  path = "badgesrc.yml",
): void {
  badgesrc.signature = signature;
  const sections = Object.entries(badgesrc).map(([key, value]) => {
    const dumped = yaml.dump({ [key]: value }, { noCompatMode: true });
    return dumped.trimEnd();
  });

  const yamlText = sections.join("\n\n") + "\n";
  fs.writeFileSync(path, yamlText, "utf8");
}
