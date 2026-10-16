import React, { useState, useEffect } from 'react';
import { Search, Menu, X, BookOpen, Bot, User, LogOut, Bookmark, Calculator, ChevronDown, Layers, Target, Compass, FileText } from 'lucide-react';
import { CosmoLogo } from './CosmoLogo';
import { useAuth } from '../context/AuthContext';

export type ActivePage =
  | 'home'
  | 'study'
  | 'experiments'
  | 'handbook'
  | 'ai-tutor'
  | 'resources'
  | 'exercises'
  | 'solutions'
  | 'calculator'
  | 'notebook'
  | 'search';

interface HeaderProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenSearch: () => void;
  onOpenAuth: (initialTab: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const { currentUser, logout, savedFormulas } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'study', label: 'Học tập' },
    { id: 'experiments', label: 'Thí nghiệm' },
    { id: 'handbook', label: 'Sổ tay Vật Lí' },
    { id: 'ai-tutor', label: 'Gia sư AI' },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setResourcesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#DDEAE3]'
          : 'bg-white/90 backdrop-blur-xs border-b border-[#DDEAE3]/70'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* ZONE 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#168A5A] rounded-lg p-1 shrink-0 cursor-pointer"
          aria-label="COSMOPHYSIC - Trang chủ"
        >
          <CosmoLogo size="md" />
        </button>

        {/* ZONE 2: Clean 5-Item Navigation + Resources Dropdown */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#168A5A] cursor-pointer ${
                  isActive
                    ? 'text-[#168A5A] font-bold bg-[#EAF7F0]/60'
                    : 'text-[#17212B] hover:text-[#168A5A] hover:bg-[#F5FBF7]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#168A5A] rounded-full" />
                )}
              </button>
            );
          })}

          {/* Tài nguyên Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              onBlur={() => setTimeout(() => setResourcesDropdownOpen(false), 200)}
              className={`flex items-center gap-1 px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'resources' || currentPage === 'calculator' || currentPage === 'notebook' || currentPage === 'exercises' || currentPage === 'solutions'
                  ? 'text-[#168A5A] font-bold bg-[#EAF7F0]/60'
                  : 'text-[#17212B] hover:text-[#168A5A] hover:bg-[#F5FBF7]'
              }`}
            >
              <span>Tài nguyên</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesDropdownOpen ? 'rotate-180 text-[#168A5A]' : ''}`} />
            </button>

            {resourcesDropdownOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-[#DDEAE3] p-2 space-y-1 z-50 animate-fadeIn">
                <button
                  onClick={() => handleNavClick('resources')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#17212B] hover:bg-[#EAF7F0] hover:text-[#07583F] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#168A5A]" />
                  <div>
                    <div className="font-bold">Tổng quan tài nguyên</div>
                    <div className="text-[10px] text-[#5F6B66]">Trung tâm tra cứu & công cụ</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('exercises')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#17212B] hover:bg-[#EAF7F0] hover:text-[#07583F] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Target className="w-4 h-4 text-[#168A5A]" />
                  <div>
                    <div className="font-bold">Bài tập & Luyện tập</div>
                    <div className="text-[10px] text-[#5F6B66]">Đề bài có chọn lọc theo chương</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('solutions')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#17212B] hover:bg-[#EAF7F0] hover:text-[#07583F] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#168A5A]" />
                  <div>
                    <div className="font-bold">Phương pháp giải 8 bước</div>
                    <div className="text-[10px] text-[#5F6B66]">Quy trình chuẩn bài bản</div>
                  </div>
                </button>
                <div className="border-t border-[#DDEAE3] my-1" />
                <button
                  onClick={() => handleNavClick('calculator')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#17212B] hover:bg-[#EAF7F0] hover:text-[#07583F] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#168A5A]" />
                  <div>
                    <div className="font-bold">Máy tính khoa học</div>
                    <div className="text-[10px] text-[#5F6B66]">Tính hàm lượng giác & hằng số</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('notebook')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#17212B] hover:bg-[#EAF7F0] hover:text-[#07583F] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 text-[#168A5A]" />
                  <div>
                    <div className="font-bold">Sổ tay học tập</div>
                    <div className="text-[10px] text-[#5F6B66]">Ghi chú & công thức đã lưu</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ZONE 3: Search + Account / Auth */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Compact Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-[#5F6B66] bg-[#F5FBF7] hover:bg-[#EAF7F0] border border-[#DDEAE3] rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#168A5A] group cursor-pointer"
            aria-label="Tìm kiếm bài học, công thức"
          >
            <Search className="w-3.5 h-3.5 text-[#168A5A] group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline">Tìm bài học, công thức...</span>
            <span className="xl:hidden">Tìm kiếm</span>
            <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.2 text-[10px] font-mono bg-white text-[#5F6B66] rounded border border-[#DDEAE3]">
              ⌘K
            </kbd>
          </button>

          {/* User Account / Auth */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#DDEAE3]">
              <button
                onClick={() => handleNavClick('notebook')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#07583F] bg-[#EAF7F0] hover:bg-[#D4EFE0] rounded-full border border-[#168A5A]/30 transition-all cursor-pointer"
                title="Mở Sổ tay học tập cá nhân"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#168A5A]" />
                <span className="max-w-[110px] truncate">{currentUser.fullName || currentUser.name}</span>
                {savedFormulas.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#168A5A] text-white text-[10px] font-mono rounded-full font-bold">
                    {savedFormulas.length}
                  </span>
                )}
              </button>

              <button
                onClick={logout}
                className="p-1.5 text-[#5F6B66] hover:text-[#E05252] hover:bg-[#FFF2F2] rounded-full transition-colors cursor-pointer"
                title="Đăng xuất"
                aria-label="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-[#DDEAE3]">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#17212B] hover:text-[#168A5A] hover:bg-[#F5FBF7] rounded-full transition-colors cursor-pointer"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#168A5A] hover:bg-[#07583F] rounded-full shadow-xs transition-all cursor-pointer"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggles */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#17212B] hover:text-[#168A5A] hover:bg-[#F5FBF7] rounded-lg transition-colors cursor-pointer"
            aria-label="Mở tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#17212B] hover:text-[#168A5A] hover:bg-[#F5FBF7] rounded-lg transition-colors cursor-pointer"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DDEAE3] px-5 py-4 space-y-3 shadow-lg animate-fadeIn">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-[#EAF7F0] text-[#168A5A] font-bold'
                    : 'text-[#17212B] hover:bg-[#F5FBF7]'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-2 pb-1 text-[11px] font-bold text-[#5F6B66] uppercase tracking-wider px-3">
              Tài nguyên & Công cụ
            </div>
            <button
              onClick={() => handleNavClick('resources')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#17212B] hover:bg-[#F5FBF7] flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#168A5A]" /> Trung tâm tài nguyên
            </button>
            <button
              onClick={() => handleNavClick('exercises')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#17212B] hover:bg-[#F5FBF7] flex items-center gap-2 cursor-pointer"
            >
              <Target className="w-4 h-4 text-[#168A5A]" /> Bài tập & Luyện tập
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#17212B] hover:bg-[#F5FBF7] flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#168A5A]" /> Máy tính khoa học
            </button>
            <button
              onClick={() => handleNavClick('notebook')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#17212B] hover:bg-[#F5FBF7] flex items-center gap-2 cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-[#168A5A]" /> Sổ tay học tập
            </button>
          </div>

          <div className="pt-3 border-t border-[#DDEAE3] flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="text-xs text-[#07583F] font-semibold px-2">
                  Tài khoản: {currentUser.fullName || currentUser.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-[#E05252] bg-[#FFF2F2] rounded-xl cursor-pointer"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-[#17212B] bg-[#F5FBF7] hover:bg-[#EAF7F0] rounded-xl border border-[#DDEAE3] cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full py-2 text-center text-xs font-bold text-white bg-[#168A5A] hover:bg-[#07583F] rounded-xl shadow-xs cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
