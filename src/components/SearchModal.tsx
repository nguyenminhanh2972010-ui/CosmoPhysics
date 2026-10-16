import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, FlaskConical, ArrowRight, Tag, BookMarked } from 'lucide-react';
import { SEARCH_DATABASE } from '../data/physicsData';
import { GRADE_11_SEARCH_INDEX } from '../data/grade11Data';
import { SearchResultItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (item: SearchResultItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  // Combine databases and eliminate duplicate IDs
  const combinedSearchDatabase: SearchResultItem[] = [
    ...GRADE_11_SEARCH_INDEX,
    ...SEARCH_DATABASE.filter(
      (oldItem) => !GRADE_11_SEARCH_INDEX.some((newItem: { id: string }) => newItem.id === oldItem.id)
    )
  ];

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResults = query.trim() === ''
    ? combinedSearchDatabase.slice(0, 8)
    : combinedSearchDatabase.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DDEAE3] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (filteredResults.length > 0) {
              onSelectResult(filteredResults[0]);
              onClose();
            }
          }}
          className="p-4 border-b border-[#DDEAE3] flex items-center gap-3 bg-[#F5FBF7]"
        >
          <button
            type="submit"
            aria-label="Tìm kiếm"
            className="p-1 text-[#168A5A] hover:bg-[#EAF7F0] rounded-lg transition-colors shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredResults.length > 0) {
                  onSelectResult(filteredResults[0]);
                  onClose();
                }
              }
            }}
            placeholder="Tìm bài học, công thức Vật Lí 11 (Dao động, Sóng, Coulomb, Định luật Ohm)..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-[#17212B] placeholder-[#5F6B66] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#5F6B66] hover:text-[#17212B] p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#5F6B66] hover:text-[#17212B] px-2 py-1 rounded-md border border-[#DDEAE3] bg-white shrink-0"
          >
            ESC
          </button>
        </form>

        {/* Popular searches quick pills */}
        <div className="px-4 py-2 bg-white border-b border-[#DDEAE3]/60 flex items-center gap-2 overflow-x-auto text-xs text-[#5F6B66]">
          <span className="shrink-0 font-medium text-[#17212B]">Gợi ý Vật Lí 11:</span>
          {['Con lắc lò xo', 'Giao thoa sóng', 'Định luật Coulomb', 'Định luật Ohm toàn mạch', 'Sóng dừng', 'Tụ điện'].map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] border border-[#DDEAE3] shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1.5 divide-y divide-[#DDEAE3]/40">
          {filteredResults.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#5F6B66]">
              Không tìm thấy kết quả phù hợp cho "{query}". Hãy thử từ khóa khác!
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-[#F5FBF7] transition-all cursor-pointer flex items-center justify-between group pt-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF7F0] flex items-center justify-center shrink-0 mt-0.5">
                    {item.category === 'Thí nghiệm ảo' ? (
                      <FlaskConical className="w-4 h-4 text-[#168A5A]" />
                    ) : (
                      <BookOpen className="w-4 h-4 text-[#168A5A]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#17212B] group-hover:text-[#168A5A] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EAF7F0] text-[#07583F] font-semibold border border-[#DDEAE3]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#5F6B66] mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#5F6B66] group-hover:text-[#168A5A] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer note */}
        <div className="p-3 bg-[#F5FBF7] border-t border-[#DDEAE3] text-center text-xs text-[#5F6B66]">
          Chọn một mục để mở bài học, công thức hoặc thí nghiệm ảo tương ứng
        </div>
      </div>
    </div>
  );
};
