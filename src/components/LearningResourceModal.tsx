import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Download, BookOpen, Layers } from 'lucide-react';
import { LearningCardItem } from '../types';

interface LearningResourceModalProps {
  card: LearningCardItem | null;
  onClose: () => void;
  onExploreLabs: () => void;
}

export const LearningResourceModal: React.FC<LearningResourceModalProps> = ({
  card,
  onClose,
  onExploreLabs,
}) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DDEAE3] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#F5FBF7] border-b border-[#DDEAE3] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EAF7F0] text-[#07583F] border border-[#DDEAE3]">
                {card.badge}
              </span>
              <span className="text-xs text-[#5F6B66]">{card.stats}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#17212B]">
              {card.title}
            </h3>
            <p className="text-xs text-[#5F6B66] mt-1">{card.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDEAE3] text-[#5F6B66] hover:text-[#17212B] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07583F] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>Phương pháp tiếp cận tại COSMOPHYSIC</span>
            </h4>
            <p className="text-sm text-[#17212B] leading-relaxed bg-[#F5FBF7] p-4 rounded-xl border border-[#DDEAE3]">
              {card.description} Chúng tôi áp dụng quy trình 3 bước: Quan sát hiện tượng đời sống → Trực quan hóa mô hình bản chất → Vận dụng công thức giải quyết bài toán.
            </p>
          </div>

          {/* Highlights checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07583F] mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>Nội dung tài nguyên bao gồm</span>
            </h4>
            <div className="space-y-2.5">
              {[
                'Mô phỏng 3D tương tác giúp nhìn thấy những gì mắt thường không thể thấy.',
                'Sơ đồ tư duy thu gọn 1 chương dài 20 trang thành 1 trang logic duy nhất.',
                'Phương pháp giải mẫu phân tích từng bước, nói rõ "vì sao lại dùng công thức này".',
                'Ngân hàng bài tập từ cơ bản đến nâng cao bám sát đề thi Tốt nghiệp THPT.'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-[#DDEAE3] bg-white text-xs text-[#17212B]">
                  <CheckCircle2 className="w-4 h-4 text-[#168A5A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5FBF7] border-t border-[#DDEAE3] flex items-center justify-between">
          <span className="text-xs text-[#5F6B66]">
            Miễn phí cho mọi học sinh THPT
          </span>
          <button
            onClick={() => {
              onClose();
              onExploreLabs();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#168A5A] hover:bg-[#07583F] rounded-full shadow-xs transition-colors"
          >
            <span>Trải nghiệm ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
