const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const classes = new Set();

for (const match of html.matchAll(/\bclass\s*=\s*(["'])(.*?)\1/gs)) {
  match[2].split(/\s+/).filter(Boolean).forEach(className => classes.add(className));
}

const sortedClasses = [...classes].sort();
fs.writeFileSync('classes.txt', `${sortedClasses.join('\n')}\n`);
console.log(`Wrote classes.txt (${sortedClasses.length} classes)`);