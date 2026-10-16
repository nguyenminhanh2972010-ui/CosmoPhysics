import React, { useState } from 'react';
import { Target, Compass, CheckCircle2, ChevronDown, ChevronUp, Bot, Sparkles, BookOpen } from 'lucide-react';
import { FormattedPhysicsResponse } from '../components/FormattedPhysicsResponse';

interface PracticeExercise {
  id: string;
  chapter: string;
  title: string;
  problemStatement: string;
  stepByStepSolution: {
    step1: string; // Tóm tắt
    step2: string; // Xác định đại lượng cần tìm
    step3: string; // Chọn định luật / công thức
    step4: string; // Giải thích vì sao sử dụng
    step5: string; // Biến đổi công thức
    step6: string; // Thay số & tính toán
    step7: string; // Kiểm tra đơn vị & tính hợp lý
    step8: string; // Kết luận
  };
}

const PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: 'ex-1',
    chapter: 'Chương I: Dao động',
    title: 'Bài tập 1: Tính chu kỳ và cơ năng con lắc lò xo',
    problemStatement: 'Một con lắc lò xo gồm lò xo nhẹ có độ cứng $k = 100\\,\\text{N/m}$ và vật nhỏ có khối lượng $m = 250\\,\\text{g}$. Kích thích cho vật dao động điều hoà với biên độ $A = 4\\,\\text{cm}$. Lấy $\\pi^2 \\approx 10$. Tính chu kỳ dao động $T$ và cơ năng $W$ của con lắc lò xo.',
    stepByStepSolution: {
      step1: 'Khối lượng: $m = 250\\,\\text{g} = 0.25\\,\\text{kg}$.\nĐộ cứng lò xo: $k = 100\\,\\text{N/m}$.\nBiên độ: $A = 4\\,\\text{cm} = 0.04\\,\\text{m}$.\n$\\pi^2 \\approx 10 \\Rightarrow \\pi \\approx \\sqrt{10}$.',
      step2: '1. Chu kỳ dao động của con lắc $T$ (đơn vị: $\\text{s}$).\n2. Cơ năng của con lắc dao động $W$ (đơn vị: $\\text{J}$).',
      step3: '- Chu kỳ con lắc lò xo: $$T = 2\\pi\\sqrt{\\frac{m}{k}}$$\n- Cơ năng dao động: $$W = \\frac{1}{2}kA^2$$',
      step4: 'Bỏ qua mọi lực cản và ma sát của môi trường nên dao động của con lắc lò xo là dao động điều hòa tự do, cơ năng được bảo toàn hoàn toàn.',
      step5: '- Rút biểu thức tính $T$ theo $m$ và $k$.\n- Rút biểu thức tính $W$ trực tiếp theo $k$ và $A$.',
      step6: '- Tính chu kỳ $T$:\n$$T = 2\\pi\\sqrt{\\frac{0.25}{100}} = 2\\pi\\sqrt{\\frac{1}{400}} = 2\\pi \\cdot \\frac{1}{20} = \\frac{\\pi}{10} \\approx \\frac{3.16}{10} = 0.316\\,\\text{s} \\approx 0.314\\,\\text{s}$$\n- Tính cơ năng $W$:\n$$W = \\frac{1}{2} \\cdot 100 \\cdot (0.04)^2 = 50 \\cdot 0.0016 = 0.08\\,\\text{J}$$',
      step7: '- Chu kỳ có thứ nguyên thời gian (giây $\\text{s}$), giá trị dương hợp lý với dao động cơ học nhanh.\n- Cơ năng đo bằng jun ($\\text{J}$), giá trị $0.08\\,\\text{J} = 80\\,\\text{mJ}$ phù hợp với hệ dao động nhỏ trong phòng thí nghiệm.',
      step8: 'Chu kỳ dao động của con lắc lò xo là $T \\approx 0.314\\,\\text{s}$ và cơ năng của hệ là $W = 0.08\\,\\text{J}$.'
    }
  },
  {
    id: 'ex-2',
    chapter: 'Chương II: Sóng',
    title: 'Bài tập 2: Xác định vị trí cực đại và cực tiểu trong giao thoa sóng nước',
    problemStatement: 'Trong một thí nghiệm giao thoa sóng nước với hai nguồn kết hợp cùng pha $S_1, S_2$ cách nhau $12\\,\\text{cm}$, tần số sóng $f = 20\\,\\text{Hz}$. Tốc độ truyền sóng trên mặt nước là $v = 40\\,\\text{cm/s}$. Điểm $M$ trên mặt nước cách $S_1$ một đoạn $d_1 = 15\\,\\text{cm}$ và cách $S_2$ đoạn $d_2 = 19\\,\\text{cm}$ dao động với biên độ cực đại hay cực tiểu?',
    stepByStepSolution: {
      step1: 'Tần số nguồn: $f = 20\\,\\text{Hz}$.\nTốc độ truyền sóng: $v = 40\\,\\text{cm/s}$.\nKhoảng cách hai nguồn: $S_1S_2 = 12\\,\\text{cm}$.\nKhoảng cách đến điểm $M$: $d_1 = 15\\,\\text{cm}, d_2 = 19\\,\\text{cm}$.\nHai nguồn đồng pha: $\\Delta\\varphi = 0$.',
      step2: 'Xác định trạng thái dao động tại điểm $M$ (cực đại hay cực tiểu giao thoa, thuộc vân thứ mấy).',
      step3: '- Bước sóng: $$\\lambda = \\frac{v}{f}$$\n- Hiệu quang trình: $$\\Delta d = d_2 - d_1$$\n- Điều kiện cực đại: $d_2 - d_1 = k\\lambda$\n- Điều kiện cực tiểu: $d_2 - d_1 = (k + 0.5)\\lambda$',
      step4: 'Hai nguồn kết hợp cùng pha nên tại những điểm có hiệu đường đi bằng một số nguyên lần bước sóng hai sóng tới cùng pha tăng cường nhau; bằng một số nửa nguyên lần bước sóng hai sóng tới ngược pha triệt tiêu nhau.',
      step5: 'Tính tỉ số $k = \\dfrac{d_2 - d_1}{\\lambda}$, nếu $k \\in \\mathbb{Z}$ thì cực đại; nếu $k = m + 0.5$ ($m \\in \\mathbb{Z}$) thì cực tiểu.',
      step6: '- Bước sóng:\n$$\\lambda = \\frac{40}{20} = 2\\,\\text{cm}$$\n- Hiệu đường đi:\n$$\\Delta d = d_2 - d_1 = 19 - 15 = 4\\,\\text{cm}$$\n- Xét tỉ số:\n$$\\frac{\\Delta d}{\\lambda} = \\frac{4}{2} = 2 \\quad (k = 2 \\in \\mathbb{Z})$$',
      step7: 'Tỉ số ra số nguyên chẵn dương $k = 2$, bước sóng $\\lambda = 2\\,\\text{cm}$ nhỏ hơn khoảng cách hai nguồn ($12\\,\\text{cm}$) nên nằm trong vùng trường giao thoa thực.',
      step8: 'Điểm $M$ dao động với biên độ cực đại, nằm trên vân cực đại bậc 2 ($k = 2$).'
    }
  },
  {
    id: 'ex-3',
    chapter: 'Chương III: Điện trường',
    title: 'Bài tập 3: Tính lực tương tác tĩnh điện Coulomb giữa hai điện tích điểm',
    problemStatement: 'Hai điện tích điểm $q_1 = 2\\cdot 10^{-8}\\,\\text{C}$ và $q_2 = -4\\cdot 10^{-8}\\,\\text{C}$ đặt cách nhau một khoảng $r = 6\\,\\text{cm}$ trong không khí. Xác định độ lớn và phương chiều của lực tĩnh điện tương tác giữa chúng.',
    stepByStepSolution: {
      step1: 'Điện tích $q_1 = 2\\cdot 10^{-8}\\,\\text{C}$.\nĐiện tích $q_2 = -4\\cdot 10^{-8}\\,\\text{C}$.\nKhoảng cách: $r = 6\\,\\text{cm} = 0.06\\,\\text{m}$.\nMôi trường không khí: hằng số điện môi $\\varepsilon \\approx 1$.\nHằng số Coulomb: $k = 9\\cdot 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2$.',
      step2: '1. Phương và chiều của lực tương tác tĩnh điện $\\vec{F}_{12}, \\vec{F}_{21}$.\n2. Độ lớn của lực tĩnh điện $F$.',
      step3: 'Định luật Coulomb:\n$$F = k \\cdot \\frac{|q_1 \\cdot q_2|}{\\varepsilon \\cdot r^2}$$',
      step4: 'Hai điện tích được coi là các điện tích điểm đứng yên trong điện môi đồng tính không khí nên tuân theo định luật tĩnh điện Coulomb.',
      step5: 'Áp dụng trực tiếp công thức định luật Coulomb, lấy trị tuyệt đối tích hai điện tích.',
      step6: '$$F = 9\\cdot 10^9 \\cdot \\frac{|(2\\cdot 10^{-8}) \\cdot (-4\\cdot 10^{-8})|}{1 \\cdot (0.06)^2}$$\n$$F = 9\\cdot 10^9 \\cdot \\frac{8\\cdot 10^{-16}}{0.0036} = \\frac{7.2\\cdot 10^{-6}}{3.6\\cdot 10^{-3}} = 2\\cdot 10^{-3}\\,\\text{N} = 2\\,\\text{mN}$$',
      step7: 'Lực có đơn vị Niu-tơn ($\text{N}$), giá trị dương $2\\cdot 10^{-3}\\,\\text{N}$ hoàn toàn phù hợp với bậc lực tĩnh điện giữa các điện tích nC.',
      step8: 'Vì $q_1 > 0$ và $q_2 < 0$ (trái dấu) nên lực tương tác là lực hút, nằm trên đường thẳng nối hai điện tích, hướng về phía nhau với độ lớn $F = 2\\cdot 10^{-3}\\,\\text{N}$.'
    }
  }
];

export const ExercisesPage: React.FC = () => {
  const [expandedExerciseId, setExpandedExerciseId] = useState<string>('ex-1');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<string>('all');

  const filtered = selectedChapterFilter === 'all'
    ? PRACTICE_EXERCISES
    : PRACTICE_EXERCISES.filter((e) => e.chapter.includes(selectedChapterFilter));

  return (
    <div className="py-8 sm:py-12 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5 text-[#168A5A]" />
            <span>LUYỆN TẬP & PHƯƠNG PHÁP GIẢI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Bài tập Chọn lọc & Lời giải 8 Bước
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B66] mt-1.5 max-w-2xl leading-relaxed">
            Học phương pháp tư duy bài bản: Tóm tắt giả thiết, xác định đại lượng, biến đổi công thức và kiểm tra đơn vị trước khi kết luận.
          </p>
        </div>

        {/* 8-Step Pedagogical Framework Banner */}
        <div className="p-6 bg-[#F5FBF7] rounded-3xl border border-[#DDEAE3] mb-10 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#168A5A]" />
            <h2 className="text-base sm:text-lg font-bold text-[#07583F]">
              Quy trình 8 bước gợi ý của COSMOPHYSIC khi giải bài toán định lượng
            </h2>
          </div>
          <p className="text-xs text-[#5F6B66] leading-relaxed">
            *(Khung phương pháp sư phạm do COSMOPHYSIC xây dựng nhằm giúp học sinh giải bài bản, không bỏ sót giả thiết; các định luật và công thức đều tuân thủ chính xác chuẩn SGK Vật Lí 11).*
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">1. Tóm tắt</span>
              <span className="text-[#5F6B66]">Đổi hết dữ kiện đề bài cho sang đơn vị chuẩn SI (m, s, kg, A, V, C).</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">2. Mục tiêu tìm</span>
              <span className="text-[#5F6B66]">Xác định rõ ràng đại lượng cần tìm kèm ký hiệu và đơn vị tương ứng.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">3. Chọn định luật</span>
              <span className="text-[#5F6B66]">Lựa chọn công thức định nghĩa, định luật bảo toàn hoặc định luật thực nghiệm.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">4. Bản chất vật lí</span>
              <span className="text-[#5F6B66]">Giải thích lý do áp dụng công thức và các điều kiện giới hạn thỏa mãn.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">5. Biến đổi</span>
              <span className="text-[#5F6B66]">Rút đại lượng cần tìm sang một vế phương trình trước khi thế số.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">6. Thay số</span>
              <span className="text-[#5F6B66]">Bấm máy tính cẩn thận, chú ý số mũ $10^n$, căn thức và góc lượng giác.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">7. Kiểm tra đơn vị</span>
              <span className="text-[#5F6B66]">Đối chiếu thứ nguyên đơn vị và tính hợp lý vật lí của kết quả.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
              <span className="font-bold text-[#168A5A] block mb-1">8. Kết luận</span>
              <span className="text-[#5F6B66]">Viết câu trả lời rõ ràng kèm ý nghĩa hoặc chiều chuyển động thực tế.</span>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          <div className="text-xs font-bold text-[#17212B] uppercase tracking-wider">
            BÀI TẬP MẪU THEO QUY TRÌNH 8 BƯỚC ({filtered.length})
          </div>

          {filtered.map((item) => {
            const isExpanded = expandedExerciseId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#DDEAE3] shadow-xs overflow-hidden"
              >
                {/* Exercise Header */}
                <div
                  onClick={() => setExpandedExerciseId(isExpanded ? '' : item.id)}
                  className="p-5 sm:p-6 bg-white hover:bg-[#F5FBF7] transition-colors cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#168A5A] bg-[#EAF7F0] px-2.5 py-0.5 rounded-full border border-[#DDEAE3]">
                      {item.chapter}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#17212B] mt-1">
                      {item.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-[#5F6B66] leading-relaxed pt-1">
                      <FormattedPhysicsResponse content={item.problemStatement} />
                    </div>
                  </div>

                  <div className="p-2 text-[#168A5A] bg-[#EAF7F0] rounded-xl shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* 8-Step Revealed Solution Accordion */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#F5FBF7]/60 border-t border-[#DDEAE3] space-y-4 text-xs sm:text-sm">
                    <div className="text-xs font-bold text-[#07583F] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-[#DDEAE3]">
                      <Sparkles className="w-4 h-4 text-[#168A5A]" />
                      <span>Lời giải chi tiết từng bước</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 1 — Tóm tắt dữ kiện:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step1} />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 2 — Xác định đại lượng cần tìm:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step2} />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 3 — Chọn định luật & Công thức:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step3} />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 4 — Giải thích vì sao dùng công thức:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step4} />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 5 — Biến đổi công thức:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step5} />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 6 — Thay số & Tính toán:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step6} />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#DDEAE3]">
                        <span className="font-bold text-[#168A5A] block mb-1">Bước 7 — Kiểm tra đơn vị & Tính hợp lý:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step7} />
                      </div>

                      <div className="p-3.5 bg-[#EAF7F0] rounded-xl border border-[#168A5A]/30">
                        <span className="font-bold text-[#07583F] block mb-1">Bước 8 — Kết luận:</span>
                        <FormattedPhysicsResponse content={item.stepByStepSolution.step8} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
