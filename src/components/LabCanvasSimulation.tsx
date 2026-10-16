import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Info, CheckCircle2, HelpCircle } from 'lucide-react';
import { VirtualExperimentItem } from '../types';

interface LabCanvasSimulationProps {
  experiment: VirtualExperimentItem;
}

export const LabCanvasSimulation: React.FC<LabCanvasSimulationProps> = ({ experiment }) => {
  const [params, setParams] = useState<Record<string, number>>(experiment.defaultParams);
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory' | 'quiz'>('simulation');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Reset params when experiment changes
  useEffect(() => {
    setParams(experiment.defaultParams);
    setTime(0);
    setIsPlaying(true);
    setSelectedQuizOption(null);
    setShowQuizResult(false);
  }, [experiment.id]);

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        setTime((prev) => prev + dt);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleParamChange = (key: string, val: number) => {
    setParams((prev) => ({ ...prev, [key]: val }));
  };

  const resetParams = () => {
    setParams(experiment.defaultParams);
    setTime(0);
  };

  // Render specific canvas visualizer based on experiment.id
  const renderVisualizer = () => {
    switch (experiment.id) {
      case 'exp-spring-harmonic':
        return renderSpringSimulation();
      case 'exp-simple-pendulum':
        return renderPendulumSimulation();
      case 'exp-resonance':
        return renderResonanceSimulation();
      case 'exp-sound-frequency':
        return renderOscilloscopeSimulation();
      case 'exp-water-interference':
        return renderWaterInterferenceSimulation();
      case 'exp-standing-waves':
        return renderStandingWavesSimulation();
      case 'exp-electric-field-lines':
        return renderElectricFieldSimulation();
      case 'exp-capacitor-charge':
        return renderCapacitorSimulation();
      case 'exp-battery-internal-resistance':
        return renderBatteryExperimentSimulation();
      case 'exp-optics-prism':
      default:
        return renderPrismSimulation();
    }
  };

  // 1. SPRING SIMULATION
  const renderSpringSimulation = () => {
    const k = params.stiffness || 50;
    const m = params.mass || 0.2;
    const A = params.amplitude || 6; // cm

    const omega = Math.sqrt(k / m);
    const T = (2 * Math.PI) / omega;
    const f = 1 / T;
    const x = A * Math.cos(omega * time); // cm
    const v = -omega * A * Math.sin(omega * time); // cm/s
    const a = -omega * omega * x; // cm/s²

    // Energy calculations
    const E_total = 0.5 * k * Math.pow(A / 100, 2); // Joules
    const E_pot = 0.5 * k * Math.pow(x / 100, 2);
    const E_kin = Math.max(0, E_total - E_pot);

    // Canvas scaling
    const centerY = 160;
    const visualScale = 8; // pixels per cm
    const massY = centerY + x * visualScale;

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Physical View */}
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F] flex items-center justify-between">
            <span>Mô phỏng cơ học</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
              t = {time.toFixed(2)}s
            </span>
          </div>

          <svg className="w-full h-[240px]" viewBox="0 0 400 240">
            {/* Ceiling */}
            <line x1="80" y1="20" x2="240" y2="20" stroke="#17212B" strokeWidth="4" />
            {[...Array(9)].map((_, i) => (
              <line key={i} x1={90 + i * 16} y1="20" x2={80 + i * 16} y2="10" stroke="#5F6B66" strokeWidth="1.5" />
            ))}

            {/* Equilibrium Line */}
            <line x1="60" y1="120" x2="340" y2="120" stroke="#168A5A" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="260" y="115" fill="#168A5A" fontSize="11" fontWeight="600">VTCB (x = 0)</text>

            {/* +A and -A markers */}
            <line x1="60" y1={120 - A * visualScale} x2="240" y2={120 - A * visualScale} stroke="#99A8A0" strokeDasharray="2 2" />
            <text x="250" y={120 - A * visualScale + 4} fill="#5F6B66" fontSize="10">-A = -{A}cm</text>
            <line x1="60" y1={120 + A * visualScale} x2="240" y2={120 + A * visualScale} stroke="#99A8A0" strokeDasharray="2 2" />
            <text x="250" y={120 + A * visualScale + 4} fill="#5F6B66" fontSize="10">+A = +{A}cm</text>

            {/* Spring coils drawn parametrically */}
            {(() => {
              const startY = 20;
              const currentMassY = 120 + (x * visualScale) - 20;
              const coils = 12;
              const step = (currentMassY - startY) / coils;
              let path = `M 160 ${startY} `;
              for (let i = 1; i <= coils; i++) {
                const midY = startY + (i - 0.5) * step;
                const endY = startY + i * step;
                const offset = i % 2 === 0 ? 18 : -18;
                path += `Q ${160 + offset} ${midY}, 160 ${endY} `;
              }
              return <path d={path} fill="none" stroke="#17212B" strokeWidth="2.5" strokeLinecap="round" />;
            })()}

            {/* Weight block */}
            <rect
              x="130"
              y={120 + (x * visualScale) - 20}
              width="60"
              height="40"
              rx="6"
              fill="#168A5A"
              stroke="#07583F"
              strokeWidth="2"
            />
            <text
              x="160"
              y={120 + (x * visualScale) + 5}
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              {(m * 1000).toFixed(0)}g
            </text>

            {/* Velocity Vector Arrow */}
            {Math.abs(v) > 2 && (
              <g>
                <line
                  x1="205"
                  y1={120 + (x * visualScale)}
                  x2="205"
                  y2={120 + (x * visualScale) + (v * 0.4)}
                  stroke="#E05252"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-v)"
                />
                <text x="215" y={120 + (x * visualScale) + (v * 0.2)} fill="#E05252" fontSize="10" fontWeight="bold">
                  v
                </text>
              </g>
            )}
          </svg>

          {/* Realtime metric badges */}
          <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-[#DDEAE3] text-center text-xs">
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Li độ (x)</span>
              <span className="font-bold font-mono text-[#17212B]">{x.toFixed(2)} cm</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Vận tốc (v)</span>
              <span className="font-bold font-mono text-[#168A5A]">{(v / 100).toFixed(2)} m/s</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Gia tốc (a)</span>
              <span className="font-bold font-mono text-[#E05252]">{(a / 100).toFixed(2)} m/s²</span>
            </div>
          </div>
        </div>

        {/* Dynamic Graph & Energy Analysis */}
        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#17212B]">Đồ thị li độ - thời gian x(t)</span>
              <span className="text-[11px] text-[#07583F] font-mono bg-[#EAF7F0] px-2 py-0.5 rounded-full">
                T = {T.toFixed(3)}s · f = {f.toFixed(2)}Hz
              </span>
            </div>

            {/* SVG Graph */}
            <div className="h-[140px] bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] p-2 relative">
              <svg className="w-full h-full" viewBox="0 0 320 120">
                {/* Axes */}
                <line x1="20" y1="60" x2="310" y2="60" stroke="#99A8A0" strokeWidth="1" />
                <line x1="20" y1="10" x2="20" y2="110" stroke="#99A8A0" strokeWidth="1" />
                <text x="300" y="55" fill="#5F6B66" fontSize="9">t(s)</text>
                <text x="25" y="20" fill="#5F6B66" fontSize="9">x(cm)</text>

                {/* Sine curve over 2 periods */}
                {(() => {
                  let path = 'M 20 60 ';
                  const points = 100;
                  const duration = 2 * T;
                  for (let i = 0; i <= points; i++) {
                    const t_val = (i / points) * duration;
                    const x_pos = 20 + (i / points) * 280;
                    const x_val = A * Math.cos(omega * t_val);
                    const y_pos = 60 - (x_val / A) * 45;
                    path += `L ${x_pos} ${y_pos} `;
                  }
                  return <path d={path} fill="none" stroke="#168A5A" strokeWidth="2" />;
                })()}

                {/* Current time marker */}
                {(() => {
                  const currentModulo = (time % (2 * T)) / (2 * T);
                  const markerX = 20 + currentModulo * 280;
                  const currentY = 60 - (x / A) * 45;
                  return (
                    <g>
                      <line x1={markerX} y1="15" x2={markerX} y2="105" stroke="#E05252" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx={markerX} cy={currentY} r="4" fill="#E05252" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Realtime Energy Bars */}
          <div className="space-y-2 pt-2 border-t border-[#DDEAE3]">
            <span className="text-xs font-bold text-[#17212B] block">Bảo toàn năng lượng cơ học</span>
            <div>
              <div className="flex justify-between text-[10px] text-[#5F6B66] mb-1">
                <span>Động năng W_đ: {(E_kin * 1000).toFixed(1)} mJ</span>
                <span>Thế năng W_t: {(E_pot * 1000).toFixed(1)} mJ</span>
              </div>
              <div className="h-3 w-full bg-[#EAF7F0] rounded-full overflow-hidden flex">
                <div
                  className="bg-[#168A5A] transition-all duration-75"
                  style={{ width: `${(E_kin / (E_total || 0.0001)) * 100}%` }}
                  title="Động năng"
                />
                <div
                  className="bg-[#E6A23C] transition-all duration-75"
                  style={{ width: `${(E_pot / (E_total || 0.0001)) * 100}%` }}
                  title="Thế năng"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#07583F] mt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#168A5A]" /> Động năng W_đ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#E6A23C]" /> Thế năng W_t
                </span>
                <span className="font-bold">Cơ năng W = {(E_total * 1000).toFixed(1)} mJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. PENDULUM SIMULATION
  const renderPendulumSimulation = () => {
    const L = params.length || 1.0;
    const g = params.gravity || 9.8;
    const alpha0Deg = params.angle || 8;
    const alpha0Rad = (alpha0Deg * Math.PI) / 180;

    const omega = Math.sqrt(g / L);
    const T = (2 * Math.PI) / omega;
    const f = 1 / T;
    const alphaRad = alpha0Rad * Math.cos(omega * time);
    const alphaDeg = (alphaRad * 180) / Math.PI;

    // Center of pivot
    const pivotX = 180;
    const pivotY = 30;
    const visualLength = 160 * (L / 2.0) + 60; // Scale 60px - 220px
    const bobX = pivotX + visualLength * Math.sin(alphaRad);
    const bobY = pivotY + visualLength * Math.cos(alphaRad);

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F] flex items-center justify-between">
            <span>Con lắc đơn dao động góc nhỏ</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
              α = {alphaDeg.toFixed(1)}°
            </span>
          </div>

          <svg className="w-full h-[240px]" viewBox="0 0 360 240">
            {/* Pivot support */}
            <rect x={pivotX - 30} y="15" width="60" height="12" rx="2" fill="#17212B" />
            <circle cx={pivotX} cy={pivotY} r="4" fill="#07583F" />

            {/* Equilibrium dashed axis */}
            <line x1={pivotX} y1={pivotY} x2={pivotX} y2="230" stroke="#168A5A" strokeDasharray="3 3" />

            {/* String */}
            <line x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} stroke="#17212B" strokeWidth="2" />

            {/* Angle arc */}
            <path
              d={`M ${pivotX} 70 A 40 40 0 0 ${alphaRad > 0 ? 1 : 0} ${pivotX + 40 * Math.sin(alphaRad)} ${pivotY + 40 * Math.cos(alphaRad)}`}
              fill="none"
              stroke="#E05252"
              strokeWidth="1.5"
            />
            <text x={pivotX + 15} y="85" fill="#E05252" fontSize="10" fontWeight="bold">α</text>

            {/* Bob */}
            <circle cx={bobX} cy={bobY} r="14" fill="#168A5A" stroke="#07583F" strokeWidth="2.5" />
            <circle cx={bobX - 4} cy={bobY - 4} r="3" fill="#FFFFFF" opacity="0.6" />
          </svg>

          <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-[#DDEAE3] text-center text-xs">
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Chiều dài dây (L)</span>
              <span className="font-bold font-mono text-[#17212B]">{L.toFixed(1)} m</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Trọng trường (g)</span>
              <span className="font-bold font-mono text-[#168A5A]">{g.toFixed(1)} m/s²</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Chu kỳ riêng (T)</span>
              <span className="font-bold font-mono text-[#07583F]">{T.toFixed(3)} s</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Định luật con lắc đơn Huygens</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs">
              <div className="font-mono text-sm text-[#07583F] font-bold">
                T = 2π · √(L / g) = 2 · 3.1416 · √({L} / {g}) = {T.toFixed(3)} s
              </div>
              <p className="text-[#5F6B66]">
                Chu kỳ con lắc đơn chỉ phụ thuộc vào chiều dài dây L và gia tốc rơi tự do g; hoàn toàn không phụ thuộc khối lượng vật nặng m!
              </p>
            </div>

            {/* Quick gravity comparisons */}
            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-[#17212B] block">Thử nghiệm tại các thiên thể:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleParamChange('gravity', 9.8)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    g === 9.8 ? 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold' : 'bg-[#F5FBF7] border-[#DDEAE3]'
                  }`}
                >
                  <div>Trái Đất</div>
                  <span className="text-[10px] text-[#5F6B66]">9.8 m/s²</span>
                </button>
                <button
                  onClick={() => handleParamChange('gravity', 1.62)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    g === 1.62 ? 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold' : 'bg-[#F5FBF7] border-[#DDEAE3]'
                  }`}
                >
                  <div>Mặt Trăng</div>
                  <span className="text-[10px] text-[#5F6B66]">1.62 m/s²</span>
                </button>
                <button
                  onClick={() => handleParamChange('gravity', 3.7)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    g === 3.7 ? 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold' : 'bg-[#F5FBF7] border-[#DDEAE3]'
                  }`}
                >
                  <div>Sao Hoả</div>
                  <span className="text-[10px] text-[#5F6B66]">3.7 m/s²</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            <span className="font-bold block mb-0.5">💡 Lưu ý quan trọng:</span>
            Công thức điều hoà chỉ chính xác khi góc lệch ban đầu α₀ ≤ 10° (sin α ≈ α rad).
          </div>
        </div>
      </div>
    );
  };

  // 3. RESONANCE SIMULATION
  const renderResonanceSimulation = () => {
    const f_drive = params.forceFreq || 1.0;
    const f0 = params.systemFreq || 2.0;
    const b = params.damping || 0.15;

    // Amplitude response curve formula
    const calcAmp = (f_in: number) => {
      const denom = Math.sqrt(Math.pow(f0 * f0 - f_in * f_in, 2) + Math.pow(b * f_in, 2));
      return (1 / (denom || 0.001)) * 0.8;
    };

    const currentAmp = calcAmp(f_drive);
    const isCloseToResonance = Math.abs(f_drive - f0) < 0.15;

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Resonance Curve Graph */}
        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#17212B]">Đường cong cộng hưởng A(f)</span>
              {isCloseToResonance && (
                <span className="text-[10px] px-2 py-0.5 bg-[#E05252] text-white font-bold rounded-full animate-pulse">
                  ĐANG CỘNG HƯỞNG!
                </span>
              )}
            </div>

            <div className="h-[180px] bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] p-2 relative">
              <svg className="w-full h-full" viewBox="0 0 300 140">
                {/* Axes */}
                <line x1="25" y1="125" x2="290" y2="125" stroke="#99A8A0" strokeWidth="1" />
                <line x1="25" y1="15" x2="25" y2="125" stroke="#99A8A0" strokeWidth="1" />
                <text x="270" y="135" fill="#5F6B66" fontSize="9">f(Hz)</text>
                <text x="5" y="25" fill="#5F6B66" fontSize="9">A(cm)</text>

                {/* f0 vertical dashed line */}
                {(() => {
                  const f0X = 25 + (f0 / 4.0) * 250;
                  return (
                    <g>
                      <line x1={f0X} y1="20" x2={f0X} y2="125" stroke="#168A5A" strokeDasharray="3 3" strokeWidth="1.5" />
                      <text x={f0X - 12} y="136" fill="#168A5A" fontSize="9" fontWeight="bold">f₀ = {f0}Hz</text>
                    </g>
                  );
                })()}

                {/* Plot resonance curves */}
                {(() => {
                  let path = 'M ';
                  const steps = 60;
                  for (let i = 0; i <= steps; i++) {
                    const f_val = (i / steps) * 4.0;
                    const a_val = calcAmp(f_val);
                    const px = 25 + (f_val / 4.0) * 250;
                    const py = 125 - Math.min(105, a_val * 24);
                    if (i === 0) path += `${px} ${py} `;
                    else path += `L ${px} ${py} `;
                  }
                  return <path d={path} fill="none" stroke="#168A5A" strokeWidth="2.5" />;
                })()}

                {/* Current state marker */}
                {(() => {
                  const curX = 25 + (f_drive / 4.0) * 250;
                  const curY = 125 - Math.min(105, currentAmp * 24);
                  return (
                    <g>
                      <line x1={curX} y1="20" x2={curX} y2="125" stroke="#E05252" strokeWidth="1.5" strokeDasharray="2 2" />
                      <circle cx={curX} cy={curY} r="5" fill="#E05252" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x={curX - 15} y={curY - 8} fill="#E05252" fontSize="10" fontWeight="bold">
                        A = {currentAmp.toFixed(1)}cm
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] text-xs text-[#5F6B66]">
            Đỉnh nhọn cộng hưởng xảy ra khi tần số ngoại lực f = f₀ = {f0} Hz.
          </div>
        </div>

        {/* Physical Vibrating Structure */}
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F]">
            Mô phỏng dao động cơ học dưới ngoại lực
          </div>

          <div className="h-[200px] flex items-center justify-center relative">
            <svg className="w-[280px] h-[160px]" viewBox="0 0 280 160">
              {/* Foundation motor */}
              <rect x="40" y="60" width="40" height="40" rx="4" fill="#5F6B66" />
              <text x="60" y="85" fill="#FFFFFF" fontSize="9" textAnchor="middle">Motor f</text>

              {/* Connecting arm */}
              <line x1="80" y1="80" x2="140" y2="80" stroke="#17212B" strokeWidth="3" />

              {/* Resonating Body */}
              {(() => {
                const dynamicOffset = Math.min(60, currentAmp * 12) * Math.sin(2 * Math.PI * f_drive * time);
                return (
                  <g transform={`translate(${160 + dynamicOffset}, 50)`}>
                    <rect x="0" y="0" width="60" height="60" rx="8" fill={isCloseToResonance ? '#E05252' : '#168A5A'} />
                    <text x="30" y="35" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Hệ f₀
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="text-xs text-center font-mono text-[#07583F]">
            Biên độ rung thực tế: <span className="font-bold text-sm text-[#17212B]">{currentAmp.toFixed(2)} cm</span>
          </div>
        </div>
      </div>
    );
  };

  // 4. OSCILLOSCOPE SIMULATION
  const renderOscilloscopeSimulation = () => {
    const f = params.frequency || 440;
    const timeDiv = params.timeDiv || 0.5; // ms/div
    const T_ms = (1 / f) * 1000;
    const divisionsPerPeriod = T_ms / timeDiv;

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Cathode Ray Oscilloscope Screen */}
        <div className="w-full lg:w-1/2 h-[340px] bg-[#051C14] rounded-2xl border-4 border-[#17212B] p-4 flex flex-col justify-between shadow-inner">
          <div className="flex justify-between items-center text-[11px] font-mono text-[#4ADE80]">
            <span>OSCILLOSCOPE CH1</span>
            <span>TIME/DIV: {timeDiv} ms</span>
          </div>

          {/* Green Grid */}
          <div className="h-[220px] w-full relative overflow-hidden bg-[#03140E]">
            <svg className="w-full h-full" viewBox="0 0 320 200">
              {/* Grid 8x8 divisions */}
              {[...Array(9)].map((_, i) => (
                <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" stroke="#0E4A34" strokeWidth="1" />
              ))}
              {[...Array(6)].map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} stroke="#0E4A34" strokeWidth="1" />
              ))}
              {/* Center crosshair */}
              <line x1="160" y1="0" x2="160" y2="200" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="0" y1="100" x2="320" y2="100" stroke="#168A5A" strokeWidth="1.5" strokeDasharray="2 2" />

              {/* Sine Wave */}
              {(() => {
                let path = 'M ';
                const points = 160;
                // Pixels per period = divisionsPerPeriod * 40 px
                const pxPerPeriod = Math.max(10, divisionsPerPeriod * 40);
                const phaseOffset = (time * 50) % pxPerPeriod;

                for (let i = 0; i <= points; i++) {
                  const px = (i / points) * 320;
                  const py = 100 - 65 * Math.sin((2 * Math.PI * (px + phaseOffset)) / pxPerPeriod);
                  if (i === 0) path += `${px} ${py} `;
                  else path += `L ${px} ${py} `;
                }
                return (
                  <path
                    d={path}
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="2.5"
                    filter="drop-shadow(0 0 3px #4ADE80)"
                  />
                );
              })()}
            </svg>
          </div>

          <div className="text-[11px] font-mono text-[#4ADE80] flex justify-between">
            <span>T = {T_ms.toFixed(2)} ms</span>
            <span>f = {f} Hz</span>
          </div>
        </div>

        {/* Measurement and Sound Generator Controls */}
        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Phương pháp đọc dao động kí</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5F6B66]">Số ô ngang cho 1 chu kỳ (n):</span>
                <span className="font-bold text-[#17212B]">{divisionsPerPeriod.toFixed(2)} ô</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6B66]">Hệ số TIME/DIV:</span>
                <span className="font-bold text-[#17212B]">{timeDiv} ms / ô</span>
              </div>
              <div className="pt-1 border-t border-[#DDEAE3] font-mono text-[#07583F] font-bold">
                T = {divisionsPerPeriod.toFixed(2)} × {timeDiv} ms = {T_ms.toFixed(2)} ms &rarr; f = 1 / T = {f} Hz
              </div>
            </div>

            {/* Musical Presets */}
            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-[#17212B] block">Nốt âm thanh chuẩn:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { note: 'Đô (C4)', freq: 261 },
                  { note: 'Mi (E4)', freq: 329 },
                  { note: 'Sol (G4)', freq: 392 },
                  { note: 'La (A4)', freq: 440 }
                ].map((item) => (
                  <button
                    key={item.freq}
                    onClick={() => handleParamChange('frequency', item.freq)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      f === item.freq ? 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold' : 'bg-[#F5FBF7] border-[#DDEAE3]'
                    }`}
                  >
                    <div className="font-semibold">{item.note}</div>
                    <span className="text-[10px] text-[#5F6B66]">{item.freq}Hz</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Tần số âm chuẩn La A4 (440Hz) được dùng làm chuẩn lên dây cho dàn nhạc giao hưởng quốc tế.
          </div>
        </div>
      </div>
    );
  };

  // 5. WATER INTERFERENCE SIMULATION
  const renderWaterInterferenceSimulation = () => {
    const d = params.sourceDistance || 10; // cm
    const lambda = params.wavelength || 2.0; // cm
    const maxK = Math.floor(d / lambda);

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#EBF6F0] to-[#DCEDE3] rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between overflow-hidden relative">
          <div className="text-xs font-semibold text-[#07583F] flex justify-between items-center z-10">
            <span>Khay nước giao thoa 2 nguồn cùng pha</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
              λ = {lambda}cm
            </span>
          </div>

          {/* Ripple canvas simulation */}
          <div className="h-[230px] w-full flex items-center justify-center relative">
            <svg className="w-[300px] h-[220px]" viewBox="0 0 300 220">
              {/* Sources S1 and S2 */}
              <circle cx="100" cy="110" r="6" fill="#07583F" />
              <text x="95" y="130" fill="#07583F" fontSize="10" fontWeight="bold">S₁</text>

              <circle cx="200" cy="110" r="6" fill="#07583F" />
              <text x="195" y="130" fill="#07583F" fontSize="10" fontWeight="bold">S₂</text>

              {/* Source distance line */}
              <line x1="100" y1="110" x2="200" y2="110" stroke="#17212B" strokeWidth="1" strokeDasharray="3 3" />

              {/* Central Maximum line */}
              <line x1="150" y1="10" x2="150" y2="210" stroke="#168A5A" strokeWidth="2.5" />
              <text x="155" y="25" fill="#168A5A" fontSize="9" fontWeight="bold">k = 0</text>

              {/* Hyperbolic constructive crests (k = 1, 2) */}
              {[-2, -1, 1, 2].map((k_val) => {
                if (Math.abs(k_val) > maxK) return null;
                const path = `M 150 110 Q ${150 + k_val * 35} 50, ${150 + k_val * 70} 10 M 150 110 Q ${150 + k_val * 35} 170, ${150 + k_val * 70} 210`;
                return (
                  <path
                    key={k_val}
                    d={path}
                    fill="none"
                    stroke="#168A5A"
                    strokeWidth="1.8"
                    strokeDasharray={k_val > 0 ? undefined : undefined}
                  />
                );
              })}

              {/* Destructive destructive troughs (dashed lines) */}
              {[-1.5, -0.5, 0.5, 1.5].map((k_half) => {
                const path = `M 150 110 Q ${150 + k_half * 35} 50, ${150 + k_half * 70} 10 M 150 110 Q ${150 + k_half * 35} 170, ${150 + k_half * 70} 210`;
                return (
                  <path
                    key={k_half}
                    d={path}
                    fill="none"
                    stroke="#E05252"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#5F6B66] bg-white/80 p-2 rounded-xl border border-[#DDEAE3]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#168A5A] inline-block" /> Cực đại (d₂ - d₁ = kλ)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-1 border-t border-[#E05252] border-dashed inline-block" /> Cực tiểu (d₂ - d₁ = (k+0.5)λ)
            </span>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Tính toán số lượng vân giao thoa</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5F6B66]">Khoảng cách giữa hai nguồn S₁S₂:</span>
                <span className="font-bold font-mono">{d} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6B66]">Bước sóng λ:</span>
                <span className="font-bold font-mono">{lambda} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6B66]">Tỉ số S₁S₂ / λ:</span>
                <span className="font-bold font-mono text-[#07583F]">{(d / lambda).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#DDEAE3] flex justify-between font-bold">
                <span>Số điểm cực đại trên S₁S₂:</span>
                <span className="text-[#168A5A] text-sm">{2 * maxK + 1} điểm</span>
              </div>
            </div>

            <p className="text-xs text-[#5F6B66]">
              Khoảng cách giữa hai cực đại liên tiếp trên đoạn thẳng nối hai nguồn bằng đúng <strong className="text-[#07583F]">λ / 2 = {(lambda / 2).toFixed(2)} cm</strong>.
            </p>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Giao thoa ánh sáng trong thí nghiệm khe Young cũng tuân theo cùng nguyên lý sóng này!
          </div>
        </div>
      </div>
    );
  };

  // 6. STANDING WAVES SIMULATION
  const renderStandingWavesSimulation = () => {
    const L = params.wireLength || 1.2;
    const k_mode = params.harmonicMode || 3;
    const lambda = (2 * L) / k_mode;
    const numNodes = k_mode + 1;

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F] flex justify-between items-center">
            <span>Dây 2 đầu cố định</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
              k = {k_mode} bụng · {numNodes} nút
            </span>
          </div>

          {/* Vibrating String */}
          <div className="h-[200px] flex items-center justify-center">
            <svg className="w-full h-[160px]" viewBox="0 0 320 160">
              {/* Posts */}
              <rect x="15" y="40" width="10" height="80" rx="2" fill="#17212B" />
              <rect x="295" y="40" width="10" height="80" rx="2" fill="#17212B" />

              {/* Dynamic waveform */}
              {(() => {
                const points = 150;
                const width = 270;
                const phase = Math.sin(time * 8);

                let pathUpper = 'M 25 80 ';
                let pathLower = 'M 25 80 ';
                let pathActive = 'M 25 80 ';

                for (let i = 0; i <= points; i++) {
                  const px = 25 + (i / points) * width;
                  const envelope = 35 * Math.sin((k_mode * Math.PI * i) / points);
                  const pyActive = 80 - envelope * phase;
                  pathActive += `L ${px} ${pyActive} `;
                  pathUpper += `L ${px} ${80 - envelope} `;
                  pathLower += `L ${px} ${80 + envelope} `;
                }

                return (
                  <g>
                    {/* Ghost envelopes */}
                    <path d={pathUpper} fill="none" stroke="#DDEAE3" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d={pathLower} fill="none" stroke="#DDEAE3" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* Active vibrating line */}
                    <path d={pathActive} fill="none" stroke="#168A5A" strokeWidth="3" strokeLinecap="round" />
                  </g>
                );
              })()}

              {/* Nodes dots */}
              {[...Array(numNodes)].map((_, i) => {
                const nodeX = 25 + (i / k_mode) * 270;
                return (
                  <g key={i}>
                    <circle cx={nodeX} cy="80" r="4" fill="#E05252" />
                    <text x={nodeX - 4} y="98" fill="#E05252" fontSize="9" fontWeight="bold">N</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-[#DDEAE3] text-center text-xs">
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Chiều dài dây (L)</span>
              <span className="font-bold font-mono text-[#17212B]">{L} m</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Bước sóng (λ)</span>
              <span className="font-bold font-mono text-[#168A5A]">{lambda.toFixed(2)} m</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Khoảng cách 2 nút</span>
              <span className="font-bold font-mono text-[#07583F]">{(lambda / 2).toFixed(2)} m</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Công thức sóng dừng hai đầu cố định</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs">
              <div className="font-mono text-sm text-[#07583F] font-bold">
                L = k · (λ / 2) &rarr; λ = 2L / k = 2 · {L} / {k_mode} = {lambda.toFixed(2)} m
              </div>
              <ul className="space-y-1 text-[#5F6B66] list-disc list-inside text-xs">
                <li>Số bụng sóng trên dây = k = {k_mode} bụng.</li>
                <li>Số nút sóng trên dây = k + 1 = {numNodes} nút (kể cả 2 đầu cố định).</li>
                <li>Khoảng cách từ một nút đến một bụng kề cận là λ/4 = {(lambda / 4).toFixed(3)} m.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Đàn Guitar phát ra nốt trầm hay bổng dựa vào việc bấm ngón tay làm thay đổi chiều dài hữu hiệu L của dây!
          </div>
        </div>
      </div>
    );
  };

  // 7. ELECTRIC FIELD SIMULATION
  const renderElectricFieldSimulation = () => {
    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F] flex justify-between items-center">
            <span>Đường sức điện trường lưỡng cực (+ và -)</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
              Q = ±10 nC
            </span>
          </div>

          <div className="h-[230px] flex items-center justify-center">
            <svg className="w-[300px] h-[210px]" viewBox="0 0 300 210">
              {/* Field lines arches */}
              {[-60, -35, -15, 0, 15, 35, 60].map((offset, idx) => (
                <path
                  key={idx}
                  d={`M 90 105 Q 150 ${105 + offset * 2.2}, 210 105`}
                  fill="none"
                  stroke="#168A5A"
                  strokeWidth="1.5"
                  opacity={0.8}
                />
              ))}

              {/* Positive Charge */}
              <circle cx="90" cy="105" r="16" fill="#E05252" stroke="#B83838" strokeWidth="2" />
              <text x="90" y="110" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">+</text>

              {/* Negative Charge */}
              <circle cx="210" cy="105" r="16" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
              <text x="210" y="110" fill="#FFFFFF" fontSize="18" fontWeight="bold" textAnchor="middle">-</text>

              {/* Direction arrows */}
              <polygon points="152,73 145,68 145,78" fill="#168A5A" />
              <polygon points="152,105 145,101 145,109" fill="#168A5A" />
              <polygon points="152,137 145,132 145,142" fill="#168A5A" />
            </svg>
          </div>

          <div className="text-[11px] text-center text-[#5F6B66]">
            Đường sức điện xuất phát từ điện tích (+) và đi vào điện tích (-)
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Đặc điểm đường sức điện trường tĩnh</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs text-[#5F6B66]">
              <p>
                1. <strong>Không khép kín:</strong> Đi ra từ điện tích dương, đi vào điện tích âm (hoặc tận cùng ở vô cực).
              </p>
              <p>
                2. <strong>Không bao giờ cắt nhau:</strong> Tại mỗi điểm trong không gian chỉ có một vectơ cường độ điện trường E duy nhất.
              </p>
              <p>
                3. <strong>Mật độ đường sức:</strong> Nơi điện trường mạnh các đường sức vẽ sít nhau; nơi yếu vẽ thưa.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Điện trường đều xuất hiện ở khoảng giữa hai bản kim loại phẳng tích điện trái dấu đặt song song!
          </div>
        </div>
      </div>
    );
  };

  // 8. CAPACITOR SIMULATION
  const renderCapacitorSimulation = () => {
    const C = params.capacitance || 100; // µF
    const R = params.resistance || 10; // kΩ
    const U0 = params.voltageSource || 9; // V
    const tau = (R * 1000 * C * 1e-6); // tau in seconds = R * C

    // Charging curve
    const cycleTime = (time % 8); // 8s loop
    const isCharging = cycleTime < 4;
    const t_sub = isCharging ? cycleTime : cycleTime - 4;
    const u_cap = isCharging
      ? U0 * (1 - Math.exp(-t_sub / (tau || 0.1)))
      : U0 * Math.exp(-t_sub / (tau || 0.1));

    const i_mA = isCharging
      ? ((U0 - u_cap) / R)
      : (u_cap / R);

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F] flex justify-between items-center">
            <span>Mạch nạp / xả RC</span>
            <span className={`font-mono text-xs px-2 py-0.5 rounded-full font-bold ${isCharging ? 'bg-[#EAF7F0] text-[#168A5A]' : 'bg-[#FFF3E8] text-[#E6A23C]'}`}>
              {isCharging ? 'ĐANG NẠP ĐIỆN' : 'ĐANG PHÓNG ĐIỆN'}
            </span>
          </div>

          {/* Circuit schematic */}
          <div className="h-[210px] flex items-center justify-center">
            <svg className="w-[280px] h-[180px]" viewBox="0 0 280 180">
              {/* Battery */}
              <line x1="40" y1="90" x2="65" y2="90" stroke="#17212B" strokeWidth="2" />
              <line x1="65" y1="75" x2="65" y2="105" stroke="#E05252" strokeWidth="3" />
              <line x1="75" y1="80" x2="75" y2="100" stroke="#17212B" strokeWidth="2" />
              <text x="60" y="68" fill="#E05252" fontSize="9" fontWeight="bold">+ {U0}V</text>

              {/* Switch */}
              <line x1="75" y1="90" x2="110" y2="90" stroke="#17212B" strokeWidth="2" />
              <circle cx="110" cy="90" r="3" fill="#17212B" />
              <line
                x1="110"
                y1="90"
                x2={isCharging ? 135 : 135}
                y2={isCharging ? 90 : 50}
                stroke="#168A5A"
                strokeWidth="2.5"
              />
              <circle cx="140" cy="90" r="3" fill="#17212B" />

              {/* Resistor */}
              <rect x="150" y="82" width="40" height="16" fill="#F5FBF7" stroke="#17212B" strokeWidth="2" />
              <text x="170" y="94" fill="#17212B" fontSize="9" fontWeight="bold" textAnchor="middle">
                {R}kΩ
              </text>
              <line x1="140" y1="90" x2="150" y2="90" stroke="#17212B" strokeWidth="2" />
              <line x1="190" y1="90" x2="220" y2="90" stroke="#17212B" strokeWidth="2" />

              {/* Capacitor */}
              <line x1="220" y1="65" x2="220" y2="115" stroke="#168A5A" strokeWidth="3" />
              <line x1="228" y1="65" x2="228" y2="115" stroke="#168A5A" strokeWidth="3" />
              <text x="224" y="55" fill="#07583F" fontSize="9" fontWeight="bold" textAnchor="middle">
                {C}µF
              </text>

              {/* Return wire */}
              <line x1="228" y1="90" x2="250" y2="90" stroke="#17212B" strokeWidth="2" />
              <line x1="250" y1="90" x2="250" y2="150" stroke="#17212B" strokeWidth="2" />
              <line x1="250" y1="150" x2="40" y2="150" stroke="#17212B" strokeWidth="2" />
              <line x1="40" y1="150" x2="40" y2="90" stroke="#17212B" strokeWidth="2" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded-xl border border-[#DDEAE3] text-center text-xs">
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Điện áp trên tụ (U_c)</span>
              <span className="font-bold font-mono text-[#168A5A] text-sm">{u_cap.toFixed(2)} V</span>
            </div>
            <div>
              <span className="text-[#5F6B66] block text-[10px]">Dòng điện mạch (I)</span>
              <span className="font-bold font-mono text-[#E05252] text-sm">{i_mA.toFixed(3)} mA</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Hằng số thời gian mạch RC: τ = R · C</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs">
              <div className="font-mono text-[#07583F] font-bold">
                τ = ({R} × 10³ Ω) × ({C} × 10⁻⁶ F) = {tau.toFixed(2)} giây
              </div>
              <p className="text-[#5F6B66]">
                Sau thời gian t = τ, khi nạp điện áp đạt 63,2% U₀; khi phóng điện áp giảm còn 36,8% U₀.
              </p>
              <div className="pt-2 border-t border-[#DDEAE3] font-mono text-xs">
                Năng lượng dự trữ W = ½ C·U² = ½ · {C}·10⁻⁶ · ({u_cap.toFixed(1)})² = {(0.5 * C * 1e-6 * u_cap * u_cap * 1000).toFixed(2)} mJ.
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Tụ điện dùng trong mạch đèn flash máy ảnh tích luỹ năng lượng chậm qua điện trở rồi phóng điện chớp nhoáng trong 1/1000 giây!
          </div>
        </div>
      </div>
    );
  };

  // 9. BATTERY INTERNAL RESISTANCE EXPERIMENT
  const renderBatteryExperimentSimulation = () => {
    const E = params.emf || 1.5;
    const r = params.internalR || 0.6;
    const R = params.resistor || 5.0;

    const I = E / (R + r);
    const U = I * R;

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-gradient-to-b from-[#F5FBF7] to-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#07583F] flex justify-between items-center">
            <span>Sơ đồ mạch đo vôn - ampe</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#DDEAE3]">
              R = {R} Ω
            </span>
          </div>

          {/* Physical Meters */}
          <div className="h-[200px] flex items-center justify-around gap-4 px-4">
            {/* Voltmeter */}
            <div className="w-[120px] h-[130px] bg-[#17212B] rounded-xl p-2.5 flex flex-col justify-between text-center text-white shadow-md">
              <span className="text-[10px] text-[#99A8A0] font-bold">VÔN KẾ (V)</span>
              <div className="bg-[#051C14] text-[#4ADE80] font-mono text-xl py-2 rounded border border-[#0E4A34]">
                {U.toFixed(3)}
              </div>
              <span className="text-[9px] text-[#99A8A0]">Đo U hai cực pin</span>
            </div>

            {/* Ammeter */}
            <div className="w-[120px] h-[130px] bg-[#17212B] rounded-xl p-2.5 flex flex-col justify-between text-center text-white shadow-md">
              <span className="text-[10px] text-[#99A8A0] font-bold">AMPE KẾ (A)</span>
              <div className="bg-[#051C14] text-[#4ADE80] font-mono text-xl py-2 rounded border border-[#0E4A34]">
                {I.toFixed(3)}
              </div>
              <span className="text-[9px] text-[#99A8A0]">Đo dòng điện mạch I</span>
            </div>
          </div>

          <div className="text-xs text-center text-[#5F6B66] bg-white p-2 rounded-xl border border-[#DDEAE3]">
            Khi kéo con chạy biến trở R thay đổi, số chỉ U và I sẽ biến thiên theo đồ thị tuyến tính.
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[#17212B]">Đồ thị ngoại suy U = ℰ - I·r</span>
              <span className="text-[10px] text-[#07583F] font-mono bg-[#EAF7F0] px-2 py-0.5 rounded">
                ℰ = {E}V · r = {r}Ω
              </span>
            </div>

            {/* Graph U-I */}
            <div className="h-[170px] bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] p-2 relative">
              <svg className="w-full h-full" viewBox="0 0 280 140">
                <line x1="25" y1="120" x2="260" y2="120" stroke="#99A8A0" strokeWidth="1" />
                <line x1="25" y1="10" x2="25" y2="120" stroke="#99A8A0" strokeWidth="1" />
                <text x="245" y="132" fill="#5F6B66" fontSize="9">I(A)</text>
                <text x="8" y="18" fill="#5F6B66" fontSize="9">U(V)</text>

                {/* Theoretical straight line U = E - Ir */}
                {(() => {
                  const yIntercept = 120 - (E / 2.0) * 100;
                  const xIntercept = 25 + ((E / r) / 3.0) * 220;
                  return (
                    <g>
                      <line x1="25" y1={yIntercept} x2={Math.min(250, xIntercept)} y2="120" stroke="#168A5A" strokeWidth="2.5" />
                      <circle cx="25" cy={yIntercept} r="4" fill="#07583F" />
                      <text x="32" y={yIntercept + 4} fill="#07583F" fontSize="9" fontWeight="bold">ℰ={E}V</text>
                    </g>
                  );
                })()}

                {/* Current operating point */}
                {(() => {
                  const px = 25 + (I / 3.0) * 220;
                  const py = 120 - (U / 2.0) * 100;
                  return (
                    <g>
                      <line x1={px} y1="10" x2={px} y2="120" stroke="#E05252" strokeDasharray="2 2" />
                      <line x1="25" y1={py} x2={px} y2={py} stroke="#E05252" strokeDasharray="2 2" />
                      <circle cx={px} cy={py} r="5" fill="#E05252" stroke="#FFFFFF" strokeWidth="1.5" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Giao điểm của đường thẳng với trục tung khi I = 0 cho ta chính xác Suất điện động ℰ = {E} V.
          </div>
        </div>
      </div>
    );
  };

  // 10. PRISM DISPERSION SIMULATION
  const renderPrismSimulation = () => {
    const angle = params.incidentAngle || 45;
    const prismA = params.prismAngle || 60;

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-1/2 h-[340px] bg-[#0A1118] rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between overflow-hidden relative shadow-md">
          <div className="text-xs font-semibold text-[#DDEAE3] flex justify-between items-center z-10">
            <span>Tán sắc ánh sáng qua lăng kính thuỷ tinh</span>
            <span className="font-mono text-xs text-[#4ADE80]">i = {angle}°</span>
          </div>

          <div className="h-[230px] flex items-center justify-center">
            <svg className="w-[300px] h-[210px]" viewBox="0 0 300 210">
              {/* Prism Glass */}
              <polygon
                points="150,30 80,170 220,170"
                fill="rgba(255, 255, 255, 0.12)"
                stroke="#A7D7C5"
                strokeWidth="2"
              />

              {/* White light incident beam */}
              <line x1="20" y1="120" x2="105" y2="120" stroke="#FFFFFF" strokeWidth="4" />
              <text x="30" y="110" fill="#FFFFFF" fontSize="10" fontWeight="bold">Tia trắng</text>

              {/* Dispersion rays inside & exiting */}
              {/* Red (bị lệch ít nhất) */}
              <line x1="105" y1="120" x2="165" y2="125" stroke="#FF4D4D" strokeWidth="2" />
              <line x1="165" y1="125" x2="280" y2="140" stroke="#FF4D4D" strokeWidth="2.5" />
              <text x="285" y="143" fill="#FF4D4D" fontSize="9" fontWeight="bold">Đỏ</text>

              {/* Yellow */}
              <line x1="105" y1="120" x2="165" y2="128" stroke="#FFD166" strokeWidth="1.5" />
              <line x1="165" y1="128" x2="280" y2="155" stroke="#FFD166" strokeWidth="2" />

              {/* Green */}
              <line x1="105" y1="120" x2="165" y2="131" stroke="#06D6A0" strokeWidth="1.5" />
              <line x1="165" y1="131" x2="280" y2="170" stroke="#06D6A0" strokeWidth="2" />

              {/* Violet (bị lệch nhiều nhất) */}
              <line x1="105" y1="120" x2="165" y2="135" stroke="#A663CC" strokeWidth="2" />
              <line x1="165" y1="135" x2="280" y2="188" stroke="#A663CC" strokeWidth="2.5" />
              <text x="285" y="191" fill="#A663CC" fontSize="9" fontWeight="bold">Tím</text>
            </svg>
          </div>

          <div className="text-[11px] text-center text-[#99A8A0]">
            Chiết suất: n_đỏ &lt; n_cam &lt; n_vàng &lt; n_lục &lt; n_lam &lt; n_chàm &lt; n_tím
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[340px] bg-white rounded-2xl border border-[#DDEAE3] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#17212B]">Định luật tán sắc ánh sáng Isaac Newton</h4>
            <div className="p-3 bg-[#F5FBF7] rounded-xl border border-[#DDEAE3] space-y-2 text-xs">
              <p className="text-[#17212B]">
                Ánh sáng trắng là hỗn hợp của vô số ánh sáng đơn sắc có màu biến thiên liên tục từ đỏ đến tím.
              </p>
              <div className="font-mono text-xs text-[#07583F] font-bold">
                n₁ · sin(i) = n₂ · sin(r)
              </div>
              <p className="text-[#5F6B66]">
                Vì chiết suất của thuỷ tinh đối với tia tím lớn hơn tia đỏ (n_tím &gt; n_đỏ) nên góc khúc xạ r_tím &lt; r_đỏ, làm tia tím bị lệch nhiều nhất về phía đáy lăng kính.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#EAF7F0] rounded-xl text-xs text-[#07583F]">
            Hiện tượng tán sắc ánh sáng mặt trời qua các giọt nước mưa lơ lửng trong khí quyển tạo nên cầu vồng 7 sắc!
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-[#DDEAE3] shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-[#DDEAE3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F5FBF7]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 bg-[#EAF7F0] text-[#07583F] rounded-md border border-[#DDEAE3]">
              {experiment.chapterName}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#17212B]">
              {experiment.title}
            </h3>
          </div>
          <p className="text-xs text-[#5F6B66] mt-0.5">{experiment.tagline}</p>
        </div>

        {/* Tab switcher: Simulation / Theory / Quiz */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#DDEAE3]">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'simulation'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'text-[#5F6B66] hover:text-[#17212B]'
            }`}
          >
            Mô phỏng 3D
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'theory'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'text-[#5F6B66] hover:text-[#17212B]'
            }`}
          >
            Lý thuyết
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'quiz'
                ? 'bg-[#168A5A] text-white shadow-xs'
                : 'text-[#5F6B66] hover:text-[#17212B]'
            }`}
          >
            Câu hỏi nhanh
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            {/* Visualizer output */}
            {renderVisualizer()}

            {/* Interactive Parameter Controls Bar */}
            <div className="p-4 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#17212B] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#168A5A]" />
                  Bảng điều khiển thông số thí nghiệm
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                      isPlaying
                        ? 'bg-[#168A5A] text-white'
                        : 'bg-white text-[#17212B] border border-[#DDEAE3]'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Tạm dừng' : 'Tiếp tục'}</span>
                  </button>

                  <button
                    onClick={resetParams}
                    className="p-1.5 text-[#5F6B66] hover:text-[#17212B] bg-white rounded-lg border border-[#DDEAE3] transition-colors"
                    title="Đặt lại thông số mặc định"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {experiment.paramControls.map((ctrl) => {
                  const val = params[ctrl.key] ?? ctrl.defaultValue;
                  return (
                    <div key={ctrl.key} className="space-y-1.5 bg-white p-3 rounded-xl border border-[#DDEAE3]">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[#17212B]">{ctrl.label}</span>
                        <span className="font-mono font-bold text-[#168A5A]">
                          {val} {ctrl.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={ctrl.min}
                        max={ctrl.max}
                        step={ctrl.step}
                        value={val}
                        onChange={(e) => handleParamChange(ctrl.key, parseFloat(e.target.value))}
                        className="w-full accent-[#168A5A] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#99A8A0]">
                        <span>{ctrl.min}</span>
                        <span>{ctrl.max} {ctrl.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="p-4 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] space-y-2">
              <h4 className="text-sm font-bold text-[#17212B]">Mục tiêu thí nghiệm</h4>
              <p className="text-xs text-[#5F6B66] leading-relaxed">{experiment.target}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#DDEAE3] space-y-2">
              <h4 className="text-sm font-bold text-[#17212B]">Cơ sở lý thuyết & Công thức tính toán</h4>
              <p className="text-xs text-[#17212B] leading-relaxed">{experiment.theory}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {experiment.formulas.map((form, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-3 py-1 bg-[#EAF7F0] text-[#07583F] font-bold rounded-lg border border-[#DDEAE3]"
                  >
                    {form}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] space-y-2">
              <h4 className="text-sm font-bold text-[#17212B]">Kết luận khoa học rút ra</h4>
              <ul className="space-y-1.5 text-xs text-[#5F6B66]">
                {experiment.conclusions.map((conc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#168A5A] shrink-0 mt-0.5" />
                    <span>{conc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-xl mx-auto py-4 space-y-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#168A5A] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#07583F] uppercase tracking-wider block mb-1">
                  Kiểm tra nhanh mức độ hiểu bản chất
                </span>
                <h4 className="text-sm font-bold text-[#17212B]">
                  {experiment.quickQuiz.question}
                </h4>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {experiment.quickQuiz.options.map((opt, idx) => {
                let btnStyle = 'bg-[#F5FBF7] border-[#DDEAE3] text-[#17212B] hover:bg-[#EAF7F0]';
                if (showQuizResult) {
                  if (idx === experiment.quickQuiz.correctIndex) {
                    btnStyle = 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold ring-2 ring-[#168A5A]';
                  } else if (idx === selectedQuizOption) {
                    btnStyle = 'bg-[#FFF2F2] border-[#E05252] text-[#E05252]';
                  }
                } else if (selectedQuizOption === idx) {
                  btnStyle = 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!showQuizResult) {
                        setSelectedQuizOption(idx);
                        setShowQuizResult(true);
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showQuizResult && idx === experiment.quickQuiz.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-[#168A5A]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explanation */}
            {showQuizResult && (
              <div className="p-4 bg-[#F5FBF7] rounded-2xl border border-[#DDEAE3] space-y-2 animate-fadeIn">
                <span className="text-xs font-bold text-[#07583F] block">
                  {selectedQuizOption === experiment.quickQuiz.correctIndex ? '🎉 Chính xác!' : '💡 Giải thích chi tiết:'}
                </span>
                <p className="text-xs text-[#5F6B66] leading-relaxed">
                  {experiment.quickQuiz.explanation}
                </p>
                <button
                  onClick={() => {
                    setSelectedQuizOption(null);
                    setShowQuizResult(false);
                  }}
                  className="mt-2 text-xs font-bold text-[#168A5A] hover:underline"
                >
                  Làm lại câu hỏi
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
