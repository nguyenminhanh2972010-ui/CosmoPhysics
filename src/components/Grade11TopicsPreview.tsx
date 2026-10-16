import React from 'react';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PHYSICS_TOPICS } from '../data/physicsData';
import { PhysicsTopicItem } from '../types';

interface Grade11TopicsPreviewProps {
  onSelectTopic: (topic: PhysicsTopicItem) => void;
  onViewAll: () => void;
}

export const Grade11TopicsPreview: React.FC<Grade11TopicsPreviewProps> = ({
  onSelectTopic,
  onViewAll,
}) => {
  const renderTopicVisual = (visualType: PhysicsTopicItem['visualType']) => {
    switch (visualType) {
      case 'mechanics':
        return (
          <div className="w-full h-32 bg-gradient-to-br from-[#07583F] to-[#04281E] rounded-xl relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full" fill="none">
              <line x1="20" y1="50" x2="180" y2="50" stroke="#168A5A" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 20 50 Q 50 15, 80 50 T 140 50 T 180 50" stroke="#86EFAC" strokeWidth="2" fill="none" />
              <circle cx="80" cy="50" r="10" fill="#168A5A" stroke="#86EFAC" strokeWidth="2" />
              <text x="80" y="54" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">m</text>
            </svg>
            <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-mono text-[#86EFAC]">
              Dao động & Cơ năng
            </span>
          </div>
        );
      case 'optics':
        return (
          <div className="w-full h-32 bg-gradient-to-br from-[#EAF7F0] to-[#F5FBF7] border border-[#DDEAE3] rounded-xl relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full" fill="none">
              <circle cx="60" cy="50" r="15" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="60" cy="50" r="30" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="140" cy="50" r="15" stroke="#07583F" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="140" cy="50" r="30" stroke="#07583F" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="60" cy="50" r="4" fill="#168A5A" />
              <circle cx="140" cy="50" r="4" fill="#07583F" />
              <line x1="100" y1="15" x2="100" y2="85" stroke="#10B981" strokeWidth="2" />
            </svg>
            <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-[#07583F]/10 text-[10px] font-mono text-[#07583F]">
              Sóng & Giao thoa
            </span>
          </div>
        );
      case 'electromagnetism':
        return (
          <div className="w-full h-32 bg-gradient-to-br from-[#F5FBF7] to-[#EAF7F0] border border-[#DDEAE3] rounded-xl relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full" fill="none">
              <circle cx="60" cy="50" r="12" fill="#168A5A" />
              <text x="60" y="54" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
              <circle cx="140" cy="50" r="12" fill="#07583F" />
              <text x="140" y="54" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">−</text>
              <path d="M 72 50 C 95 30, 105 30, 128 50" stroke="#168A5A" strokeWidth="1.5" fill="none" />
              <path d="M 72 50 C 95 70, 105 70, 128 50" stroke="#168A5A" strokeWidth="1.5" fill="none" />
              <line x1="72" y1="50" x2="128" y2="50" stroke="#168A5A" strokeWidth="2" />
            </svg>
            <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-[#07583F]/10 text-[10px] font-mono text-[#07583F]">
              Điện trường & Tụ điện
            </span>
          </div>
        );
      case 'thermodynamics':
      default:
        return (
          <div className="w-full h-32 bg-gradient-to-br from-[#07583F] to-[#053C2D] rounded-xl relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full" fill="none">
              <rect x="30" y="30" width="140" height="40" rx="6" stroke="#86EFAC" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="8" fill="#168A5A" />
              <text x="50" y="54" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">ℰ</text>
              <rect x="110" y="44" width="30" height="12" rx="2" fill="#86EFAC" />
              <text x="125" y="53" fill="#07583F" fontSize="8" fontWeight="bold" textAnchor="middle">R</text>
              <line x1="58" y1="50" x2="110" y2="50" stroke="#86EFAC" strokeWidth="2" />
            </svg>
            <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-mono text-[#86EFAC]">
              Mạch điện & Định luật Ohm
            </span>
          </div>
        );
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F5FBF7]/50 border-b border-[#DDEAE3]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and "Xem tất cả chủ đề" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
              <span>CHƯƠNG TRÌNH CHUẨN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              4 Chủ đề trọng tâm Vật Lí 11
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5">
              Toàn bộ kiến thức bám sát cấu trúc Sách giáo khoa GDPT mới.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#168A5A] hover:text-[#07583F] group transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Xem tất cả bài học</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHYSICS_TOPICS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="group bg-white rounded-2xl border border-[#DDEAE3] p-5 shadow-xs hover:shadow-md hover:border-[#168A5A] transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="mb-4 overflow-hidden rounded-xl">
                  {renderTopicVisual(topic.visualType)}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors leading-snug">
                  {topic.title}
                </h3>

                {/* Subtitle / Key concepts summary */}
                <p className="text-xs text-[#5F6B66] mt-2 line-clamp-3 leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#07583F]">
                  Khám phá chương
                </span>
                <div className="w-7 h-7 rounded-full bg-[#F5FBF7] group-hover:bg-[#168A5A] group-hover:text-white text-[#168A5A] flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
