// Builds dist/index.js: a Cloudflare Worker that serves the page and answers GET /version.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { render } from "./src/page.mjs";

const read = (f) => JSON.parse(readFileSync(new URL(`./content/${f}`, import.meta.url), "utf8"));
const html = render({ site: read("site.json"), hours: read("hours.json"), packages: read("packages.json") });

const worker = `const HTML = ${JSON.stringify(html)};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/version") {
      return Response.json({ release: env.COMMONFORGE_RELEASE_ID ?? null, env: env.APP_ENV ?? null });
    }
    const badge = env.APP_ENV && env.APP_ENV !== "production" ? '<div class="env">' + env.APP_ENV + '</div>' : "";
    return new Response(HTML.replace("__ENV_BADGE__", badge), { headers: { "content-type": "text/html; charset=utf-8" } });
  },
};
`;
mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("./dist/index.js", import.meta.url), worker);
console.log(`built dist/index.js (${worker.length} bytes)`);
