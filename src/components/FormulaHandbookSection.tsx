import React, { useState } from 'react';
import { BookMarked, Search, Bookmark, BookmarkCheck, Sparkles, AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { FORMULA_HANDBOOK_DATA } from '../data/formulaHandbook';
import { useAuth } from '../context/AuthContext';
import { FormulaHandbookItem } from '../types';

interface FormulaHandbookSectionProps {
  onAskAi?: (formula: FormulaHandbookItem) => void;
}

export const FormulaHandbookSection: React.FC<FormulaHandbookSectionProps> = ({ onAskAi }) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isFormulaSaved, saveFormula, removeSavedFormula, currentUser } = useAuth();

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

  return (
    <section id="formula-handbook" className="py-16 sm:py-24 bg-white relative border-b border-[#DDEAE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#EAF7F0] text-[#07583F] border border-[#DDEAE3]">
                <BookMarked className="w-4 h-4 text-[#168A5A]" />
              </span>
              <span className="text-xs font-bold text-[#07583F] uppercase tracking-wider">
                Cẩm nang tra cứu công thức chuẩn
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Sổ tay Công thức Vật lý 11 Toàn diện
            </h2>
            <p className="text-sm text-[#5F6B66] mt-2 max-w-2xl">
              Hệ thống hóa toàn bộ công thức 4 chương: biểu thức toán học, giải nghĩa từng đại lượng, đơn vị chuẩn SI, điều kiện giới hạn và mẹo làm bài thi chính xác.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#5F6B66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên, ký hiệu, công thức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
            />
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {chapters.map((chap) => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapter(chap.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedChapter === chap.id
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'bg-[#F5FBF7] text-[#5F6B66] border border-[#DDEAE3] hover:bg-[#EAF7F0] hover:text-[#07583F]'
              }`}
            >
              {chap.name}
            </button>
          ))}
        </div>

        {/* Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFormulas.map((item) => {
            const saved = isFormulaSaved(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#F5FBF7] rounded-3xl border border-[#DDEAE3] p-5 sm:p-6 flex flex-col justify-between hover:border-[#168A5A]/50 transition-all shadow-xs"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-md border border-[#DDEAE3]">
                        {item.chapterName}
                      </span>
                      <span className="text-[10px] text-[#5F6B66]">
                        {item.lessonName}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleBookmark(item)}
                      className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs ${
                        saved
                          ? 'bg-[#168A5A] text-white border-[#07583F]'
                          : 'bg-white text-[#5F6B66] border-[#DDEAE3] hover:text-[#07583F] hover:bg-[#EAF7F0]'
                      }`}
                      title={saved ? 'Bỏ lưu' : 'Lưu vào sổ tay học tập cá nhân'}
                    >
                      {saved ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-semibold hidden sm:inline">Đã lưu</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium hidden sm:inline">Lưu sổ tay</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Formula Name */}
                  <h3 className="text-base font-bold text-[#17212B] mb-2">
                    {item.name}
                  </h3>

                  {/* Main Expression Highlight Box */}
                  <div className="my-3 p-4 bg-white rounded-2xl border border-[#DDEAE3] text-center shadow-inner">
                    <div className="font-mono text-lg sm:text-xl font-extrabold text-[#07583F] tracking-wide">
                      {item.expression}
                    </div>
                  </div>

                  {/* Physical Meaning */}
                  <p className="text-xs text-[#5F6B66] mb-4 leading-relaxed">
                    <strong className="text-[#17212B]">Ý nghĩa vật lý:</strong> {item.meaning}
                  </p>

                  {/* Variables & SI Units Table */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-[#17212B] block mb-1.5">
                      Ký hiệu đại lượng & Đơn vị chuẩn (SI):
                    </span>
                    <div className="bg-white rounded-xl border border-[#DDEAE3] overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#EAF7F0]/60 border-b border-[#DDEAE3] text-[10px] text-[#07583F] uppercase font-bold">
                            <th className="py-1.5 px-3">Ký hiệu</th>
                            <th className="py-1.5 px-3">Đại lượng</th>
                            <th className="py-1.5 px-3">Đơn vị SI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDEAE3]">
                          {item.variables.map((v, vIdx) => (
                            <tr key={vIdx} className="hover:bg-[#F5FBF7]">
                              <td className="py-1.5 px-3 font-mono font-bold text-[#168A5A]">{v.symbol}</td>
                              <td className="py-1.5 px-3 text-[#17212B]">{v.meaning}</td>
                              <td className="py-1.5 px-3 text-[#5F6B66] font-mono text-[11px]">{v.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Bottom Conditions & Practical Tips */}
                <div className="space-y-2 pt-3 border-t border-[#DDEAE3] text-xs">
                  {item.condition && (
                    <div className="flex items-start gap-1.5 text-[#5F6B66]">
                      <AlertCircle className="w-3.5 h-3.5 text-[#E6A23C] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#17212B]">Điều kiện áp dụng:</strong> {item.condition}
                      </span>
                    </div>
                  )}

                  {item.applicationTip && (
                    <div className="flex items-start gap-1.5 text-[#07583F] bg-[#EAF7F0] p-2.5 rounded-xl border border-[#DDEAE3]">
                      <Lightbulb className="w-3.5 h-3.5 text-[#168A5A] shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">Mẹo giải bài thi:</strong> {item.applicationTip}
                      </span>
                    </div>
                  )}

                  {onAskAi && (
                    <button
                      onClick={() => onAskAi(item)}
                      className="w-full mt-2 py-2 px-3 bg-white hover:bg-[#F5FBF7] text-[#07583F] border border-[#DDEAE3] hover:border-[#168A5A] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" />
                      <span>Hỏi Gia sư AI về bản chất & cách áp dụng</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredFormulas.length === 0 && (
          <div className="text-center py-16 bg-[#F5FBF7] rounded-3xl border border-[#DDEAE3]">
            <p className="text-sm font-semibold text-[#17212B]">Không tìm thấy công thức phù hợp</p>
            <p className="text-xs text-[#5F6B66] mt-1">Thử nhập từ khoá khác hoặc chuyển sang chương khác</p>
          </div>
        )}
      </div>
    </section>
  );
};
