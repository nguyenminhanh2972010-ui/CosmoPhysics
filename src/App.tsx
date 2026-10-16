import React, { useState, useEffect } from 'react';
import { Header, ActivePage } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MainLearningPathways } from './components/MainLearningPathways';
import { Grade11TopicsPreview } from './components/Grade11TopicsPreview';
import { SelectedResourcesSection } from './components/SelectedResourcesSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

// Dedicated Pages
import { StudyPage } from './pages/StudyPage';
import { ExperimentsPage } from './pages/ExperimentsPage';
import { HandbookPage } from './pages/HandbookPage';
import { AiTutorPage } from './pages/AiTutorPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { NotebookPage } from './pages/NotebookPage';
import { SearchPage } from './pages/SearchPage';

// Modals
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { LessonDetailModal } from './components/LessonDetailModal';
import { AiTutorModal } from './components/AiTutorModal';

// Context & Data
import { AuthProvider } from './context/AuthContext';
import { LessonItem, PhysicsTopicItem, FormulaHandbookItem, SearchResultItem } from './types';
import { GRADE_11_LESSONS, GRADE_11_CHAPTERS } from './data/grade11Data';
import { FORMULA_HANDBOOK_DATA } from './data/formulaHandbook';
import { CheckCircle2, Bot, Sparkles } from 'lucide-react';

export function CosmophysicApp() {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [isAiTutorModalOpen, setIsAiTutorModalOpen] = useState(false);
  const [aiTutorInitialPrompt, setAiTutorInitialPrompt] = useState<string | undefined>(undefined);

  // Selected lesson modal
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [selectedLessonChapterTitle, setSelectedLessonChapterTitle] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initial URL routing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) {
        setSearchQuery(q);
        setCurrentPage('search');
        return;
      }
      if (path === '/hoc-tap' || path === '/vat-ly-11') {
        setCurrentPage('study');
      } else if (path === '/thi-nghiem') {
        setCurrentPage('experiments');
      } else if (path === '/so-tay-vat-ly') {
        setCurrentPage('handbook');
      } else if (path === '/cosmo-ai') {
        setCurrentPage('ai-tutor');
      } else if (path === '/tai-nguyen') {
        setCurrentPage('resources');
      } else if (path === '/bai-tap') {
        setCurrentPage('exercises');
      } else if (path === '/giai-bai') {
        setCurrentPage('solutions');
      } else if (path === '/may-tinh') {
        setCurrentPage('calculator');
      } else if (path === '/notebook') {
        setCurrentPage('notebook');
      } else if (path === '/tim-kiem') {
        setCurrentPage('search');
      } else {
        setCurrentPage('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: ActivePage, queryParam?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL
    let newPath = '/';
    if (page === 'study') newPath = '/hoc-tap';
    else if (page === 'experiments') newPath = '/thi-nghiem';
    else if (page === 'handbook') newPath = '/so-tay-vat-ly';
    else if (page === 'ai-tutor') newPath = '/cosmo-ai';
    else if (page === 'resources') newPath = '/tai-nguyen';
    else if (page === 'exercises') newPath = '/bai-tap';
    else if (page === 'solutions') newPath = '/giai-bai';
    else if (page === 'calculator') newPath = '/may-tinh';
    else if (page === 'notebook') newPath = '/notebook';
    else if (page === 'search') newPath = queryParam ? `/tim-kiem?q=${encodeURIComponent(queryParam)}` : '/tim-kiem';

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAuth = (tab: 'login' | 'register') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  const handleAskAiAboutFormula = (formula: FormulaHandbookItem) => {
    const prompt = `Thầy/Cô giải thích giúp em bản chất vật lý của công thức ${formula.name}: ${formula.expression} (${formula.chapterName}) và điều kiện áp dụng trong bài tập nhé.`;
    setAiTutorInitialPrompt(prompt);
    navigateTo('ai-tutor');
  };

  const handleAskAiAboutLesson = (lesson: LessonItem) => {
    const prompt = `Em đang học ${lesson.title} (${lesson.chapterTitle}). Thầy/Cô hướng dẫn em tóm tắt 3 ý quan trọng nhất và các sai lầm cần tránh khi làm bài tập nhé.`;
    setAiTutorInitialPrompt(prompt);
    navigateTo('ai-tutor');
  };

  const handleSearchResult = (item: SearchResultItem) => {
    setIsSearchOpen(false);

    // 1. If it matches a lesson
    const matchedLesson = GRADE_11_LESSONS.find((l) => l.id === item.id);
    if (matchedLesson) {
      setSelectedLesson(matchedLesson);
      setSelectedLessonChapterTitle(matchedLesson.chapterTitle);
      return;
    }

    // 2. If it's a virtual experiment
    if (item.category === 'Thí nghiệm ảo' || item.route === '#virtual-lab') {
      navigateTo('experiments');
      return;
    }

    // 3. If it's a formula
    if (item.category === 'Công thức' || item.route === '#formula-handbook') {
      navigateTo('handbook');
      return;
    }

    // Default
    navigateTo('study');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17212B] font-['Be_Vietnam_Pro',sans-serif]">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-[#07583F] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#168A5A] flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={(p) => navigateTo(p)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* Section B — Hero */}
            <HeroSection
              onStartLearning={() => navigateTo('study')}
              onExploreTopics={() => navigateTo('study')}
            />

            {/* Section C — Main Learning Pathways (4 Primary Destinations) */}
            <MainLearningPathways
              onNavigate={(p) => navigateTo(p)}
            />

            {/* Section D — Explore Grade 11 Topics */}
            <Grade11TopicsPreview
              onSelectTopic={() => navigateTo('study')}
              onViewAll={() => navigateTo('study')}
            />

            {/* Section E — Selected Learning Resources */}
            <SelectedResourcesSection
              onOpenLesson={(lessonId) => {
                const lesson = GRADE_11_LESSONS.find((l) => l.id === lessonId);
                if (lesson) {
                  setSelectedLesson(lesson);
                  setSelectedLessonChapterTitle(lesson.chapterTitle);
                } else {
                  navigateTo('study');
                }
              }}
              onOpenExperiment={() => navigateTo('experiments')}
              onOpenHandbook={() => navigateTo('handbook')}
            />

            {/* Section F — Closing CTA */}
            <CTASection
              onStartNow={() => navigateTo('study')}
            />
          </div>
        )}

        {currentPage === 'study' && (
          <div className="animate-fadeIn">
            <StudyPage
              onOpenSimulation={(simId) => navigateTo('experiments')}
              onAskAi={handleAskAiAboutLesson}
            />
          </div>
        )}

        {currentPage === 'experiments' && (
          <div className="animate-fadeIn">
            <ExperimentsPage
              onOpenLesson={(lessonId) => {
                const lesson = GRADE_11_LESSONS.find((l) => l.id === lessonId);
                if (lesson) {
                  setSelectedLesson(lesson);
                  setSelectedLessonChapterTitle(lesson.chapterTitle);
                } else {
                  navigateTo('study');
                }
              }}
            />
          </div>
        )}

        {currentPage === 'handbook' && (
          <div className="animate-fadeIn">
            <HandbookPage
              onAskAi={handleAskAiAboutFormula}
              onOpenLesson={(lessonId) => {
                const lesson = GRADE_11_LESSONS.find((l) => l.id === lessonId);
                if (lesson) {
                  setSelectedLesson(lesson);
                  setSelectedLessonChapterTitle(lesson.chapterTitle);
                }
              }}
            />
          </div>
        )}

        {currentPage === 'ai-tutor' && (
          <div className="animate-fadeIn">
            <AiTutorPage
              initialPrompt={aiTutorInitialPrompt}
              onOpenNotebook={() => navigateTo('notebook')}
            />
          </div>
        )}

        {currentPage === 'resources' && (
          <div className="animate-fadeIn">
            <ResourcesPage
              onNavigate={(p) => navigateTo(p)}
            />
          </div>
        )}

        {(currentPage === 'exercises' || currentPage === 'solutions') && (
          <div className="animate-fadeIn">
            <ExercisesPage />
          </div>
        )}

        {currentPage === 'calculator' && (
          <div className="animate-fadeIn">
            <CalculatorPage />
          </div>
        )}

        {currentPage === 'notebook' && (
          <div className="animate-fadeIn">
            <NotebookPage
              onOpenFormulaHandbook={() => navigateTo('handbook')}
              onOpenLesson={(lessonId) => {
                const lesson = GRADE_11_LESSONS.find((l) => l.id === lessonId);
                if (lesson) {
                  setSelectedLesson(lesson);
                  setSelectedLessonChapterTitle(lesson.chapterTitle);
                }
              }}
              onOpenAuth={() => handleOpenAuth('login')}
            />
          </div>
        )}

        {currentPage === 'search' && (
          <div className="animate-fadeIn">
            <SearchPage
              initialQuery={searchQuery}
              onOpenLesson={(lessonId) => {
                const lesson = GRADE_11_LESSONS.find((l) => l.id === lessonId);
                if (lesson) {
                  setSelectedLesson(lesson);
                  setSelectedLessonChapterTitle(lesson.chapterTitle);
                }
              }}
              onOpenExperiment={(expId) => navigateTo('experiments')}
              onOpenFormula={(fId) => navigateTo('handbook')}
              onOpenExercises={() => navigateTo('exercises')}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(p) => navigateTo(p)}
      />

      {/* Floating AI Tutor Quick Trigger Button (if not already on ai-tutor page) */}
      {currentPage !== 'ai-tutor' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setAiTutorInitialPrompt(undefined);
              navigateTo('ai-tutor');
            }}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#07583F] hover:bg-[#053C2D] text-white rounded-full shadow-xl hover:shadow-2xl border border-[#168A5A]/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
            aria-label="Mở Gia sư AI Vật lý 11"
          >
            <Bot className="w-5 h-5 text-[#86EFAC]" />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-tight flex items-center gap-1">
                <span>Gia sư AI 11</span>
                <Sparkles className="w-3 h-3 text-[#86EFAC]" />
              </div>
              <div className="text-[10px] text-[#A3D9C9] leading-none">
                Hỏi bài & Lời giải chuẩn
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Global Modals for Quick Interaction */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResult}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialTab={authInitialTab}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(studentName) => {
          showToast(`Xin chào ${studentName}! Bạn đã đăng nhập vào COSMOPHYSIC thành công.`);
        }}
      />

      <LessonDetailModal
        lesson={selectedLesson}
        chapterTitle={selectedLessonChapterTitle}
        onClose={() => setSelectedLesson(null)}
        onOpenSimulation={(simId: string) => {
          setSelectedLesson(null);
          navigateTo('experiments');
        }}
        onAskAi={(lesson: LessonItem) => {
          setSelectedLesson(null);
          handleAskAiAboutLesson(lesson);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CosmophysicApp />
    </AuthProvider>
  );
}
