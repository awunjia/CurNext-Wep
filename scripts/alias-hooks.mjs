import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");

function resolvePath(bare) {
  const candidates = [
    bare,
    `${bare}.ts`,
    `${bare}.tsx`,
    `${bare}.js`,
    path.join(bare, "index.ts"),
    path.join(bare, "index.tsx"),
    path.join(bare, "index.js"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return `${bare}.ts`;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = resolvePath(path.join(root, "src", specifier.slice(2)));
    return nextResolve(pathToFileURL(target).href, context);
  }
  if (
    context.parentURL?.includes("/src/") &&
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !path.extname(specifier)
  ) {
    const parentDir = path.dirname(
      new URL(context.parentURL).pathname.replace(/%20/g, " "),
    );
    const target = resolvePath(path.join(parentDir, specifier));
    return nextResolve(pathToFileURL(target).href, context);
  }
  return nextResolve(specifier, context);
}
