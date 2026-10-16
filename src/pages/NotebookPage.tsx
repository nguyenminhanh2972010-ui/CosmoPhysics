import React, { useState } from 'react';
import { Bookmark, Plus, Trash2, BookOpen, CheckCircle2, FileText, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FORMULA_HANDBOOK_DATA } from '../data/formulaHandbook';
import { GRADE_11_CHAPTERS, GRADE_11_LESSONS } from '../data/grade11Data';
import { FormattedPhysicsResponse } from '../components/FormattedPhysicsResponse';

interface NotebookPageProps {
  onOpenFormulaHandbook: () => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenAuth: () => void;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  onOpenFormulaHandbook,
  onOpenLesson,
  onOpenAuth,
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
  const [newNoteTag, setNewNoteTag] = useState('Chương I: Dao động');

  const savedFormulaDetails = savedFormulas
    .map((id) => FORMULA_HANDBOOK_DATA.find((f) => f.id === id))
    .filter(Boolean);

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addStudyNote({
      title: newNoteTitle.trim() || 'Ghi chú ôn tập',
      content: newNoteContent.trim(),
      tags: [newNoteTag]
    });
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const studentName = currentUser?.fullName || currentUser?.name || 'Học sinh';

  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DDEAE3] mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>SỔ TAY CÁ NHÂN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Sổ tay Học tập của {studentName}
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6B66] mt-1">
              Quản lý các công thức quan trọng đã đánh dấu, ghi chú lời giải từ Gia sư AI và theo dõi tiến độ bài học.
            </p>
          </div>

          {!currentUser && (
            <div className="p-3 bg-[#F5FBF7] border border-[#DDEAE3] rounded-2xl flex items-center gap-3">
              <span className="text-xs text-[#5F6B66]">Đăng nhập để đồng bộ ghi chú:</span>
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 bg-[#168A5A] hover:bg-[#07583F] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#DDEAE3]">
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'formulas'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] hover:text-[#07583F] border border-[#DDEAE3]'
            }`}
          >
            Công thức đã lưu ({savedFormulas.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] hover:text-[#07583F] border border-[#DDEAE3]'
            }`}
          >
            Ghi chú bài học ({studyNotes.length})
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'bg-[#F5FBF7] text-[#5F6B66] hover:bg-[#EAF7F0] hover:text-[#07583F] border border-[#DDEAE3]'
            }`}
          >
            Tiến độ học tập ({completedLessons.length}/{GRADE_11_LESSONS.length})
          </button>
        </div>

        {/* TAB 1: FORMULAS */}
        {activeTab === 'formulas' && (
          <div>
            {savedFormulaDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {savedFormulaDetails.map((f: any) => (
                  <div
                    key={f.id}
                    className="p-5 bg-white rounded-2xl border border-[#DDEAE3] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#07583F] bg-[#EAF7F0] px-2 py-0.5 rounded-full border border-[#DDEAE3]">
                          {f.chapterName}
                        </span>
                        <button
                          onClick={() => removeSavedFormula(f.id)}
                          className="p-1.5 text-[#5F6B66] hover:text-[#E05252] hover:bg-[#FFF2F2] rounded-lg transition-colors cursor-pointer"
                          title="Bỏ lưu công thức"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#17212B]">
                        {f.name}
                      </h3>
                      <div className="my-2 p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] text-center font-mono font-bold text-[#168A5A]">
                        <FormattedPhysicsResponse content={`$$${f.expression}$$`} />
                      </div>
                      <p className="text-xs text-[#5F6B66] mt-1">
                        {f.meaning}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DDEAE3]/70 flex items-center justify-between text-xs">
                      <span className="text-[#5F6B66] font-mono text-[11px]">Vật Lí 11</span>
                      <button
                        onClick={onOpenFormulaHandbook}
                        className="text-[#168A5A] hover:underline font-bold cursor-pointer"
                      >
                        Tra cứu chi tiết &gt;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-[#F5FBF7] rounded-3xl border border-dashed border-[#DDEAE3] space-y-3">
                <Bookmark className="w-10 h-10 text-[#99A8A0] mx-auto" />
                <h3 className="text-base font-bold text-[#17212B]">
                  Chưa có công thức nào được lưu
                </h3>
                <p className="text-xs text-[#5F6B66] max-w-sm mx-auto">
                  Bạn có thể vào mục Sổ tay Vật Lí và bấm biểu tượng Bookmark trên các công thức cần ghi nhớ.
                </p>
                <button
                  onClick={onOpenFormulaHandbook}
                  className="mt-2 px-5 py-2.5 bg-[#168A5A] hover:bg-[#07583F] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Mở Sổ tay Vật Lí
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Create new note card */}
            <form onSubmit={handleAddCustomNote} className="p-5 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] space-y-3">
              <span className="text-xs font-bold text-[#07583F] uppercase tracking-wider block">
                Thêm ghi chú bài học mới
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Tiêu đề ghi chú (VD: Mẹo tính chu kỳ con lắc)..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="sm:col-span-2 px-3.5 py-2 bg-white border border-[#DDEAE3] rounded-xl text-xs focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
                />
                <select
                  value={newNoteTag}
                  onChange={(e) => setNewNoteTag(e.target.value)}
                  className="px-3.5 py-2 bg-white border border-[#DDEAE3] rounded-xl text-xs focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
                >
                  <option value="Chương I: Dao động">Chương I: Dao động</option>
                  <option value="Chương II: Sóng">Chương II: Sóng</option>
                  <option value="Chương III: Điện trường">Chương III: Điện trường</option>
                  <option value="Chương IV: Dòng điện">Chương IV: Dòng điện</option>
                </select>
              </div>
              <textarea
                rows={3}
                placeholder="Nội dung ghi chú, công thức cần nhớ hoặc lưu ý làm bài..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-[#DDEAE3] rounded-xl text-xs focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNoteContent.trim()}
                  className="px-4 py-2 bg-[#168A5A] hover:bg-[#07583F] disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu ghi chú</span>
                </button>
              </div>
            </form>

            {/* Notes List */}
            {studyNotes.length > 0 ? (
              <div className="space-y-4">
                {studyNotes.map((note) => (
                  <div key={note.id} className="p-5 bg-white rounded-2xl border border-[#DDEAE3] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#17212B]">{note.title}</span>
                        {note.tags?.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-semibold text-[#07583F] bg-[#EAF7F0] px-2 py-0.5 rounded-full border border-[#DDEAE3]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => removeStudyNote(note.id)}
                        className="p-1.5 text-[#5F6B66] hover:text-[#E05252] hover:bg-[#FFF2F2] rounded-lg transition-colors cursor-pointer"
                        title="Xóa ghi chú"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm text-[#17212B] leading-relaxed">
                      <FormattedPhysicsResponse content={note.content} />
                    </div>
                    <div className="pt-2 text-[10px] text-[#99A8A0] font-mono">
                      Ngày tạo: {new Date(note.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center bg-[#F5FBF7] rounded-3xl border border-dashed border-[#DDEAE3] text-[#5F6B66] text-xs">
                Bạn chưa có ghi chú nào. Hãy tạo ghi chú phía trên hoặc bấm "Lưu vào sổ tay" khi trò chuyện cùng Gia sư AI.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROGRESS */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="p-5 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#07583F] uppercase tracking-wider">
                  Tổng tiến độ hoàn thành bài học
                </span>
                <span className="text-sm font-bold text-[#168A5A]">
                  {Math.round((completedLessons.length / GRADE_11_LESSONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#DDEAE3]">
                <div
                  className="h-full bg-[#168A5A] rounded-full transition-all duration-500"
                  style={{ width: `${(completedLessons.length / GRADE_11_LESSONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {GRADE_11_CHAPTERS.map((ch) => {
                const lessons = GRADE_11_LESSONS.filter((l) => l.chapterId === ch.id);
                return (
                  <div key={ch.id} className="p-5 bg-white rounded-2xl border border-[#DDEAE3] space-y-3">
                    <h3 className="text-sm font-bold text-[#17212B]">
                      {ch.title}
                    </h3>
                    <div className="space-y-2">
                      {lessons.map((l) => {
                        const isDone = completedLessons.includes(l.id);
                        return (
                          <div
                            key={l.id}
                            onClick={() => onOpenLesson(l.id)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5FBF7] transition-colors cursor-pointer text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-[#168A5A]' : 'text-[#DDEAE3]'}`} />
                              <span className="font-medium text-[#17212B]">{l.title}</span>
                            </div>
                            <span className="text-[11px] text-[#168A5A] hover:underline flex items-center gap-1 font-semibold">
                              Vào học <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
