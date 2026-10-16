import React from 'react';
import { CosmoLogo } from './CosmoLogo';
import { ArrowUp, Heart, Sparkles, BookOpen } from 'lucide-react';
import { ActivePage } from './Header';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#053C2D] text-white pt-12 pb-8 border-t border-[#168A5A]/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#168A5A]/30">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-3">
            <CosmoLogo variant="dark" size="md" />
            
            <p className="text-xs sm:text-sm text-[#DDEAE3]/80 leading-relaxed max-w-sm pt-1">
              “Khám phá • Hiểu bản chất • Vươn xa tri thức”
            </p>
            
            <p className="text-xs text-[#DDEAE3]/65 leading-relaxed max-w-sm">
              Trạm cứu hộ học tập chuyên sâu Vật Lí 11 dành riêng cho học sinh THPT Việt Nam. Trực quan hóa hiện tượng, chuẩn hóa công thức và lời giải theo SGK GDPT mới.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#86EFAC]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chuẩn chương trình SGK GDPT mới</span>
            </div>
          </div>

          {/* Group 1: HỌC TẬP */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#86EFAC]">
              HỌC TẬP
            </h4>
            <ul className="space-y-2 text-xs text-[#DDEAE3]/80">
              <li>
                <button
                  onClick={() => onNavigate('study')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Chương trình Vật Lí 11
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('study')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Bài học theo chương
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Gia sư AI Vật lý 11
                </button>
              </li>
            </ul>
          </div>

          {/* Group 2: THÍ NGHIỆM */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#86EFAC]">
              THÍ NGHIỆM
            </h4>
            <ul className="space-y-2 text-xs text-[#DDEAE3]/80">
              <li>
                <button
                  onClick={() => onNavigate('experiments')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Thư viện thí nghiệm ảo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiments')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Mô phỏng Con lắc & Sóng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiments')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Mô phỏng Điện trường & Mạch
                </button>
              </li>
            </ul>
          </div>

          {/* Group 3: TÀI NGUYÊN */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#86EFAC]">
              TÀI NGUYÊN
            </h4>
            <ul className="space-y-2 text-xs text-[#DDEAE3]/80">
              <li>
                <button
                  onClick={() => onNavigate('handbook')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Sổ tay Vật Lí
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Máy tính khoa học
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notebook')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Sổ tay học tập
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('exercises')}
                  className="hover:text-[#86EFAC] transition-colors cursor-pointer text-left"
                >
                  Bài tập & Phương pháp 8 bước
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DDEAE3]/70">
          <p>© 2026 COSMOPHYSIC. Dành riêng cho học sinh THPT — Vật Lí 11.</p>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 text-[11px]">
              Vật lí không chỉ là công thức, đó là câu chuyện của vũ trụ
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#07583F] hover:bg-[#168A5A] text-white transition-colors cursor-pointer"
              aria-label="Cuộn lên đầu trang"
            >
              <span>Đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
