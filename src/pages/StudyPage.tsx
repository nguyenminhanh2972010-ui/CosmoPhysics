import React, { useState } from 'react';
import { GRADE_11_CHAPTERS, GRADE_11_LESSONS } from '../data/grade11Data';
import { LessonItem, PhysicsTopicItem } from '../types';
import { BookOpen, ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, Sparkles, Bot, FlaskConical, Search, Layers } from 'lucide-react';
import { FormattedPhysicsResponse } from '../components/FormattedPhysicsResponse';

interface StudyPageProps {
  onOpenSimulation: (simId: string) => void;
  onAskAi: (lesson: LessonItem) => void;
}

export const StudyPage: React.FC<StudyPageProps> = ({ onOpenSimulation, onAskAi }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chapter-1');
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentChapter = GRADE_11_CHAPTERS.find((c) => c.id === selectedChapterId) || GRADE_11_CHAPTERS[0];
  const chapterLessons = GRADE_11_LESSONS.filter((l) => l.chapterId === selectedChapterId);

  // Filter lessons if searching
  const filteredLessons = searchQuery.trim()
    ? GRADE_11_LESSONS.filter((l) =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.quickGrasp.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chapterLessons;

  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <span>CHƯƠNG TRÌNH CHUẨN THPT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Chương trình Học tập Vật Lí 11
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5 max-w-2xl leading-relaxed">
            Hệ thống hóa toàn bộ kiến thức 4 chương trọng tâm theo cấu trúc SGK GDPT mới: Hiểu bản chất trước khi nhớ công thức.
          </p>
        </div>

        {/* Chapter Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#DDEAE3]">
          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {GRADE_11_CHAPTERS.map((ch) => {
              const isActive = selectedChapterId === ch.id && !searchQuery;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapterId(ch.id);
                    setSearchQuery('');
                    setSelectedLesson(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#168A5A] text-white shadow-xs'
                      : 'bg-[#F5FBF7] text-[#17212B] hover:bg-[#EAF7F0] border border-[#DDEAE3]'
                  }`}
                >
                  {ch.title.split(':')[0]}
                </button>
              );
            })}
          </div>

          {/* Quick Filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#168A5A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Lọc bài học theo từ khóa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLesson(null);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
            />
          </div>
        </div>

        {/* Layout: Sidebar Topic Overview + Lessons List / Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Chapter Overview / Lessons List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Chapter Focus Card */}
            {!searchQuery && (
              <div className="bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] p-5">
                <span className="text-[11px] font-bold text-[#07583F] uppercase tracking-wider">
                  Tổng quan chương
                </span>
                <h2 className="text-lg font-extrabold text-[#17212B] mt-1">
                  {currentChapter.title}
                </h2>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  {currentChapter.summary}
                </p>

                {/* Key Concepts Preview */}
                <div className="mt-4 pt-4 border-t border-[#DDEAE3]/80 space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#17212B]">
                    Khái niệm cốt lõi:
                  </span>
                  <ul className="space-y-1">
                    {currentChapter.keyConcepts.map((kc, idx) => (
                      <li key={idx} className="text-xs text-[#5F6B66] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#168A5A] shrink-0" />
                        <span>{kc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* List of Lessons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#17212B]">
                <span>DANH SÁCH BÀI HỌC ({filteredLessons.length})</span>
                <span className="text-[11px] text-[#5F6B66] font-normal">Nhấp để xem chi tiết</span>
              </div>

              {filteredLessons.map((lesson) => {
                const isSelected = selectedLesson?.id === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EAF7F0] border-[#168A5A] shadow-xs'
                        : 'bg-white hover:bg-[#F5FBF7] border-[#DDEAE3]'
                    }`}
                  >
                    <div className="pr-3">
                      <div className="text-[11px] font-semibold text-[#168A5A]">
                        {lesson.chapterTitle.split(':')[0]}
                      </div>
                      <h3 className="text-sm font-bold text-[#17212B] mt-0.5">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-[#5F6B66] mt-1 line-clamp-1">
                        {lesson.subtitle}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#168A5A] translate-x-1' : 'text-[#99A8A0]'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Selected Lesson Deep Dive or Placeholder */}
          <div className="lg:col-span-7">
            {selectedLesson ? (
              <div className="bg-white rounded-2xl border border-[#DDEAE3] p-6 shadow-xs space-y-6">
                
                {/* Lesson Header */}
                <div className="pb-4 border-b border-[#DDEAE3] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#168A5A]">
                      {selectedLesson.chapterTitle}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#17212B] mt-1">
                      {selectedLesson.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5F6B66] mt-1 font-medium">
                      {selectedLesson.subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAskAi(selectedLesson)}
                      className="px-3 py-1.5 bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#07583F] border border-[#168A5A]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5 text-[#168A5A]" />
                      <span>Hỏi Gia sư AI</span>
                    </button>
                    {selectedLesson.relatedExperimentId && (
                      <button
                        onClick={() => onOpenSimulation(selectedLesson.relatedExperimentId!)}
                        className="px-3 py-1.5 bg-[#168A5A] hover:bg-[#07583F] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Mô phỏng</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Section 1: Hiểu nhanh */}
                <div>
                  <h3 className="text-xs font-bold text-[#07583F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" />
                    <span>Hiểu nhanh bài học</span>
                  </h3>
                  <div className="p-4 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] text-xs sm:text-sm text-[#17212B] leading-relaxed">
                    <FormattedPhysicsResponse content={selectedLesson.quickGrasp} />
                  </div>
                </div>

                {/* Section 2: Bản chất Vật Lí */}
                <div>
                  <h3 className="text-xs font-bold text-[#07583F] uppercase tracking-wider mb-2">
                    Bản chất Vật Lí
                  </h3>
                  <div className="p-4 bg-white rounded-xl border border-[#DDEAE3] text-xs sm:text-sm text-[#17212B] leading-relaxed">
                    <FormattedPhysicsResponse content={selectedLesson.physicsNature} />
                  </div>
                </div>

                {/* Section 3: Công thức cốt lõi & Đại lượng */}
                <div>
                  <h3 className="text-xs font-bold text-[#07583F] uppercase tracking-wider mb-3">
                    Công thức cốt lõi & Đơn vị SI
                  </h3>
                  <div className="space-y-3">
                    {selectedLesson.coreFormulas.map((f, fIdx) => (
                      <div key={fIdx} className="p-4 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#07583F]">{f.name}</span>
                          <span className="text-[10px] text-[#5F6B66] font-mono">SGK 11</span>
                        </div>
                        <div className="text-sm sm:text-base font-mono font-bold text-[#168A5A] py-1">
                          <FormattedPhysicsResponse content={`$$${f.expression}$$`} />
                        </div>
                        <p className="text-xs text-[#5F6B66]">{f.description}</p>
                        
                        {/* Variables breakdown */}
                        <div className="pt-2 border-t border-[#DDEAE3]/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {f.variables.map((v, vIdx) => (
                            <div key={vIdx} className="flex items-center gap-1.5 text-[#17212B]">
                              <code className="px-1.5 py-0.5 bg-white border border-[#DDEAE3] rounded font-bold text-[#07583F]">
                                {v.symbol}
                              </code>
                              <span>: {v.meaning} [{v.unit}]</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Sai lầm thường gặp */}
                {selectedLesson.commonMistakes && selectedLesson.commonMistakes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-[#C53030] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Sai lầm thường gặp khi làm bài</span>
                    </h3>
                    <ul className="space-y-2 p-4 bg-[#FFF5F5] rounded-xl border border-[#FED7D7] text-xs sm:text-sm text-[#742A2A]">
                      {selectedLesson.commonMistakes.map((mis, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2">
                          <span className="font-bold shrink-0">•</span>
                          <span>{mis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 5: Bài tập mẫu & Hướng dẫn giải */}
                <div>
                  <h3 className="text-xs font-bold text-[#07583F] uppercase tracking-wider mb-2">
                    Bài tập vận dụng mẫu
                  </h3>
                  <div className="p-4 bg-white rounded-xl border border-[#DDEAE3] space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-[#17212B]">
                      {selectedLesson.sampleExercise.question}
                    </p>
                    <div className="pt-2 border-t border-[#DDEAE3] text-xs sm:text-sm text-[#5F6B66] space-y-2">
                      <div className="text-[11px] font-bold text-[#168A5A] uppercase mb-1">
                        Hướng dẫn giải chuẩn:
                      </div>
                      {selectedLesson.sampleExercise.stepSolution && selectedLesson.sampleExercise.stepSolution.length > 0 ? (
                        <div className="space-y-2">
                          {selectedLesson.sampleExercise.stepSolution.map((s) => (
                            <div key={s.stepNumber} className="p-2.5 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3]">
                              <span className="font-bold text-[#07583F] text-xs block mb-1">
                                Bước {s.stepNumber}: {s.stepName}
                              </span>
                              <FormattedPhysicsResponse content={s.content} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <FormattedPhysicsResponse content={selectedLesson.sampleExercise.solutionGuide || 'Đang cập nhật hướng dẫn giải...'} />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Prompt to select a lesson */
              <div className="bg-[#F5FBF7] rounded-2xl border border-dashed border-[#DDEAE3] p-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#168A5A] flex items-center justify-center border border-[#DDEAE3] shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#17212B]">
                  Chọn một bài học từ danh sách bên trái
                </h3>
                <p className="text-xs text-[#5F6B66] max-w-sm leading-relaxed">
                  Xem chi tiết bản chất vật lý, công thức, bảng đại lượng và bài tập mẫu của bài học tương ứng.
                </p>
                {chapterLessons[0] && (
                  <button
                    onClick={() => setSelectedLesson(chapterLessons[0])}
                    className="mt-2 px-4 py-2 bg-[#168A5A] hover:bg-[#07583F] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Mở bài học đầu tiên: {chapterLessons[0].title}
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
