const fs = require('fs');
const config = fs.readFileSync('tailwind.config.js', 'utf8');
console.log(config.includes('darkMode: ["class"]'));
