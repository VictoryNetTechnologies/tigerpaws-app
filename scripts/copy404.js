const fs = require('fs');
const path = require('path');

const distBrowser = path.join(__dirname, '..', 'dist', 'tigerpaws-app', 'browser');
const src = path.join(distBrowser, 'index.html');
const dest = path.join(distBrowser, '404.html');

if (!fs.existsSync(src)) {
  console.error('Source file does not exist:', src);
  process.exit(1);
}

try {
  fs.copyFileSync(src, dest);
  console.log('Copied', src, 'to', dest);
} catch (err) {
  console.error('Failed to copy file:', err);
  process.exit(2);
}
