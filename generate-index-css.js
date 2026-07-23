const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlPath = path.join(rootDir, 'index.html');
const scriptPath = path.join(rootDir, 'js', 'script.js');
const classesPath = path.join(rootDir, 'classes.txt');
const sourceCssPath = path.join(rootDir, 'css', 'index copy.css');
const outputCssPath = path.join(rootDir, 'css', 'index.css');

function collectHtmlClasses(html) {
  const classes = new Set();
  for (const match of html.matchAll(/\bclass\s*=\s*(["'])(.*?)\1/gs)) {
    match[2].split(/\s+/).filter(Boolean).forEach(className => classes.add(className));
  }
  return classes;
}

function collectDynamicClasses(script) {
  const classes = new Set();
  for (const match of script.matchAll(/classList\.(?:add|remove|toggle|contains)\(([^)]*)\)/g)) {
    for (const quoted of match[1].matchAll(/['"]([^'"]+)['"]/g)) classes.add(quoted[1]);
  }
  for (const match of script.matchAll(/className\s*=\s*['"]([^'"]+)['"]/g)) {
    match[1].split(/\s+/).filter(Boolean).forEach(className => classes.add(className));
  }
  return classes;
}

function escapeClassName(className) {
  let escaped = '';
  for (const character of className) {
    if (/[a-zA-Z0-9_-]/.test(character)) escaped += character;
    else if (character === ',') escaped += '\\2c ';
    else escaped += `\\${character}`;
  }
  return escaped;
}

function isExternalOrBehaviorClass(className) {
  return /^(?:fa(?:-|$)|fab$)/.test(className)
    || new Set([
      'active', 'disabled', 'carousel-container', 'carousel-content', 'carousel-item',
      'honorary-carousel', 'mobile-dropdown', 'mobile-dropdown-content', 'nav-btn'
    ]).has(className);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const script = fs.readFileSync(scriptPath, 'utf8');
const sourceCss = fs.readFileSync(sourceCssPath, 'utf8');
const htmlClasses = collectHtmlClasses(html);
const dynamicClasses = collectDynamicClasses(script);
const allClasses = new Set([...htmlClasses, ...dynamicClasses]);
const uncoveredClasses = [...allClasses]
  .filter(className => !isExternalOrBehaviorClass(className))
  .filter(className => !sourceCss.includes(`.${escapeClassName(className)}`))
  .sort();

if (uncoveredClasses.length) {
  console.error('Missing CSS rules for:');
  console.error(uncoveredClasses.join('\n'));
  process.exit(1);
}

const sortedHtmlClasses = [...htmlClasses].sort();
fs.writeFileSync(classesPath, `${sortedHtmlClasses.join('\n')}\n`);
fs.writeFileSync(outputCssPath, sourceCss);
console.log(`Generated css/index.css (${Buffer.byteLength(sourceCss)} bytes)`);
console.log(`Validated ${htmlClasses.size} HTML classes and ${dynamicClasses.size} dynamic classes`);