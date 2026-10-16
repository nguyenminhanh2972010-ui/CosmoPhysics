import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, Bookmark, Trash2, ArrowRight, Lightbulb, Loader2, BookOpen, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FormattedPhysicsResponse } from '../components/FormattedPhysicsResponse';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  timestamp: Date;
}

interface AiTutorPageProps {
  initialPrompt?: string;
  onOpenNotebook?: () => void;
}

export const AiTutorPage: React.FC<AiTutorPageProps> = ({ initialPrompt, onOpenNotebook }) => {
  const { currentUser, addStudyNote } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Chào bạn, tôi là Gia sư AI Vật Lý của riêng bạn. Bạn cần tôi giúp gì?',
      source: 'Nguồn kiến thức: SGK Vật Lí 11',
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedCategories = [
    { label: 'Quy trình 8 bước con lắc lò xo', prompt: 'Phương pháp 8 bước giải bài tập con lắc lò xo' },
    { label: 'So sánh cực đại & cực tiểu giao thoa', prompt: 'Phân biệt điều kiện cực đại và cực tiểu giao thoa' },
    { label: 'Chu kỳ con lắc lò xo', prompt: 'Công thức chu kỳ con lắc lò xo là gì?' },
    { label: 'Định luật Coulomb & Điện trường', prompt: 'Định luật Coulomb và đơn vị SI trong điện trường' },
    { label: 'Định luật Ohm cho toàn mạch', prompt: 'Định luật Ohm cho toàn mạch kín có nguồn (E, r)' },
  ];

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.reply || 'Hiện tại mình chưa tìm thấy thông tin phù hợp trong nguồn kiến thức Vật Lí 11 hiện có.';

      const assistantMsg: ChatMessage = {
        id: 'asst-' + Date.now(),
        role: 'assistant',
        content: replyContent,
        source: data.source || 'Nguồn kiến thức: SGK Vật Lí 11',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: 'Gia sư AI hiện chưa thể kết nối với hệ thống trả lời. Bạn vui lòng thử lại sau.',
        source: 'Thông báo hệ thống',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotebook = (content: string) => {
    addStudyNote({
      title: 'Giải đáp từ Gia sư AI Vật Lí 11',
      content,
      tags: ['Gia sư AI', 'Vật Lí 11']
    });
    setSavedSuccessMsg('Đã lưu lời giải vào Sổ tay học tập!');
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Chào bạn, tôi là Gia sư AI Vật Lý của riêng bạn. Bạn cần tôi giúp gì?',
        source: 'Nguồn kiến thức: SGK Vật Lí 11',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
        
        {/* Page Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#DDEAE3] mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-1.5">
              <Bot className="w-3.5 h-3.5 text-[#168A5A]" />
              <span>GIA SƯ AI VẬT LÝ 11</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Gia sư AI Đồng hành Học tập
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6B66] mt-1">
              Giải đáp lý thuyết, bản chất hiện tượng và hướng dẫn bài tập chi tiết chuẩn Sư phạm.
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2 text-[#5F6B66] hover:text-[#E05252] hover:bg-[#FFF2F2] rounded-xl transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
            title="Làm mới cuộc trò chuyện"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>

        {/* Saved Toast */}
        {savedSuccessMsg && (
          <div className="mb-4 bg-[#168A5A] text-white text-xs font-semibold py-2 px-4 rounded-xl text-center animate-fadeIn shadow-xs flex items-center justify-center gap-2">
            <span>{savedSuccessMsg}</span>
            {onOpenNotebook && (
              <button
                onClick={onOpenNotebook}
                className="underline font-bold text-white hover:text-[#86EFAC] cursor-pointer ml-1"
              >
                Mở sổ tay
              </button>
            )}
          </div>
        )}

        {/* Suggested Categories Quick Prompts Bar */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[11px] text-[#5F6B66] font-semibold whitespace-nowrap flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-[#168A5A]" /> Gợi ý nhanh:
          </span>
          {suggestedCategories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              className="text-xs bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#17212B] hover:text-[#07583F] px-3 py-1.5 rounded-xl border border-[#DDEAE3] whitespace-nowrap transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Chat Conversation Area */}
        <div className="flex-1 bg-[#F5FBF7]/50 rounded-3xl border border-[#DDEAE3] p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[600px] mb-6 shadow-inner">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-[#EAF7F0] text-[#07583F] flex items-center justify-center shrink-0 border border-[#DDEAE3] shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#168A5A]" />
                  </div>
                )}

                <div className={`max-w-[90%] sm:max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-[#07583F] text-white rounded-tr-xs'
                        : 'bg-white text-[#17212B] border border-[#DDEAE3] rounded-tl-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <FormattedPhysicsResponse
                        content={m.content}
                        source={m.source}
                      />
                    )}
                  </div>

                  {!isUser && m.id !== 'welcome' && (
                    <div className="flex items-center gap-2 mt-2 ml-1">
                      <button
                        onClick={() => handleSaveToNotebook(m.content)}
                        className="text-xs text-[#5F6B66] hover:text-[#07583F] flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-[#168A5A]" />
                        <span>Lưu vào sổ tay học tập</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-[#17212B] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-9 h-9 rounded-2xl bg-[#EAF7F0] text-[#07583F] flex items-center justify-center shrink-0 border border-[#DDEAE3]">
                <Loader2 className="w-4 h-4 text-[#168A5A] animate-spin" />
              </div>
              <div className="p-4 bg-white border border-[#DDEAE3] rounded-2xl rounded-tl-xs text-xs text-[#5F6B66] flex items-center gap-2 shadow-xs">
                <span>Gia sư AI đang suy nghĩ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white rounded-2xl border border-[#DDEAE3] p-2 shadow-xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Đặt câu hỏi về dao động, sóng, điện trường, hoặc dán đề bài thi tại đây..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-[#F5FBF7] border border-transparent rounded-xl focus:border-[#168A5A] focus:outline-hidden text-[#17212B]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 bg-[#168A5A] hover:bg-[#07583F] disabled:opacity-50 text-white rounded-xl transition-colors shadow-xs cursor-pointer"
              aria-label="Gửi câu hỏi"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-[10px] text-center text-[#99A8A0] mt-2">
            COSMO AI cam kết không bịa đặt số liệu hay tên bài học; nguồn chân lý là SGK Vật Lí 11 GDPT mới.
          </div>
        </div>

      </div>
    </div>
  );
};
