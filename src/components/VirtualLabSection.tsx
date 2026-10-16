import React, { useState } from 'react';
import { Sparkles, Search, Play, Filter, CheckCircle2, ChevronRight, Sliders, BookOpen } from 'lucide-react';
import { VIRTUAL_EXPERIMENTS_DATA } from '../data/experimentsData';
import { LabCanvasSimulation } from './LabCanvasSimulation';
import { VirtualExperimentItem } from '../types';

export const VirtualLabSection: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExpId, setActiveExpId] = useState<string>(VIRTUAL_EXPERIMENTS_DATA[0].id);

  const chapters = [
    { id: 'all', name: 'Tất cả thí nghiệm' },
    { id: 'chapter-1', name: 'Chương I: Dao động' },
    { id: 'chapter-2', name: 'Chương II: Sóng' },
    { id: 'chapter-3', name: 'Chương III: Điện trường' },
    { id: 'chapter-4', name: 'Chương IV: Dòng điện' }
  ];

  const filteredExperiments = VIRTUAL_EXPERIMENTS_DATA.filter((exp) => {
    const matchesChapter = selectedChapter === 'all' || exp.chapterId === selectedChapter;
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.theory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  const currentExperiment =
    VIRTUAL_EXPERIMENTS_DATA.find((e) => e.id === activeExpId) || VIRTUAL_EXPERIMENTS_DATA[0];

  return (
    <section id="virtual-lab" className="py-16 sm:py-24 bg-[#F5FBF7] relative border-b border-[#DDEAE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#EAF7F0] text-[#07583F] border border-[#DDEAE3]">
                <Sparkles className="w-4 h-4 text-[#168A5A]" />
              </span>
              <span className="text-xs font-bold text-[#07583F] uppercase tracking-wider">
                Phòng thí nghiệm ảo 3D tương tác
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Khám phá Hiện tượng Vật lý qua Thao tác Trực tiếp
            </h2>
            <p className="text-sm text-[#5F6B66] mt-2 max-w-2xl">
              11 mô phỏng thí nghiệm trực quan theo chương trình Vật lý 11 Chuẩn. Tùy chỉnh thông số biến thiên, quan sát đồ thị thời gian thực và tự tay kiểm chứng các định luật vật lý.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#5F6B66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm thí nghiệm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
            />
          </div>
        </div>

        {/* Chapter Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {chapters.map((chap) => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapter(chap.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedChapter === chap.id
                  ? 'bg-[#07583F] text-white shadow-xs'
                  : 'bg-white text-[#5F6B66] border border-[#DDEAE3] hover:bg-[#EAF7F0] hover:text-[#07583F]'
              }`}
            >
              {chap.name}
            </button>
          ))}
        </div>

        {/* Active Simulation Player */}
        <div className="mb-12">
          <LabCanvasSimulation experiment={currentExperiment} />
        </div>

        {/* Experiments Grid Carousel / Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#17212B]">
              Danh sách thí nghiệm khả dụng ({filteredExperiments.length})
            </h3>
            <span className="text-xs text-[#5F6B66]">Chọn một thí nghiệm để bắt đầu mô phỏng</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiments.map((exp) => {
              const isSelected = exp.id === activeExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => {
                    setActiveExpId(exp.id);
                    // Smooth scroll up to simulation if on mobile
                    const el = document.getElementById('virtual-lab');
                    if (el && window.innerWidth < 1024) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#168A5A] shadow-md ring-2 ring-[#168A5A]/20'
                      : 'bg-white/80 border-[#DDEAE3] hover:bg-white hover:border-[#168A5A]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-md">
                        {exp.chapterName}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-[#168A5A] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đang chạy
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[#17212B] line-clamp-2">
                      {exp.title}
                    </h4>
                    <p className="text-[11px] text-[#5F6B66] mt-1 line-clamp-2 leading-relaxed">
                      {exp.tagline}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#DDEAE3] flex items-center justify-between text-[11px]">
                    <span className="text-[#07583F] font-semibold flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-[#168A5A]" /> {exp.paramControls.length} thông số tuỳ biến
                    </span>
                    <button className="text-[#168A5A] font-bold hover:underline flex items-center gap-0.5">
                      Mở giả lập <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
