import React, { useState, useEffect } from 'react';
import { X, Delete, RotateCcw, History, Copy, Check, Calculator, Sparkles } from 'lucide-react';

interface ScientificCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export const ScientificCalculatorModal: React.FC<ScientificCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [isSecondMode, setIsSecondMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastAns, setLastAns] = useState<string>('0');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
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
  }, [isOpen, display, expression, angleMode]);

  if (!isOpen) return null;

  const appendChar = (char: string) => {
    if (display === '0' && !isNaN(Number(char))) {
      setDisplay(char);
    } else if (display === 'Error') {
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
    if (display.length <= 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay((prev) => prev.slice(0, -1));
    }
  };

  const applyFunction = (func: string) => {
    const toRad = (val: number) => (angleMode === 'DEG' ? (val * Math.PI) / 180 : val);
    const fromRad = (val: number) => (angleMode === 'DEG' ? (val * 180) / Math.PI : val);

    try {
      const currentVal = parseFloat(display);
      if (isNaN(currentVal)) return;

      let result = 0;
      let expText = '';

      switch (func) {
        case 'sin':
          result = Math.sin(toRad(currentVal));
          expText = `sin(${currentVal})`;
          break;
        case 'cos':
          result = Math.cos(toRad(currentVal));
          expText = `cos(${currentVal})`;
          break;
        case 'tan':
          result = Math.tan(toRad(currentVal));
          expText = `tan(${currentVal})`;
          break;
        case 'asin':
          result = fromRad(Math.asin(currentVal));
          expText = `asin(${currentVal})`;
          break;
        case 'acos':
          result = fromRad(Math.acos(currentVal));
          expText = `acos(${currentVal})`;
          break;
        case 'atan':
          result = fromRad(Math.atan(currentVal));
          expText = `atan(${currentVal})`;
          break;
        case 'ln':
          result = Math.log(currentVal);
          expText = `ln(${currentVal})`;
          break;
        case 'log':
          result = Math.log10(currentVal);
          expText = `log(${currentVal})`;
          break;
        case 'sqrt':
          result = Math.sqrt(currentVal);
          expText = `√(${currentVal})`;
          break;
        case 'cbrt':
          result = Math.cbrt(currentVal);
          expText = `∛(${currentVal})`;
          break;
        case 'sqr':
          result = Math.pow(currentVal, 2);
          expText = `(${currentVal})²`;
          break;
        case 'inv':
          result = 1 / currentVal;
          expText = `1/(${currentVal})`;
          break;
        case 'exp':
          result = Math.exp(currentVal);
          expText = `e^(${currentVal})`;
          break;
        case 'abs':
          result = Math.abs(currentVal);
          expText = `|${currentVal}|`;
          break;
        default:
          return;
      }

      // Round to 10 significant digits
      const formatted = Number(result.toFixed(10)).toString();
      setExpression(expText);
      setDisplay(formatted);
      setLastAns(formatted);

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: expText,
          result: formatted,
          timestamp: new Date()
        },
        ...prev.slice(0, 19)
      ]);
    } catch {
      setDisplay('Error');
    }
  };

  const calculateResult = () => {
    try {
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `${Math.PI}`)
        .replace(/\be\b/g, `${Math.E}`)
        .replace(/\^/g, '**');

      // Evaluate safely with standard math operators
      // eslint-disable-next-line no-eval
      const evalResult = Function(`"use strict"; return (${sanitized})`)();

      if (typeof evalResult !== 'number' || isNaN(evalResult) || !isFinite(evalResult)) {
        setDisplay('Error');
        return;
      }

      const formatted = Number(evalResult.toFixed(10)).toString();
      setExpression(display + ' =');
      setDisplay(formatted);
      setLastAns(formatted);

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: display,
          result: formatted,
          timestamp: new Date()
        },
        ...prev.slice(0, 19)
      ]);
    } catch {
      setDisplay('Error');
    }
  };

  const insertPhysicsConstant = (val: string, name: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay((prev) => prev + val);
    }
    setExpression(`Hằng số: ${name}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DDEAE3] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#053C2D] text-white flex items-center justify-between border-b border-[#168A5A]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#168A5A] flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Máy Tính Khoa Học Vật Lí 11</h3>
              <p className="text-xs text-[#86EFAC]">Chuyên dụng tính chu kỳ, sóng, điện trường & mạch điện</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-xl transition-colors ${
                showHistory ? 'bg-[#168A5A] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Lịch sử tính toán"
            >
              <History className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Physics Constants Ribbon */}
        <div className="px-4 py-2 bg-[#F5FBF7] border-b border-[#DDEAE3] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="shrink-0 font-bold text-[#07583F] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Hằng số VL11:
          </span>
          <button
            onClick={() => insertPhysicsConstant('9.8', 'Gia tốc g = 9.8 m/s²')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF7F0] border border-[#DDEAE3] text-[#17212B] shrink-0 transition-colors"
          >
            g = 9.8
          </button>
          <button
            onClick={() => insertPhysicsConstant('(9*(10^9))', 'Hằng số Coulomb k = 9·10⁹')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF7F0] border border-[#DDEAE3] text-[#17212B] shrink-0 transition-colors"
          >
            k = 9·10⁹
          </button>
          <button
            onClick={() => insertPhysicsConstant('(1.6*(10^-19))', 'Điện tích e = 1.6·10⁻¹⁹ C')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF7F0] border border-[#DDEAE3] text-[#17212B] shrink-0 transition-colors"
          >
            e = 1.6·10⁻¹⁹
          </button>
          <button
            onClick={() => insertPhysicsConstant('(3*(10^8))', 'Vận tốc ánh sáng c = 3·10⁸ m/s')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF7F0] border border-[#DDEAE3] text-[#17212B] shrink-0 transition-colors"
          >
            c = 3·10⁸
          </button>
          <button
            onClick={() => insertPhysicsConstant('(8.85*(10^-12))', 'Hằng số điện môi ε₀')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF7F0] border border-[#DDEAE3] text-[#17212B] shrink-0 transition-colors"
          >
            ε₀ = 8.85·10⁻¹²
          </button>
        </div>

        {/* Display screen */}
        <div className="p-4 sm:p-5 bg-[#F9FCFA] border-b border-[#DDEAE3] text-right">
          <div className="flex items-center justify-between text-xs text-[#5F6B66] mb-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
                className="px-2 py-0.5 rounded-md bg-[#DDEAE3] hover:bg-[#168A5A] hover:text-white font-bold transition-colors"
              >
                {angleMode}
              </button>
              <button
                onClick={() => setIsSecondMode(!isSecondMode)}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  isSecondMode ? 'bg-[#168A5A] text-white' : 'bg-[#DDEAE3]'
                }`}
              >
                2nd
              </button>
            </div>
            <span className="font-mono">{expression || ' '}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-lg border border-[#DDEAE3] hover:bg-white text-[#5F6B66] text-xs flex items-center gap-1 transition-colors"
              title="Sao chép kết quả"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#168A5A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#17212B] tracking-tight overflow-x-auto whitespace-nowrap scrollbar-none">
              {display}
            </div>
          </div>
        </div>

        {/* Calculator Body (Keypad or History Drawer) */}
        <div className="p-3 sm:p-4 bg-white flex-1 overflow-y-auto">
          {showHistory ? (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDEAE3]">
                <span className="text-xs font-bold text-[#07583F]">Lịch sử phép tính gần đây</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-red-600 hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>
              {history.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#5F6B66]">Chưa có phép tính nào trong phiên này.</div>
              ) : (
                history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      setDisplay(h.result);
                      setExpression(h.expression);
                    }}
                    className="p-2 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="text-xs font-mono text-[#5F6B66]">{h.expression}</span>
                    <span className="text-sm font-mono font-bold text-[#17212B]">= {h.result}</span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-sm font-medium">
              {/* Row 1 */}
              <button
                onClick={() => applyFunction(isSecondMode ? 'asin' : 'sin')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                {isSecondMode ? 'sin⁻¹' : 'sin'}
              </button>
              <button
                onClick={() => applyFunction(isSecondMode ? 'acos' : 'cos')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                {isSecondMode ? 'cos⁻¹' : 'cos'}
              </button>
              <button
                onClick={() => applyFunction(isSecondMode ? 'atan' : 'tan')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                {isSecondMode ? 'tan⁻¹' : 'tan'}
              </button>
              <button
                onClick={handleClear}
                className="py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-colors"
              >
                AC
              </button>
              <button
                onClick={handleBackspace}
                className="py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 flex items-center justify-center transition-colors"
              >
                <Delete className="w-4 h-4" />
              </button>

              {/* Row 2 */}
              <button
                onClick={() => applyFunction('ln')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                ln
              </button>
              <button
                onClick={() => applyFunction('log')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                log
              </button>
              <button
                onClick={() => applyFunction(isSecondMode ? 'cbrt' : 'sqrt')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                {isSecondMode ? '∛' : '√'}
              </button>
              <button
                onClick={() => appendChar('(')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                (
              </button>
              <button
                onClick={() => appendChar(')')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                )
              </button>

              {/* Row 3 */}
              <button
                onClick={() => applyFunction('sqr')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                x²
              </button>
              <button
                onClick={() => appendChar('7')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                7
              </button>
              <button
                onClick={() => appendChar('8')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                8
              </button>
              <button
                onClick={() => appendChar('9')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                9
              </button>
              <button
                onClick={() => appendChar('÷')}
                className="py-2.5 rounded-xl bg-[#EAF7F0] hover:bg-[#168A5A] hover:text-white text-[#168A5A] font-bold transition-colors"
              >
                ÷
              </button>

              {/* Row 4 */}
              <button
                onClick={() => appendChar('^')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                x^y
              </button>
              <button
                onClick={() => appendChar('4')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                4
              </button>
              <button
                onClick={() => appendChar('5')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                5
              </button>
              <button
                onClick={() => appendChar('6')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                6
              </button>
              <button
                onClick={() => appendChar('×')}
                className="py-2.5 rounded-xl bg-[#EAF7F0] hover:bg-[#168A5A] hover:text-white text-[#168A5A] font-bold transition-colors"
              >
                ×
              </button>

              {/* Row 5 */}
              <button
                onClick={() => appendChar('π')}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                π
              </button>
              <button
                onClick={() => appendChar('1')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                1
              </button>
              <button
                onClick={() => appendChar('2')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                2
              </button>
              <button
                onClick={() => appendChar('3')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                3
              </button>
              <button
                onClick={() => appendChar('-')}
                className="py-2.5 rounded-xl bg-[#EAF7F0] hover:bg-[#168A5A] hover:text-white text-[#168A5A] font-bold transition-colors"
              >
                -
              </button>

              {/* Row 6 */}
              <button
                onClick={() => {
                  if (lastAns) appendChar(lastAns);
                }}
                className="py-2.5 rounded-xl bg-[#F5FBF7] hover:bg-[#EAF7F0] text-[#07583F] font-mono transition-colors"
              >
                Ans
              </button>
              <button
                onClick={() => appendChar('0')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                0
              </button>
              <button
                onClick={() => appendChar('.')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#17212B] font-bold transition-colors"
              >
                .
              </button>
              <button
                onClick={calculateResult}
                className="py-2.5 rounded-xl bg-[#168A5A] hover:bg-[#07583F] text-white font-bold transition-colors shadow-xs"
              >
                =
              </button>
              <button
                onClick={() => appendChar('+')}
                className="py-2.5 rounded-xl bg-[#EAF7F0] hover:bg-[#168A5A] hover:text-white text-[#168A5A] font-bold transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
