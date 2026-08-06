/**
 * core/data/enneagram の正本（NxM.ts）から
 * ui/mobile/data/enneagram の8辞書を生成する。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mobileRoot = path.resolve(__dirname, '..');
const coreData = path.resolve(mobileRoot, '../../core/data/enneagram');
const mobileData = path.resolve(mobileRoot, 'data/enneagram');

fs.mkdirSync(mobileData, { recursive: true });

function toPairKey(selfType, otherType) {
  return `${selfType}x${otherType}`;
}

function parsePairFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const noImport = src.replace(
    /^import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];\s*/m,
    '',
  );
  const rewritten = noImport.replace(
    /export const MU_\d_\d: MutualUnderstanding =/,
    'module.exports =',
  );

  const sandbox = { module: { exports: {} } };
  vm.runInNewContext(rewritten, sandbox, { filename: filePath });
  return sandbox.module.exports;
}

function q(value) {
  return JSON.stringify(value, null, 2);
}

function writeGenerated(fileName, source) {
  const out = path.join(mobileData, fileName);
  fs.writeFileSync(out, source, 'utf8');
  console.log(`[sync:data] ${fileName}`);
}

function build() {
  const pairFiles = fs
    .readdirSync(coreData)
    .filter((f) => /^\dx\d\.ts$/.test(f))
    .sort((a, b) => a.localeCompare(b, 'en'));

  if (pairFiles.length === 0) {
    throw new Error(`[sync:data] no pair files in ${coreData}`);
  }

  const pairStatusDictionary = {};
  const viciousCyclePatternsDictionary = {};
  const cognitiveGapPairDictionary = {};
  const virtuousCycleDictionary = {};
  const respectPointsDictionary = {};
  const responsibilitySplitDictionary = {};
  const deferPointsDictionary = {};
  const communicationPairDictionary = {};

  for (const file of pairFiles) {
    const fullPath = path.join(coreData, file);
    const mu = parsePairFile(fullPath);
    const [selfType, otherType] = file.replace('.ts', '').split('x');
    const key = toPairKey(selfType, otherType);

    pairStatusDictionary[key] = {
      selfType,
      otherType,
      going_well: mu.status?.good ?? [],
      not_going_well: mu.status?.bad ?? [],
    };

    viciousCyclePatternsDictionary[key] = {
      selfType,
      otherType,
      pattern_name: null,
      entry_points: mu.viciousCycle?.triggers ?? [],
      cycle_description: (mu.viciousCycle?.loop ?? []).join(' / '),
    };

    cognitiveGapPairDictionary[key] = {
      selfType,
      otherType,
      gaps: [
        ...(mu.cognitiveGap?.selfGap ?? []).map((x) => `自分側: ${x}`),
        ...(mu.cognitiveGap?.otherGap ?? []).map((x) => `相手側: ${x}`),
      ],
      interaction: (mu.cognitiveGap?.interaction ?? []).join(' / '),
    };

    virtuousCycleDictionary[key] = {
      selfType,
      otherType,
      steps: mu.virtuousCycle?.adjustments ?? [],
      actions: [
        ...(mu.virtuousCycle?.actions ?? []),
        ...(mu.virtuousCycle?.reassurance ?? []).map((x) => `安心: ${x}`),
      ],
    };

    respectPointsDictionary[key] = {
      selfType,
      otherType,
      points: [
        ...(mu.respect?.forOther ?? []).map((x) => `相手尊重: ${x}`),
        ...(mu.respect?.forSelf ?? []).map((x) => `自己尊重: ${x}`),
      ],
      avoid: [],
    };

    responsibilitySplitDictionary[key] = {
      selfType,
      otherType,
      self_side: mu.responsibility?.self ?? [],
      other_side: mu.responsibility?.other ?? [],
      shared: mu.responsibility?.boundary ?? [],
    };

    deferPointsDictionary[key] = {
      selfType,
      otherType,
      defer_topics: mu.defer?.reasons ?? [],
      decision_hints: [...(mu.defer?.risks ?? []), ...(mu.defer?.conditions ?? [])],
    };

    communicationPairDictionary[key] = {
      selfType,
      otherType,
      tips: [...(mu.communication?.do ?? []), ...(mu.communication?.examples ?? [])],
      avoid: mu.communication?.avoid ?? [],
    };
  }

  writeGenerated(
    'pair_status_dictionary.ts',
    `/**\n * ① 関係の現状辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type PairStatusEntry = {\n  selfType: string;\n  otherType: string;\n  going_well: string[];\n  not_going_well: string[];\n};\n\nexport const pairStatusDictionary: Record<string, PairStatusEntry> = ${q(pairStatusDictionary)};\n\nexport function getPairStatusEntry(selfType: string, otherType: string): PairStatusEntry | null {\n  return pairStatusDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'vicious_cycle_patterns_dictionary.ts',
    `/**\n * ② 悪循環パターン辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type ViciousCyclePatternEntry = {\n  selfType: string;\n  otherType: string;\n  pattern_name?: string | null;\n  entry_points: string[];\n  cycle_description: string;\n};\n\nexport const viciousCyclePatternsDictionary: Record<string, ViciousCyclePatternEntry> = ${q(viciousCyclePatternsDictionary)};\n\nexport function getViciousCyclePattern(selfType: string, otherType: string): ViciousCyclePatternEntry | null {\n  return viciousCyclePatternsDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'cognitive_gap_pair_dictionary.ts',
    `/**\n * ③ 認知のズレ辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type CognitiveGapPairEntry = {\n  selfType: string;\n  otherType: string;\n  gaps: string[];\n  interaction: string;\n};\n\nexport const cognitiveGapPairDictionary: Record<string, CognitiveGapPairEntry> = ${q(cognitiveGapPairDictionary)};\n\nexport function getCognitiveGapPairEntry(selfType: string, otherType: string): CognitiveGapPairEntry | null {\n  return cognitiveGapPairDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'virtuous_cycle_dictionary.ts',
    `/**\n * ④ 好循環辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type VirtuousCycleEntry = {\n  selfType: string;\n  otherType: string;\n  steps: string[];\n  actions: string[];\n};\n\nexport const virtuousCycleDictionary: Record<string, VirtuousCycleEntry> = ${q(virtuousCycleDictionary)};\n\nexport function getVirtuousCycleEntry(selfType: string, otherType: string): VirtuousCycleEntry | null {\n  return virtuousCycleDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'respect_points_dictionary.ts',
    `/**\n * ⑤ 尊重ポイント辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type RespectPointsEntry = {\n  selfType: string;\n  otherType: string;\n  points: string[];\n  avoid: string[];\n};\n\nexport const respectPointsDictionary: Record<string, RespectPointsEntry> = ${q(respectPointsDictionary)};\n\nexport function getRespectPointsEntry(selfType: string, otherType: string): RespectPointsEntry | null {\n  return respectPointsDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'responsibility_split_dictionary.ts',
    `/**\n * ⑥ 責務分離辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type ResponsibilitySplitEntry = {\n  selfType: string;\n  otherType: string;\n  self_side: string[];\n  other_side: string[];\n  shared: string[];\n};\n\nexport const responsibilitySplitDictionary: Record<string, ResponsibilitySplitEntry> = ${q(responsibilitySplitDictionary)};\n\nexport function getResponsibilitySplitEntry(selfType: string, otherType: string): ResponsibilitySplitEntry | null {\n  return responsibilitySplitDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'defer_points_dictionary.ts',
    `/**\n * ⑦ 棚上げポイント辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type DeferPointsEntry = {\n  selfType: string;\n  otherType: string;\n  defer_topics: string[];\n  decision_hints: string[];\n};\n\nexport const deferPointsDictionary: Record<string, DeferPointsEntry> = ${q(deferPointsDictionary)};\n\nexport function getDeferPointsEntry(selfType: string, otherType: string): DeferPointsEntry | null {\n  return deferPointsDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  writeGenerated(
    'communication_pair_dictionary.ts',
    `/**\n * ⑧ 伝え方辞書（generated from canonical MU files）\n */\n\nimport { toPairKey } from './pair_key';\n\nexport type CommunicationPairEntry = {\n  selfType: string;\n  otherType: string;\n  tips: string[];\n  avoid: string[];\n};\n\nexport const communicationPairDictionary: Record<string, CommunicationPairEntry> = ${q(communicationPairDictionary)};\n\nexport function getCommunicationPairEntry(selfType: string, otherType: string): CommunicationPairEntry | null {\n  return communicationPairDictionary[toPairKey(selfType, otherType)] ?? null;\n}\n`,
  );

  // pair_key.ts と index.ts は型・公開面として core 側を同期コピーする
  for (const file of ['pair_key.ts', 'index.ts']) {
    const from = path.join(coreData, file);
    const to = path.join(mobileData, file);
    if (!fs.existsSync(from)) {
      throw new Error(`[sync:data] missing source: ${from}`);
    }
    fs.copyFileSync(from, to);
    console.log(`[sync:data] ${file}`);
  }

  console.log(`[sync:data] done (generated from ${pairFiles.length} pair files)`);
}

build();
