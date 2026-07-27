/**
 * ① 入口フロー
 * - 診断OK → 価値観対比
 * - 診断NG → type_inference へ移行
 */

export type DiagnosisEntryBranch = 'diagnosed' | 'inference';

export type DiagnosisEntryInput = {
  /** 相談者のタイプ（例: 9w8） */
  consultantType: string;
  /** 相手が診断を受けたか */
  otherAcceptedDiagnosis: boolean;
  /** 相手のタイプ（診断済みの場合） */
  otherType?: string;
};

export type DiagnosisEntryResult = {
  branch: DiagnosisEntryBranch;
  /** 次に進む柱（①対比 / ②推測） */
  next: 'values_comparison' | 'type_inference';
};

export type DiagnosisEntryFlow = {
  resolve(input: DiagnosisEntryInput): DiagnosisEntryResult;
};

export function createDiagnosisEntryFlow(): DiagnosisEntryFlow {
  return {
    resolve(input) {
      if (input.otherAcceptedDiagnosis && input.otherType) {
        return { branch: 'diagnosed', next: 'values_comparison' };
      }
      return { branch: 'inference', next: 'type_inference' };
    },
  };
}
