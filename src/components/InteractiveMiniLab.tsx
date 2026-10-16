import React, { useState, useEffect } from 'react';
import { FlaskConical, Play, Pause, RotateCcw, Sliders, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const InteractiveMiniLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'optics' | 'pendulum'>('optics');

  // Optics Simulation State
  const [incidentAngle, setIncidentAngle] = useState<number>(45); // degrees
  const [refractiveIndex, setRefractiveIndex] = useState<number>(1.52); // Glass crown

  // Pendulum Simulation State
  const [pendulumLength, setPendulumLength] = useState<number>(1.0); // meters
  const [gravity, setGravity] = useState<number>(9.8); // m/s^2 (Earth)
  const [isPlayingPendulum, setIsPlayingPendulum] = useState<boolean>(true);
  const [pendulumAngle, setPendulumAngle] = useState<number>(0);

  // Calculate Snell's Law: n1 * sin(i) = n2 * sin(r)
  // Air n1 = 1.00
  const iRad = (incidentAngle * Math.PI) / 180;
  const sinR = Math.sin(iRad) / refractiveIndex;
  const rRad = Math.asin(Math.min(1, Math.max(-1, sinR)));
  const refractedAngle = (rRad * 180) / Math.PI;

  // Dispersion deviations for Red and Violet
  const nRed = refractiveIndex - 0.02;
  const nViolet = refractiveIndex + 0.025;
  const rRed = (Math.asin(Math.min(1, Math.sin(iRad) / nRed)) * 180) / Math.PI;
  const rViolet = (Math.asin(Math.min(1, Math.sin(iRad) / nViolet)) * 180) / Math.PI;

  // Pendulum period T = 2 * PI * sqrt(L / g)
  const period = 2 * Math.PI * Math.sqrt(pendulumLength / gravity);
  const frequency = 1 / period;

  // Pendulum animation loop
  useEffect(() => {
    if (!isPlayingPendulum) return;
    let animationFrameId: number;
    let startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const theta = 30 * Math.cos((2 * Math.PI * elapsed) / period);
      setPendulumAngle(theta);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlayingPendulum, period]);

  return (
    <section id="interactive-lab" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold tracking-wider mb-3">
            <FlaskConical className="w-3.5 h-3.5 text-[#168A5A]" />
            <span>PHÒNG THÍ NGHIỆM ẢO TRỰC QUAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17212B] tracking-tight">
            Chạm vào Vật lý — Thử nghiệm tức thì
          </h2>
          <p className="text-sm sm:text-base text-[#5F6B66] mt-2">
            Không chỉ nhìn thấy con số, hãy thay đổi thông số và quan sát cách vũ trụ phản ứng ngay trước mắt bạn.
          </p>

          {/* Experiment Mode Selector Tabs */}
          <div className="inline-flex p-1 bg-[#F5FBF7] rounded-full border border-[#DDEAE3] mt-6">
            <button
              onClick={() => setActiveTab('optics')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                activeTab === 'optics'
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'text-[#5F6B66] hover:text-[#17212B]'
              }`}
            >
              🌈 Tán sắc ánh sáng & Định luật Snell
            </button>
            <button
              onClick={() => setActiveTab('pendulum')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                activeTab === 'pendulum'
                  ? 'bg-[#168A5A] text-white shadow-xs'
                  : 'text-[#5F6B66] hover:text-[#17212B]'
              }`}
            >
              ⏱️ Dao động điều hòa & Con lắc đơn
            </button>
          </div>
        </div>

        {/* Experiment Workstation Box */}
        <div className="bg-[#F5FBF7] border border-[#DDEAE3] rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs">
          {activeTab === 'optics' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Interactive Canvas View (Left) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDEAE3] p-5 sm:p-6 shadow-2xs relative min-h-[340px] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 500 320" className="w-full h-full max-h-[320px]" fill="none">
                  {/* Grid background */}
                  <pattern id="labGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F5FBF7" strokeWidth="1" />
                  </pattern>
                  <rect width="500" height="320" fill="url(#labGrid)" />

                  {/* Surface Normal Line (Pháp tuyến) */}
                  <line x1="250" y1="40" x2="250" y2="280" stroke="#5F6B66" strokeWidth="1.2" strokeDasharray="4 4" />
                  <text x="256" y="55" fill="#5F6B66" fontSize="10" fontWeight="bold">Pháp tuyến (N)</text>

                  {/* Glass Prism Interface boundary */}
                  <polygon
                    points="250,60 380,260 120,260"
                    fill="#EAF7F0"
                    fillOpacity="0.75"
                    stroke="#168A5A"
                    strokeWidth="2"
                  />
                  <text x="250" y="245" fill="#07583F" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Lăng kính (n = {refractiveIndex.toFixed(2)})
                  </text>

                  {/* Incoming Light Ray (Incident) */}
                  {(() => {
                    const length = 180;
                    const rayStartX = 250 - Math.sin(iRad) * length;
                    const rayStartY = 160 - Math.cos(iRad) * length;
                    return (
                      <g>
                        <line
                          x1={rayStartX}
                          y1={rayStartY}
                          x2="250"
                          y2="160"
                          stroke="#17212B"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        {/* Direction Arrow */}
                        <circle cx={(rayStartX + 250) / 2} cy={(rayStartY + 160) / 2} r="3" fill="#168A5A" />
                        <text x={rayStartX - 5} y={rayStartY - 5} fill="#17212B" fontSize="11" fontWeight="bold">
                          Tia tới (i = {incidentAngle}°)
                        </text>
                      </g>
                    );
                  })()}

                  {/* Dispersed Rays (Red, Green, Violet) */}
                  {(() => {
                    const rRedRad = (rRed * Math.PI) / 180;
                    const rVioletRad = (rViolet * Math.PI) / 180;
                    const rGreenRad = (refractedAngle * Math.PI) / 180;
                    const length = 190;

                    const redX = 250 + Math.sin(rRedRad) * length;
                    const redY = 160 + Math.cos(rRedRad) * length * 0.7;

                    const greenX = 250 + Math.sin(rGreenRad) * length;
                    const greenY = 160 + Math.cos(rGreenRad) * length * 0.7;

                    const violetX = 250 + Math.sin(rVioletRad) * length;
                    const violetY = 160 + Math.cos(rVioletRad) * length * 0.7;

                    return (
                      <g>
                        {/* Red beam */}
                        <line x1="250" y1="160" x2={redX} y2={redY} stroke="#EF4444" strokeWidth="2.5" />
                        <text x={redX + 6} y={redY} fill="#EF4444" fontSize="10" fontWeight="bold">Đỏ (λ = 760nm)</text>
                        {/* Green beam */}
                        <line x1="250" y1="160" x2={greenX} y2={greenY} stroke="#10B981" strokeWidth="2.5" />
                        {/* Violet beam */}
                        <line x1="250" y1="160" x2={violetX} y2={violetY} stroke="#8B5CF6" strokeWidth="2.5" />
                        <text x={violetX + 6} y={violetY + 12} fill="#8B5CF6" fontSize="10" fontWeight="bold">Tím (λ = 380nm)</text>
                      </g>
                    );
                  })()}
                </svg>

                {/* Live Formula Overlay Badge */}
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg border border-[#DDEAE3] shadow-xs text-xs font-mono text-[#07583F]">
                  n₁ · sin(i) = n₂ · sin(r)
                </div>
              </div>

              {/* Controls & Conceptual Explanation (Right) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#17212B]">
                    Điều chỉnh tia sáng & Môi trường
                  </h3>
                  <p className="text-xs text-[#5F6B66] mt-1">
                    Thay đổi góc tới hoặc chất liệu lăng kính để quan sát hiện tượng tán sắc ánh sáng.
                  </p>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  {/* Slider: Incident Angle */}
                  <div className="bg-white p-4 rounded-xl border border-[#DDEAE3]">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-[#17212B]">Góc tới (i)</span>
                      <span className="text-[#168A5A] font-mono text-sm">{incidentAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="75"
                      value={incidentAngle}
                      onChange={(e) => setIncidentAngle(Number(e.target.value))}
                      className="w-full accent-[#168A5A] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#5F6B66] mt-1">
                      <span>10°</span>
                      <span>45°</span>
                      <span>75°</span>
                    </div>
                  </div>

                  {/* Preset Medium Selection */}
                  <div className="bg-white p-4 rounded-xl border border-[#DDEAE3]">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-[#17212B]">Chất liệu lăng kính</span>
                      <span className="text-[#07583F] font-mono text-xs">n = {refractiveIndex}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Nước', n: 1.33 },
                        { label: 'Thủy tinh', n: 1.52 },
                        { label: 'Kim cương', n: 2.42 },
                      ].map((mat) => (
                        <button
                          key={mat.label}
                          onClick={() => setRefractiveIndex(mat.n)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                            refractiveIndex === mat.n
                              ? 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold'
                              : 'bg-white border-[#DDEAE3] text-[#5F6B66] hover:bg-[#F5FBF7]'
                          }`}
                        >
                          {mat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Physical Explanation Box */}
                <div className="p-4 rounded-xl bg-[#EAF7F0]/60 border border-[#168A5A]/30 text-xs text-[#17212B] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#07583F]">
                    <Sparkles className="w-3.5 h-3.5 text-[#168A5A]" />
                    <span>Bài học thực tế: Vì sao có cầu vồng?</span>
                  </div>
                  <p className="leading-relaxed text-[#5F6B66]">
                    Chiết suất của môi trường phụ thuộc vào bước sóng: ánh sáng tím có bước sóng ngắn nhất nên bị bẻ cong nhiều nhất (r ≈ {rViolet.toFixed(1)}°), ánh sáng đỏ bị bẻ cong ít nhất (r ≈ {rRed.toFixed(1)}°).
                  </p>
                </div>

              </div>

            </div>
          ) : (
            /* PENDULUM SIMULATION */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Pendulum Visual Stage (Left) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDEAE3] p-5 sm:p-6 shadow-2xs relative min-h-[340px] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 500 320" className="w-full h-full max-h-[320px]" fill="none">
                  {/* Grid background */}
                  <pattern id="penGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F5FBF7" strokeWidth="1" />
                  </pattern>
                  <rect width="500" height="320" fill="url(#penGrid)" />

                  {/* Ceiling support */}
                  <line x1="160" y1="30" x2="340" y2="30" stroke="#07583F" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="250" cy="30" r="5" fill="#168A5A" />

                  {/* Equilibrium vertical dashed line */}
                  <line x1="250" y1="30" x2="250" y2="280" stroke="#5F6B66" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="256" y="275" fill="#5F6B66" fontSize="10">Vị trí cân bằng (O)</text>

                  {/* Swinging Pendulum String & Bob */}
                  {(() => {
                    const visualLength = 70 + pendulumLength * 70; // mapped to pixels
                    const rad = (pendulumAngle * Math.PI) / 180;
                    const bobX = 250 + Math.sin(rad) * visualLength;
                    const bobY = 30 + Math.cos(rad) * visualLength;

                    return (
                      <g>
                        {/* Pendulum Trajectory Arc */}
                        <path
                          d={`M ${250 - Math.sin((30 * Math.PI) / 180) * visualLength} ${
                            30 + Math.cos((30 * Math.PI) / 180) * visualLength
                          } Q 250 ${30 + visualLength + 8} ${
                            250 + Math.sin((30 * Math.PI) / 180) * visualLength
                          } ${30 + Math.cos((30 * Math.PI) / 180) * visualLength}`}
                          stroke="#168A5A"
                          strokeWidth="1"
                          strokeDasharray="2 4"
                          opacity="0.4"
                        />
                        {/* String */}
                        <line x1="250" y1="30" x2={bobX} y2={bobY} stroke="#17212B" strokeWidth="2" />
                        {/* Bob */}
                        <circle cx={bobX} cy={bobY} r="16" fill="#168A5A" className="drop-shadow-sm" />
                        <circle cx={bobX - 4} cy={bobY - 4} r="4" fill="#86EFAC" />
                        {/* Angle Arc at top */}
                        <path
                          d="M 250 80 A 50 50 0 0 1 250 80"
                          stroke="#168A5A"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })()}
                </svg>

                {/* Live Formula Badge */}
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg border border-[#DDEAE3] shadow-xs text-xs font-mono text-[#07583F]">
                  T = 2π · √(L / g)
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlayingPendulum(!isPlayingPendulum)}
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-[#168A5A] text-white rounded-full text-xs font-semibold shadow-xs hover:bg-[#07583F] transition-colors"
                >
                  {isPlayingPendulum ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingPendulum ? 'Tạm dừng' : 'Chạy tiếp'}</span>
                </button>
              </div>

              {/* Controls & Metrics (Right) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#17212B]">
                    Thông số con lắc & Môi trường trọng lực
                  </h3>
                  <p className="text-xs text-[#5F6B66] mt-1">
                    Khám phá sự phụ thuộc của chu kỳ dao động vào chiều dài dây treo và gia tốc trọng trường.
                  </p>
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#DDEAE3]">
                    <span className="text-[11px] text-[#5F6B66] font-medium">Chu kỳ dao động (T)</span>
                    <p className="text-xl font-mono font-bold text-[#168A5A] mt-0.5">
                      {period.toFixed(2)} <span className="text-xs font-normal text-[#5F6B66]">giây</span>
                    </p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#DDEAE3]">
                    <span className="text-[11px] text-[#5F6B66] font-medium">Tần số (f)</span>
                    <p className="text-xl font-mono font-bold text-[#07583F] mt-0.5">
                      {frequency.toFixed(2)} <span className="text-xs font-normal text-[#5F6B66]">Hz</span>
                    </p>
                  </div>
                </div>

                {/* Slider: Length */}
                <div className="bg-white p-4 rounded-xl border border-[#DDEAE3]">
                  <div className="flex justify-between items-center text-xs font-semibold mb-2">
                    <span className="text-[#17212B]">Chiều dài dây (L)</span>
                    <span className="text-[#168A5A] font-mono text-sm">{pendulumLength.toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="2.5"
                    step="0.1"
                    value={pendulumLength}
                    onChange={(e) => setPendulumLength(Number(e.target.value))}
                    className="w-full accent-[#168A5A] cursor-pointer"
                  />
                </div>

                {/* Celestial Body Selector (Earth vs Moon vs Mars) */}
                <div className="bg-white p-4 rounded-xl border border-[#DDEAE3]">
                  <span className="text-xs font-semibold text-[#17212B] block mb-2">
                    Địa điểm thử nghiệm (Gia tốc g)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Trái Đất', g: 9.8 },
                      { label: 'Mặt Trăng', g: 1.62 },
                      { label: 'Sao Hỏa', g: 3.72 },
                    ].map((env) => (
                      <button
                        key={env.label}
                        onClick={() => setGravity(env.g)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                          gravity === env.g
                            ? 'bg-[#EAF7F0] border-[#168A5A] text-[#07583F] font-bold'
                            : 'bg-white border-[#DDEAE3] text-[#5F6B66] hover:bg-[#F5FBF7]'
                        }`}
                      >
                        {env.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
