import React from 'react';
import { X, CheckCircle2, Bookmark, BookmarkCheck, Sparkles, BookOpen, Clock, Lightbulb, Play, AlertTriangle, ChevronRight, Bot } from 'lucide-react';
import { LessonItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { FormattedPhysicsResponse } from './FormattedPhysicsResponse';

export interface LessonDetailModalProps {
  lesson: LessonItem | null;
  chapterTitle?: string;
  isOpen?: boolean;
  onClose: () => void;
  onOpenSimulation?: (demoId: string) => void;
  onAskAi?: (lesson: LessonItem) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  chapterTitle,
  isOpen = true,
  onClose,
  onOpenSimulation,
  onAskAi
}) => {
  const { isLessonCompleted, toggleCompleteLesson } = useAuth();

  if (!lesson || (isOpen === false)) return null;

  const isCompleted = isLessonCompleted(lesson.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl border border-[#DDEAE3] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#DDEAE3] bg-[#F5FBF7] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-md border border-[#DDEAE3]">
                {chapterTitle || lesson.chapterTitle || 'Vật lý 11 Chuẩn'}
              </span>
              <span className="text-xs text-[#5F6B66] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lesson.pageRange || 'Tiết chuẩn 45p'}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-[#17212B]">
              {lesson.title}
            </h3>
            {lesson.subtitle && (
              <p className="text-xs text-[#5F6B66] mt-0.5">{lesson.subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5F6B66] hover:text-[#17212B] hover:bg-white rounded-xl transition-colors shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Quick Grasp Summary Box */}
          <div className="p-4 bg-[#EAF7F0]/70 rounded-2xl border border-[#DDEAE3] space-y-2">
            <h4 className="text-xs font-bold text-[#07583F] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" /> Nắm nhanh bản chất trong 30 giây
            </h4>
            <p className="text-xs text-[#17212B] leading-relaxed">
              {lesson.quickGrasp}
            </p>
          </div>

          {/* Real life phenomenon & Physics nature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#07583F] block mb-1">Hiện tượng thực tế:</span>
              <p className="text-[#5F6B66] leading-relaxed">{lesson.realLifePhenomenon}</p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#07583F] block mb-1">Bản chất Vật lý:</span>
              <p className="text-[#5F6B66] leading-relaxed">{lesson.physicsNature}</p>
            </div>
          </div>

          {/* Core Formulas */}
          {lesson.coreFormulas && lesson.coreFormulas.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#17212B] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#168A5A]" /> Công thức cốt lõi & Ý nghĩa đại lượng
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {lesson.coreFormulas.map((form, idx) => (
                  <div key={idx} className="p-4 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#17212B]">{form.name}</span>
                      {form.condition && (
                        <span className="text-[10px] text-[#5F6B66] bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
                          {form.condition}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-sm sm:text-base font-extrabold text-[#07583F] bg-white px-3 py-2 rounded-lg border border-[#DDEAE3]">
                      <FormattedPhysicsResponse content={`$$${form.expression}$$`} />
                    </div>
                    <p className="text-xs text-[#5F6B66]">{form.description}</p>
                    {form.variables && form.variables.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DDEAE3]/60 text-[11px]">
                        {form.variables.map((v, vIdx) => (
                          <span key={vIdx} className="bg-white px-2 py-1 rounded-md border border-[#DDEAE3]">
                            <strong className="text-[#07583F] font-mono">{v.symbol}</strong>: {v.meaning} ({v.unit})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solved Example Problem: 8-Step Method */}
          {lesson.sampleExercise && (
            <div className="p-5 bg-white rounded-2xl border border-[#DDEAE3] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#07583F] uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#168A5A]" /> Bài tập mẫu & Lời giải chuẩn 8 bước
                </h4>
                <span className="text-[10px] bg-[#EAF7F0] text-[#07583F] px-2 py-0.5 rounded-full font-semibold border border-[#DDEAE3]">
                  Phương pháp tư duy logic
                </span>
              </div>

              <div className="p-3.5 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] text-xs font-semibold text-[#17212B] leading-relaxed">
                {lesson.sampleExercise.question}
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#17212B] block">Các bước giải chi tiết:</span>
                <div className="space-y-2">
                  {lesson.sampleExercise.stepSolution && lesson.sampleExercise.stepSolution.length > 0 ? (
                    lesson.sampleExercise.stepSolution.map((step) => (
                      <div key={step.stepNumber} className="p-3 bg-white rounded-xl border border-[#DDEAE3] text-xs">
                        <span className="font-bold text-[#07583F] block mb-1">
                          Bước {step.stepNumber}: {step.stepName}
                        </span>
                        <FormattedPhysicsResponse content={step.content} />
                      </div>
                    ))
                  ) : lesson.sampleExercise.solutionGuide ? (
                    <div className="p-3 bg-white rounded-xl border border-[#DDEAE3] text-xs">
                      <FormattedPhysicsResponse content={lesson.sampleExercise.solutionGuide} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <div className="p-4 bg-[#FFFBF0] rounded-2xl border border-[#FEE2B3] space-y-2 text-xs">
              <h4 className="font-bold text-[#B45309] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" /> Sai lầm phổ biến khi làm bài thi
              </h4>
              <ul className="space-y-1 text-[#78350F] list-disc list-inside">
                {lesson.commonMistakes.map((m, mIdx) => (
                  <li key={mIdx} className="leading-relaxed">{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Lesson Summary Points */}
          {lesson.summary && lesson.summary.length > 0 && (
            <div className="p-4 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] space-y-2 text-xs">
              <h4 className="font-bold text-[#07583F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#168A5A]" /> Ghi nhớ sau bài học
              </h4>
              <ul className="space-y-1 text-[#17212B]">
                {lesson.summary.map((s, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#168A5A] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DDEAE3] bg-[#F5FBF7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => toggleCompleteLesson(lesson.id)}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-white text-[#07583F] border border-[#DDEAE3] hover:bg-[#EAF7F0]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Đã hoàn thành bài học' : 'Đánh dấu đã học xong'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onAskAi && (
              <button
                onClick={() => onAskAi(lesson)}
                className="flex-1 sm:flex-none px-3.5 py-2.5 bg-white hover:bg-[#EAF7F0] text-[#07583F] border border-[#DDEAE3] rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-[#168A5A]" />
                <span>Hỏi Gia sư AI</span>
              </button>
            )}

            {(lesson.relatedExperimentId || lesson.simulationDemoId) && onOpenSimulation && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSimulation(lesson.relatedExperimentId || lesson.simulationDemoId!);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#07583F] hover:bg-[#053C2D] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Play className="w-4 h-4 text-[#86EFAC]" />
                <span>Mô phỏng ảo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
