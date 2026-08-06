export type {
  MutualUnderstanding,
  MutualUnderstandingView,
} from './mutual_understanding';

export type SelfUnderstandingEntry = {
  code?: string;
  label?: string;
  typeName?: string;
  coreFear: string;
  coreDesire: string;
  stressPattern: string;
  growthDirection: string;
  conflictStyle: string;
  blindSpot: string;
};

export type OtherUnderstandingEntry = SelfUnderstandingEntry & {
  coreMotivation: string[];
  strengths: string[];
  blindspots: string[];
  stressPatternDetail: string[];
  growthPoints: string[];
  behaviorExamples: string[];
  observationTags: string[];
  communicationDo: string[];
  communicationAvoid: string[];
  communicationExamples: string[];
};
