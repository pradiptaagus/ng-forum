export interface Topic {
  by: string;
  descendants?: number;
  id: number;
  kids: number[];
  score?: number;
  parent?: number;
  text: string;
  time: number;
  title?: string;
  type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt';
}
