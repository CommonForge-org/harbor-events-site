# Harbor Events — example client site

A small one-page website for a fictional waterfront event venue, used as the example client
project in the [CommonForge](https://github.com/CommonForge-org/commonforge) walkthrough videos.

- `content/` — what the client changes: booking-desk hours, packages, address.
- `src/page.mjs` — the page template. `build.mjs` turns both into `dist/index.js`, a Cloudflare Worker.
- `wrangler.jsonc` — the compatibility date the release deploy uses.
- `GET /version` answers `{ "release": <COMMONFORGE_RELEASE_ID> }`, the health check CommonForge's release step expects.

```sh
pnpm run build     # no dependencies; Node.js 18+
```

Harbor Events is fictional; its prices are made up. MIT licensed.
