import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface CTASectionProps {
  onStartNow: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartNow }) => {
  return (
    <section className="py-10 sm:py-14 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="final-cta-banner"
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#053C2D] via-[#07583F] to-[#04281E] text-white p-8 sm:p-12 shadow-xl border border-[#168A5A]/30"
        >
          {/* Subtle Cosmic Background Texture */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <svg viewBox="0 0 1000 400" className="w-full h-full object-cover" fill="none">
              <ellipse cx="850" cy="200" rx="350" ry="140" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="6 4" />
              <circle cx="850" cy="200" r="60" fill="#168A5A" opacity="0.3" />
              <path d="M 0 300 Q 250 220, 500 300 T 1000 300" stroke="#168A5A" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            </svg>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl flex flex-col items-start text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#168A5A]/40 border border-[#86EFAC]/30 text-[#86EFAC] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#86EFAC]" />
              <span>DÀNH RIÊNG CHO HỌC SINH THPT — VẬT LÍ 11</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bắt đầu hành trình khám phá Vật Lí 11
            </h2>

            <p className="text-xs sm:text-sm text-[#DDEAE3]/90 leading-relaxed max-w-xl">
              Nắm vững bản chất hiện tượng, tự tin giải bài tập theo quy trình chuẩn và trải nghiệm trực quan từng định luật vật lý cùng COSMOPHYSIC.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartNow}
                id="cta-start-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold text-[#053C2D] bg-[#86EFAC] hover:bg-white active:bg-[#EAF7F0] rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#DDEAE3]/80">
                <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
                <span>Hoàn toàn miễn phí · Chuẩn SGK GDPT mới</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
