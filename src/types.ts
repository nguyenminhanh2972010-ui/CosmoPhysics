export interface UserProfile {
  id: string;
  fullName: string;
  name?: string; // friendly alias
  email: string;
  grade: '11';
  school?: string;
  createdAt: string;
  bookmarkedFormulaIds: string[];
  savedNoteIds: string[];
}

export interface AuthState {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FeatureItem {
  id: string;
  icon: 'book' | 'flask' | 'document' | 'target' | 'heart';
  title: string;
  description: string;
}

export interface LearningCardItem {
  id: string;
  title: string;
  description: string;
  visualType: 'cosmic' | 'simulation' | 'mindmap' | 'equations';
  badge: string;
  stats?: string;
  tagline: string;
  targetRoute?: string;
}

export interface PhysicsTopicItem {
  id: string;
  chapterNumber?: number;
  title: string;
  subtitle: string;
  grade: '10' | '11' | '12' | 'all';
  lessonCount?: number;
  keyConcepts: string[];
  visualType: 'oscillations' | 'waves' | 'electric-field' | 'circuits' | 'mechanics' | 'thermodynamics' | 'electromagnetism' | 'optics' | 'modern';
  summary: string;
  formulas: { formula: string; meaning: string }[];
  interactiveDemoId?: string;
}

export interface LessonItem {
  id: string; // e.g. 'bai-1'
  lessonNumber: number;
  chapterId: string;
  chapterTitle: string;
  title: string;
  subtitle: string;
  pageRange: string;
  quickGrasp: string;
  realLifePhenomenon: string;
  physicsNature: string;
  coreFormulas: {
    name: string;
    expression: string;
    description: string;
    variables: { symbol: string; meaning: string; unit: string }[];
    condition?: string;
  }[];
  sampleExercise: {
    question: string;
    stepSolution?: {
      stepNumber: number;
      stepName: string;
      content: string;
    }[];
    solutionGuide?: string;
  };
  commonMistakes: string[];
  summary: string[];
  relatedExperimentId?: string;

  // Flexible fields used in UI components
  objectives?: string[];
  keyConcepts?: string[];
  formulas?: { formula: string; meaning: string }[];
  sampleProblem?: {
    question: string;
    stepSolution?: { stepNumber: number; stepName: string; content: string }[];
    steps?: string[];
    answer?: string;
  };
  simulationDemoId?: string;
}

export interface FormulaHandbookItem {
  id: string;
  chapterId: string;
  chapterName: string;
  lessonName: string;
  name: string;
  expression: string;
  meaning: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  condition: string;
  applicationTip: string;
}

export interface VirtualExperimentItem {
  id: string;
  chapterId: string;
  chapterName: string;
  title: string;
  tagline: string;
  target: string;
  theory: string;
  formulas: string[];
  defaultParams: Record<string, number>;
  paramControls: {
    key: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  }[];
  conclusions: string[];
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface NotebookEntry {
  id: string;
  title: string;
  content: string;
  chapterId?: string;
  lessonId?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Bài học' | 'Công thức' | 'Thí nghiệm ảo' | 'Bài tập' | 'Tài nguyên' | 'Chủ đề' | 'Sơ đồ tư duy';
  description: string;
  route?: string;
  chapterTag?: string;
  targetId?: string;
}
