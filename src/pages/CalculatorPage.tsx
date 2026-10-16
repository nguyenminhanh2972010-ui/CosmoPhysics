import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw, History, Copy, Check, Calculator, Sparkles, BookOpen } from 'lucide-react';

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export const CalculatorPage: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [isSecondMode, setIsSecondMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastAns, setLastAns] = useState<string>('0');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        appendChar(e.key);
      } else if (e.key === '.') {
        appendChar('.');
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const opMap: Record<string, string> = { '+': '+', '-': '-', '*': '×', '/': '÷' };
        appendChar(opMap[e.key] || e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculateResult();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === '(' || e.key === ')') {
        appendChar(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, expression, angleMode]);

  const appendChar = (char: string) => {
    if (display === '0' && !isNaN(Number(char))) {
      setDisplay(char);
    } else {
      setDisplay((prev) => prev + char);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const insertConstant = (val: string, name: string) => {
    if (display === '0') {
      setDisplay(val);
    } else {
      setDisplay((prev) => prev + '×' + val);
    }
  };

  const applyFunction = (fn: string) => {
    try {
      const current = parseFloat(display);
      let res = 0;
      switch (fn) {
        case 'sin':
          res = angleMode === 'DEG' ? Math.sin((current * Math.PI) / 180) : Math.sin(current);
          break;
        case 'cos':
          res = angleMode === 'DEG' ? Math.cos((current * Math.PI) / 180) : Math.cos(current);
          break;
        case 'tan':
          res = angleMode === 'DEG' ? Math.tan((current * Math.PI) / 180) : Math.tan(current);
          break;
        case 'sqrt':
          if (current < 0) throw new Error('Không thể tính căn bậc 2 số âm');
          res = Math.sqrt(current);
          break;
        case 'sqr':
          res = current * current;
          break;
        case 'inv':
          if (current === 0) throw new Error('Chia cho 0');
          res = 1 / current;
          break;
        case 'ln':
          if (current <= 0) throw new Error('Không xác định cho số <= 0');
          res = Math.log(current);
          break;
        case 'log10':
          if (current <= 0) throw new Error('Không xác định cho số <= 0');
          res = Math.log10(current);
          break;
        case 'neg':
          res = -current;
          break;
        default:
          return;
      }

      const formatted = Number(res.toFixed(8)).toString();
      setExpression(`${fn}(${display}) =`);
      setDisplay(formatted);
      setLastAns(formatted);
    } catch (err: any) {
      setDisplay('Lỗi toán học');
      setTimeout(() => setDisplay('0'), 1500);
    }
  };

  const calculateResult = () => {
    try {
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `${Math.PI}`)
        .replace(/\^/g, '**');

      // Evaluator with safe arithmetic
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${sanitized})`)();
      const formatted = Number(Number(result).toFixed(8)).toString();

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: display,
          result: formatted,
          timestamp: new Date()
        },
        ...prev.slice(0, 19)
      ]);

      setExpression(`${display} =`);
      setDisplay(formatted);
      setLastAns(formatted);
    } catch (err) {
      setDisplay('Lỗi biểu thức');
      setTimeout(() => setDisplay('0'), 1500);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F5FBF7]/50 min-h-[calc(100vh-80px)]">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#168A5A]" />
            <span>CÔNG CỤ TÍNH TOÁN KHOA HỌC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Máy tính Khoa học Vật Lí 11
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-1">
            Tích hợp sẵn các hằng số vật lý chuẩn SGK 11 (g, k, e, c, ε₀) và các hàm lượng giác cần thiết.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="bg-white rounded-3xl border border-[#DDEAE3] shadow-md p-6 sm:p-8">
          
          {/* Display screen */}
          <div className="bg-[#17212B] text-white p-5 rounded-2xl mb-6 shadow-inner relative flex flex-col justify-end min-h-[110px]">
            <div className="flex items-center justify-between text-xs text-[#86EFAC] font-mono mb-1">
              <span className="px-2 py-0.5 bg-white/10 rounded">
                Chế độ: {angleMode}
              </span>
              <span className="truncate max-w-[280px]">
                {expression}
              </span>
            </div>
            
            <div className="text-2xl sm:text-4xl font-mono font-bold tracking-wider text-right overflow-x-auto no-scrollbar">
              {display}
            </div>

            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              title="Sao chép kết quả"
            >
              {copied ? <Check className="w-4 h-4 text-[#86EFAC]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Physics Constants Strip */}
          <div className="mb-5 pb-4 border-b border-[#DDEAE3] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-[#5F6B66] whitespace-nowrap">
              Hằng số Vật Lí 11:
            </span>
            <button
              onClick={() => insertConstant('9.8', 'g')}
              className="px-2.5 py-1 bg-[#F5FBF7] hover:bg-[#EAF7F0] text-xs font-mono font-semibold text-[#07583F] rounded-lg border border-[#DDEAE3] whitespace-nowrap cursor-pointer"
            >
              g = 9.8 m/s²
            </button>
            <button
              onClick={() => insertConstant('9e9', 'k')}
              className="px-2.5 py-1 bg-[#F5FBF7] hover:bg-[#EAF7F0] text-xs font-mono font-semibold text-[#07583F] rounded-lg border border-[#DDEAE3] whitespace-nowrap cursor-pointer"
            >
              k = 9·10⁹ N·m²/C²
            </button>
            <button
              onClick={() => insertConstant('1.6e-19', 'e')}
              className="px-2.5 py-1 bg-[#F5FBF7] hover:bg-[#EAF7F0] text-xs font-mono font-semibold text-[#07583F] rounded-lg border border-[#DDEAE3] whitespace-nowrap cursor-pointer"
            >
              e = 1.6·10⁻¹⁹ C
            </button>
            <button
              onClick={() => insertConstant('3e8', 'c')}
              className="px-2.5 py-1 bg-[#F5FBF7] hover:bg-[#EAF7F0] text-xs font-mono font-semibold text-[#07583F] rounded-lg border border-[#DDEAE3] whitespace-nowrap cursor-pointer"
            >
              c = 3·10⁸ m/s
            </button>
            <button
              onClick={() => insertConstant(`${Math.PI}`, 'pi')}
              className="px-2.5 py-1 bg-[#F5FBF7] hover:bg-[#EAF7F0] text-xs font-mono font-semibold text-[#07583F] rounded-lg border border-[#DDEAE3] whitespace-nowrap cursor-pointer"
            >
              π ≈ 3.14159
            </button>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold">
            {/* Row 1 */}
            <button
              onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
              className="p-3 bg-[#EAF7F0] text-[#07583F] rounded-xl font-bold cursor-pointer hover:bg-[#D4EFE0]"
            >
              {angleMode}
            </button>
            <button onClick={() => applyFunction('sin')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">sin</button>
            <button onClick={() => applyFunction('cos')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">cos</button>
            <button onClick={() => applyFunction('tan')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">tan</button>
            <button onClick={handleClear} className="p-3 bg-[#FFF2F2] text-[#E05252] rounded-xl font-bold hover:bg-[#FFE5E5] cursor-pointer">AC</button>

            {/* Row 2 */}
            <button onClick={() => applyFunction('sqrt')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">√x</button>
            <button onClick={() => applyFunction('sqr')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">x²</button>
            <button onClick={() => appendChar('^')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">x^y</button>
            <button onClick={() => appendChar('(')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">(</button>
            <button onClick={() => appendChar(')')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">)</button>

            {/* Row 3 */}
            <button onClick={() => applyFunction('ln')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">ln</button>
            <button onClick={() => appendChar('7')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">7</button>
            <button onClick={() => appendChar('8')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">8</button>
            <button onClick={() => appendChar('9')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">9</button>
            <button onClick={() => appendChar('÷')} className="p-3 bg-[#EAF7F0] text-[#07583F] rounded-xl hover:bg-[#D4EFE0] cursor-pointer font-bold">÷</button>

            {/* Row 4 */}
            <button onClick={() => applyFunction('log10')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">log</button>
            <button onClick={() => appendChar('4')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">4</button>
            <button onClick={() => appendChar('5')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">5</button>
            <button onClick={() => appendChar('6')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">6</button>
            <button onClick={() => appendChar('×')} className="p-3 bg-[#EAF7F0] text-[#07583F] rounded-xl hover:bg-[#D4EFE0] cursor-pointer font-bold">×</button>

            {/* Row 5 */}
            <button onClick={() => applyFunction('inv')} className="p-3 bg-[#F5FBF7] text-[#17212B] rounded-xl hover:bg-[#EAF7F0] cursor-pointer">1/x</button>
            <button onClick={() => appendChar('1')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">1</button>
            <button onClick={() => appendChar('2')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">2</button>
            <button onClick={() => appendChar('3')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">3</button>
            <button onClick={() => appendChar('-')} className="p-3 bg-[#EAF7F0] text-[#07583F] rounded-xl hover:bg-[#D4EFE0] cursor-pointer font-bold">−</button>

            {/* Row 6 */}
            <button onClick={handleBackspace} className="p-3 bg-[#F5FBF7] text-[#5F6B66] rounded-xl hover:bg-[#EAF7F0] flex items-center justify-center cursor-pointer">
              <Delete className="w-4 h-4" />
            </button>
            <button onClick={() => appendChar('0')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">0</button>
            <button onClick={() => appendChar('.')} className="p-3 bg-white border border-[#DDEAE3] text-[#17212B] rounded-xl hover:bg-[#F5FBF7] cursor-pointer font-bold">.</button>
            <button onClick={calculateResult} className="p-3 bg-[#168A5A] text-white rounded-xl hover:bg-[#07583F] cursor-pointer font-bold shadow-xs">=</button>
            <button onClick={() => appendChar('+')} className="p-3 bg-[#EAF7F0] text-[#07583F] rounded-xl hover:bg-[#D4EFE0] cursor-pointer font-bold">+</button>
          </div>

          {/* History Accordion */}
          {history.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#DDEAE3]">
              <div className="flex items-center justify-between text-xs font-bold text-[#17212B] mb-2">
                <span>LỊCH SỬ TÍNH TOÁN VỪA QUA</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-[#E05252] hover:underline cursor-pointer"
                >
                  Xóa lịch sử
                </button>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-2 rounded-lg bg-[#F5FBF7] text-xs font-mono">
                    <span className="text-[#5F6B66]">{h.expression}</span>
                    <span className="font-bold text-[#168A5A]">= {h.result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
