import React, { useState } from 'react';
import { ArrowRight, BookOpen, Sparkles, Filter, ChevronRight, CheckCircle2, Play, Sliders } from 'lucide-react';
import { PHYSICS_TOPICS } from '../data/physicsData';
import { GRADE_11_CHAPTERS, GRADE_11_LESSONS } from '../data/grade11Data';
import { PhysicsTopicItem, LessonItem } from '../types';

interface PhysicsTopicsProps {
  onSelectTopic: (topic: PhysicsTopicItem) => void;
  onSelectLesson?: (lesson: LessonItem, chapterTitle: string) => void;
  onOpenSimulation?: (demoId: string) => void;
  onViewAll?: () => void;
}

export const PhysicsTopics: React.FC<PhysicsTopicsProps> = ({
  onSelectTopic,
  onSelectLesson,
  onOpenSimulation,
  onViewAll,
}) => {
  const [viewMode, setViewMode] = useState<'grade11' | 'branches'>('grade11');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chapter-1');

  // Active chapter and its lessons
  const activeChapter = GRADE_11_CHAPTERS.find((c) => c.id === selectedChapterId) || GRADE_11_CHAPTERS[0];
  const activeLessons = GRADE_11_LESSONS.filter((l) => l.chapterId === selectedChapterId);

  // Custom vector scientific visual for each physics branch (NO HUMANS)
  const renderTopicVisual = (type: PhysicsTopicItem['visualType']) => {
    switch (type) {
      case 'mechanics':
      case 'oscillations':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#EAF7F0] via-[#F5FBF7] to-white flex items-center justify-center p-3 relative overflow-hidden">
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              <line x1="20" y1="20" x2="180" y2="20" stroke="#07583F" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="20" x2="25" y2="75" stroke="#5F6B66" strokeWidth="1.5" />
              <circle cx="25" cy="75" r="14" fill="#168A5A" />
              <line x1="80" y1="20" x2="80" y2="85" stroke="#5F6B66" strokeWidth="1.5" />
              <circle cx="80" cy="85" r="14" fill="#07583F" />
              <line x1="110" y1="20" x2="110" y2="85" stroke="#5F6B66" strokeWidth="1.5" />
              <circle cx="110" cy="85" r="14" fill="#07583F" />
              <line x1="140" y1="20" x2="140" y2="85" stroke="#5F6B66" strokeWidth="1.5" />
              <circle cx="140" cy="85" r="14" fill="#07583F" />
              <line x1="170" y1="20" x2="185" y2="78" stroke="#5F6B66" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="185" cy="78" r="14" fill="#168A5A" />
            </svg>
            <span className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-white/80 border border-[#DDEAE3] text-[10px] font-semibold text-[#07583F]">
              Chương I
            </span>
          </div>
        );

      case 'waves':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#EAF7F0] via-[#F0FDF4] to-white flex items-center justify-center p-3 relative overflow-hidden">
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              <path d="M 10 60 Q 55 10, 100 60 T 190 60" stroke="#168A5A" strokeWidth="2.5" />
              <path d="M 10 60 Q 55 110, 100 60 T 190 60" stroke="#07583F" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="55" cy="35" r="4" fill="#E05252" />
              <text x="63" y="38" fill="#E05252" fontSize="9" fontWeight="bold">Bụng</text>
              <circle cx="100" cy="60" r="4" fill="#17212B" />
              <text x="106" y="64" fill="#17212B" fontSize="9" fontWeight="bold">Nút</text>
            </svg>
            <span className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-white/80 border border-[#DDEAE3] text-[10px] font-semibold text-[#07583F]">
              Chương II
            </span>
          </div>
        );

      case 'electric-field':
      case 'electromagnetism':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#EAF7F0] via-[#F5FBF7] to-white flex items-center justify-center p-3 relative overflow-hidden">
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              <circle cx="60" cy="60" r="14" fill="#E05252" />
              <text x="60" y="65" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
              <circle cx="140" cy="60" r="14" fill="#3B82F6" />
              <text x="140" y="65" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">-</text>
              <path d="M 60 60 Q 100 20, 140 60" stroke="#168A5A" strokeWidth="1.8" />
              <path d="M 60 60 Q 100 100, 140 60" stroke="#168A5A" strokeWidth="1.8" />
              <line x1="60" y1="60" x2="140" y2="60" stroke="#168A5A" strokeWidth="2" />
            </svg>
            <span className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-white/80 border border-[#DDEAE3] text-[10px] font-semibold text-[#07583F]">
              Chương III
            </span>
          </div>
        );

      case 'circuits':
      default:
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#F5FBF7] via-[#EAF7F0] to-white flex items-center justify-center p-3 relative overflow-hidden">
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              <rect x="40" y="30" width="120" height="60" rx="4" stroke="#07583F" strokeWidth="2" />
              <line x1="40" y1="50" x2="40" y2="70" stroke="#E05252" strokeWidth="4" />
              <line x1="50" y1="55" x2="50" y2="65" stroke="#17212B" strokeWidth="2" />
              <rect x="90" y="22" width="30" height="16" fill="#FFFFFF" stroke="#168A5A" strokeWidth="2" />
              <text x="105" y="33" fill="#168A5A" fontSize="9" fontWeight="bold" textAnchor="middle">R</text>
            </svg>
            <span className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-white/80 border border-[#DDEAE3] text-[10px] font-semibold text-[#07583F]">
              Chương IV
            </span>
          </div>
        );
    }
  };

  return (
    <section id="topics" className="py-12 sm:py-16 lg:py-20 bg-[#F5FBF7]/50 border-t border-[#DDEAE3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>CHƯƠNG TRÌNH VẬT LÝ 11 CHUẨN BỘ GD&ĐT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17212B] tracking-tight">
              4 Chương Trọng Tâm & Hệ thống Bài học Chi tiết
            </h2>
            <p className="text-sm sm:text-base text-[#5F6B66] mt-1.5 max-w-2xl">
              Cấu trúc theo chương trình mới: từ Dao động cơ đến Sóng, Điện trường và Toàn mạch kín. Tích hợp bài giảng lý thuyết, công thức trọng tâm và bài tập mẫu giải theo 8 bước.
            </p>
          </div>

          {/* Mode Switcher: Grade 11 vs 5 Branches */}
          <div className="flex items-center p-1 bg-white rounded-full border border-[#DDEAE3] shadow-2xs">
            <button
              onClick={() => setViewMode('grade11')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                viewMode === 'grade11'
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'text-[#5F6B66] hover:text-[#17212B]'
              }`}
            >
              Chương trình Lớp 11 (4 Chương)
            </button>
            <button
              onClick={() => setViewMode('branches')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                viewMode === 'branches'
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'text-[#5F6B66] hover:text-[#17212B]'
              }`}
            >
              5 Phân ngành Vật lý
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: GRADE 11 CHAPTER ROADMAP */}
        {viewMode === 'grade11' && (
          <div className="space-y-8">
            {/* 4 Chapter Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GRADE_11_CHAPTERS.map((chap) => {
                const isSelected = chap.id === selectedChapterId;
                return (
                  <div
                    key={chap.id}
                    onClick={() => {
                      setSelectedChapterId(chap.id);
                      onSelectTopic(chap);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#168A5A] shadow-md ring-2 ring-[#168A5A]/20'
                        : 'bg-white/80 border-[#DDEAE3] hover:bg-white hover:border-[#168A5A]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-md">
                          Chương {chap.chapterNumber}
                        </span>
                        <span className="text-xs text-[#5F6B66] font-medium">
                          {chap.lessonCount} bài học
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#17212B] mb-1">
                        {chap.title}
                      </h3>
                      <p className="text-xs text-[#5F6B66] line-clamp-2 leading-relaxed">
                        {chap.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#DDEAE3] flex items-center justify-between text-xs">
                      <span className="text-[#168A5A] font-semibold">
                        {isSelected ? 'Đang chọn xem bài' : 'Xem danh sách bài'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#168A5A]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Lessons of Selected Chapter */}
            <div className="bg-white rounded-3xl border border-[#DDEAE3] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#DDEAE3] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-lg">
                      {activeChapter.title}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#17212B]">
                      Hệ thống {activeLessons.length} bài học chương này
                    </h3>
                  </div>
                  <p className="text-xs text-[#5F6B66] mt-1">
                    Bấm vào từng bài học để xem mục tiêu, kiến thức cốt lõi, công thức và phương pháp giải 8 bước.
                  </p>
                </div>

                {activeChapter.interactiveDemoId && onOpenSimulation && (
                  <button
                    onClick={() => onOpenSimulation(activeChapter.interactiveDemoId!)}
                    className="px-4 py-2 bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#07583F] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-[#168A5A]/30 self-start sm:self-auto"
                  >
                    <Play className="w-3.5 h-3.5 text-[#168A5A]" />
                    <span>Mô phỏng 3D Chương {activeChapter.chapterNumber}</span>
                  </button>
                )}
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (onSelectLesson) {
                        onSelectLesson(lesson, activeChapter.title);
                      }
                    }}
                    className="p-4 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-[#07583F] bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
                          Bài {lesson.lessonNumber}
                        </span>
                        {(lesson.relatedExperimentId || lesson.simulationDemoId) && (
                          <span className="text-[10px] text-[#168A5A] font-semibold flex items-center gap-1">
                            <Play className="w-3 h-3" /> Có mô phỏng
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors mb-1">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-[#5F6B66] line-clamp-2 leading-relaxed">
                        {lesson.subtitle || lesson.quickGrasp}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#DDEAE3]/60 flex items-center justify-between text-[11px]">
                      <span className="text-[#07583F] font-semibold">
                        {lesson.coreFormulas?.length || 0} công thức chính
                      </span>
                      <span className="text-[#168A5A] font-bold flex items-center gap-0.5 group-hover:underline">
                        Học bài <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: 5 PHYSICS BRANCHES */}
        {viewMode === 'branches' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PHYSICS_TOPICS.map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                id={`topic-card-${topic.id}`}
                className="group bg-white rounded-2xl border border-[#DDEAE3] overflow-hidden shadow-xs hover:shadow-md hover:border-[#168A5A]/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="border-b border-[#DDEAE3]/60">
                    {renderTopicVisual(topic.visualType)}
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-[#5F6B66] font-medium mt-1">
                      {topic.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-[#DDEAE3]/50">
                      {topic.keyConcepts.slice(0, 2).map((c, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#F5FBF7] text-[#07583F] border border-[#DDEAE3]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#168A5A] group-hover:underline">
                    Khám phá bài học
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F5FBF7] group-hover:bg-[#168A5A] group-hover:text-white text-[#168A5A] flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
