// Renders the one-page site from the content files. Kept dependency-free on purpose.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export function render({ site, hours, packages }) {
  const rows = (list) => list.map((r) => `<tr><th>${esc(r.days)}</th><td>${esc(r.hours)}</td></tr>`).join("");
  const special = hours.special?.length
    ? `<h3>Holiday hours</h3><table class="hours special">${rows(hours.special)}</table>`
    : "";
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(site.name)}</title>
<style>
  :root { --ink:#14263a; --crust:#1f6f8b; --flour:#f5f8fa; --line:#d6e2ea; }
  * { box-sizing:border-box } body { margin:0; font:18px/1.55 Georgia, "Iowan Old Style", serif; color:var(--ink); background:var(--flour) }
  header { padding:72px 24px 56px; text-align:center; background:linear-gradient(#dcebf3,#f5f8fa) }
  h1 { font-size:56px; margin:0 0 8px; letter-spacing:-0.5px } .tag { font-size:21px; margin:0 auto; max-width:34em; color:#3d5468 }
  main { max-width:880px; margin:0 auto; padding:24px; display:grid; grid-template-columns:1fr 1fr; gap:40px }
  h2 { color:var(--crust); font-size:24px; border-bottom:2px solid var(--line); padding-bottom:6px } h3 { color:var(--crust); margin:24px 0 6px; font-size:19px }
  table { width:100%; border-collapse:collapse } th,td { text-align:left; padding:7px 0; border-bottom:1px solid var(--line); font-weight:normal } td { text-align:right }
  .note { display:block; font-size:14px; color:#5d7385 } footer { text-align:center; padding:40px 24px; color:#5d7385; font-size:15px }
  .env { position:fixed; top:12px; right:12px; background:#14263a; color:#fff; font:600 13px system-ui; padding:5px 10px; border-radius:6px }
  @media (max-width:700px) { main { grid-template-columns:1fr } h1 { font-size:40px } }
</style></head>
<body>
__ENV_BADGE__
<header><h1>${esc(site.name)}</h1><p class="tag">${esc(site.tagline)}</p></header>
<main>
  <section><h2>Booking desk hours</h2><table class="hours">${rows(hours.regular)}</table>${special}</section>
  <section><h2>Packages</h2><table>${packages.map((m) => `<tr><th>${esc(m.item)}${m.note ? `<span class="note">${esc(m.note)}</span>` : ""}</th><td>${esc(m.price)}</td></tr>`).join("")}</table></section>
</main>
<footer>${esc(site.address)} · ${esc(site.phone)}</footer>
</body></html>`;
}
