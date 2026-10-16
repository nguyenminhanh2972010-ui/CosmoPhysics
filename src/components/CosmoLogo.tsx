import React from 'react';

interface CosmoLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const CosmoLogo: React.FC<CosmoLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 select-none group" id="cosmophysic-logo">
      {/* Abstract Atomic Orbital Scientific Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-xl transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Background Glow */}
          <circle cx="24" cy="24" r="22" fill={isDark ? '#07583F' : '#EAF7F0'} fillOpacity={isDark ? '0.35' : '0.7'} />
          
          {/* Outer Orbital Ring 1 - 45 deg */}
          <ellipse
            cx="24"
            cy="24"
            rx="18"
            ry="7.5"
            transform="rotate(-45 24 24)"
            stroke="#168A5A"
            strokeWidth="2"
            strokeDasharray="4 2"
            className="opacity-75"
          />
          
          {/* Outer Orbital Ring 2 - 45 deg reverse */}
          <ellipse
            cx="24"
            cy="24"
            rx="18"
            ry="7.5"
            transform="rotate(45 24 24)"
            stroke={isDark ? '#4ADE80' : '#07583F'}
            strokeWidth="2"
            className="opacity-80"
          />

          {/* Central Nucleus (Energy core) */}
          <circle cx="24" cy="24" r="5" fill="#168A5A" />
          <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />

          {/* Orbiting Quantum Particle 1 */}
          <circle cx="11" cy="11" r="2.5" fill="#168A5A" />
          {/* Orbiting Quantum Particle 2 */}
          <circle cx="37" cy="11" r="2.5" fill={isDark ? '#86EFAC' : '#07583F'} />
          {/* Orbiting Quantum Particle 3 */}
          <circle cx="24" cy="42" r="2" fill="#168A5A" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight ${textSizes[size]} leading-none`}>
          <span className={isDark ? 'text-white' : 'text-[#17212B]'}>COSMO</span>
          <span className="text-[#168A5A] ml-0.5">PHYSIC</span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-1 ${isDark ? 'text-[#DDEAE3]/70' : 'text-[#5F6B66]'}`}>
            Trạm Cứu Hộ Vật Lý
          </span>
        )}
      </div>
    </div>
  );
};
