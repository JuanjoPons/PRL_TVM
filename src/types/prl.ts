export type Language = 'ca' | 'es';

export interface StudentInfo {
  name: string;
  group: string;
  emailTarget: string;
}

export interface AnswerLog {
  gameId: string;
  gameTitle: string;
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  justification: string;
  timestamp: string;
}

export interface AchievementBadge {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  unlocked: boolean;
}

export interface EpiHazard {
  id: string;
  zone: Record<Language, string>;
  title: Record<Language, string>;
  hazardDescription: Record<Language, string>;
  consequence: Record<Language, string>;
  timeLimitSeconds: number;
  correctOptionId: string;
  options: {
    id: string;
    name: Record<Language, string>;
    category: string;
    icon: string;
    isCorrect: boolean;
    why: Record<Language, string>;
  }[];
  regulatoryRef: string;
}

export interface ArHazardTarget {
  id: string;
  name: Record<Language, string>;
  category: 'chemical' | 'electrical' | 'fall' | 'confined' | 'fire';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  codeDigit: string;
  description: Record<Language, string>;
  correctActionIndex: number;
  actions: Record<Language, string>[];
  justification: Record<Language, string>;
  scanned: boolean;
}

export interface EmergencyScenario {
  id: string;
  code: string;
  title: Record<Language, string>;
  location: Record<Language, string>;
  severity: 'high' | 'critical' | 'extreme';
  timeSeconds: number;
  description: Record<Language, string>;
  correctActionIndex: number;
  actions: {
    label: Record<Language, string>;
    impact: Record<Language, string>;
  }[];
  justification: Record<Language, string>;
}

export interface ProtocolStep {
  id: string;
  order: number;
  text: Record<Language, string>;
  hint: Record<Language, string>;
}

export interface ProtocolPuzzle {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  steps: ProtocolStep[];
  regulatoryBasis: Record<Language, string>;
}
