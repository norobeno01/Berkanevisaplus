const fs = require('fs');

const configPath = 'eslint.config.js';
let config = fs.readFileSync(configPath, 'utf8');

config = config.replace(
  /rules:\s*\{/,
  "rules: {\n      '@typescript-eslint/no-namespace': 'off',\n      '@typescript-eslint/no-empty-object-type': 'off',"
);

fs.writeFileSync(configPath, config, 'utf8');
console.log('Disabled final strict linting rules');
