const fs = require('fs');
const path = require('path');

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['_tools', '_qa', 'assets', 'node_modules'].includes(e.name)) continue;
      walk(p);
    } else if (p.endsWith('.html')) files.push(p);
  }
})('.');

const problems = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const baseDir = path.dirname(f);
  const attrs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const url of attrs) {
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(url)) continue;
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.resolve(baseDir, clean);
    const candidates = [target, target + '.html', path.join(target, 'index.html')];
    if (!candidates.some((c) => fs.existsSync(c))) {
      problems.push({ file: f, url });
    }
  }
}

// sitemap urls
const sm = fs.readFileSync('sitemap.xml', 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  const rel = loc.replace('https://svoya-traektoriya.ru/', '');
  const target = rel === '' ? 'index.html' : rel;
  if (!fs.existsSync(target)) problems.push({ file: 'sitemap.xml', url: loc });
}

// robots + manifest
const robots = fs.readFileSync('robots.txt', 'utf8');
if (!/Sitemap:\s*https:\/\//.test(robots)) problems.push({ file: 'robots.txt', url: 'no sitemap' });
JSON.parse(fs.readFileSync('site.webmanifest', 'utf8'));

// internal anchors
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/href="([^"#]*)#([^"]+)"/g)) {
    const filePart = m[1];
    const anchor = decodeURIComponent(m[2]);
    if (filePart && !/\.html$/.test(filePart)) continue;
    let targetHtml = html;
    if (filePart) {
      const target = path.resolve(path.dirname(f), filePart);
      if (!fs.existsSync(target)) continue;
      targetHtml = fs.readFileSync(target, 'utf8');
    }
    const targetIds = new Set([...targetHtml.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
    if (!targetIds.has(anchor)) problems.push({ file: f, url: m[0] });
  }
}

console.log('html files:', files.length, '| sitemap urls:', locs.length);
console.log(problems.length ? JSON.stringify(problems, null, 2) : 'no broken internal links or anchors');
