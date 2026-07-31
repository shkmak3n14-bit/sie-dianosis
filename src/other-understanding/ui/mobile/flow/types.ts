/** 他者理解モジュールの画面スタック */
import type { DailyAnalysisResult } from '../bridge/dailyAnalysis';
import type { EpisodeInferenceResult } from '../bridge/inferTypes';
import type { RelationshipInsightCardData } from '../templates/relationship_insight_card';

export type OtherRelation =
  | '恋人'
  | '友人'
  | '親子'
  | '上司部下'
  | 'その他';

export type OtherPersonDraft = {
  name: string;
  relation: OtherRelation | null;
};

export type OtherUnderstandingStackParamList = {
  Entry: undefined;
  EpisodeInput: {
    name?: string;
    relation?: OtherRelation;
  };
  RelationshipInsight: {
    name?: string;
    relation?: OtherRelation;
    episode?: string;
    /** inferTypes / inferEpisodeType の結果 */
    result?: EpisodeInferenceResult;
    /** 辞書から組み立てたカード（あれば優先） */
    cardData?: RelationshipInsightCardData;
  };
  DailyEpisode: {
    partnerType?: string;
    relation?: OtherRelation;
    consultantType?: string;
  };
  DailyEpisodeResult: {
    partnerType: string;
    relation?: OtherRelation;
    episode: string;
    analysis: DailyAnalysisResult;
  };
};

export const OTHER_RELATIONS: OtherRelation[] = [
  '恋人',
  '友人',
  '親子',
  '上司部下',
  'その他',
];
