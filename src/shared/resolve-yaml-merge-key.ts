/**
 * Resolves YAML merge key (<<: *anchor) that is not handled by the YAML 1.2 spec.\
 * YAML 1.1 supported <<: to merge one mapping into another, but this was removed in YAML 1.2.\
 * This function post-processes the parsed YAML to restore that functionality.
 */
export function resolveYamlMergeKey<T>(obj: T): T {
  if (Array.isArray(obj)) return obj.map(resolveYamlMergeKey) as T;
  if (obj && typeof obj === "object") {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key === "<<") {
        const merged = resolveYamlMergeKey(value);
        if (Array.isArray(merged)) {
          merged.forEach((m) => {
            if (m && typeof m === "object") Object.assign(result, resolveYamlMergeKey(m));
          });
        } else if (merged && typeof merged === "object") Object.assign(result, resolveYamlMergeKey(merged));
      } else result[key] = resolveYamlMergeKey(value);
    }

    return result as T;
  }

  return obj;
}
