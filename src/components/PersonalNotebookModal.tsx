import React, { useState } from 'react';
import { X, BookOpen, Bookmark, Trash2, Plus, Sparkles, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FORMULA_HANDBOOK_DATA } from '../data/formulaHandbook';
import { GRADE_11_CHAPTERS, GRADE_11_LESSONS } from '../data/grade11Data';

export interface PersonalNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFormulaHandbook?: () => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const PersonalNotebookModal: React.FC<PersonalNotebookModalProps> = ({
  isOpen,
  onClose,
  onOpenFormulaHandbook,
  onOpenLesson
}) => {
  const {
    currentUser,
    savedFormulas,
    removeSavedFormula,
    studyNotes,
    addStudyNote,
    removeStudyNote,
    completedLessons
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'formulas' | 'notes' | 'progress'>('formulas');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  if (!isOpen) return null;

  // Resolve formula details from handbook
  const savedFormulaDetails = savedFormulas
    .map((id) => FORMULA_HANDBOOK_DATA.find((f) => f.id === id))
    .filter(Boolean);

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addStudyNote({
      title: newNoteTitle.trim() || 'Ghi chú ôn tập',
      content: newNoteContent.trim(),
      tags: ['Tự học']
    });
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const studentName = currentUser?.fullName || currentUser?.name || 'Học sinh';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl h-[85vh] rounded-3xl border border-[#DDEAE3] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#DDEAE3] bg-[#F5FBF7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#07583F] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17212B]">
                Sổ tay Học tập Cá nhân
              </h3>
              <p className="text-xs text-[#5F6B66]">
                Học sinh: <strong className="text-[#07583F]">{studentName}</strong> · Vật lý 11
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5F6B66] hover:text-[#17212B] hover:bg-white rounded-xl transition-colors shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#DDEAE3] px-4 sm:px-6 bg-white gap-2">
          <button
            onClick={() => setActiveTab('formulas')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'formulas'
                ? 'border-[#168A5A] text-[#07583F] font-bold'
                : 'border-transparent text-[#5F6B66] hover:text-[#17212B]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Công thức đã lưu ({savedFormulaDetails.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'border-[#168A5A] text-[#07583F] font-bold'
                : 'border-transparent text-[#5F6B66] hover:text-[#17212B]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ghi chú ôn tập ({studyNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'progress'
                ? 'border-[#168A5A] text-[#07583F] font-bold'
                : 'border-transparent text-[#5F6B66] hover:text-[#17212B]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Tiến độ ({completedLessons.length} bài)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5FBF7]">
          {/* TAB 1: FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="space-y-4">
              {savedFormulaDetails.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#DDEAE3] p-6">
                  <Bookmark className="w-8 h-8 text-[#99A8A0] mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#17212B]">Chưa có công thức nào được lưu</p>
                  <p className="text-xs text-[#5F6B66] mt-1 max-w-sm mx-auto">
                    Hãy truy cập mục "Sổ tay công thức" để lưu các công thức trọng tâm bạn cần tra cứu thường xuyên!
                  </p>
                  {onOpenFormulaHandbook && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenFormulaHandbook();
                      }}
                      className="mt-4 px-4 py-2 bg-[#168A5A] text-white text-xs font-bold rounded-xl hover:bg-[#07583F] transition-colors"
                    >
                      Mở Sổ tay Công thức
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {savedFormulaDetails.map((item) => {
                    if (!item) return null;
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#168A5A] transition-all shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-md">
                              {item.chapterName}
                            </span>
                            <span className="text-xs font-bold text-[#17212B]">{item.name}</span>
                          </div>
                          <div className="font-mono text-sm font-extrabold text-[#07583F] my-1 bg-[#F5FBF7] px-2.5 py-1 rounded-lg border border-[#DDEAE3] inline-block">
                            {item.expression}
                          </div>
                          <p className="text-xs text-[#5F6B66]">{item.meaning}</p>
                          {item.applicationTip && (
                            <div className="text-[11px] text-[#07583F] bg-[#EAF7F0] p-1.5 rounded-lg mt-1.5">
                              💡 {item.applicationTip}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => removeSavedFormula(item.id)}
                          className="p-2 text-[#5F6B66] hover:text-[#E05252] hover:bg-[#FFF2F2] rounded-xl self-end sm:self-center transition-colors shrink-0"
                          title="Xoá khỏi sổ tay"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Add note form */}
              <form onSubmit={handleAddCustomNote} className="bg-white p-4 rounded-2xl border border-[#DDEAE3] space-y-2">
                <span className="text-xs font-bold text-[#17212B] block">Thêm ghi chú cá nhân mới</span>
                <input
                  type="text"
                  placeholder="Tiêu đề ghi chú (VD: Mẹo nhớ pha dao động)..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A]"
                />
                <textarea
                  placeholder="Nội dung ghi chú, câu dặn dò hoặc câu hỏi ôn tập..."
                  rows={2}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:outline-hidden focus:border-[#168A5A]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#168A5A] text-white text-xs font-bold rounded-xl hover:bg-[#07583F] transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Lưu ghi chú
                  </button>
                </div>
              </form>

              {/* Notes list */}
              {studyNotes.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-[#DDEAE3] p-4 text-xs text-[#5F6B66]">
                  Chưa có ghi chú nào. Bạn có thể tự thêm hoặc lưu các giải thích hữu ích khi trò chuyện cùng Gia sư AI!
                </div>
              ) : (
                <div className="space-y-3">
                  {studyNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-2xl border border-[#DDEAE3] p-4 flex justify-between items-start gap-3 shadow-2xs"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#17212B]">{note.title}</span>
                          <span className="text-[10px] text-[#99A8A0]">
                            {new Date(note.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <p className="text-[#5F6B66] whitespace-pre-wrap leading-relaxed">
                          {note.content}
                        </p>
                      </div>

                      <button
                        onClick={() => removeStudyNote(note.id)}
                        className="p-1.5 text-[#5F6B66] hover:text-[#E05252] rounded-lg transition-colors shrink-0"
                        title="Xoá ghi chú"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#DDEAE3] space-y-3">
                <h4 className="text-xs font-bold text-[#17212B] uppercase tracking-wider">
                  Tổng quan Chương trình Vật lý 11
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F5FBF7] p-3 rounded-xl border border-[#DDEAE3]">
                    <span className="text-[11px] text-[#5F6B66] block">Số bài đã hoàn thành</span>
                    <span className="text-lg font-bold text-[#168A5A] font-mono">
                      {completedLessons.length} / 25 bài
                    </span>
                  </div>
                  <div className="bg-[#F5FBF7] p-3 rounded-xl border border-[#DDEAE3]">
                    <span className="text-[11px] text-[#5F6B66] block">Tỉ lệ hoàn thành</span>
                    <span className="text-lg font-bold text-[#07583F] font-mono">
                      {((completedLessons.length / 25) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-[#5F6B66]">
                    <span>Tiến độ toàn khoá</span>
                    <span>{completedLessons.length} / 25 bài</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#EAF7F0] rounded-full overflow-hidden">
                    <div
                      className="bg-[#168A5A] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${Math.min(100, (completedLessons.length / 25) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Chapters Progress breakdown */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[#17212B]">Tiến độ từng chương</h5>
                <div className="space-y-2">
                  {GRADE_11_CHAPTERS.map((chap) => {
                    const chapterLessons = GRADE_11_LESSONS.filter((l) => l.chapterId === chap.id);
                    const totalLessons = chapterLessons.length || chap.lessonCount || 6;
                    const chapterCompletedCount = chapterLessons.filter((l) =>
                      completedLessons.includes(l.id)
                    ).length;
                    const percentage = Math.round((chapterCompletedCount / totalLessons) * 100);
                    return (
                      <div
                        key={chap.id}
                        className="bg-white p-3 rounded-xl border border-[#DDEAE3] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#17212B] block">{chap.title}</span>
                          <span className="text-[11px] text-[#5F6B66]">
                            {chapterCompletedCount} / {totalLessons} bài hoàn tất
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#07583F]">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
