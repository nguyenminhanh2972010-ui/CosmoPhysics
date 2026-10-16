import { PhysicsTopicItem, LessonItem } from '../types';

export const GRADE_11_CHAPTERS: PhysicsTopicItem[] = [
  {
    id: 'chapter-1',
    chapterNumber: 1,
    title: 'Chương I: Dao động',
    subtitle: 'Dao động điều hoà · Vận tốc & Gia tốc · Năng lượng · Cộng hưởng',
    grade: '11',
    lessonCount: 7,
    keyConcepts: [
      'Dao động điều hoà & Phương trình x = A·cos(ωt + φ)',
      'Vận tốc v và gia tốc a vuông pha / ngược pha',
      'Động năng, Thế năng & Bảo toàn cơ năng E = ½ m·ω²·A²',
      'Dao động tắt dần, Dao động cưỡng bức & Hiện tượng cộng hưởng'
    ],
    visualType: 'oscillations',
    summary: 'Nghiên cứu chuyển động lặp đi lặp lại quanh vị trí cân bằng bền. Nền tảng trực tiếp để giải thích các cơ cấu đồng hồ quả lắc, hệ thống giảm xóc xe máy, dao động nhà cao tầng trong gió và bản chất tạo sóng.',
    formulas: [
      { formula: 'x = A·cos(ωt + φ)', meaning: 'Phương trình li độ dao động điều hoà' },
      { formula: 'v = -ωA·sin(ωt + φ)', meaning: 'Vận tốc dao động điều hoà (sớm pha π/2 so với li độ)' },
      { formula: 'a = -ω²x', meaning: 'Gia tốc tỉ lệ và ngược dấu với li độ (hướng về VTCB)' },
      { formula: 'W = ½ m·ω²·A² = ½ k·A²', meaning: 'Cơ năng bảo toàn trong dao động điều hoà' }
    ],
    interactiveDemoId: 'exp-spring-harmonic'
  },
  {
    id: 'chapter-2',
    chapterNumber: 2,
    title: 'Chương II: Sóng',
    subtitle: 'Mô tả sóng · Sóng âm · Sóng điện từ · Giao thoa & Sóng dừng',
    grade: '11',
    lessonCount: 8,
    keyConcepts: [
      'Bản chất sóng: Quá trình lan truyền dao động và năng lượng',
      'Phân biệt Sóng ngang (phương dao động ⊥ phương truyền) & Sóng dọc (//)',
      'Đặc trưng sóng: Bước sóng λ = v·T = v/f, chu kỳ T, tần số f',
      'Thực hành đo tần số sóng âm & tốc độ truyền âm',
      'Giao thoa sóng: Điều kiện 2 nguồn kết hợp, cực đại Δd = kλ, cực tiểu Δd = (k + 0.5)λ',
      'Sóng dừng trên dây: Bụng sóng, nút sóng, điều kiện hai đầu cố định L = k·λ/2'
    ],
    visualType: 'waves',
    summary: 'Giải thích sự lan truyền năng lượng trong không gian mà không truyền vật chất: từ tiếng nói truyền qua không khí, sóng biển vỗ bờ, đến sóng vô tuyến Wi-Fi và ánh sáng mang màu sắc của vũ trụ.',
    formulas: [
      { formula: 'λ = v·T = v / f', meaning: 'Mối liên hệ giữa bước sóng λ, tốc độ truyền sóng v và tần số f' },
      { formula: 'd₂ - d₁ = k·λ', meaning: 'Vị trí cực đại giao thoa của 2 nguồn cùng pha' },
      { formula: 'd₂ - d₁ = (k + ½)·λ', meaning: 'Vị trí cực tiểu giao thoa của 2 nguồn cùng pha' },
      { formula: 'L = k · (λ / 2)', meaning: 'Điều kiện có sóng dừng trên dây với 2 đầu cố định' }
    ],
    interactiveDemoId: 'exp-water-interference'
  },
  {
    id: 'chapter-3',
    chapterNumber: 3,
    title: 'Chương III: Điện trường',
    subtitle: 'Lực Coulomb · Cường độ điện trường · Thế năng điện · Tụ điện',
    grade: '11',
    lessonCount: 6,
    keyConcepts: [
      'Định luật Coulomb về tương tác tĩnh điện giữa 2 điện tích điểm',
      'Điện trường E = F/q và đường sức điện xuất phát từ điện tích (+)',
      'Điện trường đều giữa 2 bản kim loại phẳng tích điện trái dấu (E = U/d)',
      'Công của lực điện trường không phụ thuộc hình dạng đường đi: A = q·E·d',
      'Điện thế V và Hiệu điện thế U_AB = V_A - V_B = A_AB / q',
      'Tụ điện: Điện dung C = Q/U và Năng lượng điện trường W = ½ C·U²'
    ],
    visualType: 'electric-field',
    summary: 'Thế giới vô hình của các điện tích đứng yên: lực hút đẩy giữa các nguyên tử, cách tia sét phóng điện qua khí quyển, cơ chế hoạt động của màn hình cảm ứng điện dung và thiết bị lưu trữ năng lượng tức thời.',
    formulas: [
      { formula: 'F = k · |q₁·q₂| / (ε · r²)', meaning: 'Định luật Coulomb (k = 9·10⁹ N·m²/C²)' },
      { formula: 'E = F / q = k · |Q| / (ε · r²)', meaning: 'Cường độ điện trường do điện tích điểm Q gây ra' },
      { formula: 'A = q·E·d = q·U', meaning: 'Công của lực điện trường dịch chuyển điện tích' },
      { formula: 'C = Q / U ; W = ½ C·U²', meaning: 'Điện dung tụ điện & Năng lượng điện trường' }
    ],
    interactiveDemoId: 'exp-electric-field-lines'
  },
  {
    id: 'chapter-4',
    chapterNumber: 4,
    title: 'Chương IV: Dòng điện. Mạch điện',
    subtitle: 'Cường độ dòng điện · Điện trở · Định luật Ohm · Nguồn điện & Công suất',
    grade: '11',
    lessonCount: 5,
    keyConcepts: [
      'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện tích',
      'Tốc độ dịch chuyển có hướng v của electron trong dây dẫn kim loại (I = n·S·e·v)',
      'Định luật Ohm cho đoạn mạch: I = U / R và điện trở phụ thuộc nhiệt độ',
      'Nguồn điện: Suất điện động E và điện trở trong r (U = E - I·r)',
      'Năng lượng và Công suất điện: Định luật Joule - Lenz Q = R·I²·t, P = U·I',
      'Thực hành đo suất điện động E và điện trở trong r của pin hoá học'
    ],
    visualType: 'circuits',
    summary: 'Nền tảng của toàn bộ nền văn minh công nghệ: từ dòng electron chạy qua vi xử lý máy tính, acquy xe điện, lưới điện quốc gia đến phương pháp đo lường kiểm thử mạch điện trong phòng thí nghiệm.',
    formulas: [
      { formula: 'I = q / t ; I = n · S · e · v', meaning: 'Cường độ dòng điện và tốc độ trôi của electron' },
      { formula: 'I = U / R', meaning: 'Định luật Ohm cho đoạn mạch thuần điện trở' },
      { formula: 'I = ℰ / (R_ngoài + r)', meaning: 'Định luật Ohm cho toàn mạch kín' },
      { formula: 'P = U · I = R · I² ; A = ℰ · I · t', meaning: 'Công suất tiêu thụ & Công của lực lạ trong nguồn' }
    ],
    interactiveDemoId: 'exp-battery-internal-resistance'
  }
];

export const GRADE_11_LESSONS: LessonItem[] = [
  // --- CHƯƠNG I: DAO ĐỘNG ---
  {
    id: 'bai-1',
    lessonNumber: 1,
    chapterId: 'chapter-1',
    chapterTitle: 'Chương I: Dao động',
    title: 'Bài 1: Dao động điều hoà',
    subtitle: 'Khái niệm dao động cơ · Dao động tuần hoàn · Li độ & Biên độ',
    pageRange: 'Trang 5 - 10',
    quickGrasp: 'Dao động điều hoà là dao động mà li độ của vật là một hàm côsin (hoặc sin) theo thời gian. Vật qua lại quanh vị trí cân bằng với biên độ không đổi.',
    realLifePhenomenon: 'Chuyển động đung đưa nhịp nhàng của chiếc xích đu, cành cây đu đưa trước gió nhẹ, màng loa rung khi phát ra âm thanh, piston chuyển động lên xuống trong buồng đốt xe máy.',
    physicsNature: 'Nguyên nhân tạo ra dao động điều hoà là do lực kéo về (lực hồi phục) luôn hướng về vị trí cân bằng và tỉ lệ thuận với độ lệch khỏi vị trí cân bằng (F = -kx).',
    coreFormulas: [
      {
        name: 'Phương trình li độ dao động điều hoà',
        expression: 'x = A · cos(ωt + φ)',
        description: 'Mô tả vị trí của vật tại thời điểm t bất kỳ so với gốc toạ độ (VTCB)',
        variables: [
          { symbol: 'x', meaning: 'Li độ (tọa độ của vật)', unit: 'cm hoặc m' },
          { symbol: 'A', meaning: 'Biên độ dao động (li độ cực đại, luôn dương)', unit: 'cm hoặc m' },
          { symbol: 'ω', meaning: 'Tần số góc', unit: 'rad/s' },
          { symbol: 't', meaning: 'Thời điểm khảo sát', unit: 's' },
          { symbol: 'φ', meaning: 'Pha ban đầu tại thời điểm t = 0', unit: 'rad' },
          { symbol: 'ωt + φ', meaning: 'Pha dao động tại thời điểm t', unit: 'rad' }
        ],
        condition: 'Bỏ qua ma sát và lực cản môi trường'
      },
      {
        name: 'Mối liên hệ giữa Tần số góc, Chu kỳ và Tần số',
        expression: 'ω = 2π / T = 2π · f',
        description: 'Chu kỳ T là khoảng thời gian để vật thực hiện một dao động toàn phần. Tần số f là số dao động trong 1 giây.',
        variables: [
          { symbol: 'T', meaning: 'Chu kỳ dao động', unit: 's' },
          { symbol: 'f', meaning: 'Tần số dao động', unit: 'Hz' },
          { symbol: 'ω', meaning: 'Tần số góc', unit: 'rad/s' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một chất điểm dao động điều hoà với phương trình x = 4·cos(5πt - π/3) (cm). Hãy xác định: biên độ, tần số góc, chu kỳ, tần số và li độ của vật tại thời điểm t = 0,2 s.',
      stepSolution: [
        {
          stepNumber: 1,
          stepName: 'Tóm tắt dữ kiện',
          content: 'Phương trình: x = 4·cos(5πt - π/3) (cm). Ta có: A = 4 cm; ω = 5π rad/s; φ = -π/3 rad; t = 0,2 s.'
        },
        {
          stepNumber: 2,
          stepName: 'Xác định đại lượng cần tìm',
          content: 'Cần tìm: Biên độ A, tần số góc ω, chu kỳ T, tần số f và li độ x tại t = 0,2 s.'
        },
        {
          stepNumber: 3,
          stepName: 'Chọn công thức',
          content: 'Dựa vào dạng chuẩn x = A·cos(ωt + φ): T = 2π / ω ; f = 1 / T ; x(t) thay trực tiếp t.'
        },
        {
          stepNumber: 4,
          stepName: 'Giải thích bản chất',
          content: 'Biên độ A là hằng số dương đo khoảng cách xa nhất so với VTCB. Tần số góc ω cho biết tốc độ quay của vectơ bán kính trên đường tròn lượng giác.'
        },
        {
          stepNumber: 5,
          stepName: 'Biến đổi biểu thức',
          content: 'T = 2π / (5π) = 2/5 s ; f = 1 / T = 5/2 Hz. Pha tại t = 0,2 s là: Φ = 5π·0,2 - π/3 = π - π/3 = 2π/3 rad.'
        },
        {
          stepNumber: 6,
          stepName: 'Thay số và tính toán',
          content: 'A = 4 cm. T = 0,4 s. f = 2,5 Hz. x(0,2) = 4 · cos(2π/3) = 4 · (-0,5) = -2 cm.'
        },
        {
          stepNumber: 7,
          stepName: 'Kiểm tra đơn vị và tính hợp lý',
          content: 'Biên độ A = 4 cm > 0, |x| = 2 cm <= A (hợp lý). Chu kỳ T = 0,4 s (dương). Đơn vị chuẩn xác.'
        },
        {
          stepNumber: 8,
          stepName: 'Kết luận',
          content: 'Biên độ A = 4 cm; Tần số góc ω = 5π rad/s; Chu kỳ T = 0,4 s; Tần số f = 2,5 Hz; Li độ tại t = 0,2 s là x = -2 cm (vật ở phía âm VTCB).'
        }
      ]
    },
    commonMistakes: [
      'Nhầm lẫn giữa tần số góc ω (rad/s) và tần số f (Hz).',
      'Quên đổi đơn vị góc sang Radian khi bấm máy tính sin/cos.',
      'Cho rằng biên độ A có thể nhận giá trị âm (A luôn luôn > 0).',
      'Quên pha ban đầu φ nằm trong khoảng (-π, π].'
    ],
    summary: [
      'Dao động điều hoà là hình chiếu của một chuyển động tròn đều lên một trục đường kính.',
      'Phương trình chuẩn: x = A·cos(ωt + φ).',
      'Khoảng cách giữa hai biên là chiều dài quỹ đạo L = 2A.',
      'Thời gian vật đi từ biên này sang biên kia là T/2.'
    ],
    relatedExperimentId: 'exp-spring-harmonic'
  },
  {
    id: 'bai-2',
    lessonNumber: 2,
    chapterId: 'chapter-1',
    chapterTitle: 'Chương I: Dao động',
    title: 'Bài 2: Mô tả dao động điều hoà',
    subtitle: 'Đồ thị li độ - thời gian · Vòng tròn lượng giác · Độ lệch pha',
    pageRange: 'Trang 11 - 15',
    quickGrasp: 'Đồ thị li độ - thời gian của dao động điều hoà có dạng đường hình sin lượn sóng đều đặn qua trục hoành, tuần hoàn với chu kỳ T.',
    realLifePhenomenon: 'Hình ảnh ghi lại từ bút vẽ của con lắc mực trên băng giấy kéo đều, đồ thị hiển thị trên màn hình máy đo điện tim hay dao động kí điện tử.',
    physicsNature: 'Độ lệch pha Δφ = φ₂ - φ₁ giữa hai dao động cho biết trạng thái chuyển động của dao động này so với dao động kia (cùng pha, ngược pha, hay vuông pha).',
    coreFormulas: [
      {
        name: 'Độ lệch pha giữa hai dao động',
        expression: 'Δφ = (ω₂t + φ₂) - (ω₁t + φ₁) = φ₂ - φ₁ (khi cùng tần số góc ω)',
        description: 'Xác định quan hệ pha: cùng pha khi Δφ = 2kπ, ngược pha khi Δφ = (2k+1)π, vuông pha khi Δφ = (2k+1)π/2',
        variables: [
          { symbol: 'Δφ', meaning: 'Độ lệch pha', unit: 'rad' },
          { symbol: 'φ₁, φ₂', meaning: 'Pha ban đầu của hai dao động', unit: 'rad' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Từ đồ thị x - t của một vật dao động điều hoà, ta thấy tại t = 0 vật qua VTCB theo chiều dương, sau 0,15 s vật đến biên dương lần đầu tiên với li độ 6 cm. Viết phương trình dao động của vật.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'Tại t = 0: x = 0 và v > 0. Li độ cực đại A = 6 cm. Thời gian từ x = 0 đến x = +A lần đầu là Δt = 0,15 s.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Phương trình dao động: x = A·cos(ωt + φ).' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'Khoảng thời gian từ VTCB đến biên là Δt = T / 4. Từ đó tính T và ω = 2π / T.' },
        { stepNumber: 4, stepName: 'Giải thích bản chất', content: 'Vòng tròn lượng giác quay từ góc -π/2 (qua VTCB chiều dương) đến góc 0 (biên dương) ứng với góc quét Δα = π/2 rad (tương đương T/4).' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'T = 4 · Δt = 4 · 0,15 = 0,6 s. ω = 2π / 0,6 = 10π / 3 rad/s.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'Tại t = 0: cos(φ) = 0 và sin(φ) < 0 => φ = -π/2 rad. Do đó phương trình là: x = 6·cos(10πt/3 - π/2) (cm).' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Tại t = 0, x = 6·cos(-π/2) = 0, v = -ωA·sin(-π/2) = +ωA > 0 (đúng chiều dương).' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Phương trình dao động: x = 6·cos(10πt/3 - π/2) (cm).' }
      ]
    },
    commonMistakes: [
      'Xác định sai dấu của pha ban đầu φ khi vật chuyển động theo chiều dương (chiều dương thì φ < 0; chiều âm thì φ > 0).',
      'Đọc sai bước thời gian trên trục hoành của đồ thị.'
    ],
    summary: [
      'Khoảng cách thời gian giữa 2 đỉnh liên tiếp trên đồ thị x - t là đúng một chu kỳ T.',
      'Vật đi từ VTCB ra biên mất T/4, từ biên này sang biên kia mất T/2.',
      'Sử dụng vòng tròn lượng giác giúp giải nhanh mọi bài toán thời gian và pha.'
    ],
    relatedExperimentId: 'exp-spring-harmonic'
  },
  {
    id: 'bai-3',
    lessonNumber: 3,
    chapterId: 'chapter-1',
    chapterTitle: 'Chương I: Dao động',
    title: 'Bài 3: Vận tốc, gia tốc trong dao động điều hoà',
    subtitle: 'Vận tốc sớm pha π/2 so với li độ · Gia tốc ngược pha li độ · Hệ thức độc lập',
    pageRange: 'Trang 16 - 21',
    quickGrasp: 'Vận tốc biến thiên điều hoà sớm pha π/2 so với li độ, đạt cực đại khi qua VTCB. Gia tốc ngược pha với li độ (a = -ω²x), đạt cực đại ở biên và luôn hướng về VTCB.',
    realLifePhenomenon: 'Khi chơi xích đu, lúc bạn ở vị trí thấp nhất (VTCB) thì bạn lao đi nhanh nhất (v_max); khi lên điểm cao nhất ở hai bên thì dừng lại tức khắc (v = 0) và đổi hướng mạnh mẽ nhất (a_max).',
    physicsNature: 'Lực hồi phục F = ma = -mω²x luôn kéo vật về vị trí cân bằng, do đó gia tốc a luôn có hướng ngược với li độ x.',
    coreFormulas: [
      {
        name: 'Vận tốc trong dao động điều hoà',
        expression: 'v = x\' = -ωA·sin(ωt + φ) = ωA·cos(ωt + φ + π/2)',
        description: 'Vận tốc cực đại tại VTCB v_max = ωA; tại biên v = 0.',
        variables: [
          { symbol: 'v', meaning: 'Vận tốc tức thời', unit: 'm/s hoặc cm/s' },
          { symbol: 'v_max', meaning: 'Tốc độ cực đại qua VTCB', unit: 'm/s hoặc cm/s' }
        ]
      },
      {
        name: 'Gia tốc trong dao động điều hoà',
        expression: 'a = v\' = -ω²A·cos(ωt + φ) = -ω²x = ω²A·cos(ωt + φ + π)',
        description: 'Gia tốc ngược pha với li độ. Độ lớn cực đại tại hai biên a_max = ω²A; tại VTCB a = 0.',
        variables: [
          { symbol: 'a', meaning: 'Gia tốc tức thời', unit: 'm/s² hoặc cm/s²' },
          { symbol: 'a_max', meaning: 'Gia tốc cực đại ở biên', unit: 'm/s² hoặc cm/s²' }
        ]
      },
      {
        name: 'Hệ thức độc lập với thời gian giữa x và v',
        expression: 'A² = x² + (v / ω)²',
        description: 'Liên hệ giữa li độ x và vận tốc v tại cùng một thời điểm bất kỳ.',
        variables: [
          { symbol: 'A', meaning: 'Biên độ', unit: 'cm hoặc m' },
          { symbol: 'x', meaning: 'Li độ', unit: 'cm hoặc m' },
          { symbol: 'v', meaning: 'Vận tốc', unit: 'cm/s hoặc m/s' },
          { symbol: 'ω', meaning: 'Tần số góc', unit: 'rad/s' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một vật dao động điều hoà với tần số góc ω = 10 rad/s. Khi vật có li độ x = 3 cm thì vận tốc của vật là v = 40 cm/s. Tìm biên độ dao động và gia tốc của vật tại vị trí đó.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'ω = 10 rad/s ; x = 3 cm ; v = 40 cm/s.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Biên độ A và gia tốc a tại vị trí x = 3 cm.' },
        { stepNumber: 3, stepName: 'Chọn công thức phù hợp', content: 'Dùng hệ thức độc lập: A² = x² + (v/ω)² và công thức gia tốc: a = -ω²x.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức đó', content: 'Vì x và v vuông pha với nhau nên tổng bình phương hai tỉ số chuẩn hoá bằng 1 (x/A)² + (v/v_max)² = 1. Gia tốc tỉ lệ đối xứng với li độ a = -ω²x.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'A = √(x² + (v/ω)²). Gia tốc a = -ω² · x.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'A = √(3² + (40/10)²) = √(9 + 16) = √25 = 5 cm. a = -(10)² · 3 = -300 cm/s² = -3 m/s².' },
        { stepNumber: 7, stepName: 'Kiểm tra đơn vị', content: 'A = 5 cm > x = 3 cm (hợp lý). Gia tốc a âm khi x dương (chuẩn xác hướng về VTCB).' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Biên độ dao động là A = 5 cm. Gia tốc của vật tại li độ đó là a = -3 m/s².' }
      ]
    },
    commonMistakes: [
      'Không đồng nhất đơn vị giữa x (cm) và v (m/s) khi thay vào hệ thức độc lập.',
      'Quên dấu trừ trong công thức a = -ω²x, dẫn đến tính sai giá trị đại số của gia tốc.'
    ],
    summary: [
      'v sớm pha π/2 so với x (đồ thị elip trong mặt phẳng pha x-v).',
      'a ngược pha với x: a = -ω²x (đoạn thẳng qua gốc toạ độ trong hệ toạ độ a-x).',
      'Tại VTCB: |x| = 0, |v| = ωA (cực đại), |a| = 0.',
      'Tại biên: |x| = A (cực đại), v = 0, |a| = ω²A (cực đại).'
    ],
    relatedExperimentId: 'exp-spring-harmonic'
  },
  {
    id: 'bai-5',
    lessonNumber: 5,
    chapterId: 'chapter-1',
    chapterTitle: 'Chương I: Dao động',
    title: 'Bài 5: Động năng. Thế năng. Năng lượng trong dao động điều hoà',
    subtitle: 'Sự chuyển hoá qua lại giữa Động năng và Thế năng · Bảo toàn cơ năng',
    pageRange: 'Trang 26 - 30',
    quickGrasp: 'Cơ năng của vật dao động điều hoà bằng tổng động năng và thế năng. Trong quá trình dao động, động năng và thế năng chuyển hoá liên tục cho nhau nhưng tổng cơ năng được bảo toàn (tỉ lệ với bình phương biên độ).',
    realLifePhenomenon: 'Hệ thống giảm xóc của xe hơi hấp thụ và chuyển hoá năng lượng va đập, chiếc lò xo ép lại tích trữ thế năng đàn hồi rồi bung ra tạo thành động năng phóng đồ vật.',
    physicsNature: 'Lực đàn hồi và lực kéo về là các lực thế. Khi không có ma sát, công của lực thế làm biến thiên động năng tương ứng bằng độ giảm thế năng, do đó cơ năng toàn phần là hằng số.',
    coreFormulas: [
      {
        name: 'Động năng trong dao động điều hoà',
        expression: 'W_đ = ½ m · v² = ½ m · ω² · A² · sin²(ωt + φ)',
        description: 'Biến thiên tuần hoàn với chu kỳ T\' = T/2 và tần số góc ω\' = 2ω',
        variables: [
          { symbol: 'W_đ', meaning: 'Động năng', unit: 'Joule (J)' },
          { symbol: 'm', meaning: 'Khối lượng vật dao động', unit: 'kg' },
          { symbol: 'v', meaning: 'Vận tốc tức thời', unit: 'm/s' }
        ]
      },
      {
        name: 'Thế năng trong dao động điều hoà',
        expression: 'W_t = ½ k · x² = ½ m · ω² · x² = ½ m · ω² · A² · cos²(ωt + φ)',
        description: 'Cực đại ở hai biên W_t_max = W; bằng 0 tại vị trí cân bằng',
        variables: [
          { symbol: 'W_t', meaning: 'Thế năng dao động', unit: 'Joule (J)' },
          { symbol: 'k', meaning: 'Độ cứng lò xo (k = mω²)', unit: 'N/m' },
          { symbol: 'x', meaning: 'Li độ', unit: 'm' }
        ]
      },
      {
        name: 'Cơ năng bảo toàn',
        expression: 'W = W_đ + W_t = ½ m · ω² · A² = ½ k · A² = const',
        description: 'Cơ năng tỉ lệ với bình phương tần số góc và bình phương biên độ dao động.',
        variables: [
          { symbol: 'W', meaning: 'Cơ năng toàn phần', unit: 'Joule (J)' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một con lắc lò xo có độ cứng k = 100 N/m, vật nặng m = 100 g dao động điều hoà với biên độ A = 4 cm. Tính cơ năng của con lắc và tìm vị trí mà tại đó động năng bằng 3 lần thế năng.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'k = 100 N/m; m = 100 g = 0,1 kg; A = 4 cm = 0,04 m. Tìm W và x khi W_đ = 3·W_t.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Cơ năng W và toạ độ li độ x.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'Cơ năng: W = ½ k · A². Bảo toàn cơ năng: W = W_đ + W_t = 3·W_t + W_t = 4·W_t.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Bỏ qua ma sát nên cơ năng bảo toàn, phân bố giữa thế năng và động năng. Thế năng W_t = ½ k·x².' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'W = 4·(½ k·x²) => ½ k·A² = 4 · (½ k·x²) => x² = A² / 4 => x = ± A / 2.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'W = ½ · 100 · (0,04)² = 50 · 0,0016 = 0,08 J. x = ± 4 / 2 = ± 2 cm.' },
        { stepNumber: 7, stepName: 'Kiểm tra đơn vị', content: 'W = 0,08 J = 80 mJ (dương). |x| = 2 cm < 4 cm (hợp lý nằm trong khoảng chuyển động).' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Cơ năng của con lắc là W = 0,08 J. Vị trí có W_đ = 3·W_t là x = ± 2 cm.' }
      ]
    },
    commonMistakes: [
      'Quên đổi đơn vị biên độ A từ cm sang m khi tính cơ năng (dẫn đến sai số 10.000 lần!).',
      'Nghĩ rằng động năng và thế năng biến thiên với chu kỳ T (chính xác là chu kỳ biến thiên năng lượng T\' = T/2, tần số f\' = 2f).'
    ],
    summary: [
      'Khi vật đi từ biên về VTCB: thế năng giảm, động năng tăng (chuyển hoá thế năng thành động năng).',
      'Khi vật đi từ VTCB ra biên: động năng giảm, thế năng tăng.',
      'Cơ năng tỉ lệ với bình phương biên độ: W ~ A².'
    ],
    relatedExperimentId: 'exp-spring-harmonic'
  },
  {
    id: 'bai-6',
    lessonNumber: 6,
    chapterId: 'chapter-1',
    chapterTitle: 'Chương I: Dao động',
    title: 'Bài 6: Dao động tắt dần. Dao động cưỡng bức. Hiện tượng cộng hưởng',
    subtitle: 'Lực cản môi trường · Tần số ngoại lực · Điều kiện xảy ra cộng hưởng f = f₀',
    pageRange: 'Trang 31 - 35',
    quickGrasp: 'Dao động tắt dần có biên độ và cơ năng giảm dần theo thời gian do ma sát. Dao động cưỡng bức xảy ra dưới tác dụng của ngoại lực tuần hoàn. Khi tần số ngoại lực bằng tần số riêng (f = f₀), biên độ đạt giá trị cực đại gọi là hiện tượng cộng hưởng.',
    realLifePhenomenon: 'Vụ sập cầu treo Tacoma Narrows (Mỹ) năm 1940 do gió thổi tạo cộng hưởng dao động, giọng hát ca sĩ opera làm vỡ ly thuỷ tinh, bộ phận giảm chấn của cửa tự động đóng khép nhẹ nhàng.',
    physicsNature: 'Ngoại lực tuần hoàn liên tục bù đắp năng lượng tiêu hao do ma sát. Ở tần số f = f₀, tốc độ truyền năng lượng từ nguồn kích thích vào hệ đạt hiệu suất cao nhất.',
    coreFormulas: [
      {
        name: 'Điều kiện xảy ra cộng hưởng cơ',
        expression: 'f_ngoại_lực = f₀ (hoặc ω = ω₀)',
        description: 'Biên độ dao động cưỡng bức đạt cực đại A_max. Lực cản càng nhỏ thì đỉnh cộng hưởng càng nhọn và cao.',
        variables: [
          { symbol: 'f_ngoại_lực', meaning: 'Tần số của ngoại lực cưỡng bức', unit: 'Hz' },
          { symbol: 'f₀', meaning: 'Tần số dao động riêng của hệ', unit: 'Hz' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một con lắc đơn có chiều dài L = 1 m dao động tại nơi có g = π² m/s². Người ta kích thích con lắc bằng một ngoại lực tuần hoàn có tần số thay đổi được. Khi tần số của lực đạt giá trị nào thì con lắc dao động mạnh nhất?',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'L = 1 m ; g = π² m/s². Ngoại lực có tần số f thay đổi. Tìm f để biên độ cực đại.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Tần số ngoại lực gây cộng hưởng f_ch.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'Con lắc dao động mạnh nhất khi xảy ra cộng hưởng: f = f₀ = 1 / (2π) · √(g / L).' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Hiện tượng cộng hưởng xảy ra khi tần số ngoại lực bằng đúng tần số riêng f₀ của hệ con lắc đơn.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'f₀ = 1 / (2π) · √(π² / 1) = π / (2π) = 0,5 Hz.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'f = f₀ = 0,5 Hz (tương ứng chu kỳ T = 2 s).' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Con lắc dài 1 m có chu kỳ T = 2s, tần số 0,5 Hz là kết quả chuẩn mực của con lắc đơn.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Khi tần số ngoại lực đạt giá trị f = 0,5 Hz thì con lắc sẽ xảy ra hiện tượng cộng hưởng và dao động mạnh nhất.' }
      ]
    },
    commonMistakes: [
      'Nghĩ rằng tần số của dao động cưỡng bức luôn bằng tần số riêng f₀ (thực tế tần số dao động cưỡng bức luôn bằng tần số f của ngoại lực; chỉ khi f = f₀ mới xảy ra cộng hưởng).',
      'Bỏ qua vai trò của ma sát: ma sát càng lớn thì biên độ cực đại tại cộng hưởng càng giảm.'
    ],
    summary: [
      'Dao động tắt dần: biên độ giảm liên tục (ứng dụng: giảm xóc, cửa chống sập).',
      'Dao động duy trì: bù đắp năng lượng đúng bằng phần mất đi trong mỗi chu kỳ mà không làm thay đổi chu kỳ riêng (đồng hồ con lắc).',
      'Dao động cưỡng bức: có tần số bằng tần số ngoại lực.',
      'Cộng hưởng: f = f₀, biên độ cực đại (có lợi trong hộp đàn, viễn thông; có hại làm sập cầu, gãy trục máy).'
    ],
    relatedExperimentId: 'exp-resonance'
  },

  // --- CHƯƠNG II: SÓNG ---
  {
    id: 'bai-8',
    lessonNumber: 8,
    chapterId: 'chapter-2',
    chapterTitle: 'Chương II: Sóng',
    title: 'Bài 8: Mô tả sóng',
    subtitle: 'Khái niệm sóng cơ · Sự truyền pha dao động · Bước sóng λ · Vận tốc sóng',
    pageRange: 'Trang 36 - 40',
    quickGrasp: 'Sóng là quá trình lan truyền dao động qua môi trường đàn hồi theo thời gian. Khi sóng truyền qua, các phần tử môi trường chỉ dao động tại chỗ quanh VTCB mà không chuyển dời theo sóng; chỉ có pha dao động và năng lượng là lan truyền.',
    realLifePhenomenon: 'Hình ảnh sóng biển nhấp nhô làm chiếc phao câu cá bồng bềnh lên xuống tại chỗ mà không bị đẩy trôi dạt cùng đợt sóng, khán giả đứng lên ngồi xuống tạo làn sóng cổ vũ (sóng Mexicô) trên khán đài vận động trường.',
    physicsNature: 'Liên kết đàn hồi giữa các phần tử môi trường làm cho dao động của phần tử phía trước kéo theo dao động của phần tử phía sau nhưng bị trễ pha một khoảng thời gian Δt = d / v.',
    coreFormulas: [
      {
        name: 'Mối liên hệ giữa Bước sóng, Vận tốc và Chu kỳ',
        expression: 'λ = v · T = v / f',
        description: 'Bước sóng λ là quãng đường sóng truyền đi trong một chu kỳ T, cũng là khoảng cách giữa 2 điểm gần nhau nhất trên cùng phương truyền dao động cùng pha.',
        variables: [
          { symbol: 'λ', meaning: 'Bước sóng', unit: 'm hoặc cm' },
          { symbol: 'v', meaning: 'Tốc độ truyền sóng', unit: 'm/s' },
          { symbol: 'T', meaning: 'Chu kỳ sóng', unit: 's' },
          { symbol: 'f', meaning: 'Tần số sóng', unit: 'Hz' }
        ]
      },
      {
        name: 'Độ lệch pha giữa hai điểm cách nhau d trên phương truyền',
        expression: 'Δφ = 2π · d / λ',
        description: 'Cùng pha khi d = k·λ; ngược pha khi d = (k + 0.5)·λ; vuông pha khi d = (k + 0.5)·λ/2',
        variables: [
          { symbol: 'd', meaning: 'Khoảng cách giữa hai điểm dọc theo phương truyền', unit: 'm' },
          { symbol: 'Δφ', meaning: 'Độ lệch pha dao động', unit: 'rad' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một sóng cơ truyền trên mặt nước với tần số f = 50 Hz và tốc độ truyền sóng v = 1,5 m/s. Tính bước sóng. Hai điểm M và N trên cùng một phương truyền sóng cách nhau 4,5 cm dao động lệch pha nhau một góc bằng bao nhiêu?',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'f = 50 Hz ; v = 1,5 m/s ; d = 4,5 cm = 0,045 m.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Bước sóng λ và độ lệch pha Δφ giữa M và N.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'λ = v / f và Δφ = 2π·d / λ.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Bước sóng đo quãng đường sóng truyền trong 1 chu kỳ. Độ trễ thời gian Δt = d/v tạo ra độ lệch pha tương ứng với góc quét trên đường tròn lượng giác.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'λ = 1,5 / 50 = 0,03 m = 3 cm. Δφ = 2π · 4,5 / 3 = 3π rad.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'λ = 3 cm ; Δφ = 3π rad = (2·1 + 1)π rad.' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Δφ = 3π là số lẻ lần π, do đó hai điểm M và N dao động ngược pha nhau.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Bước sóng λ = 3 cm. Độ lệch pha giữa M và N là Δφ = 3π rad (hai phần tử dao động ngược pha).' }
      ]
    },
    commonMistakes: [
      'Nhầm lẫn giữa tốc độ truyền sóng v (hằng số phụ thuộc môi trường) và tốc độ dao động của phần tử vật chất v_dao_động (biến thiên điều hoà v = -ωA·sin).',
      'Quên đổi đơn vị d và λ về cùng một đơn vị (cùng cm hoặc cùng m) khi tính độ lệch pha.'
    ],
    summary: [
      'Sóng chỉ truyền trạng thái dao động, pha và năng lượng; không truyền các phần tử vật chất.',
      'Hai điểm cách nhau một số nguyên lần bước sóng kλ trên cùng một tia sóng thì dao động cùng pha.',
      'Hai điểm cách nhau nửa nguyên lần bước sóng (k + 0.5)λ thì dao động ngược pha.'
    ],
    relatedExperimentId: 'exp-sound-frequency'
  },
  {
    id: 'bai-9',
    lessonNumber: 9,
    chapterId: 'chapter-2',
    chapterTitle: 'Chương II: Sóng',
    title: 'Bài 9: Sóng ngang. Sóng dọc. Sự truyền năng lượng của sóng cơ',
    subtitle: 'Phân loại sóng theo phương dao động · Môi trường truyền sóng rắn, lỏng, khí',
    pageRange: 'Trang 41 - 46',
    quickGrasp: 'Sóng ngang có phương dao động vuông góc với phương truyền sóng (truyền trong chất rắn và bề mặt chất lỏng). Sóng dọc có phương dao động trùng với phương truyền sóng (truyền được trong cả chất rắn, chất lỏng và chất khí).',
    realLifePhenomenon: 'Sóng địa chấn khi động đất gồm sóng P (sóng dọc - sơ cấp, đến trước) và sóng S (sóng ngang - thứ cấp, gây rung lắc mạnh đến sau), âm thanh truyền trong không khí là sóng dọc làm các lớp không khí bị nén và giãn liên tiếp.',
    physicsNature: 'Sóng ngang xuất hiện do biến dạng lệch (trượt) giữa các lớp vật chất liền kề (chỉ chất rắn và bề mặt chất lỏng mới có lực đàn hồi chống trượt). Sóng dọc xuất hiện do biến dạng nén - giãn thể tích (mọi môi trường đều có lực chống nén thể tích).',
    coreFormulas: [
      {
        name: 'Mật độ năng lượng và công suất truyền sóng',
        expression: 'I = P / S = E / (S · t)',
        description: 'Cường độ sóng I là năng lượng truyền qua một đơn vị diện tích đặt vuông góc với phương truyền trong một đơn vị thời gian.',
        variables: [
          { symbol: 'I', meaning: 'Cường độ sóng', unit: 'W/m²' },
          { symbol: 'P', meaning: 'Công suất nguồn sóng', unit: 'W' },
          { symbol: 'S', meaning: 'Diện tích bề mặt sóng lan truyền', unit: 'm²' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Tại sao sóng âm từ loa truyền trong không khí đến tai người lại là sóng dọc mà không phải là sóng ngang?',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'Hiện tượng sóng âm truyền trong chất khí (không khí).' },
        { stepNumber: 2, stepName: 'Xác định câu hỏi', content: 'Giải thích vì sao sóng âm trong chất khí bắt buộc là sóng dọc.' },
        { stepNumber: 3, stepName: 'Chọn cơ sở lý thuyết', content: 'Điều kiện xuất hiện sóng ngang và sóng dọc dựa vào lực tương tác phân tử và biến dạng.' },
        { stepNumber: 4, stepName: 'Giải thích bản chất', content: 'Chất khí chỉ có lực tương tác đàn hồi khi bị nén hoặc giãn thể tích (các phân tử va chạm nhau), không có lực đàn hồi chống lại sự trượt ngang giữa các lớp.' },
        { stepNumber: 5, stepName: 'Phân tích quá trình', content: 'Màng loa rung tới lui làm lớp không khí sát màng loa bị nén lại rồi dãn ra theo đúng phương truyền âm.' },
        { stepNumber: 6, stepName: 'Đối chiếu định nghĩa', content: 'Phương dao động của các phần tử không khí trùng với phương truyền của sóng âm, đúng theo định nghĩa sóng dọc.' },
        { stepNumber: 7, stepName: 'Kiểm tra', content: 'Khẳng định phù hợp với thực nghiệm: trong chất khí và chất lỏng (bên trong lòng), sóng cơ chỉ truyền dưới dạng sóng dọc.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Sóng âm trong không khí là sóng dọc vì chất khí chỉ có tính đàn hồi khi bị nén giãn thể tích, không có tính đàn hồi chống biến dạng trượt.' }
      ]
    },
    commonMistakes: [
      'Tưởng rằng sóng âm truyền trong mọi môi trường đều là sóng dọc (sóng âm truyền trong chất rắn có thể là cả sóng dọc và sóng ngang).',
      'Nghĩ rằng sóng bề mặt nước là sóng ngang thuần tuý (thực tế các hạt nước trên bề mặt chuyển động theo quỹ đạo tròn/elip phối hợp cả ngang và dọc).'
    ],
    summary: [
      'Sóng ngang: phương dao động ⊥ phương truyền (chất rắn + mặt nước).',
      'Sóng dọc: phương dao động // phương truyền (rắn + lỏng + khí).',
      'Vận tốc truyền sóng phụ thuộc mật độ và tính đàn hồi: v_rắn > v_lỏng > v_khí.'
    ],
    relatedExperimentId: 'exp-sound-frequency'
  },
  {
    id: 'bai-12',
    lessonNumber: 12,
    chapterId: 'chapter-2',
    chapterTitle: 'Chương II: Sóng',
    title: 'Bài 12: Giao thoa sóng',
    subtitle: 'Hiện tượng giao thoa · Hai nguồn kết hợp · Cực đại & Cực tiểu giao thoa',
    pageRange: 'Trang 52 - 57',
    quickGrasp: 'Giao thoa là hiện tượng hai sóng kết hợp gặp nhau, tạo nên các điểm dao động mạnh nhất (cực đại) xen kẽ với các điểm đứng yên hoặc dao động yếu nhất (cực tiểu). Đây là bằng chứng thực nghiệm quan trọng nhất khẳng định bản chất sóng.',
    realLifePhenomenon: 'Hình ảnh các gợn sóng hình hypebol đan xen nhau trên mặt nước khi hai giọt nước cùng nhỏ đều đặn xuống hồ, vùng âm thanh nghe to nhỏ khác nhau khi đi lại trước 2 loa phát cùng một nốt nhạc.',
    physicsNature: 'Tại mỗi điểm trong môi trường, dao động tổng hợp là tổng hợp vectơ của hai dao động thành phần do hai nguồn truyền tới. Độ lệch pha phụ thuộc vào hiệu đường đi: Δd = d₂ - d₁.',
    coreFormulas: [
      {
        name: 'Vị trí cực đại giao thoa (hai nguồn cùng pha)',
        expression: 'd₂ - d₁ = k · λ (với k = 0, ±1, ±2, ...)',
        description: 'Hiệu đường đi bằng một số nguyên lần bước sóng. Hai sóng thành phần đến cùng pha và tăng cường lẫn nhau, biên độ cực đại A_max = A₁ + A₂.',
        variables: [
          { symbol: 'd₁, d₂', meaning: 'Khoảng cách từ điểm đang xét đến 2 nguồn sóng', unit: 'm hoặc cm' },
          { symbol: 'k', meaning: 'Bậc giao thoa cực đại (k = 0 là vân trung tâm)', unit: 'số nguyên' },
          { symbol: 'λ', meaning: 'Bước sóng', unit: 'm hoặc cm' }
        ]
      },
      {
        name: 'Vị trí cực tiểu giao thoa (hai nguồn cùng pha)',
        expression: 'd₂ - d₁ = (k + ½) · λ (với k = 0, ±1, ±2, ...)',
        description: 'Hiệu đường đi bằng một số bán nguyên lần bước sóng. Hai sóng đến ngược pha triệt tiêu lẫn nhau, biên độ cực tiểu A_min = |A₁ - A₂|.',
        variables: [
          { symbol: 'k', meaning: 'Bậc cực tiểu giao thoa', unit: 'số nguyên' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Trên mặt nước có hai nguồn kết hợp S₁ và S₂ dao động cùng pha với tần số f = 20 Hz. Khoảng cách giữa hai nguồn là S₁S₂ = 12 cm. Vận tốc truyền sóng trên mặt nước là v = 40 cm/s. Tính bước sóng và tìm số điểm dao động với biên độ cực đại trên đoạn thẳng nối hai nguồn S₁S₂.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'f = 20 Hz ; v = 40 cm/s ; S₁S₂ = 12 cm. Hai nguồn đồng pha.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Bước sóng λ và số đường cực đại trên đoạn S₁S₂.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'λ = v / f. Điều kiện cực đại: d₂ - d₁ = k·λ với -S₁S₂ < d₂ - d₁ < S₁S₂.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Mọi điểm trên đoạn nối 2 nguồn thoả mãn d₁ + d₂ = S₁S₂. Hiệu khoảng cách d₂ - d₁ chạy từ -S₁S₂ đến +S₁S₂.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'λ = 40 / 20 = 2 cm. Ta có: -S₁S₂ < k·λ < S₁S₂ => -12 < 2k < 12 => -6 < k < 6.' },
        { stepNumber: 6, stepName: 'Thay số và đếm số nghiệm', content: 'k nhận các giá trị nguyên: k ∈ {-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5}.' },
        { stepNumber: 7, stepName: 'Kiểm tra', content: 'Tổng số giá trị k là 5 + 1 + 5 = 11 giá trị nguyên.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Bước sóng λ = 2 cm. Trên đoạn thẳng nối hai nguồn có 11 điểm dao động với biên độ cực đại.' }
      ]
    },
    commonMistakes: [
      'Tính luôn hai đầu nguồn S₁ và S₂ khi đếm số cực đại trên đoạn nối hai nguồn (nguồn sóng là vị trí cấp dao động, không phải phần tử giao thoa thuần tuý).',
      'Áp dụng nhầm công thức của hai nguồn ngược pha (khi ngược pha, cực đại và cực tiểu đổi vị trí cho nhau).'
    ],
    summary: [
      'Điều kiện để có giao thoa: hai nguồn phải là nguồn kết hợp (cùng tần số và có độ lệch pha không đổi theo thời gian).',
      'Đường trung trực của đoạn nối hai nguồn cùng pha là vân cực đại trung tâm (k = 0).',
      'Khoảng cách giữa hai cực đại liên tiếp trên đoạn thẳng nối hai nguồn bằng λ / 2.'
    ],
    relatedExperimentId: 'exp-water-interference'
  },
  {
    id: 'bai-13',
    lessonNumber: 13,
    chapterId: 'chapter-2',
    chapterTitle: 'Chương II: Sóng',
    title: 'Bài 13: Sóng dừng',
    subtitle: 'Sóng tới & Sóng phản xạ · Nút sóng & Bụng sóng · Điều kiện có sóng dừng',
    pageRange: 'Trang 58 - 63',
    quickGrasp: 'Sóng dừng là trường hợp giao thoa đặc biệt giữa sóng tới và sóng phản xạ trên cùng một phương truyền. Kết quả tạo nên hệ thống các điểm luôn đứng yên gọi là nút sóng, xen kẽ với các điểm luôn dao động với biên độ lớn nhất gọi là bụng sóng.',
    realLifePhenomenon: 'Sự rung của dây đàn ghi-ta, đàn violin khi được gảy hoặc kéo vĩ tạo ra âm thanh du dương, cột không khí dao động trong ống sáo hoặc kèn kèn saxophone.',
    physicsNature: 'Tại đầu cố định, sóng phản xạ bị ngược pha với sóng tới nên triệt tiêu nhau tạo thành nút. Tại đầu tự do, sóng phản xạ cùng pha với sóng tới nên tăng cường nhau tạo thành bụng.',
    coreFormulas: [
      {
        name: 'Điều kiện sóng dừng trên dây 2 đầu cố định',
        expression: 'L = k · (λ / 2) (với k = 1, 2, 3, ...)',
        description: 'Chiều dài dây bằng một số nguyên lần nửa bước sóng. Số bụng sóng = k; Số nút sóng = k + 1.',
        variables: [
          { symbol: 'L', meaning: 'Chiều dài dây đàn hồi', unit: 'm' },
          { symbol: 'k', meaning: 'Số bó sóng (số bụng sóng)', unit: 'số nguyên dương' },
          { symbol: 'λ', meaning: 'Bước sóng', unit: 'm' }
        ]
      },
      {
        name: 'Điều kiện sóng dừng trên dây 1 đầu cố định, 1 đầu tự do',
        expression: 'L = (2k + 1) · (λ / 4) (với k = 0, 1, 2, ...)',
        description: 'Chiều dài dây bằng một số lẻ lần một phần tư bước sóng. Số bụng = Số nút = k + 1.',
        variables: [
          { symbol: 'k', meaning: 'Chỉ số nguyên', unit: 'số tự nhiên' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một sợi dây đàn hồi dài L = 1,2 m có hai đầu cố định. Khi kích thích cho dây dao động với tần số f = 50 Hz thì trên dây xuất hiện sóng dừng ổn định với 3 bụng sóng. Tính tốc độ truyền sóng trên sợi dây.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'Dây 2 đầu cố định. L = 1,2 m ; f = 50 Hz ; Số bụng sóng k = 3.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Tốc độ truyền sóng v.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'L = k · (λ / 2) => λ = 2L / k. Tốc độ v = λ · f.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Vì hai đầu dây cố định nên mỗi đầu dây là một nút sóng. Đoạn dây gồm đúng k bó sóng liên tiếp.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'v = (2L / k) · f = (2 · 1,2 / 3) · 50.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'λ = 2,4 / 3 = 0,8 m. v = 0,8 · 50 = 40 m/s.' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Tốc độ v = 40 m/s nằm trong khoảng vận tốc truyền sóng cơ trên dây căng chuẩn mực.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Tốc độ truyền sóng trên sợi dây là v = 40 m/s.' }
      ]
    },
    commonMistakes: [
      'Nhầm số bụng và số nút: Dây 2 đầu cố định có k bụng thì có k + 1 nút (tính cả 2 đầu dây).',
      'Áp dụng nhầm công thức của dây 1 đầu tự do cho dây 2 đầu cố định.'
    ],
    summary: [
      'Khoảng cách giữa hai nút sóng liên tiếp hoặc hai bụng sóng liên tiếp bằng λ / 2.',
      'Khoảng cách từ một nút sóng đến một bụng sóng liền kề bằng λ / 4.',
      'Bề rộng của một bụng sóng dao động là 4A (với A là biên độ của sóng tới).'
    ],
    relatedExperimentId: 'exp-standing-waves'
  },

  // --- CHƯƠNG III: ĐIỆN TRƯỜNG ---
  {
    id: 'bai-16',
    lessonNumber: 16,
    chapterId: 'chapter-3',
    chapterTitle: 'Chương III: Điện trường',
    title: 'Bài 16: Lực tương tác giữa các điện tích',
    subtitle: 'Điện tích điểm · Định luật Coulomb · Hằng số điện môi ε',
    pageRange: 'Trang 64 - 69',
    quickGrasp: 'Lực tương tác tĩnh điện giữa hai điện tích điểm đặt trong chân không tỉ lệ thuận với tích độ lớn của hai điện tích và tỉ lệ nghịch với bình phương khoảng cách giữa chúng. Hai điện tích cùng dấu thì đẩy nhau, trái dấu thì hút nhau.',
    realLifePhenomenon: 'Hiện tượng bụi bám chặt vào màn hình tivi sau một thời gian hoạt động, lược nhựa chải tóc hút các mẩu giấy nhỏ, quần áo len sợi dính vào da người vào mùa hanh khô.',
    physicsNature: 'Lực Coulomb là lực xuyên tâm đặt dọc theo đường thẳng nối hai điện tích điểm, tuân theo định luật III Newton: F₁₂ = -F₂₁.',
    coreFormulas: [
      {
        name: 'Định luật Coulomb',
        expression: 'F = k · |q₁ · q₂| / (ε · r²)',
        description: 'Lực tương tác tĩnh điện giữa hai điện tích điểm trong môi trường điện môi đồng tính.',
        variables: [
          { symbol: 'F', meaning: 'Lực tương tác tĩnh điện', unit: 'Newton (N)' },
          { symbol: 'k', meaning: 'Hằng số tĩnh điện (k = 9 · 10⁹)', unit: 'N·m²/C²' },
          { symbol: 'q₁, q₂', meaning: 'Độ lớn điện tích của hai vật', unit: 'Coulomb (C)' },
          { symbol: 'r', meaning: 'Khoảng cách giữa hai điện tích', unit: 'mét (m)' },
          { symbol: 'ε', meaning: 'Hằng số điện môi (trong chân không và không khí ε ≈ 1)', unit: 'không có thứ nguyên' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Hai điện tích điểm q₁ = +2 · 10⁻⁸ C và q₂ = -8 · 10⁻⁸ C đặt cách nhau r = 10 cm trong không khí (ε = 1). Tính độ lớn của lực tương tác giữa chúng. Lực này là lực hút hay lực đẩy?',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'q₁ = +2·10⁻⁸ C ; q₂ = -8·10⁻⁸ C ; r = 10 cm = 0,1 m ; ε = 1 ; k = 9·10⁹ N·m²/C².' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Độ lớn lực tương tác F và tính chất lực (hút hay đẩy).' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'F = k · |q₁·q₂| / (ε · r²).' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Đây là hai điện tích điểm đứng yên đặt trong môi trường không khí đồng tính.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'F = 9·10⁹ · |(2·10⁻⁸) · (-8·10⁻⁸)| / (1 · 0,1²).' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'F = 9·10⁹ · (16·10⁻¹⁶) / 0,01 = 144·10⁻⁷ / 10⁻² = 1,44 · 10⁻³ N.' },
        { stepNumber: 7, stepName: 'Kiểm tra tính chất lực', content: 'Vì q₁ > 0 và q₂ < 0 (hai điện tích trái dấu) nên lực tương tác là lực hút.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Độ lớn lực tương tác là F = 1,44 · 10⁻³ N (1,44 mN). Đây là lực hút lẫn nhau.' }
      ]
    },
    commonMistakes: [
      'Quên đổi đơn vị khoảng cách r từ cm sang m (làm kết quả sai 10.000 lần).',
      'Quên dấu giá trị tuyệt đối |q₁·q₂| dẫn đến lực F có giá trị âm (độ lớn lực luôn luôn dương).'
    ],
    summary: [
      'Lực Coulomb tỉ lệ nghịch với bình phương khoảng cách: r tăng 2 lần thì F giảm 4 lần.',
      'Đặt trong điện môi có hằng số ε thì lực tương tác giảm đi ε lần so với chân không.',
      'Thuyết electron: Nguyên tử trung hoà nhận thêm electron trở thành ion âm, mất bớt electron trở thành ion dương.'
    ],
    relatedExperimentId: 'exp-electric-field-lines'
  },
  {
    id: 'bai-17',
    lessonNumber: 17,
    chapterId: 'chapter-3',
    chapterTitle: 'Chương III: Điện trường',
    title: 'Bài 17: Khái niệm điện trường',
    subtitle: 'Môi trường truyền tương tác điện · Cường độ điện trường E · Đường sức điện',
    pageRange: 'Trang 70 - 75',
    quickGrasp: 'Điện trường là một dạng vật chất bao quanh các điện tích và truyền tương tác điện. Tính chất cơ bản của điện trường là tác dụng lực điện lên điện tích khác đặt trong nó. Cường độ điện trường E đặc trưng cho tác dụng lực mạnh hay yếu.',
    realLifePhenomenon: 'Cảm giác lông tay dựng đứng lên khi bạn đưa tay gần màn hình máy thu hình CRT hoặc khi sắp có cơn giông sét chuẩn bị đánh xuống mặt đất.',
    physicsNature: 'Đường sức điện là đường cong vẽ trong điện trường sao cho tiếp tuyến tại mỗi điểm trùng với phương của vectơ cường độ điện trường. Đường sức điện xuất phát từ điện tích dương và kết thúc ở điện tích âm (hoặc ở vô cùng).',
    coreFormulas: [
      {
        name: 'Định nghĩa Cường độ điện trường',
        expression: 'E = F / q (hay F = q · E)',
        description: 'Vectơ E cùng hướng với lực F khi q > 0; ngược hướng với lực F khi q < 0.',
        variables: [
          { symbol: 'E', meaning: 'Cường độ điện trường', unit: 'V/m hoặc N/C' },
          { symbol: 'F', meaning: 'Lực điện tác dụng lên điện tích thử q', unit: 'Newton (N)' },
          { symbol: 'q', meaning: 'Độ lớn điện tích thử', unit: 'Coulomb (C)' }
        ]
      },
      {
        name: 'Cường độ điện trường của điện tích điểm Q',
        expression: 'E = k · |Q| / (ε · r²)',
        description: 'Hướng ra xa nếu Q > 0; hướng về phía Q nếu Q < 0.',
        variables: [
          { symbol: 'Q', meaning: 'Điện tích nguồn tạo ra điện trường', unit: 'Coulomb (C)' },
          { symbol: 'r', meaning: 'Khoảng cách từ điểm khảo sát đến điện tích Q', unit: 'mét (m)' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một điện trường đều có cường độ E = 2000 V/m hướng thẳng đứng từ trên xuống dưới. Đặt vào trong điện trường một hạt bụi mang điện tích q = -5 · 10⁻⁹ C có khối lượng m. Lực điện trường tác dụng lên hạt bụi có phương, chiều và độ lớn như thế nào?',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'E = 2000 V/m hướng thẳng đứng xuống dưới. q = -5·10⁻⁹ C (điện tích âm).' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Phương, chiều và độ lớn của vectơ lực điện F.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'F = q · E. Về độ lớn: F = |q| · E.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Mối quan hệ giữa lực điện và cường độ điện trường tuân theo định nghĩa E = F/q.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'F = |-5 · 10⁻⁹| · 2000 = 5 · 10⁻⁹ · 2 · 10³.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'F = 10 · 10⁻⁶ N = 10⁻⁵ N = 0,01 mN.' },
        { stepNumber: 7, stepName: 'Xác định phương chiều', content: 'Vì q < 0 nên vectơ F ngược chiều với vectơ E. Do E hướng thẳng đứng xuống dưới, nên F có phương thẳng đứng hướng từ dưới lên trên.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Lực điện có phương thẳng đứng, chiều hướng lên trên, độ lớn F = 10⁻⁵ N.' }
      ]
    },
    commonMistakes: [
      'Quên rằng khi q < 0 thì lực điện F ngược chiều với cường độ điện trường E.',
      'Vẽ các đường sức điện cắt nhau (các đường sức điện trường tĩnh không bao giờ cắt nhau).'
    ],
    summary: [
      'Đường sức điện không khép kín: xuất phát từ điện tích (+) hoặc ở vô cùng, kết thúc ở điện tích (-) hoặc ở vô cùng.',
      'Nơi nào điện trường mạnh thì các đường sức điện vẽ dày đặc; nơi nào yếu thì vẽ thưa.',
      'Nguyên lý chồng chất điện trường: E_tổng = E₁ + E₂ + ... (cộng theo quy tắc hình bình hành).'
    ],
    relatedExperimentId: 'exp-electric-field-lines'
  },
  {
    id: 'bai-21',
    lessonNumber: 21,
    chapterId: 'chapter-3',
    chapterTitle: 'Chương III: Điện trường',
    title: 'Bài 21: Tụ điện',
    subtitle: 'Cấu tạo & Nguyên lý · Điện dung C = Q/U · Ghép tụ điện · Năng lượng điện trường',
    pageRange: 'Trang 84 - 89',
    quickGrasp: 'Tụ điện là hệ thống gồm hai vật dẫn đặt gần nhau và ngăn cách nhau bởi một lớp điện môi. Tụ điện dùng để chứa điện tích và tích luỹ năng lượng dưới dạng năng lượng điện trường.',
    realLifePhenomenon: 'Đèn flash trên điện thoại chớp sáng rực rỡ trong tích tắc nhờ tụ điện phóng toàn bộ năng lượng tích trữ trong thời gian cực ngắn, bàn phím máy tính cảm ứng điện dung nhận diện cú chạm ngón tay.',
    physicsNature: 'Khi đặt vào hai bản tụ một hiệu điện thế U, hai bản sẽ tích điện trái dấu cùng độ lớn Q. Điện dung C là hằng số đặc trưng cho khả năng tích điện của tụ ở một hiệu điện thế nhất định.',
    coreFormulas: [
      {
        name: 'Định nghĩa Điện dung của tụ điện',
        expression: 'C = Q / U',
        description: 'Điện dung phụ thuộc cấu tạo hình học và lớp điện môi của tụ, không phụ thuộc Q và U.',
        variables: [
          { symbol: 'C', meaning: 'Điện dung của tụ điện', unit: 'Farad (F), thường dùng µF, nF, pF' },
          { symbol: 'Q', meaning: 'Điện tích của tụ điện (độ lớn điện tích trên bản dương)', unit: 'Coulomb (C)' },
          { symbol: 'U', meaning: 'Hiệu điện thế giữa hai bản tụ', unit: 'Volt (V)' }
        ]
      },
      {
        name: 'Năng lượng điện trường dự trữ trong tụ điện',
        expression: 'W = ½ C · U² = ½ Q · U = ½ Q² / C',
        description: 'Năng lượng được lưu giữ trong không gian điện trường giữa hai bản cực của tụ điện.',
        variables: [
          { symbol: 'W', meaning: 'Năng lượng điện trường', unit: 'Joule (J)' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một tụ điện có điện dung C = 20 µF được nối vào nguồn điện có hiệu điện thế U = 12 V. Tính điện tích tích luỹ trên các bản tụ và năng lượng điện trường được tích trữ trong tụ điện.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'C = 20 µF = 20 · 10⁻⁶ F ; U = 12 V.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Điện tích Q và năng lượng điện trường W.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'Q = C · U và W = ½ C · U².' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Đây là các công thức cơ bản về mối liên hệ giữa điện tích, điện dung và năng lượng của tụ điện phẳng.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'Q = (20·10⁻⁶) · 12 ; W = 0,5 · (20·10⁻⁶) · 12².' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'Q = 240 · 10⁻⁶ C = 2,4 · 10⁻⁴ C = 0,24 mC. W = 10 · 10⁻⁶ · 144 = 1440 · 10⁻⁶ J = 1,44 · 10⁻³ J = 1,44 mJ.' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Q và W đều mang giá trị dương, phù hợp với tụ điện dân dụng trong các mạch điện tử.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Điện tích của tụ điện là Q = 2,4 · 10⁻⁴ C (0,24 mC). Năng lượng điện trường tích trữ là W = 1,44 mJ.' }
      ]
    },
    commonMistakes: [
      'Quên đổi đơn vị điện dung: 1 µF = 10⁻⁶ F ; 1 nF = 10⁻⁹ F ; 1 pF = 10⁻¹² F.',
      'Cho rằng điện dung C tăng lên khi hiệu điện thế U tăng (C là hằng số cấu tạo của tụ; khi U tăng thì điện tích Q tăng theo tỉ lệ thuận để tỉ số Q/U không đổi).'
    ],
    summary: [
      'Điện dung C của tụ điện phẳng: C = ε · S / (4π · k · d).',
      'Ghép tụ song song: C_bộ = C₁ + C₂ + ... (tăng điện dung).',
      'Ghép tụ nối tiếp: 1/C_bộ = 1/C₁ + 1/C₂ + ... (tăng khả năng chịu hiệu điện thế).'
    ],
    relatedExperimentId: 'exp-capacitor-charge'
  },

  // --- CHƯƠNG IV: DÒNG ĐIỆN. MẠCH ĐIỆN ---
  {
    id: 'bai-22',
    lessonNumber: 22,
    chapterId: 'chapter-4',
    chapterTitle: 'Chương IV: Dòng điện. Mạch điện',
    title: 'Bài 22: Cường độ dòng điện',
    subtitle: 'Hạt mang điện tự do · Tốc độ trôi của electron · Biểu thức I = n·S·e·v',
    pageRange: 'Trang 90 - 95',
    quickGrasp: 'Cường độ dòng điện là đại lượng đặc trưng cho tác dụng mạnh hay yếu của dòng điện, được đo bằng lượng điện tích dịch chuyển qua tiết diện thẳng của vật dẫn trong một đơn vị thời gian. Trong kim loại, dòng điện là dòng các electron tự do dịch chuyển ngược chiều điện trường.',
    realLifePhenomenon: 'Khi bật công tắc đèn, bóng đèn sáng gần như tức thời (vận tốc truyền điện trường xấp xỉ tốc độ ánh sáng c ≈ 300.000 km/s), mặc dù tốc độ dịch chuyển có hướng thực tế của từng electron tự do rất chậm (chỉ cỡ vài phần mười milimét mỗi giây).',
    physicsNature: 'Dưới tác dụng của điện trường ngoài, các electron vừa chuyển động nhiệt hỗn loạn với tốc độ rất lớn (~10⁶ m/s), vừa trôi dạt có hướng với tốc độ trung bình v (~10⁻⁴ m/s). Tốc độ trôi v này tạo nên cường độ dòng điện.',
    coreFormulas: [
      {
        name: 'Định nghĩa Cường độ dòng điện',
        expression: 'I = q / t (hoặc I = Δq / Δt)',
        description: 'Dòng điện không đổi có cường độ và chiều không thay đổi theo thời gian.',
        variables: [
          { symbol: 'I', meaning: 'Cường độ dòng điện', unit: 'Ampe (A)' },
          { symbol: 'q', meaning: 'Lượng điện lượng chuyển qua tiết diện', unit: 'Coulomb (C)' },
          { symbol: 't', meaning: 'Khoảng thời gian khảo sát', unit: 'giây (s)' }
        ]
      },
      {
        name: 'Liên hệ giữa dòng điện và tốc độ trôi của hạt mang điện',
        expression: 'I = n · S · e · v',
        description: 'Giải thích bản chất vi mô của dòng điện trong dây kim loại.',
        variables: [
          { symbol: 'n', meaning: 'Mật độ electron tự do', unit: 'hạt/m³' },
          { symbol: 'S', meaning: 'Tiết diện thẳng của dây dẫn', unit: 'm²' },
          { symbol: 'e', meaning: 'Độ lớn điện tích nguyên tố (e = 1,6 · 10⁻¹⁹)', unit: 'Coulomb (C)' },
          { symbol: 'v', meaning: 'Tốc độ dịch chuyển có hướng (tốc độ trôi)', unit: 'm/s' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một dây dẫn bằng đồng có tiết diện S = 1 mm² có dòng điện không đổi I = 2 A chạy qua. Cho biết mật độ electron tự do trong đồng là n = 8,5 · 10²⁸ electron/m³. Tính tốc độ trôi của các electron trong dây dẫn.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'S = 1 mm² = 10⁻⁶ m² ; I = 2 A ; n = 8,5 · 10²⁸ m⁻³ ; e = 1,6 · 10⁻¹⁹ C.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Tốc độ dịch chuyển có hướng v của electron.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'I = n · S · e · v => v = I / (n · S · e).' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Công thức này kết nối giữa cường độ dòng điện vĩ mô I với chuyển động vi mô của các hạt tải điện.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'v = 2 / [(8,5 · 10²⁸) · 10⁻⁶ · (1,6 · 10⁻¹⁹)].' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'Mẫu số = 8,5 · 1,6 · 10³ = 13,6 · 10³ = 13600. v = 2 / 13600 ≈ 1,47 · 10⁻⁴ m/s ≈ 0,147 mm/s.' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Tốc độ trôi rất nhỏ (cỡ 0,15 mm/s), hoàn toàn phù hợp với lý thuyết chuyển động electron trong kim loại.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Tốc độ trôi có hướng của các electron là v ≈ 1,47 · 10⁻⁴ m/s (khoảng 0,15 mm/s).' }
      ]
    },
    commonMistakes: [
      'Quên đổi đơn vị tiết diện S từ mm² sang m² (1 mm² = 10⁻⁶ m²).',
      'Nhầm lẫn giữa tốc độ truyền tương tác điện (tốc độ ánh sáng c) với tốc độ trôi của các electron (chỉ vài phần mười mm/s).'
    ],
    summary: [
      'Quy ước chiều dòng điện: là chiều chuyển động của các điện tích dương (ngược chiều chuyển động của electron trong kim loại).',
      'Cường độ dòng điện là đại lượng vô hướng nhưng có thể mang dấu tuỳ theo chiều chọn.',
      'Dụng cụ đo: Ampe kế (mắc nối tiếp với đoạn mạch cần đo).'
    ],
    relatedExperimentId: 'exp-battery-internal-resistance'
  },
  {
    id: 'bai-24',
    lessonNumber: 24,
    chapterId: 'chapter-4',
    chapterTitle: 'Chương IV: Dòng điện. Mạch điện',
    title: 'Bài 24: Nguồn điện',
    subtitle: 'Suất điện động ℰ · Điện trở trong r · Định luật Ohm cho toàn mạch',
    pageRange: 'Trang 101 - 106',
    quickGrasp: 'Nguồn điện tạo ra và duy trì hiệu điện thế giữa hai cực nhờ lực lạ tách các điện tích. Suất điện động ℰ đặc trưng cho khả năng sinh công của nguồn điện. Khi có dòng điện chạy qua, hiệu điện thế giữa hai cực của nguồn là U = ℰ - I·r.',
    realLifePhenomenon: 'Khi bạn đề nổ xe máy hoặc xe hơi, đèn pha bỗng tối nhẹ trong chốc lát: do động cơ khởi động rút dòng điện I rất lớn, làm độ giảm thế I·r trong acquy tăng vọt, kéo tụt hiệu điện thế ngoài U cấp cho bóng đèn.',
    physicsNature: 'Lực lạ bên trong nguồn điện (lực hoá học, quang điện...) thực hiện công ngược chiều lực tĩnh điện, đưa các điện tích dương về cực dương và điện tích âm về cực âm.',
    coreFormulas: [
      {
        name: 'Định nghĩa Suất điện động của nguồn',
        expression: 'ℰ = A_lạ / q',
        description: 'Công của lực lạ dịch chuyển một đơn vị điện tích dương ngược chiều điện trường bên trong nguồn.',
        variables: [
          { symbol: 'ℰ', meaning: 'Suất điện động của nguồn điện', unit: 'Volt (V)' },
          { symbol: 'A_lạ', meaning: 'Công của lực lạ', unit: 'Joule (J)' },
          { symbol: 'q', meaning: 'Điện lượng dịch chuyển', unit: 'Coulomb (C)' }
        ]
      },
      {
        name: 'Định luật Ohm cho toàn mạch kín',
        expression: 'I = ℰ / (R_ngoài + r)',
        description: 'Cường độ dòng điện chạy trong mạch kín tỉ lệ thuận với suất điện động của nguồn và tỉ lệ nghịch với điện trở toàn phần của mạch.',
        variables: [
          { symbol: 'I', meaning: 'Cường độ dòng điện trong mạch', unit: 'Ampe (A)' },
          { symbol: 'R_ngoài', meaning: 'Điện trở tương đương mạch ngoài', unit: 'Ohm (Ω)' },
          { symbol: 'r', meaning: 'Điện trở trong của nguồn điện', unit: 'Ohm (Ω)' }
        ]
      },
      {
        name: 'Hiệu điện thế mạch ngoài',
        expression: 'U = ℰ - I · r = I · R_ngoài',
        description: 'Khi mạch hở (I = 0), hiệu điện thế giữa hai cực của nguồn điện bằng đúng suất điện động ℰ.',
        variables: [
          { symbol: 'U', meaning: 'Hiệu điện thế hai cực nguồn điện', unit: 'Volt (V)' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Một nguồn điện có suất điện động ℰ = 12 V và điện trở trong r = 1 Ω được mắc với một điện trở mạch ngoài R = 5 Ω thành một mạch kín. Tính cường độ dòng điện chạy trong mạch và hiệu điện thế giữa hai cực của nguồn điện.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'ℰ = 12 V ; r = 1 Ω ; R_ngoài = 5 Ω.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Cường độ dòng điện I và hiệu điện thế mạch ngoài U.' },
        { stepNumber: 3, stepName: 'Chọn công thức', content: 'Định luật Ohm cho toàn mạch: I = ℰ / (R + r) và U = I · R (hoặc U = ℰ - I·r).' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Mạch là một vòng kín thuần điện trở nối với một nguồn điện có điện trở trong r.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'I = 12 / (5 + 1). U = I · 5.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'I = 12 / 6 = 2 A. U = 2 · 5 = 10 V (hoặc U = 12 - 2·1 = 10 V).' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Hiệu điện thế ngoài U = 10 V nhỏ hơn suất điện động ℰ = 12 V một lượng đúng bằng độ giảm thế trong nguồn I·r = 2 V.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Cường độ dòng điện trong mạch là I = 2 A. Hiệu điện thế giữa hai cực của nguồn là U = 10 V.' }
      ]
    },
    commonMistakes: [
      'Đoản mạch (ngắn mạch) khi R_ngoài ≈ 0, dòng điện tăng vọt I_max = ℰ / r có thể gây cháy nổ, hỏng pin.',
      'Quên tính điện trở trong r của nguồn khi tính dòng điện toàn mạch.'
    ],
    summary: [
      'Hiệu điện thế mạch ngoài: U = ℰ - I·r. Khi I tăng thì U giảm.',
      'Đồ thị U theo I là một đoạn thẳng dốc xuống cắt trục tung tại điểm U = ℰ và có hệ số góc bằng -r.',
      'Hiện tượng đoản mạch: xảy ra khi hai cực nguồn nối trực tiếp bằng dây dẫn có điện trở không đáng kể.'
    ],
    relatedExperimentId: 'exp-battery-internal-resistance'
  },
  {
    id: 'bai-26',
    lessonNumber: 26,
    chapterId: 'chapter-4',
    chapterTitle: 'Chương IV: Dòng điện. Mạch điện',
    title: 'Bài 26: Thực hành: Đo suất điện động và điện trở trong của pin điện hoá',
    subtitle: 'Mạch đo vôn-ampe · Phương pháp đồ thị U - I · Sai số thực nghiệm',
    pageRange: 'Trang 110 - 114',
    quickGrasp: 'Bằng cách đo các cặp giá trị hiệu điện thế U và cường độ dòng điện I khi thay đổi giá trị biến trở R, ta vẽ được đồ thị đường đặc trưng U = f(I). Điểm cắt trục tung cho biết suất điện động ℰ, và độ dốc của đồ thị cho biết điện trở trong r của pin.',
    realLifePhenomenon: 'Cách các kỹ sư kiểm tra dung lượng và tình trạng chai pin của điện thoại hoặc ắc quy xe điện: đo điện trở trong r (pin càng chai, r càng lớn làm sụt áp nhanh khi tải nặng).',
    physicsNature: 'Định luật Ohm cho toàn mạch: U = ℰ - I·r là phương trình bậc nhất y = ax + b với y = U, x = I, tung độ gốc b = ℰ và hệ số góc a = -r.',
    coreFormulas: [
      {
        name: 'Phương trình hàm thực nghiệm',
        expression: 'U = ℰ - r · I',
        description: 'Phương pháp ngoại suy đồ thị: Khi I -> 0 thì U -> ℰ. Độ lớn hệ số góc: r = |ΔU / ΔI|.',
        variables: [
          { symbol: 'ℰ', meaning: 'Suất điện động của pin', unit: 'Volt (V)' },
          { symbol: 'r', meaning: 'Điện trở trong của pin', unit: 'Ohm (Ω)' },
          { symbol: 'U', meaning: 'Số chỉ của Vôn kế', unit: 'Volt (V)' },
          { symbol: 'I', meaning: 'Số chỉ của Ampe kế', unit: 'Ampe (A)' }
        ]
      }
    ],
    sampleExercise: {
      question: 'Trong bài thực hành, học sinh ghi được 2 cặp số liệu: Khi I₁ = 0,1 A thì U₁ = 1,45 V; Khi I₂ = 0,5 A thì U₂ = 1,25 V. Tính suất điện động ℰ và điện trở trong r của viên pin.',
      stepSolution: [
        { stepNumber: 1, stepName: 'Tóm tắt dữ kiện', content: 'Cặp 1: I₁ = 0,1 A, U₁ = 1,45 V. Cặp 2: I₂ = 0,5 A, U₂ = 1,25 V.' },
        { stepNumber: 2, stepName: 'Xác định đại lượng cần tìm', content: 'Suất điện động ℰ và điện trở trong r.' },
        { stepNumber: 3, stepName: 'Chọn hệ phương trình', content: 'Hệ phương trình U = ℰ - I·r: { 1,45 = ℰ - 0,1·r ; 1,25 = ℰ - 0,5·r }.' },
        { stepNumber: 4, stepName: 'Giải thích vì sao dùng công thức', content: 'Dựa trên phương trình định luật Ohm cho mạch hở có tải phụ thuộc tuyến tính.' },
        { stepNumber: 5, stepName: 'Biến đổi biểu thức', content: 'Lấy phương trình (1) trừ phương trình (2): 1,45 - 1,25 = (-0,1 - (-0,5))·r => 0,20 = 0,4·r => r = 0,20 / 0,4.' },
        { stepNumber: 6, stepName: 'Thay số và tính toán', content: 'r = 0,5 Ω. Thay r vào phương trình (1): ℰ = 1,45 + 0,1 · 0,5 = 1,45 + 0,05 = 1,50 V.' },
        { stepNumber: 7, stepName: 'Kiểm tra tính hợp lý', content: 'Suất điện động ℰ = 1,5 V đúng bằng thông số danh định của pin tiểu AA thông thường. r = 0,5 Ω là hợp lý cho pin mới.' },
        { stepNumber: 8, stepName: 'Kết luận', content: 'Viên pin có suất điện động ℰ = 1,50 V và điện trở trong r = 0,5 Ω.' }
      ]
    },
    commonMistakes: [
      'Để biến trở ở giá trị quá nhỏ khi đóng khoá K làm đoản mạch pin gây nóng và hỏng Ampe kế.',
      'Đọc sai thang đo trên đồng hồ đo điện đa năng hiện kim.'
    ],
    summary: [
      'Vôn kế mắc song song với hai cực của nguồn điện (điện trở Vôn kế rất lớn R_V -> ∞).',
      'Ampe kế mắc nối tiếp với mạch ngoài (điện trở Ampe kế rất nhỏ R_A -> 0).',
      'Đồ thị U - I là phương pháp trực quan và chính xác nhất để loại trừ sai số ngẫu nhiên.'
    ],
    relatedExperimentId: 'exp-battery-internal-resistance'
  }
];

export const GRADE_11_SEARCH_DATABASE = [
  // Lessons
  { id: 's-l1', title: 'Bài 1: Dao động điều hoà', category: 'Bài học' as const, description: 'Phương trình x = A·cos(ωt + φ), chu kỳ, tần số và pha ban đầu', route: '/vat-ly-11/chapter-1/bai-1', chapterTag: 'Chương I' },
  { id: 's-l2', title: 'Bài 2: Mô tả dao động điều hoà', category: 'Bài học' as const, description: 'Đồ thị x-t, vòng tròn lượng giác, độ lệch pha', route: '/vat-ly-11/chapter-1/bai-2', chapterTag: 'Chương I' },
  { id: 's-l3', title: 'Bài 3: Vận tốc, gia tốc dao động', category: 'Bài học' as const, description: 'v = x\', a = v\' = -ω²x, hệ thức độc lập A² = x² + (v/ω)²', route: '/vat-ly-11/chapter-1/bai-3', chapterTag: 'Chương I' },
  { id: 's-l5', title: 'Bài 5: Động năng & Thế năng dao động', category: 'Bài học' as const, description: 'Sự chuyển hoá năng lượng và cơ năng bảo toàn W = ½ kA²', route: '/vat-ly-11/chapter-1/bai-5', chapterTag: 'Chương I' },
  { id: 's-l6', title: 'Bài 6: Dao động tắt dần & Cộng hưởng', category: 'Bài học' as const, description: 'Điều kiện cộng hưởng f = f₀, hiện tượng dao động cưỡng bức', route: '/vat-ly-11/chapter-1/bai-6', chapterTag: 'Chương I' },
  { id: 's-l8', title: 'Bài 8: Mô tả sóng', category: 'Bài học' as const, description: 'Quá trình lan truyền pha dao động, bước sóng λ = v·T', route: '/vat-ly-11/chapter-2/bai-8', chapterTag: 'Chương II' },
  { id: 's-l9', title: 'Bài 9: Sóng ngang & Sóng dọc', category: 'Bài học' as const, description: 'Môi trường truyền sóng, cường độ sóng I = P/S', route: '/vat-ly-11/chapter-2/bai-9', chapterTag: 'Chương II' },
  { id: 's-l12', title: 'Bài 12: Giao thoa sóng', category: 'Bài học' as const, description: 'Hai nguồn kết hợp, vị trí cực đại d₂ - d₁ = kλ, cực tiểu (k + 0.5)λ', route: '/vat-ly-11/chapter-2/bai-12', chapterTag: 'Chương II' },
  { id: 's-l13', title: 'Bài 13: Sóng dừng', category: 'Bài học' as const, description: 'Nút sóng, bụng sóng, điều kiện hai đầu cố định L = k·λ/2', route: '/vat-ly-11/chapter-2/bai-13', chapterTag: 'Chương II' },
  { id: 's-l16', title: 'Bài 16: Định luật Coulomb', category: 'Bài học' as const, description: 'Lực tương tác giữa hai điện tích F = k·|q₁q₂|/(ε·r²)', route: '/vat-ly-11/chapter-3/bai-16', chapterTag: 'Chương III' },
  { id: 's-l17', title: 'Bài 17: Điện trường & Cường độ E', category: 'Bài học' as const, description: 'Đường sức điện, E = F/q = k·|Q|/(ε·r²)', route: '/vat-ly-11/chapter-3/bai-17', chapterTag: 'Chương III' },
  { id: 's-l21', title: 'Bài 21: Tụ điện & Năng lượng điện trường', category: 'Bài học' as const, description: 'Điện dung C = Q/U, năng lượng điện trường W = ½ CU²', route: '/vat-ly-11/chapter-3/bai-21', chapterTag: 'Chương III' },
  { id: 's-l22', title: 'Bài 22: Cường độ dòng điện', category: 'Bài học' as const, description: 'Bản chất vi mô, tốc độ trôi electron I = n·S·e·v', route: '/vat-ly-11/chapter-4/bai-22', chapterTag: 'Chương IV' },
  { id: 's-l24', title: 'Bài 24: Nguồn điện & Suất điện động', category: 'Bài học' as const, description: 'Định luật Ohm toàn mạch I = ℰ / (R + r), hiệu điện thế U = ℰ - Ir', route: '/vat-ly-11/chapter-4/bai-24', chapterTag: 'Chương IV' },
  { id: 's-l26', title: 'Bài 26: Thực hành đo ℰ và r của pin', category: 'Bài học' as const, description: 'Mạch đo vôn-ampe và phương pháp ngoại suy đồ thị U - I', route: '/vat-ly-11/chapter-4/bai-26', chapterTag: 'Chương IV' },

  // Formulas
  { id: 's-f1', title: 'Phương trình dao động điều hoà', category: 'Công thức' as const, description: 'x = A·cos(ωt + φ) — Đại lượng x, A, ω, φ', route: '/so-tay-vat-ly', chapterTag: 'Chương I' },
  { id: 's-f2', title: 'Hệ thức độc lập thời gian x và v', category: 'Công thức' as const, description: 'A² = x² + (v/ω)² — Tính biên độ không phụ thuộc thời gian', route: '/so-tay-vat-ly', chapterTag: 'Chương I' },
  { id: 's-f3', title: 'Cơ năng dao động điều hoà', category: 'Công thức' as const, description: 'W = ½ m·ω²·A² = ½ k·A² (bảo toàn khi không ma sát)', route: '/so-tay-vat-ly', chapterTag: 'Chương I' },
  { id: 's-f4', title: 'Công thức bước sóng', category: 'Công thức' as const, description: 'λ = v·T = v / f — Quãng đường sóng truyền trong 1 chu kỳ', route: '/so-tay-vat-ly', chapterTag: 'Chương II' },
  { id: 's-f5', title: 'Định luật Coulomb về tương tác tĩnh điện', category: 'Công thức' as const, description: 'F = k·|q₁q₂| / (ε·r²) với k = 9·10⁹ N·m²/C²', route: '/so-tay-vat-ly', chapterTag: 'Chương III' },
  { id: 's-f6', title: 'Định luật Ohm cho toàn mạch kín', category: 'Công thức' as const, description: 'I = ℰ / (R_ngoài + r) — Định luật bảo toàn năng lượng mạch', route: '/so-tay-vat-ly', chapterTag: 'Chương IV' },
  { id: 's-f7', title: 'Năng lượng tụ điện', category: 'Công thức' as const, description: 'W = ½ C·U² = ½ Q·U = ½ Q²/C', route: '/so-tay-vat-ly', chapterTag: 'Chương III' },

  // Experiments
  { id: 's-e1', title: 'Thí nghiệm ảo: Con lắc lò xo dao động', category: 'Thí nghiệm ảo' as const, description: 'Khảo sát tần số góc, chu kỳ và đồ thị li độ - thời gian x-t', route: '/thi-nghiem?id=exp-spring-harmonic', chapterTag: 'Chương I' },
  { id: 's-e2', title: 'Thí nghiệm ảo: Dao động tắt dần & Cộng hưởng', category: 'Thí nghiệm ảo' as const, description: 'Điều chỉnh ma sát và tần số ngoại lực cưỡng bức', route: '/thi-nghiem?id=exp-resonance', chapterTag: 'Chương I' },
  { id: 's-e3', title: 'Thí nghiệm ảo: Giao thoa sóng nước', category: 'Thí nghiệm ảo' as const, description: 'Mô phỏng 2 nguồn kết hợp, quan sát hệ vân cực đại & cực tiểu', route: '/thi-nghiem?id=exp-water-interference', chapterTag: 'Chương II' },
  { id: 's-e4', title: 'Thí nghiệm ảo: Sóng dừng trên sợi dây', category: 'Thí nghiệm ảo' as const, description: 'Thay đổi tần số tạo ra các bó sóng, quan sát nút và bụng sóng', route: '/thi-nghiem?id=exp-standing-waves', chapterTag: 'Chương II' },
  { id: 's-e5', title: 'Thí nghiệm ảo: Quan sát đường sức điện trường', category: 'Thí nghiệm ảo' as const, description: 'Điện tích điểm, lưỡng cực điện và điện trường đều', route: '/thi-nghiem?id=exp-electric-field-lines', chapterTag: 'Chương III' },
  { id: 's-e6', title: 'Thí nghiệm ảo: Tụ điện nạp & phóng điện', category: 'Thí nghiệm ảo' as const, description: 'Mô phỏng mạch nạp xả qua điện trở, đo điện áp và dòng điện', route: '/thi-nghiem?id=exp-capacitor-charge', chapterTag: 'Chương III' },
  { id: 's-e7', title: 'Thí nghiệm ảo: Đo ℰ và r của pin điện hoá', category: 'Thí nghiệm ảo' as const, description: 'Mạch đo vôn-ampe và vẽ đồ thị đặc trưng U-I trực tiếp', route: '/thi-nghiem?id=exp-battery-internal-resistance', chapterTag: 'Chương IV' },
  { id: 's-e8', title: 'Thí nghiệm ảo: Tán sắc ánh sáng qua lăng kính', category: 'Thí nghiệm ảo' as const, description: 'Quang học sóng, chiết suất phụ thuộc bước sóng và tán sắc 7 màu', route: '/thi-nghiem?id=exp-optics-prism', chapterTag: 'Chương II' }
];

export const GRADE_11_SEARCH_INDEX = GRADE_11_SEARCH_DATABASE;

