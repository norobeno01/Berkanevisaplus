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

  // 1. Fix buttons: bg-primary ... text-white -> text-primary-foreground
  content = content.replace(/(bg-primary[^"']*?)text-white/g, '$1text-primary-foreground');

  // 2. Replace background colors
  content = content.replace(/bg-navy-950/g, 'bg-background');
  content = content.replace(/bg-navy-900/g, 'bg-card');
  content = content.replace(/bg-navy-800/g, 'bg-muted');

  // 3. Replace text colors
  content = content.replace(/text-white\/[0-9]+/g, 'text-muted-foreground');
  content = content.replace(/text-white/g, 'text-foreground');

  // 4. Replace borders
  content = content.replace(/border-white\/[0-9]+/g, 'border-border');

  // 5. Replace subtle backgrounds
  content = content.replace(/bg-white\/[0-9]+/g, 'bg-foreground/5');

  // 6. Fix any hover/group-hover states that got messed up (e.g. hover:text-foreground/70 -> hover:text-muted-foreground)
  content = content.replace(/hover:text-muted-foreground/g, 'hover:text-foreground');
  content = content.replace(/group-hover:text-muted-foreground/g, 'group-hover:text-foreground');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
});
