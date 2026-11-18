const fs = require('fs');
const path = require('path');

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === '_tools' || e.name === '_qa' || e.name === 'assets' || e.name === 'node_modules') return [];
      return walk(p);
    }
    return p.endsWith('.html') ? [p] : [];
  });
}

const rows = walk('.').map((f) => {
  const s = fs.readFileSync(f, 'utf8');
  const t = (s.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const d = (s.match(/<meta name="description" content="([\s\S]*?)">/) || [])[1] || '';
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  const can = (s.match(/rel="canonical" href="([^"]+)"/) || [])[1] || '';
  const og = (s.match(/property="og:title" content="([^"]+)"/) || [])[1] || '';
  const jsonld = (s.match(/application\/ld\+json/g) || []).length;
  const imgs = (s.match(/<img /g) || []).length;
  return { f: f.replace(/\\/g, '/'), t, d, h1, can, og, jsonld, imgs };
});

const dup = (k) => {
  const m = {};
  rows.forEach((r) => ((m[r[k]] = m[r[k]] || []).push(r.f)));
  return Object.entries(m).filter(([, v]) => v.length > 1);
};

console.log('files:', rows.length);
console.log('duplicate titles:', JSON.stringify(dup('t')));
console.log('duplicate descriptions:', JSON.stringify(dup('d')));
console.log('h1 != 1:', JSON.stringify(rows.filter((r) => r.h1 !== 1).map((r) => [r.f, r.h1])));
console.log('no canonical:', JSON.stringify(rows.filter((r) => !r.can).map((r) => r.f)));
console.log('canonical != og:', JSON.stringify(rows.filter((r) => r.og && !r.can.endsWith(r.f.replace(/\\/g, '/').replace(/^\.\//, '').replace('index.html', ''))).map((r) => [r.f, r.can])));
console.log('long titles:', JSON.stringify(rows.filter((r) => r.t.length > 65).map((r) => [r.f, r.t.length, r.t])));
console.log('long desc:', JSON.stringify(rows.filter((r) => r.d.length > 165).map((r) => [r.f, r.d.length])));
console.log('short/missing desc:', JSON.stringify(rows.filter((r) => r.d.length < 70).map((r) => [r.f, r.d.length])));
console.log('---');
rows.forEach((r) => console.log(r.f, '|', r.t, '|', r.can.replace('https://svoya-traektoriya.ru', ''), '| ld+json:', r.jsonld));
