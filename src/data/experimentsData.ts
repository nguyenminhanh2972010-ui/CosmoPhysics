import { VirtualExperimentItem } from '../types';

export const VIRTUAL_EXPERIMENTS_DATA: VirtualExperimentItem[] = [
  {
    id: 'exp-spring-harmonic',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    title: 'Khảo sát dao động điều hoà của con lắc lò xo',
    tagline: 'Mô phỏng động học & Đồ thị li độ - thời gian (x-t)',
    target: 'Khảo sát mối quan hệ giữa chu kỳ dao động T với khối lượng vật m và độ cứng lò xo k; quan sát sự chuyển hoá giữa động năng và thế năng.',
    theory: 'Chu kỳ dao động riêng của con lắc lò xo lý tưởng: T = 2π · √(m / k). Cơ năng toàn phần W = ½ k·A² được bảo toàn khi không có ma sát.',
    formulas: [
      'T = 2π · √(m / k)',
      'x(t) = A · cos(ωt + φ)',
      'W_đ = ½ m·v² ; W_t = ½ k·x² ; W = ½ k·A²'
    ],
    defaultParams: {
      mass: 0.2, // kg
      stiffness: 50, // N/m
      amplitude: 6, // cm
      friction: 0 // ma sát
    },
    paramControls: [
      { key: 'stiffness', label: 'Độ cứng lò xo (k)', unit: 'N/m', min: 10, max: 200, step: 5, defaultValue: 50 },
      { key: 'mass', label: 'Khối lượng vật (m)', unit: 'kg', min: 0.05, max: 1.0, step: 0.05, defaultValue: 0.2 },
      { key: 'amplitude', label: 'Biên độ ban đầu (A)', unit: 'cm', min: 2, max: 12, step: 0.5, defaultValue: 6 }
    ],
    conclusions: [
      'Chu kỳ T tỉ lệ thuận với căn bậc hai của khối lượng m và tỉ lệ nghịch với căn bậc hai của độ cứng k.',
      'Chu kỳ T và tần số f hoàn toàn KHÔNG phụ thuộc vào biên độ dao động A.',
      'Tại vị trí cân bằng, thế năng bằng 0 và động năng đạt cực đại; tại biên, động năng bằng 0 và thế năng cực đại.'
    ],
    quickQuiz: {
      question: 'Nếu tăng khối lượng vật nặng lên 4 lần và giữ nguyên độ cứng lò xo thì chu kỳ dao động của con lắc sẽ thay đổi thế nào?',
      options: [
        'Tăng 2 lần',
        'Giảm 2 lần',
        'Tăng 4 lần',
        'Không thay đổi'
      ],
      correctIndex: 0,
      explanation: 'Vì T = 2π·√(m/k), nên khi m tăng 4 lần thì √(m) tăng 2 lần, dẫn đến chu kỳ T tăng 2 lần.'
    }
  },
  {
    id: 'exp-simple-pendulum',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    title: 'Khảo sát dao động điều hoà của con lắc đơn',
    tagline: 'Chiều dài dây treo L, Gia tốc trọng trường g & Chu kỳ T',
    target: 'Nghiệm lại công thức chu kỳ con lắc đơn dao động với góc lệch nhỏ (α₀ <= 10°).',
    theory: 'Khi biên độ góc nhỏ (sin α ≈ α rad), con lắc đơn dao động điều hoà với chu kỳ T = 2π · √(L / g).',
    formulas: [
      'T = 2π · √(L / g)',
      's(t) = s₀ · cos(ωt + φ)',
      's₀ = L · α₀'
    ],
    defaultParams: {
      length: 1.0, // m
      gravity: 9.8, // m/s²
      angle: 8 // độ
    },
    paramControls: [
      { key: 'length', label: 'Chiều dài dây treo (L)', unit: 'm', min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
      { key: 'gravity', label: 'Gia tốc trọng trường (g)', unit: 'm/s²', min: 1.6, max: 25.0, step: 0.1, defaultValue: 9.8 },
      { key: 'angle', label: 'Góc lệch ban đầu (α₀)', unit: 'độ (°)', min: 2, max: 10, step: 1, defaultValue: 8 }
    ],
    conclusions: [
      'Chu kỳ dao động của con lắc đơn không phụ thuộc vào khối lượng của quả nặng m.',
      'Ở góc lệch nhỏ (dưới 10 độ), chu kỳ không phụ thuộc vào biên độ góc ban đầu.',
      'Đo chu kỳ T và chiều dài L cho phép xác định chính xác gia tốc trọng trường g tại một địa điểm.'
    ],
    quickQuiz: {
      question: 'Mang một con lắc đơn từ mặt đất lên Mặt Trăng (nơi có g_MT ≈ g_TĐ / 6) thì chu kỳ dao động của con lắc sẽ:',
      options: [
        'Tăng xấp xỉ √6 lần',
        'Giảm 6 lần',
        'Giảm √6 lần',
        'Không đổi vì chiều dài không đổi'
      ],
      correctIndex: 0,
      explanation: 'Vì T tỉ lệ nghịch với √g, gia tốc g trên Mặt Trăng nhỏ hơn 6 lần nên chu kỳ T sẽ tăng √6 lần (dao động chậm hơn).'
    }
  },
  {
    id: 'exp-resonance',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    title: 'Dao động cưỡng bức và Hiện tượng Cộng hưởng',
    tagline: 'Tần số ngoại lực f tiếp cận f₀ & Đỉnh biên độ cực đại',
    target: 'Quan sát sự thay đổi biên độ của hệ dao động khi tần số ngoại lực tuần hoàn thay đổi quét qua tần số riêng f₀.',
    theory: 'Hệ dao động với tần số của ngoại lực. Khi f_ngoại_lực = f₀, biên độ đạt cực đại. Hệ số cản môi trường càng nhỏ thì đỉnh cộng hưởng càng cao và nhọn.',
    formulas: [
      'Điều kiện cộng hưởng: f = f₀',
      'Đường cong cộng hưởng A(f)',
      'f₀ = 1 / (2π) · √(k / m)'
    ],
    defaultParams: {
      forceFreq: 1.0, // Hz
      systemFreq: 2.0, // Hz
      damping: 0.15 // cản
    },
    paramControls: [
      { key: 'forceFreq', label: 'Tần số ngoại lực (f)', unit: 'Hz', min: 0.2, max: 4.0, step: 0.05, defaultValue: 1.0 },
      { key: 'systemFreq', label: 'Tần số riêng của hệ (f₀)', unit: 'Hz', min: 1.0, max: 3.0, step: 0.1, defaultValue: 2.0 },
      { key: 'damping', label: 'Hệ số ma sát cản (b)', unit: 'N·s/m', min: 0.05, max: 0.8, step: 0.05, defaultValue: 0.15 }
    ],
    conclusions: [
      'Biên độ dao động đạt giá trị cực đại khi f = f₀.',
      'Khi ma sát càng nhỏ, biên độ tại cộng hưởng tăng vọt rất lớn.',
      'Khi f ở xa f₀, biên độ dao động cưỡng bức rất nhỏ bất kể lực kích thích mạnh.'
    ],
    quickQuiz: {
      question: 'Để tránh hiện tượng cộng hưởng nguy hiểm làm hư hại công trình khi xe cộ chạy qua cầu, các kỹ sư cần:',
      options: [
        'Thiết kế tần số riêng của cầu khác xa tần số dao động do các phương tiện gây ra',
        'Tăng tối đa biên độ dao động của cầu',
        'Làm cho tần số riêng của cầu trùng khít với tần số của gió',
        'Bỏ qua ma sát ở các mố cầu'
      ],
      correctIndex: 0,
      explanation: 'Khi tần số riêng khác xa tần số ngoại lực, hiện tượng cộng hưởng không xảy ra, biên độ rung nhỏ và an toàn cho công trình.'
    }
  },
  {
    id: 'exp-sound-frequency',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    title: 'Đo tần số sóng âm & Dao động kí điện tử',
    tagline: 'Màn hình hiển thị dạng sóng thời gian (Oscilloscope)',
    target: 'Đo chu kỳ thời gian T của tín hiệu âm thanh trên màn hình dao động kí, từ đó xác định tần số f = 1/T của nguồn âm thoa chuẩn.',
    theory: 'Mỗi ô ngang trên màn hình dao động kí ứng với một khoảng thời gian TIME/DIV chuẩn. Chu kỳ T = (Số ô cho 1 chu kỳ) × (TIME/DIV). Tần số f = 1/T.',
    formulas: [
      'T = n_ô · (TIME / DIV)',
      'f = 1 / T',
      'v = λ · f'
    ],
    defaultParams: {
      frequency: 440, // Nốt La chuẩn 440Hz
      timeDiv: 0.5, // ms/div
      volume: 75
    },
    paramControls: [
      { key: 'frequency', label: 'Tần số âm thoa (f)', unit: 'Hz', min: 100, max: 1000, step: 10, defaultValue: 440 },
      { key: 'timeDiv', label: 'Độ chia thời gian (TIME/DIV)', unit: 'ms/div', min: 0.2, max: 2.0, step: 0.1, defaultValue: 0.5 }
    ],
    conclusions: [
      'Sóng âm là sóng cơ tuần hoàn hình sin trong không khí.',
      'Tần số âm càng cao thì âm phát ra càng bổng (cao); tần số thấp thì âm trầm.',
      'Âm thoa chuẩn nốt La phát ra dao động đơn sắc có tần số đúng 440 Hz.'
    ],
    quickQuiz: {
      question: 'Trên màn hình dao động kí với núm TIME/DIV = 0,5 ms/div, một chu kỳ sóng âm chiếm đúng 4 ô ngang. Tần số của sóng âm này là:',
      options: [
        '500 Hz',
        '250 Hz',
        '1000 Hz',
        '2000 Hz'
      ],
      correctIndex: 0,
      explanation: 'Chu kỳ T = 4 ô × 0,5 ms = 2 ms = 0,002 s. Tần số f = 1 / T = 1 / 0,002 = 500 Hz.'
    }
  },
  {
    id: 'exp-water-interference',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    title: 'Giao thoa sóng cơ trên mặt nước',
    tagline: 'Hai nguồn kết hợp, Hệ vân cực đại & cực tiểu Hypebol',
    target: 'Quan sát hệ vân giao thoa ổn định của 2 nguồn cùng pha, khảo sát vị trí cực đại và cực tiểu theo bước sóng λ.',
    theory: 'Hai nguồn kết hợp S₁ và S₂ dao động cùng pha. Vị trí cực đại thoả mãn d₂ - d₁ = kλ; vị trí cực tiểu thoả mãn d₂ - d₁ = (k + 0.5)λ.',
    formulas: [
      'Cực đại: d₂ - d₁ = k · λ',
      'Cực tiểu: d₂ - d₁ = (k + ½) · λ',
      'Khoảng cách giữa hai cực đại liên tiếp trên S₁S₂ là λ / 2'
    ],
    defaultParams: {
      sourceDistance: 10, // cm
      wavelength: 2.0, // cm
      frequency: 20 // Hz
    },
    paramControls: [
      { key: 'sourceDistance', label: 'Khoảng cách hai nguồn (d)', unit: 'cm', min: 6, max: 16, step: 1, defaultValue: 10 },
      { key: 'wavelength', label: 'Bước sóng (λ)', unit: 'cm', min: 1.0, max: 4.0, step: 0.2, defaultValue: 2.0 }
    ],
    conclusions: [
      'Giao thoa là hiện tượng đặc trưng khẳng định bản chất sóng.',
      'Đường trung trực của đoạn nối hai nguồn cùng pha luôn là một đường cực đại trung tâm (k = 0).',
      'Các đường cực đại và cực tiểu còn lại là những họ đường hyperbol nhận S₁ và S₂ làm tiêu điểm.'
    ],
    quickQuiz: {
      question: 'Hai nguồn kết hợp cùng pha phát sóng có bước sóng λ = 3 cm. Một điểm M cách nguồn S₁ một đoạn 15 cm và cách S₂ một đoạn 21 cm sẽ dao động với:',
      options: [
        'Biên độ cực đại (bậc k = 2)',
        'Biên độ cực tiểu (bậc k = 2)',
        'Biên độ cực đại (bậc k = 3)',
        'Biên độ cực tiểu (bậc k = 1)'
      ],
      correctIndex: 0,
      explanation: 'Hiệu đường đi d₂ - d₁ = 21 - 15 = 6 cm. Ta có 6 cm = 2 × 3 cm = 2λ. Do là số nguyên lần bước sóng nên M dao động với biên độ cực đại bậc 2.'
    }
  },
  {
    id: 'exp-standing-waves',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    title: 'Sóng dừng trên sợi dây đàn hồi',
    tagline: 'Hai đầu cố định · Nút sóng · Bụng sóng · Các hoạ âm',
    target: 'Quan sát các bó sóng dừng trên sợi dây căng có hai đầu cố định khi thay đổi tần số dao động.',
    theory: 'Khi hai đầu dây cố định, sóng tới và sóng phản xạ gặp nhau tạo sóng dừng. Chiều dài dây L = k · (λ/2). Tần số tạo sóng dừng: f_k = k · v / (2L).',
    formulas: [
      'L = k · (λ / 2) (k là số bụng sóng)',
      'f_k = k · f₁ (hoạ âm bậc k)',
      'Khoảng cách giữa hai nút liên tiếp là λ / 2'
    ],
    defaultParams: {
      wireLength: 1.2, // m
      waveSpeed: 24, // m/s
      harmonicMode: 3 // k = 3 bụng
    },
    paramControls: [
      { key: 'wireLength', label: 'Chiều dài dây (L)', unit: 'm', min: 0.6, max: 2.0, step: 0.1, defaultValue: 1.2 },
      { key: 'harmonicMode', label: 'Số bụng sóng (k)', unit: 'bụng', min: 1, max: 6, step: 1, defaultValue: 3 }
    ],
    conclusions: [
      'Trên sợi dây hai đầu cố định, số nút sóng luôn bằng số bụng sóng cộng 1: N_nút = k + 1.',
      'Các điểm trong cùng một bó sóng luôn dao động cùng pha; hai điểm ở hai bó kề nhau dao động ngược pha.',
      'Các nút sóng luôn đứng yên với biên độ bằng 0.'
    ],
    quickQuiz: {
      question: 'Một sợi dây có hai đầu cố định đang có sóng dừng với 4 bụng sóng. Số nút sóng quan sát được trên toàn bộ chiều dài dây (kể cả hai đầu cố định) là:',
      options: [
        '5 nút',
        '4 nút',
        '3 nút',
        '8 nút'
      ],
      correctIndex: 0,
      explanation: 'Dây hai đầu cố định có k bụng thì có k + 1 nút. Với k = 4 bụng, số nút sóng là 4 + 1 = 5 nút.'
    }
  },
  {
    id: 'exp-electric-field-lines',
    chapterId: 'chapter-3',
    chapterName: 'Chương III: Điện trường',
    title: 'Quan sát đường sức điện trường tĩnh',
    tagline: 'Điện tích điểm, Lưỡng cực điện & Điện trường đều',
    target: 'Mô phỏng hình dạng các đường sức điện trường xung quanh các cấu hình điện tích khác nhau.',
    theory: 'Đường sức điện xuất phát từ điện tích dương, kết thúc ở điện tích âm. Tiếp tuyến với đường sức trùng phương vectơ E. Độ dày đặc của đường sức tỉ lệ với độ lớn E.',
    formulas: [
      'E = k · |Q| / (ε · r²)',
      'E_tổng = E₁ + E₂ (quy tắc hình bình hành)',
      'Điện trường đều: E = U / d = hằng số'
    ],
    defaultParams: {
      chargeMode: 1, // 1: lưỡng cực (+ và -); 2: cùng dấu (+ và +); 3: điện trường đều
      chargeMagnitude: 10 // nC
    },
    paramControls: [
      { key: 'chargeMagnitude', label: 'Độ lớn điện tích (|q|)', unit: 'nC', min: 2, max: 20, step: 2, defaultValue: 10 }
    ],
    conclusions: [
      'Các đường sức điện không bao giờ cắt nhau trong không gian điện trường tĩnh.',
      'Giữa hai bản kim loại phẳng tích điện trái dấu, các đường sức là những đoạn thẳng song song cách đều nhau (điện trường đều).',
      'Đường sức có chiều đi ra khỏi điện tích dương và đi vào điện tích âm.'
    ],
    quickQuiz: {
      question: 'Đặt một hạt electron (điện tích âm) không vận tốc đầu vào trong điện trường đều. Electron sẽ chuyển động:',
      options: [
        'Ngược chiều đường sức điện trường với gia tốc không đổi',
        'Cùng chiều đường sức điện trường với vận tốc không đổi',
        'Vuông góc với đường sức điện trường',
        'Đứng yên vì electron không chịu lực điện'
      ],
      correctIndex: 0,
      explanation: 'Vì lực điện F = q·E với q = -e < 0 nên lực F ngược chiều với E. Hạt chuyển động thẳng nhanh dần đều ngược chiều đường sức.'
    }
  },
  {
    id: 'exp-capacitor-charge',
    chapterId: 'chapter-3',
    chapterName: 'Chương III: Điện trường',
    title: 'Khảo sát nạp và phóng điện của tụ điện',
    tagline: 'Mạch RC: Điện áp U(t), Dòng điện I(t) & Hằng số thời gian τ',
    target: 'Quan sát quá trình tích luỹ điện tích khi đóng khoá K về nguồn và quá trình phóng năng lượng qua điện trở tải.',
    theory: 'Khi nạp điện, điện áp trên tụ tăng dần: U(t) = U₀ · (1 - e^(-t/RC)). Khi phóng điện, điện áp giảm theo hàm mũ: U(t) = U₀ · e^(-t/RC). Hằng số thời gian τ = R·C.',
    formulas: [
      'C = Q / U',
      'τ = R · C (hằng số thời gian mạch RC)',
      'W = ½ C · U²'
    ],
    defaultParams: {
      capacitance: 100, // µF
      resistance: 10, // kΩ
      voltageSource: 9 // V
    },
    paramControls: [
      { key: 'voltageSource', label: 'Điện áp nguồn (U₀)', unit: 'V', min: 3, max: 15, step: 1, defaultValue: 9 },
      { key: 'capacitance', label: 'Điện dung (C)', unit: 'µF', min: 20, max: 500, step: 20, defaultValue: 100 },
      { key: 'resistance', label: 'Điện trở nạp xả (R)', unit: 'kΩ', min: 2, max: 50, step: 2, defaultValue: 10 }
    ],
    conclusions: [
      'Tụ điện không cho dòng điện một chiều không đổi đi qua (khi đã nạp no, dòng nạp triệt tiêu về 0).',
      'Tụ điện phóng điện rất nhanh tạo xung dòng điện lớn, ứng dụng trong đèn flash và bộ khử rung tim.',
      'Năng lượng điện trường dự trữ tỉ lệ thuận với bình phương điện thế U².'
    ],
    quickQuiz: {
      question: 'Khi tụ điện đã được nạp no hoàn toàn vào nguồn một chiều, cường độ dòng điện trong mạch nạp bằng:',
      options: [
        '0 A',
        'U₀ / R',
        'C · U₀',
        'Vô cùng lớn'
      ],
      correctIndex: 0,
      explanation: 'Khi nạp no, điện thế hai bản tụ bằng điện áp nguồn (U_C = U₀), hiệu điện thế trên điện trở bằng 0 nên cường độ dòng điện trong mạch bằng 0.'
    }
  },
  {
    id: 'exp-battery-internal-resistance',
    chapterId: 'chapter-4',
    chapterName: 'Chương IV: Dòng điện',
    title: 'Đo suất điện động ℰ và điện trở trong r của pin',
    tagline: 'Phương pháp Vôn-Ampe và đường đặc trưng ngoại suy U - I',
    target: 'Lắp ráp mạch đo thực tế, thay đổi biến trở R để thu thập cặp số liệu (I, U), vẽ đường đồ thị U = ℰ - Ir xác định ℰ và r.',
    theory: 'Định luật Ohm cho toàn mạch: U = ℰ - I·r. Đồ thị U theo I là đoạn thẳng dốc xuống. Giao điểm với trục tung U khi I = 0 cho ta ℰ; độ dốc tuyệt đối của đoạn thẳng bằng r.',
    formulas: [
      'U = ℰ - r · I',
      'I = ℰ / (R_ngoài + r)',
      'r = |ΔU / ΔI|'
    ],
    defaultParams: {
      emf: 1.5, // V
      internalR: 0.6, // Ω
      resistor: 5 // Ω
    },
    paramControls: [
      { key: 'emf', label: 'Suất điện động danh nghĩa (ℰ)', unit: 'V', min: 1.2, max: 9.0, step: 0.1, defaultValue: 1.5 },
      { key: 'internalR', label: 'Điện trở trong của pin (r)', unit: 'Ω', min: 0.1, max: 2.0, step: 0.1, defaultValue: 0.6 },
      { key: 'resistor', label: 'Biến trở mạch ngoài (R)', unit: 'Ω', min: 1, max: 20, step: 0.5, defaultValue: 5 }
    ],
    conclusions: [
      'Hiệu điện thế giữa hai cực của nguồn luôn nhỏ hơn suất điện động khi có dòng điện chạy qua tải.',
      'Pin càng cũ hoặc kém chất lượng thì điện trở trong r càng lớn, làm điện áp bị tụt nhanh khi cấp dòng lớn.',
      'Phương pháp đồ thị giúp loại bỏ sai số ngẫu nhiên của từng lần đo cá biệt.'
    ],
    quickQuiz: {
      question: 'Khi mạch ngoài bị đoản mạch (R_ngoài = 0), cường độ dòng điện qua nguồn đạt giá trị:',
      options: [
        'I_max = ℰ / r (cực đại, nguy hiểm)',
        '0 A',
        'ℰ · r',
        'Không đổi so với khi có tải'
      ],
      correctIndex: 0,
      explanation: 'Khi R = 0, theo định luật Ohm I = ℰ / (0 + r) = ℰ / r. Do điện trở trong r rất nhỏ nên dòng điện tăng vọt cực lớn gây nguy cơ cháy nổ.'
    }
  },
  {
    id: 'exp-optics-prism',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    title: 'Tán sắc ánh sáng qua lăng kính & Định luật Snell',
    tagline: 'Quang học sóng: Khúc xạ, Chiết suất n theo màu & Dải cầu vồng 7 sắc',
    target: 'Quan sát hiện tượng tán sắc ánh sáng trắng qua lăng kính thuỷ tinh, kiểm chứng chiết suất của môi trường phụ thuộc bước sóng (n_tím > n_đỏ).',
    theory: 'Ánh sáng trắng là tập hợp vô số ánh sáng đơn sắc. Chiết suất thuỷ tinh tăng dần từ đỏ đến tím: n_đỏ < n_cam < n_vàng < ... < n_tím. Do đó tia tím bị lệch nhiều nhất, tia đỏ bị lệch ít nhất.',
    formulas: [
      'n₁ · sin(i₁) = n₂ · sin(r₁)',
      'A = r₁ + r₂ (góc chiết quang)',
      'D = i₁ + i₂ - A (góc lệch qua lăng kính)'
    ],
    defaultParams: {
      incidentAngle: 45, // độ
      prismAngle: 60, // độ
      glassTypeIndex: 1.52 // chiết suất trung bình
    },
    paramControls: [
      { key: 'incidentAngle', label: 'Góc tới tia sáng (i₁)', unit: 'độ (°)', min: 20, max: 75, step: 1, defaultValue: 45 },
      { key: 'prismAngle', label: 'Góc chiết quang (A)', unit: 'độ (°)', min: 30, max: 60, step: 5, defaultValue: 60 }
    ],
    conclusions: [
      'Ánh sáng trắng bị tách thành dải màu biến thiên liên tục từ đỏ đến tím.',
      'Góc lệch của tia sáng qua lăng kính: D_đỏ < D_cam < D_vàng < D_lục < D_lam < D_chàm < D_tím.',
      'Hiện tượng này giải thích nguồn gốc của cầu vồng sau cơn mưa trong tự nhiên.'
    ],
    quickQuiz: {
      question: 'Khi chùm ánh sáng trắng truyền qua lăng kính thuỷ tinh, tia sáng nào bị lệch nhiều nhất về phía đáy lăng kính?',
      options: [
        'Tia tím',
        'Tia đỏ',
        'Tia vàng',
        'Tất cả các tia bị lệch bằng nhau'
      ],
      correctIndex: 0,
      explanation: 'Vì chiết suất của thuỷ tinh đối với ánh sáng tím là lớn nhất (n_tím > n_đỏ) nên theo định luật khúc xạ, tia tím bị khúc xạ và lệch nhiều nhất về phía đáy.'
    }
  }
];
