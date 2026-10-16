import React from 'react';
import { BookOpen, FlaskConical, Bookmark, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { ActivePage } from './Header';

interface MainLearningPathwaysProps {
  onNavigate: (page: ActivePage) => void;
}

export const MainLearningPathways: React.FC<MainLearningPathwaysProps> = ({ onNavigate }) => {
  const pathways = [
    {
      id: 'study' as ActivePage,
      title: 'Học Vật Lí 11',
      description: 'Hệ thống kiến thức theo chủ đề và bài học.',
      action: 'Vào học',
      icon: BookOpen,
      badge: '4 Chương chuẩn',
    },
    {
      id: 'experiments' as ActivePage,
      title: 'Thí nghiệm ảo',
      description: 'Khám phá hiện tượng Vật Lí qua mô phỏng.',
      action: 'Khám phá thí nghiệm',
      icon: FlaskConical,
      badge: '11 Mô phỏng',
    },
    {
      id: 'handbook' as ActivePage,
      title: 'Sổ tay Vật Lí',
      description: 'Tra cứu công thức, ký hiệu và đơn vị.',
      action: 'Tra cứu công thức',
      icon: Bookmark,
      badge: 'Chuẩn GDPT mới',
    },
    {
      id: 'ai-tutor' as ActivePage,
      title: 'Gia sư AI',
      description: 'Đặt câu hỏi và tìm hiểu lời giải từng bước.',
      action: 'Hỏi gia sư AI',
      icon: Bot,
      badge: 'Hỗ trợ 24/7',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#DDEAE3]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <span>LỘ TRÌNH HỌC TẬP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Khám phá 4 cổng học tập chính
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-2 leading-relaxed">
            Chọn phương thức tiếp cận phù hợp nhất với mục tiêu học tập Vật Lí 11 của bạn hôm nay.
          </p>
        </div>

        {/* 4 Primary Pathways Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pathways.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group bg-white rounded-2xl border border-[#DDEAE3] p-6 shadow-xs hover:shadow-md hover:border-[#168A5A] transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  {/* Icon & Metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF7F0] group-hover:bg-[#168A5A] text-[#168A5A] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#5F6B66] bg-[#F5FBF7] px-2.5 py-1 rounded-full border border-[#DDEAE3]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5F6B66] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Primary Action Button */}
                <div className="pt-5 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#07583F] group-hover:text-[#168A5A] transition-colors">
                    {item.action}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F5FBF7] group-hover:bg-[#168A5A] group-hover:text-white text-[#168A5A] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
