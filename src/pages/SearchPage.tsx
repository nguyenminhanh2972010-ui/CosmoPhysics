import React, { useState, useEffect } from 'react';
import { Search, BookOpen, FlaskConical, Bookmark, Target, ArrowRight, Sparkles } from 'lucide-react';
import { GRADE_11_LESSONS, GRADE_11_CHAPTERS } from '../data/grade11Data';
import { FORMULA_HANDBOOK_DATA } from '../data/formulaHandbook';
import { VIRTUAL_EXPERIMENTS_DATA } from '../data/experimentsData';
import { FormattedPhysicsResponse } from '../components/FormattedPhysicsResponse';

interface SearchPageProps {
  initialQuery?: string;
  onOpenLesson: (lessonId: string) => void;
  onOpenExperiment: (expId: string) => void;
  onOpenFormula: (formulaId: string) => void;
  onOpenExercises: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  onOpenLesson,
  onOpenExperiment,
  onOpenFormula,
  onOpenExercises,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<'all' | 'lessons' | 'formulas' | 'experiments' | 'exercises'>('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const q = query.trim().toLowerCase();

  // Search in Grade 11 Lessons
  const matchedLessons = q
    ? GRADE_11_LESSONS.filter((l) =>
        l.title.toLowerCase().includes(q) ||
        l.subtitle.toLowerCase().includes(q) ||
        l.quickGrasp.toLowerCase().includes(q) ||
        l.chapterTitle.toLowerCase().includes(q)
      )
    : [];

  // Search in Grade 11 Formulas
  const matchedFormulas = q
    ? FORMULA_HANDBOOK_DATA.filter((f) =>
        f.name.toLowerCase().includes(q) ||
        f.expression.toLowerCase().includes(q) ||
        f.meaning.toLowerCase().includes(q) ||
        f.chapterName.toLowerCase().includes(q)
      )
    : [];

  // Search in Grade 11 Experiments
  const matchedExperiments = q
    ? VIRTUAL_EXPERIMENTS_DATA.filter((e) =>
        e.title.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q) ||
        e.theory.toLowerCase().includes(q) ||
        e.chapterName.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchedLessons.length + matchedFormulas.length + matchedExperiments.length;

  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <Search className="w-3.5 h-3.5 text-[#168A5A]" />
            <span>TÌM KIẾM TOÀN DIỆN VẬT LÍ 11</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Tra cứu Tri thức Sách giáo khoa Vật Lí 11
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-1">
            Tìm kiếm bài học, công thức, thí nghiệm mô phỏng và bài tập vận dụng.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-[#168A5A] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Nhập tên bài học (VD: Dao động điều hòa), công thức (VD: T = 2pi*sqrt(m/k)), hoặc hiện tượng..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base bg-[#F5FBF7] border border-[#DDEAE3] rounded-2xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B] shadow-inner"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-[#DDEAE3]">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] border border-[#DDEAE3]'
            }`}
          >
            Tất cả ({totalResults})
          </button>
          <button
            onClick={() => setActiveCategory('lessons')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'lessons'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] border border-[#DDEAE3]'
            }`}
          >
            Bài học ({matchedLessons.length})
          </button>
          <button
            onClick={() => setActiveCategory('formulas')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'formulas'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] border border-[#DDEAE3]'
            }`}
          >
            Công thức ({matchedFormulas.length})
          </button>
          <button
            onClick={() => setActiveCategory('experiments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'experiments'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] border border-[#DDEAE3]'
            }`}
          >
            Thí nghiệm ({matchedExperiments.length})
          </button>
        </div>

        {/* Results Container */}
        {q ? (
          <div className="space-y-8">
            {/* 1. LESSONS RESULTS */}
            {(activeCategory === 'all' || activeCategory === 'lessons') && matchedLessons.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#07583F] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-[#168A5A]" />
                  <span>Bài học Vật Lí 11 ({matchedLessons.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedLessons.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => onOpenLesson(l.id)}
                      className="p-4 rounded-xl bg-white border border-[#DDEAE3] hover:border-[#168A5A] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#168A5A]">{l.chapterTitle}</span>
                        <h3 className="text-sm font-bold text-[#17212B] mt-0.5">{l.title}</h3>
                        <p className="text-xs text-[#5F6B66] mt-1 line-clamp-2">{l.quickGrasp}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#DDEAE3]/60 flex items-center justify-between text-xs text-[#07583F] font-bold">
                        <span>Vào bài học</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#168A5A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. FORMULAS RESULTS */}
            {(activeCategory === 'all' || activeCategory === 'formulas') && matchedFormulas.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#07583F] uppercase tracking-wider">
                  <Bookmark className="w-4 h-4 text-[#168A5A]" />
                  <span>Công thức & Định luật ({matchedFormulas.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedFormulas.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => onOpenFormula(f.id)}
                      className="p-4 rounded-xl bg-white border border-[#DDEAE3] hover:border-[#168A5A] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#07583F] bg-[#EAF7F0] px-2 py-0.5 rounded-full border border-[#DDEAE3]">
                          {f.chapterName}
                        </span>
                        <h3 className="text-sm font-bold text-[#17212B] mt-1">{f.name}</h3>
                        <div className="my-2 p-2 bg-[#F5FBF7] rounded-lg text-xs font-mono font-bold text-[#168A5A]">
                          <FormattedPhysicsResponse content={`$$${f.expression}$$`} />
                        </div>
                        <p className="text-xs text-[#5F6B66] line-clamp-1">{f.meaning}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#DDEAE3]/60 flex items-center justify-between text-xs text-[#07583F] font-bold">
                        <span>Tra cứu sổ tay</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#168A5A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. EXPERIMENTS RESULTS */}
            {(activeCategory === 'all' || activeCategory === 'experiments') && matchedExperiments.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#07583F] uppercase tracking-wider">
                  <FlaskConical className="w-4 h-4 text-[#168A5A]" />
                  <span>Thí nghiệm ảo & Mô phỏng ({matchedExperiments.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedExperiments.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => onOpenExperiment(e.id)}
                      className="p-4 rounded-xl bg-white border border-[#DDEAE3] hover:border-[#168A5A] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#07583F] bg-[#EAF7F0] px-2 py-0.5 rounded-full border border-[#DDEAE3]">
                          {e.chapterName}
                        </span>
                        <h3 className="text-sm font-bold text-[#17212B] mt-1">{e.title}</h3>
                        <p className="text-xs text-[#5F6B66] mt-1 line-clamp-2">{e.tagline}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#DDEAE3]/60 flex items-center justify-between text-xs text-[#07583F] font-bold">
                        <span>Mở thí nghiệm</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#168A5A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {totalResults === 0 && (
              <div className="p-12 text-center bg-[#F5FBF7] rounded-3xl border border-[#DDEAE3] space-y-2">
                <p className="text-sm font-bold text-[#17212B]">
                  Không tìm thấy kết quả phù hợp với từ khóa "{query}"
                </p>
                <p className="text-xs text-[#5F6B66] max-w-sm mx-auto">
                  Hãy thử tìm kiếm với các từ khóa ngắn hơn như "con lắc", "chu kỳ", "giao thoa", "Coulomb" hoặc "Ohm".
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Empty Search State: Suggested Searches */
          <div className="p-8 sm:p-12 text-center bg-[#F5FBF7] rounded-3xl border border-[#DDEAE3] space-y-4">
            <Sparkles className="w-8 h-8 text-[#168A5A] mx-auto" />
            <h3 className="text-base font-bold text-[#17212B]">
              Nhập từ khóa để bắt đầu tra cứu tri thức Vật Lí 11
            </h3>
            <p className="text-xs text-[#5F6B66] max-w-md mx-auto">
              Hệ thống tìm kiếm tra cứu trực tiếp trong kho dữ liệu SGK Vật Lí 11 GDPT mới.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs text-[#5F6B66]">Gợi ý tìm nhanh:</span>
              {['Dao động điều hòa', 'Con lắc lò xo', 'Giao thoa sóng', 'Sóng dừng', 'Định luật Coulomb', 'Định luật Ohm'].map((term, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-white hover:bg-[#EAF7F0] border border-[#DDEAE3] text-xs font-semibold text-[#07583F] rounded-lg transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
