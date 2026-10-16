import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Play, Filter, CheckCircle2, ChevronRight, Sliders, BookOpen, FlaskConical } from 'lucide-react';
import { VIRTUAL_EXPERIMENTS_DATA } from '../data/experimentsData';
import { LabCanvasSimulation } from '../components/LabCanvasSimulation';
import { VirtualExperimentItem } from '../types';

interface ExperimentsPageProps {
  initialExpId?: string;
  onOpenLesson?: (lessonId: string) => void;
}

export const ExperimentsPage: React.FC<ExperimentsPageProps> = ({ initialExpId, onOpenLesson }) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExpId, setActiveExpId] = useState<string>(initialExpId || VIRTUAL_EXPERIMENTS_DATA[0].id);

  useEffect(() => {
    if (initialExpId) {
      setActiveExpId(initialExpId);
    }
  }, [initialExpId]);

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
    <div className="py-8 sm:py-12 bg-[#F5FBF7]/60 min-h-[calc(100vh-80px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>PHÒNG THÍ NGHIỆM ẢO TƯƠNG TÁC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Thư viện Thí nghiệm ảo Vật Lí 11
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5 max-w-2xl leading-relaxed">
              Trực quan hóa hiện tượng: thay đổi thông số động học, quan sát dao động, sóng và điện trường thời gian thực.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#5F6B66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm thí nghiệm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
            />
          </div>
        </div>

        {/* Chapter Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(ch.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedChapter === ch.id
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'bg-white text-[#5F6B66] hover:bg-[#EAF7F0] hover:text-[#07583F] border border-[#DDEAE3]'
              }`}
            >
              {ch.name}
            </button>
          ))}
        </div>

        {/* Experiment Main Workspace (Split Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of 11 Experiments (Cards) */}
          <div className="lg:col-span-4 space-y-3 max-h-[750px] overflow-y-auto pr-1">
            <div className="text-xs font-bold text-[#17212B] px-1 pb-1">
              DANH SÁCH MÔ PHỎNG ({filteredExperiments.length})
            </div>

            {filteredExperiments.map((exp) => {
              const isActive = exp.id === activeExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white border-[#168A5A] shadow-md ring-2 ring-[#168A5A]/20'
                      : 'bg-white hover:bg-[#F5FBF7] border-[#DDEAE3] opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF7F0] text-[#07583F]">
                        {exp.chapterName}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#17212B]">
                      {exp.title}
                    </h3>
                    <p className="text-[11px] text-[#5F6B66] line-clamp-1">
                      {exp.tagline}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-[#168A5A] translate-x-1' : 'text-[#99A8A0]'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Simulation Stage & Controls */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#DDEAE3] p-6 shadow-sm space-y-6">
            <div className="border-b border-[#DDEAE3] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#168A5A]">
                  {currentExperiment.chapterName}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#17212B] mt-0.5">
                  {currentExperiment.title}
                </h2>
                <p className="text-xs text-[#5F6B66] mt-1">
                  {currentExperiment.tagline}
                </p>
              </div>
            </div>

            {/* Interactive Canvas */}
            <div className="w-full rounded-2xl overflow-hidden border border-[#DDEAE3] bg-white">
              <LabCanvasSimulation experiment={currentExperiment} />
            </div>

            {/* Learning Objectives & Physical Nature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3]">
                <h3 className="text-xs font-bold text-[#07583F] uppercase tracking-wider mb-2">
                  Mục tiêu thí nghiệm
                </h3>
                <ul className="space-y-1.5 text-xs text-[#17212B]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#168A5A] shrink-0 mt-0.5" />
                    <span>{currentExperiment.target}</span>
                  </li>
                  {currentExperiment.conclusions?.map((c: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#168A5A] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3]">
                <h3 className="text-xs font-bold text-[#07583F] uppercase tracking-wider mb-2">
                  Lý thuyết & Định luật liên quan
                </h3>
                <p className="text-xs text-[#5F6B66] leading-relaxed">
                  {currentExperiment.theory}
                </p>
                {currentExperiment.formulas && currentExperiment.formulas.length > 0 && (
                  <div className="mt-2 text-xs font-mono font-bold text-[#168A5A] bg-white p-2 rounded-lg border border-[#DDEAE3]">
                    {currentExperiment.formulas[0]}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
