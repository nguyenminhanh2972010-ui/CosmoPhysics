import React from 'react';
import { ArrowRight, Compass, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { ScientificHeroCanvas } from './ScientificHeroCanvas';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreTopics: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreTopics,
}) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#F5FBF7]/50 to-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20"
    >
      {/* Subtle Background Cosmic Grid / Orbital Accent (Low Opacity) */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <svg
          className="absolute -right-24 -top-24 w-[700px] h-[700px] text-[#168A5A]/15"
          viewBox="0 0 600 600"
          fill="none"
        >
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="300" cy="300" r="120" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text Content & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            
            {/* Hero Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#168A5A] shrink-0" />
              <span>KHÁM PHÁ • HIỂU BẢN CHẤT • VƯƠN XA TRI THỨC</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#17212B] tracking-tight leading-[1.2] sm:leading-[1.22]">
              Vật lý không chỉ là công thức, <br className="hidden sm:inline" />
              đó là{' '}
              <span className="text-[#168A5A] relative inline-block">
                câu chuyện của vũ trụ và cuộc sống!
                {/* Subtle soft underline accent */}
                <svg
                  className="absolute left-0 -bottom-1 w-full h-2 text-[#168A5A]/30 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Hero Description */}
            <p className="text-base sm:text-lg text-[#5F6B66] leading-relaxed max-w-2xl">
              COSMOPHYSIC giúp bạn khám phá kiến thức Vật Lí 11 qua bài học trực quan, thí nghiệm mô phỏng và những lời giải dễ hiểu.
            </p>

            {/* CTAs */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
              {/* Primary CTA: Bắt đầu học */}
              <button
                onClick={onStartLearning}
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-[#168A5A] hover:bg-[#07583F] active:bg-[#053C2D] rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#168A5A] group cursor-pointer"
              >
                <span>Bắt đầu học</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Khám phá Vật Lí 11 */}
              <button
                onClick={onExploreTopics}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#07583F] bg-white hover:bg-[#EAF7F0]/80 border-2 border-[#168A5A] rounded-full transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168A5A] group shadow-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#168A5A]" />
                <span>Khám phá Vật Lí 11</span>
              </button>
            </div>

            {/* High-School Grade 11 Badges */}
            <div className="pt-2 border-t border-[#DDEAE3]/80 w-full flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#5F6B66]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#168A5A]" />
                <span className="font-medium text-[#17212B]">Dành riêng cho học sinh THPT:</span>
                <span className="font-semibold text-[#07583F]">Vật Lí 11</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#168A5A]" />
                <span className="font-medium text-[#17212B]">Chuẩn SGK GDPT mới</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#168A5A]" />
                <span className="font-medium text-[#07583F]">100% Miễn phí học tập</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Scientific & Cosmic Visual Composition */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <ScientificHeroCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};
