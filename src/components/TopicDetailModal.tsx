import React from 'react';
import { X, BookOpen, Atom, ArrowRight, CheckCircle2, FlaskConical, Sparkles } from 'lucide-react';
import { PhysicsTopicItem } from '../types';

interface TopicDetailModalProps {
  topic: PhysicsTopicItem | null;
  onClose: () => void;
  onLaunchExperiment: (demoId?: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onLaunchExperiment,
}) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DDEAE3] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#F5FBF7] border-b border-[#DDEAE3] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EAF7F0] text-[#07583F] border border-[#DDEAE3]">
                {topic.grade === 'all' ? 'Toàn bộ THPT' : `Vật lý Lớp ${topic.grade}`}
              </span>
              <span className="text-xs text-[#5F6B66]">{topic.subtitle}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#17212B]">
              {topic.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDEAE3] text-[#5F6B66] hover:text-[#17212B] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07583F] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>Bản chất hiện tượng & Ý nghĩa</span>
            </h4>
            <p className="text-sm text-[#17212B] leading-relaxed bg-[#F5FBF7] p-4 rounded-xl border border-[#DDEAE3]">
              {topic.summary}
            </p>
          </div>

          {/* Key Concepts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07583F] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>Các chủ đề trọng tâm trong chương trình</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topic.keyConcepts.map((concept, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-[#DDEAE3] bg-white text-xs font-medium text-[#17212B]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#168A5A] shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Formulas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07583F] mb-2 flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>Công thức cốt lõi & Cách hiểu bản chất</span>
            </h4>
            <div className="space-y-2.5">
              {topic.formulas.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl border border-[#DDEAE3] bg-[#F5FBF7] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <span className="font-mono text-sm font-bold text-[#07583F] bg-white px-2.5 py-1 rounded-md border border-[#DDEAE3] inline-block sm:shrink-0">
                    {item.formula}
                  </span>
                  <span className="text-xs text-[#5F6B66] sm:text-right">
                    {item.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F5FBF7] border-t border-[#DDEAE3] flex items-center justify-between">
          <span className="text-xs text-[#5F6B66]">
            Đã tích hợp trong bộ cẩm nang COSMOPHYSIC
          </span>
          <button
            onClick={() => {
              onClose();
              onLaunchExperiment(topic.interactiveDemoId);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#168A5A] hover:bg-[#07583F] rounded-full shadow-xs transition-colors"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Mở mô phỏng liên quan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
