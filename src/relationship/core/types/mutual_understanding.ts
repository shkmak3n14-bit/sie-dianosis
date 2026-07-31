import type { RelationshipStatus } from './relationship_status';
import type { ViciousCycle } from './vicious_cycle';
import type { CognitiveGap } from './cognitive_gap';
import type { VirtuousCycle } from './virtuous_cycle';
import type { RespectPoints } from './respect_points';
import type { ResponsibilityBoundary } from './responsibility_boundary';
import type { DeferPoints } from './defer_points';
import type { CommunicationStyle } from './communication_style';

export interface MutualUnderstanding {
  status: RelationshipStatus;
  viciousCycle: ViciousCycle;
  cognitiveGap: CognitiveGap;
  virtuousCycle: VirtuousCycle;
  respect: RespectPoints;
  responsibility: ResponsibilityBoundary;
  defer: DeferPoints;
  communication: CommunicationStyle;
  pairKey: string;
  summary?: string;
}
