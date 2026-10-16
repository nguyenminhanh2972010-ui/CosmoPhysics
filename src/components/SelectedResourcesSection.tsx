import React from 'react';
import { BookOpen, FlaskConical, Bookmark, ArrowRight, Sparkles } from 'lucide-react';
import { ActivePage } from './Header';

interface SelectedResourcesSectionProps {
  onOpenLesson: (lessonId: string) => void;
  onOpenExperiment: () => void;
  onOpenHandbook: () => void;
}

export const SelectedResourcesSection: React.FC<SelectedResourcesSectionProps> = ({
  onOpenLesson,
  onOpenExperiment,
  onOpenHandbook,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#DDEAE3]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <span>TÀI NGUYÊN NỔI BẬT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Nội dung chọn lọc tiêu biểu
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5">
            Trải nghiệm trực quan ngay những bài học, thí nghiệm và công thức quan trọng nhất.
          </p>
        </div>

        {/* 3 Featured Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Featured Lesson */}
          <div
            onClick={() => onOpenLesson('g11-l1')}
            className="group bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] p-6 hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#168A5A] bg-[#EAF7F0] px-2.5 py-1 rounded-full border border-[#DDEAE3]">
                  Bài học tiêu biểu
                </span>
                <BookOpen className="w-5 h-5 text-[#168A5A]" />
              </div>
              <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                Dao động điều hòa & Phương trình li độ
              </h3>
              <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                Nắm chắc phương trình x = A·cos(ωt + φ), bản chất pha dao động và mối liên hệ vuông pha giữa vận tốc và gia tốc.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
              <span className="text-xs font-bold text-[#07583F]">
                Vào xem bài học
              </span>
              <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* 2. Featured Experiment */}
          <div
            onClick={onOpenExperiment}
            className="group bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] p-6 hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#07583F] bg-[#EAF7F0] px-2.5 py-1 rounded-full border border-[#DDEAE3]">
                  Thí nghiệm tương tác
                </span>
                <FlaskConical className="w-5 h-5 text-[#168A5A]" />
              </div>
              <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                Mô phỏng Con lắc lò xo & Cơ năng
              </h3>
              <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                Tương tác trực tiếp: thay đổi khối lượng $m$, độ cứng $k$, quan sát đồ thị động năng - thế năng và tính bảo toàn cơ năng.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
              <span className="text-xs font-bold text-[#07583F]">
                Mở phòng thí nghiệm
              </span>
              <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* 3. Featured Formula Set */}
          <div
            onClick={onOpenHandbook}
            className="group bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] p-6 hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#168A5A] bg-[#EAF7F0] px-2.5 py-1 rounded-full border border-[#DDEAE3]">
                  Bộ công thức trọng tâm
                </span>
                <Bookmark className="w-5 h-5 text-[#168A5A]" />
              </div>
              <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                Sổ tay Dao động & Sóng cơ
              </h3>
              <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                Tra cứu nhanh chu kỳ T = 2π√(m/k), bước sóng λ = v/f, điều kiện cực đại giao thoa d₂ - d₁ = kλ kèm đơn vị chuẩn SI.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
              <span className="text-xs font-bold text-[#07583F]">
                Tra cứu sổ tay
              </span>
              <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
