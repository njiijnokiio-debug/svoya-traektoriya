const fs = require('fs');
const path = require('path');

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return ['_tools', '_qa', 'assets', 'node_modules'].includes(e.name) ? [] : walk(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

const bad = [];
for (const f of walk('.')) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const obj = JSON.parse(m[1]);
      if (!obj['@context']) bad.push([f, 'no @context']);
    } catch (e) {
      bad.push([f, String(e)]);
    }
  }
}
console.log(bad.length ? bad : 'all JSON-LD blocks are valid');
