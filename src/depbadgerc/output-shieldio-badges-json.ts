import fs from "fs";
import path from "path";

import { useCtxCallback } from "../store/ctx-store";

import { HydratedDependencyMap } from "./hydrate-dependency-badges";

export const outputShieldioBadgesJson = useCtxCallback((_, hbm: HydratedDependencyMap, dir = ".depbadge"): void => {
  Object.entries(hbm).forEach(([section, badgesMap]) => {
    const sectionPath = path.join(dir, section);
    fs.mkdirSync(sectionPath, { recursive: true });
    Object.entries(badgesMap).forEach(([name, badge]) => {
      const filePath = path.join(sectionPath, `${name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(badge, null, 2));
    });
  });
});
