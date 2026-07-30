/**
 * core → ui/mobile 同期
 * - data/sai_persona.ts（character 正本のコピー）
 */
const fs = require('fs');
const path = require('path');

const mobileRoot = path.resolve(__dirname, '..');
const coreRoot = path.resolve(mobileRoot, '../../core');

const COPIES = [
  {
    from: path.join(coreRoot, 'character/sai_persona.ts'),
    to: path.join(mobileRoot, 'data/sai_persona.ts'),
  },
];

for (const { from, to } of COPIES) {
  if (!fs.existsSync(from)) {
    console.error(`[sync:data] missing source: ${from}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`[sync:data] ${path.relative(mobileRoot, to)}`);
}

console.log('[sync:data] done');
