import React, { useState } from 'react';
import { BookMarked, Search, Bookmark, BookmarkCheck, Sparkles, AlertCircle, Lightbulb, Copy, Check, Bot, BookOpen } from 'lucide-react';
import { FORMULA_HANDBOOK_DATA } from '../data/formulaHandbook';
import { useAuth } from '../context/AuthContext';
import { FormulaHandbookItem } from '../types';
import { FormattedPhysicsResponse } from '../components/FormattedPhysicsResponse';

interface HandbookPageProps {
  onAskAi: (formula: FormulaHandbookItem) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const HandbookPage: React.FC<HandbookPageProps> = ({ onAskAi, onOpenLesson }) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isFormulaSaved, saveFormula, removeSavedFormula } = useAuth();

  const chapters = [
    { id: 'all', name: 'Tất cả công thức' },
    { id: 'chapter-1', name: 'Chương I: Dao động' },
    { id: 'chapter-2', name: 'Chương II: Sóng' },
    { id: 'chapter-3', name: 'Chương III: Điện trường' },
    { id: 'chapter-4', name: 'Chương IV: Dòng điện' }
  ];

  const filteredFormulas = FORMULA_HANDBOOK_DATA.filter((item) => {
    const matchesChap = selectedChapter === 'all' || item.chapterId === selectedChapter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variables.some((v) => v.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || v.meaning.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChap && matchesSearch;
  });

  const handleToggleBookmark = (item: FormulaHandbookItem) => {
    if (isFormulaSaved(item.id)) {
      removeSavedFormula(item.id);
    } else {
      saveFormula(item.id);
    }
  };

  const handleCopyFormula = (id: string, expression: string) => {
    navigator.clipboard.writeText(expression);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
              <BookMarked className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>SỔ TAY VẬT LÍ 11</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Sổ tay Công thức & Định luật Vật Lí 11
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5 max-w-2xl leading-relaxed">
              Toàn bộ công thức 4 chương chuẩn SGK: Biểu thức toán học, giải nghĩa đại lượng, đơn vị SI và điều kiện áp dụng chính xác.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#168A5A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm công thức, ký hiệu, đại lượng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
            />
          </div>
        </div>

        {/* Chapter Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-[#DDEAE3]">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(ch.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedChapter === ch.id
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] hover:text-[#07583F] border border-[#DDEAE3]'
              }`}
            >
              {ch.name}
            </button>
          ))}
        </div>

        {/* Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFormulas.map((item) => {
            const isSaved = isFormulaSaved(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#DDEAE3] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-[#07583F] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                      {item.chapterName}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyFormula(item.id, item.expression)}
                        className="p-1.5 text-[#5F6B66] hover:text-[#168A5A] hover:bg-[#F5FBF7] rounded-lg transition-colors cursor-pointer"
                        title="Sao chép công thức"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-[#168A5A]" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleToggleBookmark(item)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSaved
                            ? 'text-[#168A5A] bg-[#EAF7F0]'
                            : 'text-[#5F6B66] hover:text-[#168A5A] hover:bg-[#F5FBF7]'
                        }`}
                        title={isSaved ? 'Đã lưu vào Sổ tay' : 'Lưu công thức'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Formula Name */}
                  <h3 className="text-base sm:text-lg font-bold text-[#17212B]">
                    {item.name}
                  </h3>

                  {/* Formatted Equation */}
                  <div className="my-3 p-4 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] text-center">
                    <FormattedPhysicsResponse content={`$$${item.expression}$$`} />
                  </div>

                  {/* Meaning & Nature */}
                  <p className="text-xs text-[#5F6B66] leading-relaxed mb-3">
                    <strong className="text-[#17212B]">Ý nghĩa vật lí:</strong> {item.meaning}
                  </p>

                  {/* Variables table */}
                  <div className="mb-3">
                    <span className="text-[11px] font-bold text-[#07583F] uppercase tracking-wider block mb-1.5">
                      Giải nghĩa đại lượng & Đơn vị SI:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {item.variables.map((v, vIdx) => (
                        <div key={vIdx} className="text-xs text-[#17212B] flex items-center gap-1.5">
                          <code className="px-1.5 py-0.2 bg-[#F5FBF7] border border-[#DDEAE3] rounded font-bold font-mono text-[#07583F]">
                            {v.symbol}
                          </code>
                          <span className="text-[11px] text-[#5F6B66]">: {v.meaning} [{v.unit}]</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Tip */}
                  {item.applicationTip && (
                    <div className="p-3 bg-[#EAF7F0]/60 rounded-xl border border-[#DDEAE3] text-xs text-[#07583F] flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-[#168A5A] shrink-0 mt-0.5" />
                      <div>
                        <strong>Mẹo giải bài:</strong> {item.applicationTip}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action: Ask AI */}
                <div className="pt-4 mt-4 border-t border-[#DDEAE3]/70 flex items-center justify-between">
                  <span className="text-[11px] text-[#5F6B66] font-mono">
                    Chuẩn SGK Vật Lí 11
                  </span>
                  <button
                    onClick={() => onAskAi(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168A5A] hover:text-[#07583F] px-3 py-1.5 rounded-lg hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Hỏi Gia sư AI về công thức này</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFormulas.length === 0 && (
          <div className="p-12 text-center text-[#5F6B66] bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3]">
            Không tìm thấy công thức nào khớp với từ khóa "{searchQuery}". Bạn có thể chọn tab chương khác hoặc đặt câu hỏi trực tiếp cho Gia sư AI.
          </div>
        )}

      </div>
    </div>
  );
};
