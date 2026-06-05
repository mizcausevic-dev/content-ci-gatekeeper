import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import {
  renderContentPolicy,
  renderDocs,
  renderOverview,
  renderReleaseLane,
  renderVerification
} from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "content-policy/index.html", content: renderContentPolicy() },
  { path: "release-lane/index.html", content: renderReleaseLane() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://content.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://content.kineticgain.com/</loc></url>\n  <url><loc>http://content.kineticgain.com/content-policy/</loc></url>\n  <url><loc>http://content.kineticgain.com/release-lane/</loc></url>\n  <url><loc>http://content.kineticgain.com/verification/</loc></url>\n  <url><loc>http://content.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
