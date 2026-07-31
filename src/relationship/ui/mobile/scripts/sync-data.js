/**
 * core/data/enneagram → ui/mobile/data/enneagram 同期
 */
const fs = require('fs');
const path = require('path');

const FILES = [
  'pair_key.ts',
  'pair_status_dictionary.ts',
  'vicious_cycle_patterns_dictionary.ts',
  'cognitive_gap_pair_dictionary.ts',
  'virtuous_cycle_dictionary.ts',
  'respect_points_dictionary.ts',
  'responsibility_split_dictionary.ts',
  'defer_points_dictionary.ts',
  'communication_pair_dictionary.ts',
  'index.ts',
];

const mobileRoot = path.resolve(__dirname, '..');
const coreData = path.resolve(mobileRoot, '../../core/data/enneagram');
const mobileData = path.resolve(mobileRoot, 'data/enneagram');

fs.mkdirSync(mobileData, { recursive: true });

for (const file of FILES) {
  const from = path.join(coreData, file);
  const to = path.join(mobileData, file);
  if (!fs.existsSync(from)) {
    console.error(`[sync:data] missing source: ${from}`);
    process.exit(1);
  }
  fs.copyFileSync(from, to);
  console.log(`[sync:data] ${file}`);
}

console.log('[sync:data] done');
