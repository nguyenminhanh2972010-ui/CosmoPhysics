import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, User, Bookmark, Trash2, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FormattedPhysicsResponse } from './FormattedPhysicsResponse';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  timestamp: Date;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose, initialPrompt }) => {
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

  const quickPrompts = [
    'Phương pháp 8 bước giải bài tập con lắc lò xo',
    'Phân biệt điều kiện cực đại và cực tiểu giao thoa',
    'Công thức chu kỳ con lắc lò xo là gì?',
    'Định luật Coulomb và đơn vị SI trong điện trường'
  ];

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

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
    setSavedSuccessMsg('Đã lưu bài học vào Sổ tay cá nhân!');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-3xl h-[90vh] sm:h-[85vh] rounded-3xl border border-[#DDEAE3] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#DDEAE3] bg-[#F5FBF7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#168A5A] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#17212B]">
                  Gia sư AI Vật lý 11
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-full border border-[#DDEAE3]">
                  Vật Lí 11
                </span>
              </div>
              <p className="text-xs text-[#5F6B66]">
                Giải đáp lý thuyết, bản chất hiện tượng và hướng dẫn bài tập chi tiết
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              className="p-2 text-[#5F6B66] hover:text-[#E05252] hover:bg-white rounded-xl transition-colors cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#5F6B66] hover:text-[#17212B] hover:bg-white rounded-xl transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification pill if saved */}
        {savedSuccessMsg && (
          <div className="bg-[#168A5A] text-white text-xs font-semibold py-1.5 px-4 text-center animate-fadeIn">
            {savedSuccessMsg}
          </div>
        )}

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#EAF7F0] text-[#07583F] flex items-center justify-center shrink-0 border border-[#DDEAE3]">
                    <Sparkles className="w-4 h-4 text-[#168A5A]" />
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#07583F] text-white rounded-tr-xs'
                        : 'bg-[#F5FBF7] text-[#17212B] border border-[#DDEAE3] rounded-tl-xs'
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
                    <div className="flex items-center gap-2 mt-1.5 ml-1">
                      <button
                        onClick={() => handleSaveToNotebook(m.content)}
                        className="text-[11px] text-[#5F6B66] hover:text-[#07583F] flex items-center gap-1 py-0.5 px-2 rounded-md hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                      >
                        <Bookmark className="w-3 h-3 text-[#168A5A]" />
                        <span>Lưu vào sổ tay</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#17212B] text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-[#EAF7F0] text-[#07583F] flex items-center justify-center shrink-0 border border-[#DDEAE3]">
                <Loader2 className="w-4 h-4 text-[#168A5A] animate-spin" />
              </div>
              <div className="p-3 bg-[#F5FBF7] border border-[#DDEAE3] rounded-2xl rounded-tl-xs text-xs text-[#5F6B66] flex items-center gap-2">
                <span>Gia sư AI đang suy nghĩ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-[#F5FBF7] border-t border-[#DDEAE3] overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] text-[#5F6B66] font-semibold whitespace-nowrap flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-[#168A5A]" /> Gợi ý câu hỏi:
          </span>
          {quickPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-white hover:bg-[#EAF7F0] text-[#17212B] hover:text-[#07583F] px-2.5 py-1 rounded-lg border border-[#DDEAE3] whitespace-nowrap transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#DDEAE3] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi lý thuyết, công thức hoặc dán đề bài thi tại đây..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-2xl focus:outline-hidden focus:border-[#168A5A] text-[#17212B]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 bg-[#168A5A] hover:bg-[#07583F] disabled:opacity-50 text-white rounded-2xl transition-colors shadow-xs cursor-pointer"
              aria-label="Gửi câu hỏi"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-[10px] text-center text-[#99A8A0] mt-2">
            Nguồn tri thức cốt lõi: SGK Vật Lí 11 (GDPT mới).
          </div>
        </div>
      </div>
    </div>
  );
};
