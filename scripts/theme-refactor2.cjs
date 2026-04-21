const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/from-navy-950/g, 'from-background');
  content = content.replace(/via-navy-950/g, 'via-background');
  content = content.replace(/to-navy-950/g, 'to-background');
  content = content.replace(/border-navy-950/g, 'border-background');
  content = content.replace(/text-navy-950/g, 'text-background');
  content = content.replace(/bg-navy-950/g, 'bg-background');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
});
