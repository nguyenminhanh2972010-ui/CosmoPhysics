import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthState, NotebookEntry } from '../types';

export interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (fullName: string, email: string, pass: string, confirmPassword?: string) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string; resetCode?: string }>;
  resetPassword: (email: string, resetCode: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;

  // Formula Bookmarks
  savedFormulas: string[];
  saveFormula: (formulaId: string) => void;
  removeSavedFormula: (formulaId: string) => void;
  isFormulaSaved: (formulaId: string) => boolean;
  toggleBookmarkFormula: (formulaId: string) => void;
  isFormulaBookmarked: (formulaId: string) => boolean;

  // Completed Lessons
  completedLessons: string[];
  isLessonCompleted: (lessonId: string) => boolean;
  toggleCompleteLesson: (lessonId: string) => void;

  // Study Notes
  studyNotes: NotebookEntry[];
  addStudyNote: (note: { title: string; content: string; chapterId?: string; lessonId?: string; tags?: string[] }) => void;
  removeStudyNote: (noteId: string) => void;
}

const AUTH_TOKEN_KEY = 'cosmophysic_auth_token_v2';
const STORAGE_COMPLETED_LESSONS_KEY = 'cosmophysic_completed_lessons_v2';
const STORAGE_STUDY_NOTES_KEY = 'cosmophysic_study_notes_v2';
const STORAGE_GUEST_BOOKMARKS_KEY = 'cosmophysic_guest_bookmarks_v2';

const DEFAULT_INITIAL_NOTES: NotebookEntry[] = [
  {
    id: 'note-1',
    title: 'Ghi chú quan trọng: Dấu của li độ và gia tốc',
    content: 'Gia tốc a = -ω²x luôn ngược dấu với li độ x và luôn hướng về vị trí cân bằng. Nhớ đổi cm ra m trước khi bấm máy tính tính lực F = ma hoặc thế năng Wt = ½ kx²!',
    chapterId: 'chapter-1',
    lessonId: 'bai-1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['Dao động', 'Gia tốc', 'Mẹo thi']
  },
  {
    id: 'note-2',
    title: 'Phân biệt cực đại và cực tiểu trong giao thoa sóng',
    content: 'Với 2 nguồn cùng pha: Cực đại d2 - d1 = kλ (k = 0 là vân trung tâm). Cực tiểu d2 - d1 = (k + 0.5)λ. Khoảng cách giữa hai cực đại liên tiếp trên đường nối 2 nguồn là λ/2.',
    chapterId: 'chapter-2',
    lessonId: 'bai-12',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['Sóng', 'Giao thoa']
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['bai-1']);
  const [studyNotes, setStudyNotes] = useState<NotebookEntry[]>(DEFAULT_INITIAL_NOTES);
  const [guestBookmarks, setGuestBookmarks] = useState<string[]>(['f-1', 'f-5']);

  // Check existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.authenticated && data.user) {
              const u = data.user;
              setCurrentUser({
                id: u.id,
                fullName: u.fullName,
                name: u.fullName,
                email: u.email,
                grade: '11',
                createdAt: u.createdAt,
                bookmarkedFormulaIds: u.savedFormulas || [],
                savedNoteIds: []
              });
              if (u.studyNotes && u.studyNotes.length > 0) {
                setStudyNotes(u.studyNotes);
              }
            } else {
              localStorage.removeItem(AUTH_TOKEN_KEY);
            }
          } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
          }
        }
      } catch (err) {
        console.warn('Authentication check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Load local storage items
    try {
      const savedCompleted = localStorage.getItem(STORAGE_COMPLETED_LESSONS_KEY);
      if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));

      const savedNotes = localStorage.getItem(STORAGE_STUDY_NOTES_KEY);
      if (savedNotes) setStudyNotes(JSON.parse(savedNotes));

      const savedBookmarks = localStorage.getItem(STORAGE_GUEST_BOOKMARKS_KEY);
      if (savedBookmarks) setGuestBookmarks(JSON.parse(savedBookmarks));
    } catch (e) {
      console.error(e);
    }

    initAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Đăng nhập không thành công.' };
      }

      if (data.token && data.user) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        const u = data.user;
        setCurrentUser({
          id: u.id,
          fullName: u.fullName,
          name: u.fullName,
          email: u.email,
          grade: '11',
          createdAt: u.createdAt,
          bookmarkedFormulaIds: u.savedFormulas || [],
          savedNoteIds: []
        });
        return { success: true, message: data.message || `Chào mừng ${u.fullName}!` };
      }
      return { success: false, message: 'Phản hồi xác thực không hợp lệ.' };
    } catch (err: any) {
      return { success: false, message: 'Lỗi kết nối máy chủ. Vui lòng kiểm tra lại mạng.' };
    }
  };

  const register = async (
    fullName: string,
    email: string,
    pass: string,
    confirmPassword?: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password: pass,
          confirmPassword: confirmPassword || pass
        })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Đăng ký không thành công.' };
      }

      if (data.token && data.user) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        const u = data.user;
        setCurrentUser({
          id: u.id,
          fullName: u.fullName,
          name: u.fullName,
          email: u.email,
          grade: '11',
          createdAt: u.createdAt,
          bookmarkedFormulaIds: u.savedFormulas || [],
          savedNoteIds: []
        });
        return { success: true, message: data.message || 'Tạo tài khoản học sinh thành công!' };
      }
      return { success: false, message: 'Không thể tạo tài khoản.' };
    } catch (err: any) {
      return { success: false, message: 'Lỗi kết nối máy chủ. Vui lòng thử lại sau.' };
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string; resetCode?: string }> => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Không tìm thấy tài khoản.' };
      }
      return { success: true, message: data.message, resetCode: data.resetCode };
    } catch (err) {
      return { success: false, message: 'Lỗi kết nối máy chủ.' };
    }
  };

  const resetPassword = async (email: string, resetCode: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetCode, newPassword: newPass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Khôi phục không thành công.' };
      }
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: 'Lỗi kết nối máy chủ.' };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        // Silent
      }
    }
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setCurrentUser(null);
  };

  // Sync server data helper
  const syncServerUserData = async (notes: NotebookEntry[], formulas: string[]) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return;
    try {
      await fetch('/api/user/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studyNotes: notes,
          savedFormulas: formulas
        })
      });
    } catch (e) {
      console.warn('Sync user data failed:', e);
    }
  };

  const savedFormulas = currentUser ? (currentUser.bookmarkedFormulaIds || []) : guestBookmarks;

  const saveFormula = (formulaId: string) => {
    if (currentUser) {
      if (!savedFormulas.includes(formulaId)) {
        const updatedList = [...savedFormulas, formulaId];
        const updatedUser = { ...currentUser, bookmarkedFormulaIds: updatedList };
        setCurrentUser(updatedUser);
        syncServerUserData(studyNotes, updatedList);
      }
    } else {
      if (!guestBookmarks.includes(formulaId)) {
        const updated = [...guestBookmarks, formulaId];
        setGuestBookmarks(updated);
        localStorage.setItem(STORAGE_GUEST_BOOKMARKS_KEY, JSON.stringify(updated));
      }
    }
  };

  const removeSavedFormula = (formulaId: string) => {
    if (currentUser) {
      const updatedList = savedFormulas.filter(id => id !== formulaId);
      const updatedUser = { ...currentUser, bookmarkedFormulaIds: updatedList };
      setCurrentUser(updatedUser);
      syncServerUserData(studyNotes, updatedList);
    } else {
      const updated = guestBookmarks.filter(id => id !== formulaId);
      setGuestBookmarks(updated);
      localStorage.setItem(STORAGE_GUEST_BOOKMARKS_KEY, JSON.stringify(updated));
    }
  };

  const isFormulaSaved = (formulaId: string): boolean => {
    return savedFormulas.includes(formulaId);
  };

  const toggleBookmarkFormula = (formulaId: string) => {
    if (isFormulaSaved(formulaId)) {
      removeSavedFormula(formulaId);
    } else {
      saveFormula(formulaId);
    }
  };

  const isFormulaBookmarked = isFormulaSaved;

  // Lesson Completion
  const isLessonCompleted = (lessonId: string): boolean => {
    return completedLessons.includes(lessonId);
  };

  const toggleCompleteLesson = (lessonId: string) => {
    setCompletedLessons(prev => {
      const updated = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem(STORAGE_COMPLETED_LESSONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Study Notes
  const addStudyNote = (note: { title: string; content: string; chapterId?: string; lessonId?: string; tags?: string[] }) => {
    const newEntry: NotebookEntry = {
      id: 'note-' + Date.now(),
      title: note.title.trim() || 'Ghi chú mới',
      content: note.content.trim(),
      chapterId: note.chapterId,
      lessonId: note.lessonId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: note.tags && note.tags.length > 0 ? note.tags : ['Vật lý 11']
    };
    const updated = [newEntry, ...studyNotes];
    setStudyNotes(updated);
    localStorage.setItem(STORAGE_STUDY_NOTES_KEY, JSON.stringify(updated));
    if (currentUser) {
      syncServerUserData(updated, savedFormulas);
    }
  };

  const removeStudyNote = (noteId: string) => {
    const updated = studyNotes.filter(n => n.id !== noteId);
    setStudyNotes(updated);
    localStorage.setItem(STORAGE_STUDY_NOTES_KEY, JSON.stringify(updated));
    if (currentUser) {
      syncServerUserData(updated, savedFormulas);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        savedFormulas,
        saveFormula,
        removeSavedFormula,
        isFormulaSaved,
        toggleBookmarkFormula,
        isFormulaBookmarked,
        completedLessons,
        isLessonCompleted,
        toggleCompleteLesson,
        studyNotes,
        addStudyNote,
        removeStudyNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
