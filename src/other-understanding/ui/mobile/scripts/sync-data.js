/**
 * core/data/enneagram → ui/mobile/data/enneagram 同期
 * テンプレート（relationship_insight_card.ts）は UI 用（core 非依存）を正とし、
 * 本スクリプトでは辞書のみコピーする。
 */
const fs = require('fs');
const path = require('path');

const FILES = [
  'type_summary.ts',
  'misalignment_patterns_dictionary.ts',
  'communication_style_for_other_dictionary.ts',
  'observation_tags_dictionary.ts',
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
