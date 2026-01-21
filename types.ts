
export enum SlideLayout {
  TITLE_COVER = 'TITLE_COVER',
  EXECUTIVE_SUMMARY = 'EXECUTIVE_SUMMARY',
  TIMELINE = 'TIMELINE',
  GANTT = 'GANTT',
  STRATEGY = 'STRATEGY',
  DISTRIBUTION_CHART = 'DISTRIBUTION_CHART',
  TABLE = 'TABLE',
  TWO_COLUMN = 'TWO_COLUMN',
  BANK_LIST = 'BANK_LIST'
}

export interface SlideContent {
  title: string;
  subtitle?: string;
  keyTakeaway?: string;
  body?: string;
  points?: string[];
  metrics?: {
    label: string;
    value: string;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  timelineEvents?: {
    date: string;
    event: string;
    description?: string;
  }[];
  ganttData?: {
    task: string;
    startWeek: number;
    duration: number;
    category: string;
  }[];
  chartData?: {
    label: string;
    value: number;
    color?: string;
  }[];
  bankTargets?: {
    name: string;
    tier: string;
    role: string;
  }[];
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  content: SlideContent;
}

export interface PitchDeck {
  projectName: string;
  slides: Slide[];
}
