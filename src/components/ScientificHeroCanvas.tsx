import React, { useState } from 'react';
import { Sparkles, Atom, Orbit, Compass, Activity, Radio, Eye } from 'lucide-react';

export const ScientificHeroCanvas: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const physicsHighlights = [
    {
      id: 'emc2',
      title: 'Hệ thức Einstein',
      desc: 'E = mc² — Sự tương đương giữa năng lượng và khối lượng.',
      pos: 'top-[12%] right-[18%]',
    },
    {
      id: 'prism',
      title: 'Tán sắc ánh sáng',
      desc: 'Ánh sáng trắng bị tách thành quang phổ liên tục qua lăng kính.',
      pos: 'bottom-[22%] left-[10%]',
    },
    {
      id: 'atom',
      title: 'Mô hình nguyên tử Bohr',
      desc: 'Các electron chuyển động trên các quỹ đạo lượng tử hóa dừng.',
      pos: 'top-[44%] left-[12%]',
    },
    {
      id: 'waves',
      title: 'Sóng cơ học & Sóng điện từ',
      desc: 'Sự lan truyền dao động theo không gian và thời gian.',
      pos: 'bottom-[12%] right-[14%]',
    },
  ];

  return (
    <div
      className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center select-none"
      id="hero-scientific-illustration"
    >
      {/* Soft Ambient Background Radiance */}
      <div className="absolute inset-0 bg-radial from-[#EAF7F0] via-[#F5FBF7]/60 to-transparent rounded-full blur-2xl pointer-events-none opacity-80" />

      {/* Coordinate & Polar Mathematical Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="270" stroke="#168A5A" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="300" cy="300" r="210" stroke="#168A5A" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="300" cy="300" r="140" stroke="#07583F" strokeWidth="1" />
        <circle cx="300" cy="300" r="70" stroke="#168A5A" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="30" y1="300" x2="570" y2="300" stroke="#168A5A" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="300" y1="30" x2="300" y2="570" stroke="#168A5A" strokeWidth="0.8" strokeDasharray="4 4" />
        {/* Subtle Angle markings */}
        <line x1="110" y1="110" x2="490" y2="490" stroke="#168A5A" strokeWidth="0.5" strokeDasharray="2 6" />
        <line x1="110" y1="490" x2="490" y2="110" stroke="#168A5A" strokeWidth="0.5" strokeDasharray="2 6" />
      </svg>

      {/* Primary SVG Physics System */}
      <svg
        className="relative w-full h-full z-10 filter drop-shadow-sm"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Planet Gradients */}
          <radialGradient id="planetGlow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="40%" stopColor="#168A5A" />
            <stop offset="85%" stopColor="#07583F" />
            <stop offset="100%" stopColor="#053C2D" />
          </radialGradient>

          <radialGradient id="sunCore" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#EAF7F0" />
            <stop offset="70%" stopColor="#168A5A" />
            <stop offset="100%" stopColor="#07583F" />
          </radialGradient>

          {/* Light Spectrum Gradient */}
          <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="laserBeam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#168A5A" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1. OUTER PLANETARY ORBITAL RINGS */}
        <g className="animate-slow-orbit origin-[300px_300px]">
          {/* Inclined Orbit 1 */}
          <ellipse
            cx="300"
            cy="300"
            rx="230"
            ry="90"
            transform="rotate(-25 300 300)"
            stroke="#168A5A"
            strokeWidth="1.75"
            strokeDasharray="6 4"
            className="opacity-60"
          />
          {/* Orbiting Moon / Satellite */}
          <g transform="rotate(-25 300 300)">
            <circle cx="530" cy="300" r="10" fill="#07583F" />
            <circle cx="527" cy="297" r="3" fill="#86EFAC" />
            <circle cx="530" cy="300" r="14" stroke="#168A5A" strokeWidth="1" strokeDasharray="2 2" className="opacity-70" />
          </g>
        </g>

        {/* 2. REVERSE ORBITAL RING & QUANTUM NODES */}
        <g className="animate-reverse-orbit origin-[300px_300px]">
          <ellipse
            cx="300"
            cy="300"
            rx="180"
            ry="75"
            transform="rotate(40 300 300)"
            stroke="#07583F"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            className="opacity-50"
          />
          <g transform="rotate(40 300 300)">
            <circle cx="120" cy="300" r="7" fill="#168A5A" />
            <circle cx="120" cy="300" r="12" stroke="#168A5A" strokeWidth="0.8" className="opacity-40" />
          </g>
        </g>

        {/* 3. SINE WAVE HARMONIC FUNCTION (Dao động & Sóng) */}
        <path
          d="M 50,300 Q 112.5,230 175,300 T 300,300 T 425,300 T 550,300"
          stroke="#168A5A"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          className="opacity-70"
        />
        <path
          d="M 50,300 Q 112.5,350 175,300 T 300,300 T 425,300 T 550,300"
          stroke="#07583F"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          fill="none"
          className="opacity-40"
        />

        {/* 4. OPTICAL PRISM & DISPERSION (Quang học Lăng kính) */}
        <g transform="translate(60, 360)">
          {/* Incoming White Light Ray */}
          <line x1="10" y1="60" x2="65" y2="40" stroke="url(#laserBeam)" strokeWidth="3" />
          {/* Glass Prism Triangle */}
          <polygon
            points="65,15 105,75 25,75"
            fill="#EAF7F0"
            fillOpacity="0.8"
            stroke="#168A5A"
            strokeWidth="2"
          />
          {/* Internal refraction */}
          <line x1="50" y1="52" x2="80" y2="48" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Dispersed Spectrum Rays */}
          <path
            d="M 80,48 L 150,25 L 155,75 Z"
            fill="url(#spectrumGradient)"
            className="opacity-75"
          />
        </g>

        {/* 5. ATOM WITH ELECTRON ORBITALS (Vật lý Lượng tử / Nguyên tử) */}
        <g transform="translate(70, 130)">
          <ellipse cx="40" cy="40" rx="36" ry="12" transform="rotate(30 40 40)" stroke="#168A5A" strokeWidth="1.4" strokeDasharray="3 3" />
          <ellipse cx="40" cy="40" rx="36" ry="12" transform="rotate(-30 40 40)" stroke="#168A5A" strokeWidth="1.4" strokeDasharray="3 3" />
          <circle cx="40" cy="40" r="9" fill="#07583F" />
          <circle cx="40" cy="40" r="5" fill="#86EFAC" />
          <circle cx="68" cy="24" r="3.5" fill="#168A5A" />
          <circle cx="12" cy="56" r="3.5" fill="#07583F" />
        </g>

        {/* 6. CENTRAL CELESTIAL BODY / GRAVITATIONAL CORE (Hành tinh & Vũ trụ) */}
        <g className="animate-soft-float">
          {/* Gravity Lensing Rings */}
          <circle cx="300" cy="300" r="88" stroke="#168A5A" strokeWidth="1" strokeDasharray="4 6" className="opacity-40 animate-subtle-pulse" />
          <circle cx="300" cy="300" r="74" fill="none" stroke="#DDEAE3" strokeWidth="1.5" />

          {/* Core Planet */}
          <circle cx="300" cy="300" r="62" fill="url(#planetGlow)" className="drop-shadow-md" />
          
          {/* Atmospheric Limb Glow */}
          <path
            d="M 245 270 A 62 62 0 0 1 355 270 A 62 50 0 0 0 245 270"
            fill="#86EFAC"
            opacity="0.35"
          />
          
          {/* Planet Ring */}
          <ellipse
            cx="300"
            cy="300"
            rx="98"
            ry="24"
            transform="rotate(-18 300 300)"
            stroke="#EAF7F0"
            strokeWidth="5"
            strokeOpacity="0.85"
            fill="none"
          />
          <ellipse
            cx="300"
            cy="300"
            rx="102"
            ry="26"
            transform="rotate(-18 300 300)"
            stroke="#168A5A"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            fill="none"
          />
        </g>

        {/* 7. NEWTON'S CRADLE ACCENT (Cơ học) */}
        <g transform="translate(430, 360)">
          {/* Horizontal suspension rod */}
          <line x1="0" y1="0" x2="80" y2="0" stroke="#07583F" strokeWidth="3" strokeLinecap="round" />
          {/* String 1 & Ball (Swinging) */}
          <line x1="16" y1="0" x2="2" y2="45" stroke="#5F6B66" strokeWidth="1.2" />
          <circle cx="2" cy="45" r="7" fill="#168A5A" />
          {/* Center balls */}
          <line x1="32" y1="0" x2="32" y2="48" stroke="#5F6B66" strokeWidth="1.2" />
          <circle cx="32" cy="48" r="7" fill="#07583F" />
          <line x1="48" y1="0" x2="48" y2="48" stroke="#5F6B66" strokeWidth="1.2" />
          <circle cx="48" cy="48" r="7" fill="#07583F" />
          <line x1="64" y1="0" x2="64" y2="48" stroke="#5F6B66" strokeWidth="1.2" />
          <circle cx="64" cy="48" r="7" fill="#168A5A" />
        </g>

        {/* 8. MAGNETIC FIELD LINES (Từ trường) */}
        <g transform="translate(420, 110)">
          <path d="M 10 30 C 35 5, 85 5, 110 30" stroke="#168A5A" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
          <path d="M 0 40 C 35 15, 85 15, 120 40" stroke="#07583F" strokeWidth="1.5" fill="none" />
          <path d="M 10 50 C 35 75, 85 75, 110 50" stroke="#168A5A" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
          {/* Bar magnet */}
          <rect x="35" y="32" width="25" height="16" rx="2" fill="#07583F" />
          <rect x="60" y="32" width="25" height="16" rx="2" fill="#168A5A" />
          <text x="43" y="44" fill="#FFFFFF" fontSize="10" fontWeight="bold">N</text>
          <text x="68" y="44" fill="#FFFFFF" fontSize="10" fontWeight="bold">S</text>
        </g>
      </svg>

      {/* Floating Interactive Physics Formula Badges */}
      {/* 1. E = mc² badge */}
      <div
        className="absolute top-[8%] right-[10%] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DDEAE3] shadow-sm hover:shadow-md hover:border-[#168A5A] transition-all cursor-pointer flex items-center gap-2 group z-20"
        onMouseEnter={() => setActiveTooltip('emc2')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === 'emc2' ? null : 'emc2')}
      >
        <span className="w-2 h-2 rounded-full bg-[#168A5A] animate-ping" />
        <span className="text-xs font-semibold text-[#07583F] font-mono tracking-tight">E = mc²</span>
      </div>

      {/* 2. F = m·a badge */}
      <div
        className="absolute bottom-[28%] right-[4%] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DDEAE3] shadow-sm hover:shadow-md hover:border-[#168A5A] transition-all cursor-pointer flex items-center gap-2 group z-20"
        onMouseEnter={() => setActiveTooltip('fma')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === 'fma' ? null : 'fma')}
      >
        <Activity className="w-3.5 h-3.5 text-[#168A5A]" />
        <span className="text-xs font-semibold text-[#07583F] font-mono tracking-tight">F = m · a</span>
      </div>

      {/* 3. λ = v / f badge */}
      <div
        className="absolute bottom-[8%] left-[12%] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DDEAE3] shadow-sm hover:shadow-md hover:border-[#168A5A] transition-all cursor-pointer flex items-center gap-2 group z-20"
        onMouseEnter={() => setActiveTooltip('waves')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === 'waves' ? null : 'waves')}
      >
        <Radio className="w-3.5 h-3.5 text-[#168A5A]" />
        <span className="text-xs font-semibold text-[#07583F] font-mono tracking-tight">λ = v / f</span>
      </div>

      {/* 4. n₁ sin i = n₂ sin r badge */}
      <div
        className="absolute top-[28%] left-[2%] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DDEAE3] shadow-sm hover:shadow-md hover:border-[#168A5A] transition-all cursor-pointer flex items-center gap-2 group z-20"
        onMouseEnter={() => setActiveTooltip('prism')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === 'prism' ? null : 'prism')}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" />
        <span className="text-xs font-semibold text-[#07583F] font-mono tracking-tight">n₁ sin i = n₂ sin r</span>
      </div>

      {/* Interactive Tooltip Card for curious students */}
      {activeTooltip && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-white/95 backdrop-blur-lg border border-[#168A5A]/30 rounded-xl p-3.5 shadow-lg z-30 transition-all animate-fadeIn">
          {activeTooltip === 'emc2' && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EAF7F0] flex items-center justify-center shrink-0">
                <Atom className="w-4 h-4 text-[#168A5A]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#07583F]">Hệ thức Einstein (E = mc²)</p>
                <p className="text-[11px] text-[#5F6B66] leading-relaxed mt-0.5">
                  Năng lượng và khối lượng là hai mặt của cùng một thực thể. Khối lượng cực nhỏ có thể giải phóng nguồn năng lượng khổng lồ.
                </p>
              </div>
            </div>
          )}
          {activeTooltip === 'fma' && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EAF7F0] flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-[#168A5A]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#07583F]">Định luật II Newton (F = m · a)</p>
                <p className="text-[11px] text-[#5F6B66] leading-relaxed mt-0.5">
                  Lực tác dụng lên vật truyền cho vật gia tốc tỉ lệ thuận với độ lớn lực và tỉ lệ nghịch với khối lượng.
                </p>
              </div>
            </div>
          )}
          {activeTooltip === 'waves' && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EAF7F0] flex items-center justify-center shrink-0">
                <Radio className="w-4 h-4 text-[#168A5A]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#07583F]">Bước sóng & Dao động (λ = v / f)</p>
                <p className="text-[11px] text-[#5F6B66] leading-relaxed mt-0.5">
                  Bước sóng là quãng đường sóng truyền đi trong một chu kỳ thời gian. Mọi âm thanh và ánh sáng đều tuân theo quy luật này.
                </p>
              </div>
            </div>
          )}
          {activeTooltip === 'prism' && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EAF7F0] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#168A5A]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#07583F]">Định luật Snell & Tán sắc ánh sáng</p>
                <p className="text-[11px] text-[#5F6B66] leading-relaxed mt-0.5">
                  Khi ánh sáng truyền qua mặt phân cách giữa hai môi trường trong suốt, các màu sắc bị lệch góc khác nhau tạo nên quang phổ cầu vồng.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
