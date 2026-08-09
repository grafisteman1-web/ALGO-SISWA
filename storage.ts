export type UserRole = 'student' | 'teacher' | 'guest';

export interface Student {
  id: string;
  name: string;
  nisn: string;
  gender: 'L' | 'P';
  studentClass: string;
  points: number;
  completedModules: string[];
  solvedPuzzles: string[];
  badges: string[];
  lastActive?: string;
  historyLog?: StudentActivityLog[];
}

export interface StudentActivityLog {
  id: string;
  type: 'module_complete' | 'puzzle_solve' | 'quiz_score' | 'daily_login';
  title: string;
  scoreOrPoints: number;
  timestamp: string;
}

export interface TeacherUser {
  email: string;
  name: string;
  role: 'teacher';
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  smaCaseTitle: string;
  smaCaseDescription: string;
  flowchartNodes: Array<{ id: string; label: string; type: 'start' | 'process' | 'decision' | 'end'; next?: string; nextTrue?: string; nextFalse?: string }>;
  pseudocode: string[];
  simulationType: 'sequential' | 'branching' | 'looping' | 'searching' | 'sorting';
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DailyPuzzle {
  id: string;
  date: string;
  title: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  story: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardPoints: number;
  badgeUnlock?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface AskAIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeContext?: string;
}

export interface GoogleSheetSyncResult {
  success: boolean;
  message: string;
  spreadsheetUrl?: string;
  syncedCount?: number;
}
