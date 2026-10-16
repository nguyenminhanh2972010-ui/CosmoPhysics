import React from 'react';
import { ArrowRight, Check, Compass, Sparkles, Orbit, Layers, FileText, Activity } from 'lucide-react';
import { LEARNING_CARDS, WHY_CHECKPOINTS } from '../data/physicsData';
import { LearningCardItem } from '../types';

interface WhyCosmophysicProps {
  onSelectCard: (card: LearningCardItem) => void;
}

export const WhyCosmophysic: React.FC<WhyCosmophysicProps> = ({ onSelectCard }) => {
  // Render clean vector scientific thumbnail for each card (NO HUMANS)
  const renderCardThumbnail = (type: LearningCardItem['visualType']) => {
    switch (type) {
      case 'cosmic':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#07583F] via-[#053C2D] to-[#04281E] rounded-xl overflow-hidden relative flex items-center justify-center p-3">
            {/* Orbital Rings & Planet */}
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              <ellipse cx="100" cy="60" rx="80" ry="32" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
              <ellipse cx="100" cy="60" rx="55" ry="22" stroke="#86EFAC" strokeWidth="1" opacity="0.5" />
              {/* Central Planet */}
              <circle cx="100" cy="60" r="24" fill="#168A5A" />
              <circle cx="94" cy="54" r="6" fill="#86EFAC" opacity="0.8" />
              {/* Orbiting particle */}
              <circle cx="155" cy="50" r="4.5" fill="#4ADE80" />
              {/* Distant stars */}
              <circle cx="30" cy="25" r="1.5" fill="#FFFFFF" opacity="0.8" />
              <circle cx="170" cy="30" r="1.5" fill="#FFFFFF" opacity="0.9" />
              <circle cx="45" cy="95" r="1.5" fill="#FFFFFF" opacity="0.7" />
              <circle cx="140" cy="100" r="1.5" fill="#FFFFFF" opacity="0.6" />
            </svg>
            <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs text-[10px] font-mono text-[#86EFAC] border border-[#168A5A]/30">
              Vũ trụ & Tự nhiên
            </span>
          </div>
        );

      case 'simulation':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#EAF7F0] via-[#F5FBF7] to-white rounded-xl border border-[#DDEAE3] overflow-hidden relative flex items-center justify-center p-3">
            {/* Laboratory & Optics Wave Simulation */}
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              {/* Prism & laser dispersion */}
              <polygon points="60,25 95,85 25,85" fill="#FFFFFF" stroke="#168A5A" strokeWidth="2" />
              <line x1="10" y1="65" x2="48" y2="55" stroke="#07583F" strokeWidth="2.5" />
              {/* Refraction inside & outgoing spectrum */}
              <line x1="48" y1="55" x2="74" y2="58" stroke="#168A5A" strokeWidth="2" />
              <line x1="74" y1="58" x2="135" y2="35" stroke="#EF4444" strokeWidth="2" opacity="0.85" />
              <line x1="74" y1="58" x2="140" y2="55" stroke="#10B981" strokeWidth="2" opacity="0.85" />
              <line x1="74" y1="58" x2="135" y2="75" stroke="#3B82F6" strokeWidth="2" opacity="0.85" />
              {/* Measurement grid lines */}
              <line x1="140" y1="20" x2="140" y2="95" stroke="#DDEAE3" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="140" cy="35" r="3" fill="#EF4444" />
              <circle cx="140" cy="55" r="3" fill="#10B981" />
              <circle cx="140" cy="75" r="3" fill="#3B82F6" />
            </svg>
            <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-[#07583F]/10 text-[10px] font-mono text-[#07583F] border border-[#168A5A]/20">
              Mô phỏng 3D
            </span>
          </div>
        );

      case 'mindmap':
        return (
          <div className="w-full h-36 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] overflow-hidden relative flex items-center justify-center p-3">
            {/* Mindmap Nodes & Branches */}
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              {/* Central Core Node */}
              <rect x="75" y="44" width="50" height="28" rx="8" fill="#168A5A" />
              <text x="100" y="62" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">VẬT LÝ</text>

              {/* Connecting lines */}
              <path d="M 75 58 C 50 58, 45 35, 30 35" stroke="#168A5A" strokeWidth="1.5" fill="none" />
              <path d="M 75 58 C 50 58, 45 85, 30 85" stroke="#168A5A" strokeWidth="1.5" fill="none" />
              <path d="M 125 58 C 150 58, 155 35, 170 35" stroke="#168A5A" strokeWidth="1.5" fill="none" />
              <path d="M 125 58 C 150 58, 155 85, 170 85" stroke="#168A5A" strokeWidth="1.5" fill="none" />

              {/* Satellite nodes */}
              <rect x="8" y="24" width="36" height="20" rx="6" fill="#FFFFFF" stroke="#DDEAE3" strokeWidth="1" />
              <text x="26" y="37" fill="#07583F" fontSize="8" fontWeight="600" textAnchor="middle">Cơ học</text>

              <rect x="8" y="74" width="36" height="20" rx="6" fill="#FFFFFF" stroke="#DDEAE3" strokeWidth="1" />
              <text x="26" y="87" fill="#07583F" fontSize="8" fontWeight="600" textAnchor="middle">Nhiệt</text>

              <rect x="156" y="24" width="36" height="20" rx="6" fill="#FFFFFF" stroke="#DDEAE3" strokeWidth="1" />
              <text x="174" y="37" fill="#07583F" fontSize="8" fontWeight="600" textAnchor="middle">Quang</text>

              <rect x="156" y="74" width="36" height="20" rx="6" fill="#FFFFFF" stroke="#DDEAE3" strokeWidth="1" />
              <text x="174" y="87" fill="#07583F" fontSize="8" fontWeight="600" textAnchor="middle">Lượng tử</text>
            </svg>
            <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-[#07583F]/10 text-[10px] font-mono text-[#07583F] border border-[#168A5A]/20">
              Sơ đồ tư duy
            </span>
          </div>
        );

      case 'equations':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#053C2D] to-[#07583F] rounded-xl overflow-hidden relative flex items-center justify-center p-3">
            {/* Step-by-Step Equations & Proof Diagram */}
            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
              {/* Step markers */}
              <circle cx="30" cy="30" r="10" fill="#168A5A" />
              <text x="30" y="34" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">1</text>
              <line x1="30" y1="40" x2="30" y2="70" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="3 3" />
              
              <circle cx="30" cy="80" r="10" fill="#86EFAC" />
              <text x="30" y="84" fill="#053C2D" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>

              {/* Equation lines */}
              <text x="50" y="34" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">∑ F = m · a</text>
              <text x="50" y="52" fill="#DDEAE3" fontSize="9" opacity="0.8">Phân tích lực & điều kiện cân bằng</text>
              <text x="50" y="84" fill="#86EFAC" fontSize="11" fontFamily="monospace" fontWeight="bold">⇒ a = (F - F_ms) / m</text>
            </svg>
            <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs text-[10px] font-mono text-[#86EFAC] border border-[#168A5A]/30">
              Phương pháp giải
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="why-cosmophysic" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Why Choose COSMOPHYSIC Text & Checkpoints */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold tracking-wider">
              <span>VÌ SAO NÊN CHỌN COSMOPHYSIC?</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17212B] tracking-tight leading-tight">
              Học Vật lý theo cách của bạn
            </h2>

            {/* Description */}
            <p className="text-base text-[#5F6B66] leading-relaxed">
              Chúng tôi tin rằng Vật lý không hề quá khó — chỉ là bạn chưa tìm được cách tiếp cận phù hợp. Với COSMOPHYSIC, kiến thức trở nên trực quan, dễ hiểu và gần gũi hơn với cuộc sống.
            </p>

            {/* Four Check-mark points */}
            <div className="w-full space-y-3 pt-2">
              {WHY_CHECKPOINTS.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EAF7F0] border border-[#168A5A]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#168A5A] stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-[#17212B] leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Rescue Station Philosophy Callout */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] w-full">
              <p className="text-xs font-semibold text-[#07583F] uppercase tracking-wider mb-1">
                Triết lý học tập của COSMOPHYSIC
              </p>
              <p className="text-sm text-[#17212B] font-medium italic">
                “Bạn không cần học thuộc mọi thứ. Bạn cần hiểu nó hoạt động như thế nào.”
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: 2x2 Grid of Learning Resource Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {LEARNING_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onSelectCard(card)}
                  id={`learning-card-${card.id}`}
                  className="group bg-white rounded-2xl border border-[#DDEAE3] p-5 shadow-xs hover:shadow-md hover:border-[#168A5A]/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Illustration */}
                    <div className="mb-4 overflow-hidden rounded-xl">
                      {renderCardThumbnail(card.visualType)}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors leading-snug">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#5F6B66] mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Bottom: circular arrow button */}
                  <div className="pt-4 mt-2 border-t border-[#DDEAE3]/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#168A5A]">
                      {card.badge}
                    </span>

                    <div className="w-8 h-8 rounded-full bg-[#F5FBF7] group-hover:bg-[#168A5A] group-hover:text-white text-[#168A5A] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
