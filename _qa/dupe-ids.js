const fs = require('fs');
const path = require('path');

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return ['_tools', '_qa', 'assets', 'node_modules'].includes(e.name) ? [] : walk(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

const report = [];
for (const f of walk('.')) {
  const html = fs.readFileSync(f, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Map();
  for (const id of ids) seen.set(id, (seen.get(id) || 0) + 1);
  const dupes = [...seen].filter(([, n]) => n > 1).map(([id, n]) => id + '×' + n);
  if (dupes.length) report.push({ file: f, dupes });
}
console.log(report.length ? JSON.stringify(report, null, 2) : 'no duplicate IDs');
