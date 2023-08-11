// @credit: https://github.com/jamband/blog/blob/main/scripts/clear.js
import { rm } from "node:fs/promises";

await rm(".astro", { force: true, recursive: true });
await rm(".cache", { force: true, recursive: true });
await rm("dist", { force: true, recursive: true });
// await rm("node_modules", { force: true, recursive: true })
console.info("✅ Done!");
