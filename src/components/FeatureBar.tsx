import React from 'react';
import { BookOpen, FlaskConical, Network, Target, Heart } from 'lucide-react';
import { QUICK_FEATURES } from '../data/physicsData';

interface FeatureBarProps {
  onSelectFeature?: (id: string) => void;
}

export const FeatureBar: React.FC<FeatureBarProps> = ({ onSelectFeature }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-[#168A5A]" />;
      case 'flask':
        return <FlaskConical className="w-5 h-5 text-[#168A5A]" />;
      case 'document':
        return <Network className="w-5 h-5 text-[#168A5A]" />;
      case 'target':
        return <Target className="w-5 h-5 text-[#168A5A]" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#168A5A]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#168A5A]" />;
    }
  };

  return (
    <section className="relative z-20 -mt-2 sm:-mt-4 mb-8 sm:mb-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-[#F5FBF7] border border-[#DDEAE3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xs"
          id="quick-value-bar"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 divide-y sm:divide-y-0 lg:divide-x divide-[#DDEAE3]">
            {QUICK_FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                onClick={() => onSelectFeature?.(feature.id)}
                className={`group pt-3 sm:pt-0 ${
                  idx > 0 ? 'lg:pl-4' : ''
                } flex flex-col items-start text-left transition-all duration-200 cursor-pointer rounded-xl p-2.5 hover:bg-white/70`}
              >
                {/* Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-[#EAF7F0] group-hover:bg-[#168A5A] flex items-center justify-center mb-3 transition-colors shrink-0">
                  <span className="group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                    {getIcon(feature.icon)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#5F6B66] mt-1.5 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
