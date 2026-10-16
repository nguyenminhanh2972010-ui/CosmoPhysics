import React from 'react';
import { BookMarked, Bookmark, Calculator, FileText, Target, Compass, Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../components/Header';

interface ResourcesPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-[#168A5A]" />
            <span>TRUNG TÂM TÀI NGUYÊN VẬT LÍ 11</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Kho Tài nguyên & Công cụ Học tập
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5 max-w-2xl leading-relaxed">
            Tất cả các tài liệu, công thức, bài tập và công cụ tính toán chuyên dụng được phân nhóm rõ ràng theo mục đích sử dụng.
          </p>
        </div>

        {/* Group 1: Tra cứu kiến thức */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#DDEAE3]">
            <BookMarked className="w-4 h-4 text-[#168A5A]" />
            <h2 className="text-sm sm:text-base font-bold text-[#07583F] uppercase tracking-wider">
              1. Tra cứu kiến thức & Định luật
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Sổ tay Vật Lí */}
            <div
              onClick={() => onNavigate('handbook')}
              className="p-6 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#168A5A] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                    Đầy đủ 4 chương
                  </span>
                  <BookMarked className="w-5 h-5 text-[#168A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                  Sổ tay Công thức Vật Lí 11
                </h3>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  Tra cứu chi tiết biểu thức toán học, đơn vị chuẩn SI, bảng đại lượng và mẹo giải nhanh cho từng chương.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#07583F]">Mở Sổ tay công thức</span>
                <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 2: Lộ trình bài học theo chương */}
            <div
              onClick={() => onNavigate('study')}
              className="p-6 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#07583F] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                    Hệ thống hóa
                  </span>
                  <FileText className="w-5 h-5 text-[#168A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                  Cẩm nang Bài học & Bản chất Vật Lí
                </h3>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  Hiểu nhanh trọng tâm từng bài: nguyên lý hoạt động, bản chất vật lý và cảnh báo sai lầm thường gặp.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#07583F]">Xem cẩm nang bài học</span>
                <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Group 2: Luyện tập & Phương pháp giải */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#DDEAE3]">
            <Target className="w-4 h-4 text-[#168A5A]" />
            <h2 className="text-sm sm:text-base font-bold text-[#07583F] uppercase tracking-wider">
              2. Luyện tập & Phương pháp giải 8 bước
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Bài tập mẫu */}
            <div
              onClick={() => onNavigate('exercises')}
              className="p-6 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#168A5A] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                    Có lời giải từng bước
                  </span>
                  <Target className="w-5 h-5 text-[#168A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                  Ngân hàng Bài tập Vật Lí 11
                </h3>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  Tuyển chọn các dạng bài tập điển hình của 4 chương có hướng dẫn giải chi tiết, không bỏ sót giả thiết.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#07583F]">Luyện bài tập ngay</span>
                <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 2: Phương pháp 8 bước */}
            <div
              onClick={() => onNavigate('solutions')}
              className="p-6 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#07583F] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                    Khung sư phạm chuẩn
                  </span>
                  <Compass className="w-5 h-5 text-[#168A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                  Quy trình 8 bước giải bài tập COSMOPHYSIC
                </h3>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  Quy trình sư phạm 8 bước giúp học sinh định hình tư duy: Tóm tắt → Tìm đại lượng → Chọn định luật → Biến đổi → Thay số → Kiểm tra đơn vị → Kết luận.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#07583F]">Khám phá quy trình 8 bước</span>
                <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Group 3: Công cụ hỗ trợ */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#DDEAE3]">
            <Calculator className="w-4 h-4 text-[#168A5A]" />
            <h2 className="text-sm sm:text-base font-bold text-[#07583F] uppercase tracking-wider">
              3. Công cụ hỗ trợ học tập
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tool 1: Máy tính khoa học */}
            <div
              onClick={() => onNavigate('calculator')}
              className="p-6 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#168A5A] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                    Tích hợp sẵn hằng số
                  </span>
                  <Calculator className="w-5 h-5 text-[#168A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                  Máy tính Khoa học Vật Lí
                </h3>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  Hỗ trợ tính lượng giác, số mũ, căn bậc 2 và chèn nhanh hằng số trọng trường, hằng số điện trường và tốc độ ánh sáng.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#07583F]">Mở máy tính</span>
                <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Tool 2: Notebook cá nhân */}
            <div
              onClick={() => onNavigate('notebook')}
              className="p-6 rounded-2xl bg-[#F5FBF7] border border-[#DDEAE3] hover:border-[#168A5A] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#07583F] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                    Lưu trữ đồng bộ
                  </span>
                  <Bookmark className="w-5 h-5 text-[#168A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                  Sổ tay Học tập Cá nhân
                </h3>
                <p className="text-xs text-[#5F6B66] mt-2 leading-relaxed">
                  Lưu lại các công thức cần nhớ, ghi chép cá nhân từ các câu trả lời của Gia sư AI và theo dõi độ hoàn thành bài học.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#07583F]">Mở sổ tay của bạn</span>
                <ArrowRight className="w-4 h-4 text-[#168A5A] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
