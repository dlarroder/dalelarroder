const fs = require('fs');
const path = require('path');

// Fix import assertions syntax in contentlayer generated files
const filePath = path.join(process.cwd(), '.contentlayer/generated/index.mjs');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace assert { type: 'json' } with with { type: 'json' }
  content = content.replace(/assert\s*\{\s*type:\s*['"]json['"]\s*\}/g, "with { type: 'json' }");

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed import assertions syntax in contentlayer generated files');
} else {
  console.log('Contentlayer generated file not found');
}
