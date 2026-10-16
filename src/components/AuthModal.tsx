import React, { useState } from 'react';
import { X, CheckCircle, Lock, Mail, User, ArrowRight, AlertCircle, KeyRound, Loader2 } from 'lucide-react';
import { CosmoLogo } from './CosmoLogo';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  initialTab: 'login' | 'register';
  onClose: () => void;
  onSuccess?: (studentName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialTab,
  onClose,
  onSuccess,
}) => {
  const { login, register, forgotPassword, resetPassword } = useAuth();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot' | 'reset'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetFormState = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleTabChange = (newTab: 'login' | 'register') => {
    resetFormState();
    setTab(newTab);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!email.trim() || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ địa chỉ email và mật khẩu.');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      setSuccessMsg(result.message);
      setTimeout(() => {
        if (onSuccess) onSuccess(email);
        onClose();
      }, 700);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Địa chỉ email không đúng định dạng. Ví dụ: hocsinh@thpt.edu.vn');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Mật khẩu bảo mật phải có ít nhất 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsLoading(true);
    const result = await register(fullName, email, password, confirmPassword);
    setIsLoading(false);

    if (result.success) {
      setSuccessMsg(result.message);
      setTimeout(() => {
        if (onSuccess) onSuccess(fullName);
        onClose();
      }, 700);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!email.trim()) {
      setErrorMsg('Vui lòng nhập email tài khoản của bạn.');
      return;
    }

    setIsLoading(true);
    const res = await forgotPassword(email.trim());
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setTab('reset');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!resetCode.trim()) {
      setErrorMsg('Vui lòng nhập mã xác thực 6 chữ số.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải có từ 6 ký tự trở lên.');
      return;
    }

    setIsLoading(true);
    const res = await resetPassword(email.trim(), resetCode.trim(), newPassword);
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setTab('login');
        resetFormState();
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#DDEAE3] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="p-5 bg-[#F5FBF7] border-b border-[#DDEAE3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CosmoLogo size="sm" />
            <span className="text-[11px] font-semibold text-[#07583F] px-2 py-0.5 rounded-md bg-[#EAF7F0] border border-[#DDEAE3]">
              Vật Lí 11
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDEAE3] text-[#5F6B66] hover:text-[#17212B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher (when not in forgot password flow) */}
        {tab !== 'forgot' && tab !== 'reset' && (
          <div className="flex border-b border-[#DDEAE3]">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                tab === 'login'
                  ? 'text-[#168A5A] border-b-2 border-[#168A5A] bg-white'
                  : 'text-[#5F6B66] bg-[#F5FBF7]/50 hover:bg-[#F5FBF7]'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                tab === 'register'
                  ? 'text-[#168A5A] border-b-2 border-[#168A5A] bg-white'
                  : 'text-[#5F6B66] bg-[#F5FBF7]/50 hover:bg-[#F5FBF7]'
              }`}
            >
              Tạo tài khoản học sinh
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-fadeIn">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Địa chỉ Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hocsinh@thpt.edu.vn"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#17212B]">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setTab('forgot');
                    }}
                    className="text-[11px] font-semibold text-[#168A5A] hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 text-sm font-bold text-white bg-[#168A5A] hover:bg-[#07583F] disabled:opacity-60 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Đăng nhập ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#5F6B66] pt-1">
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('register')}
                  className="font-bold text-[#168A5A] hover:underline"
                >
                  Đăng ký miễn phí
                </button>
              </p>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Họ và tên học sinh
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn An"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Địa chỉ Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hocsinh@thpt.edu.vn"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-[#17212B] mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ít nhất 6 ký tự"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17212B] mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#EAF7F0] border border-[#DDEAE3] text-[11px] text-[#07583F]">
                Tài khoản tự động tối ưu cho lộ trình <strong>Vật Lí Lớp 11</strong> (4 Chương trọng tâm chuẩn Bộ GD&ĐT).
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 text-sm font-bold text-white bg-[#168A5A] hover:bg-[#07583F] disabled:opacity-60 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Tạo tài khoản học sinh Lớp 11</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#5F6B66] pt-1">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('login')}
                  className="font-bold text-[#168A5A] hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FLOW */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-3.5">
              <div className="text-center py-2">
                <div className="w-10 h-10 bg-[#EAF7F0] text-[#168A5A] rounded-full mx-auto flex items-center justify-center mb-2">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Khôi phục mật khẩu tài khoản</h3>
                <p className="text-xs text-[#5F6B66] mt-1">
                  Nhập địa chỉ email đăng ký để nhận mã xác thực đặt lại mật khẩu.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Địa chỉ Email của bạn
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#5F6B66] absolute left-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hocsinh@thpt.edu.vn"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 text-sm font-bold text-white bg-[#168A5A] hover:bg-[#07583F] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Gửi mã khôi phục'}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetFormState();
                  setTab('login');
                }}
                className="w-full text-center text-xs font-semibold text-[#5F6B66] hover:text-[#17212B]"
              >
                ← Quay lại Đăng nhập
              </button>
            </form>
          )}

          {/* 4. RESET PASSWORD FLOW */}
          {tab === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-3.5">
              <div className="text-center py-2">
                <h3 className="text-sm font-bold text-[#17212B]">Nhập mã xác thực & Mật khẩu mới</h3>
                <p className="text-xs text-[#5F6B66] mt-1">
                  Mã xác thực đã được gửi cho tài khoản <strong>{email}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Mã xác thực (6 chữ số)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3 py-2.5 text-center text-lg tracking-widest font-mono bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-3 py-2.5 text-sm bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl focus:bg-white focus:border-[#168A5A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 text-sm font-bold text-white bg-[#168A5A] hover:bg-[#07583F] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cập nhật mật khẩu'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
