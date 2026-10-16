import { FormulaHandbookItem } from '../types';

export const FORMULA_HANDBOOK_DATA: FormulaHandbookItem[] = [
  // --- CHƯƠNG I: DAO ĐỘNG ---
  {
    id: 'f-1',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    lessonName: 'Bài 1: Dao động điều hoà',
    name: 'Phương trình li độ dao động điều hoà',
    expression: 'x = A · cos(ωt + φ)',
    meaning: 'Xác định toạ độ lệch của vật so với vị trí cân bằng tại thời điểm t.',
    variables: [
      { symbol: 'x', meaning: 'Li độ của vật', unit: 'm hoặc cm' },
      { symbol: 'A', meaning: 'Biên độ dao động (li độ cực đại, A > 0)', unit: 'm hoặc cm' },
      { symbol: 'ω', meaning: 'Tần số góc', unit: 'rad/s' },
      { symbol: 't', meaning: 'Thời gian', unit: 's' },
      { symbol: 'φ', meaning: 'Pha ban đầu', unit: 'rad' },
      { symbol: 'ωt + φ', meaning: 'Pha dao động', unit: 'rad' }
    ],
    condition: 'Bỏ qua mọi lực ma sát và lực cản của môi trường.',
    applicationTip: 'Khi bấm máy tính lượng giác, hãy chuyển máy tính sang chế độ Radian (chữ R trên màn hình).'
  },
  {
    id: 'f-2',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    lessonName: 'Bài 1: Dao động điều hoà',
    name: 'Tần số góc, Chu kỳ và Tần số',
    expression: 'ω = 2π / T = 2π · f',
    meaning: 'Liên hệ giữa thời gian thực hiện 1 dao động toàn phần và số dao động trong 1 giây.',
    variables: [
      { symbol: 'T', meaning: 'Chu kỳ dao động', unit: 'giây (s)' },
      { symbol: 'f', meaning: 'Tần số dao động', unit: 'Hertz (Hz)' },
      { symbol: 'ω', meaning: 'Tần số góc', unit: 'rad/s' }
    ],
    condition: 'Dao động tuần hoàn ổn định.',
    applicationTip: 'Nếu vật thực hiện được N dao động toàn phần trong thời gian Δt, thì chu kỳ T = Δt / N và tần số f = N / Δt.'
  },
  {
    id: 'f-3',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    lessonName: 'Bài 3: Vận tốc, gia tốc',
    name: 'Phương trình vận tốc tức thời',
    expression: 'v = x\' = -ωA · sin(ωt + φ) = ωA · cos(ωt + φ + π/2)',
    meaning: 'Vận tốc biến thiên điều hoà sớm pha π/2 so với li độ.',
    variables: [
      { symbol: 'v', meaning: 'Vận tốc tức thời', unit: 'm/s hoặc cm/s' },
      { symbol: 'v_max', meaning: 'Tốc độ cực đại (khi qua VTCB: v_max = ωA)', unit: 'm/s hoặc cm/s' }
    ],
    condition: 'Áp dụng cho mọi thời điểm trong dao động điều hoà.',
    applicationTip: 'Khi vật chuyển động theo chiều dương thì v > 0 (tương ứng pha dao động nằm ở nửa dưới vòng tròn); chiều âm thì v < 0.'
  },
  {
    id: 'f-4',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    lessonName: 'Bài 3: Vận tốc, gia tốc',
    name: 'Phương trình gia tốc tức thời',
    expression: 'a = v\' = -ω² · x = ω²A · cos(ωt + φ + π)',
    meaning: 'Gia tốc ngược pha với li độ, luôn hướng về vị trí cân bằng.',
    variables: [
      { symbol: 'a', meaning: 'Gia tốc tức thời', unit: 'm/s² hoặc cm/s²' },
      { symbol: 'a_max', meaning: 'Gia tốc cực đại (ở biên: a_max = ω²A)', unit: 'm/s² hoặc cm/s²' }
    ],
    condition: 'Dao động điều hoà tự do.',
    applicationTip: 'Dấu trừ biểu thị vectơ gia tốc luôn ngược chiều với vectơ li độ x (hướng kéo về).'
  },
  {
    id: 'f-5',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    lessonName: 'Bài 3: Vận tốc, gia tốc',
    name: 'Hệ thức độc lập với thời gian giữa x và v',
    expression: 'A² = x² + (v / ω)²',
    meaning: 'Xác định biên độ dao động khi biết li độ x và vận tốc v tại cùng một thời điểm.',
    variables: [
      { symbol: 'A', meaning: 'Biên độ dao động', unit: 'cm hoặc m' },
      { symbol: 'x', meaning: 'Li độ tức thời', unit: 'cm hoặc m' },
      { symbol: 'v', meaning: 'Vận tốc tức thời', unit: 'cm/s hoặc m/s' }
    ],
    condition: 'x và v phải cùng đơn vị đo chiều dài (cùng cm hoặc cùng m).',
    applicationTip: 'Từ hệ thức này: v = ± ω · √(A² - x²). Lấy dấu (+) khi vật đi theo chiều dương, dấu (-) khi vật đi theo chiều âm.'
  },
  {
    id: 'f-6',
    chapterId: 'chapter-1',
    chapterName: 'Chương I: Dao động',
    lessonName: 'Bài 5: Năng lượng dao động',
    name: 'Cơ năng của vật dao động điều hoà',
    expression: 'W = W_đ + W_t = ½ m · ω² · A² = ½ k · A²',
    meaning: 'Tổng động năng và thế năng là hằng số bảo toàn, tỉ lệ với bình phương biên độ.',
    variables: [
      { symbol: 'W', meaning: 'Cơ năng toàn phần', unit: 'Joule (J)' },
      { symbol: 'm', meaning: 'Khối lượng vật nặng', unit: 'kg' },
      { symbol: 'k', meaning: 'Độ cứng con lắc lò xo (k = mω²)', unit: 'N/m' },
      { symbol: 'A', meaning: 'Biên độ dao động', unit: 'mét (m)' }
    ],
    condition: 'Lực cản môi trường không đáng kể (dao động không tắt dần).',
    applicationTip: 'BẮT BUỘC đổi khối lượng về kg và biên độ về mét (m) trước khi tính năng lượng Joules.'
  },

  // --- CHƯƠNG II: SÓNG ---
  {
    id: 'f-7',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    lessonName: 'Bài 8: Mô tả sóng',
    name: 'Mối liên hệ giữa Bước sóng, Vận tốc và Tần số',
    expression: 'λ = v · T = v / f',
    meaning: 'Bước sóng là quãng đường sóng truyền được trong một chu kỳ thời gian T.',
    variables: [
      { symbol: 'λ', meaning: 'Bước sóng', unit: 'mét (m)' },
      { symbol: 'v', meaning: 'Tốc độ truyền sóng', unit: 'm/s' },
      { symbol: 'T', meaning: 'Chu kỳ sóng', unit: 'giây (s)' },
      { symbol: 'f', meaning: 'Tần số sóng', unit: 'Hz' }
    ],
    condition: 'Sóng truyền trong môi trường đồng tính, tốc độ v không đổi.',
    applicationTip: 'Khi sóng truyền từ môi trường này sang môi trường khác, tần số f KHÔNG ĐỔI, chỉ có tốc độ v và bước sóng λ thay đổi.'
  },
  {
    id: 'f-8',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    lessonName: 'Bài 8: Mô tả sóng',
    name: 'Độ lệch pha giữa hai điểm trên cùng phương truyền sóng',
    expression: 'Δφ = 2π · d / λ',
    meaning: 'Mô tả trạng thái dao động của điểm trễ pha hơn so với điểm đến trước một khoảng d.',
    variables: [
      { symbol: 'Δφ', meaning: 'Độ lệch pha', unit: 'rad' },
      { symbol: 'd', meaning: 'Khoảng cách giữa hai điểm dọc theo tia sóng', unit: 'm hoặc cm' },
      { symbol: 'λ', meaning: 'Bước sóng', unit: 'm hoặc cm' }
    ],
    condition: 'Hai điểm cùng nằm trên một phương truyền sóng.',
    applicationTip: 'Cùng pha: d = k·λ ; Ngược pha: d = (k + 0.5)·λ ; Vuông pha: d = (k + 0.5)·λ/2.'
  },
  {
    id: 'f-9',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    lessonName: 'Bài 12: Giao thoa sóng',
    name: 'Điều kiện Cực đại và Cực tiểu giao thoa (hai nguồn cùng pha)',
    expression: 'Cực đại: d₂ - d₁ = k · λ | Cực tiểu: d₂ - d₁ = (k + ½) · λ',
    meaning: 'Xác định vị trí các đường gợn sóng tăng cường hoặc triệt tiêu lẫn nhau.',
    variables: [
      { symbol: 'd₁, d₂', meaning: 'Khoảng cách từ điểm đang xét đến hai nguồn kết hợp S₁, S₂', unit: 'm' },
      { symbol: 'k', meaning: 'Bậc giao thoa (số nguyên: 0, ±1, ±2...)', unit: 'nguyên' },
      { symbol: 'λ', meaning: 'Bước sóng', unit: 'm' }
    ],
    condition: 'Hai nguồn phải là hai nguồn kết hợp (cùng tần số, hiệu số pha không đổi theo thời gian).',
    applicationTip: 'Khoảng cách giữa hai cực đại liên tiếp trên đoạn nối hai nguồn bằng λ / 2.'
  },
  {
    id: 'f-10',
    chapterId: 'chapter-2',
    chapterName: 'Chương II: Sóng',
    lessonName: 'Bài 13: Sóng dừng',
    name: 'Điều kiện có sóng dừng trên dây hai đầu cố định',
    expression: 'L = k · (λ / 2) (với k = 1, 2, 3...)',
    meaning: 'Chiều dài dây bằng một số nguyên lần nửa bước sóng.',
    variables: [
      { symbol: 'L', meaning: 'Chiều dài dây', unit: 'm' },
      { symbol: 'k', meaning: 'Số bó sóng (số bụng sóng)', unit: 'nguyên dương' },
      { symbol: 'λ', meaning: 'Bước sóng', unit: 'm' }
    ],
    condition: 'Dây đàn hồi căng thẳng với hai đầu bị giữ chặt cố định.',
    applicationTip: 'Số nút sóng trên dây = k + 1 (tính cả 2 đầu cố định). Khoảng cách giữa 2 nút hoặc 2 bụng gần nhất là λ/2.'
  },

  // --- CHƯƠNG III: ĐIỆN TRƯỜNG ---
  {
    id: 'f-11',
    chapterId: 'chapter-3',
    chapterName: 'Chương III: Điện trường',
    lessonName: 'Bài 16: Lực tương tác điện tích',
    name: 'Định luật Coulomb về lực tĩnh điện',
    expression: 'F = k · |q₁ · q₂| / (ε · r²)',
    meaning: 'Lực hút hoặc đẩy giữa hai điện tích điểm đứng yên.',
    variables: [
      { symbol: 'F', meaning: 'Độ lớn lực tương tác tĩnh điện', unit: 'Newton (N)' },
      { symbol: 'k', meaning: 'Hằng số tĩnh điện (k = 9 · 10⁹)', unit: 'N·m²/C²' },
      { symbol: 'q₁, q₂', meaning: 'Điện tích của hai vật', unit: 'Coulomb (C)' },
      { symbol: 'r', meaning: 'Khoảng cách giữa hai điện tích', unit: 'mét (m)' },
      { symbol: 'ε', meaning: 'Hằng số điện môi (chân không ε = 1)', unit: 'không thứ nguyên' }
    ],
    condition: 'Áp dụng cho các điện tích điểm đứng yên.',
    applicationTip: 'Hai điện tích cùng dấu đẩy nhau, trái dấu hút nhau. Nhớ lấy trị tuyệt đối |q₁q₂|.'
  },
  {
    id: 'f-12',
    chapterId: 'chapter-3',
    chapterName: 'Chương III: Điện trường',
    lessonName: 'Bài 17: Cường độ điện trường',
    name: 'Cường độ điện trường do điện tích điểm Q gây ra',
    expression: 'E = k · |Q| / (ε · r²)',
    meaning: 'Đặc trưng cho tác dụng lực của điện trường tại điểm cách điện tích Q một đoạn r.',
    variables: [
      { symbol: 'E', meaning: 'Cường độ điện trường', unit: 'Volt trên mét (V/m)' },
      { symbol: 'Q', meaning: 'Điện tích nguồn tạo điện trường', unit: 'Coulomb (C)' },
      { symbol: 'r', meaning: 'Khoảng cách từ điện tích Q đến điểm khảo sát', unit: 'm' }
    ],
    condition: 'Điện tích nguồn là điện tích điểm trong môi trường đồng chất vô hạn.',
    applicationTip: 'Vectơ E hướng ra xa nếu Q > 0; hướng lại gần nếu Q < 0. Đơn vị 1 V/m = 1 N/C.'
  },
  {
    id: 'f-13',
    chapterId: 'chapter-3',
    chapterName: 'Chương III: Điện trường',
    lessonName: 'Bài 18: Điện trường đều',
    name: 'Mối liên hệ giữa Cường độ điện trường và Hiệu điện thế',
    expression: 'U = E · d (hay E = U / d)',
    meaning: 'Hiệu điện thế giữa hai điểm dọc theo đường sức trong điện trường đều.',
    variables: [
      { symbol: 'U', meaning: 'Hiệu điện thế giữa hai điểm', unit: 'Volt (V)' },
      { symbol: 'E', meaning: 'Cường độ điện trường đều', unit: 'V/m' },
      { symbol: 'd', meaning: 'Hình chiếu độ dời lên phương đường sức', unit: 'm' }
    ],
    condition: 'Áp dụng trong vùng điện trường đều (ví dụ: giữa hai bản tụ điện phẳng song song).',
    applicationTip: 'd mang dấu (+) nếu đi xuôi chiều đường sức, mang dấu (-) nếu đi ngược chiều đường sức.'
  },
  {
    id: 'f-14',
    chapterId: 'chapter-3',
    chapterName: 'Chương III: Điện trường',
    lessonName: 'Bài 21: Tụ điện',
    name: 'Điện dung và Năng lượng của tụ điện',
    expression: 'C = Q / U ; W = ½ C · U² = ½ Q · U = ½ Q² / C',
    meaning: 'Đặc trưng cho khả năng tích điện và năng lượng điện trường dự trữ trong tụ.',
    variables: [
      { symbol: 'C', meaning: 'Điện dung của tụ điện', unit: 'Farad (F)' },
      { symbol: 'Q', meaning: 'Điện tích của tụ điện', unit: 'Coulomb (C)' },
      { symbol: 'U', meaning: 'Hiệu điện thế giữa hai bản tụ', unit: 'Volt (V)' },
      { symbol: 'W', meaning: 'Năng lượng điện trường', unit: 'Joule (J)' }
    ],
    condition: 'Tụ điện chưa bị đánh thủng (U <= U_max).',
    applicationTip: 'Điện dung C phụ thuộc cấu tạo hình học của tụ, KHÔNG phụ thuộc Q và U.'
  },

  // --- CHƯƠNG IV: DÒNG ĐIỆN. MẠCH ĐIỆN ---
  {
    id: 'f-15',
    chapterId: 'chapter-4',
    chapterName: 'Chương IV: Dòng điện',
    lessonName: 'Bài 22: Cường độ dòng điện',
    name: 'Bản chất vi mô của dòng điện trong kim loại',
    expression: 'I = n · S · e · v',
    meaning: 'Kết nối cường độ dòng điện vĩ mô I với tốc độ trôi vi mô của các electron tự do.',
    variables: [
      { symbol: 'I', meaning: 'Cường độ dòng điện', unit: 'Ampe (A)' },
      { symbol: 'n', meaning: 'Mật độ hạt electron tự do', unit: 'hạt/m³' },
      { symbol: 'S', meaning: 'Tiết diện dây dẫn', unit: 'm²' },
      { symbol: 'e', meaning: 'Độ lớn điện tích nguyên tố (1,6 · 10⁻¹⁹)', unit: 'C' },
      { symbol: 'v', meaning: 'Tốc độ trôi của electron', unit: 'm/s' }
    ],
    condition: 'Áp dụng cho dòng điện không đổi trong dây dẫn kim loại đồng chất.',
    applicationTip: 'Chú ý đổi diện tích tiết diện S từ mm² sang m² bằng cách nhân với 10⁻⁶.'
  },
  {
    id: 'f-16',
    chapterId: 'chapter-4',
    chapterName: 'Chương IV: Dòng điện',
    lessonName: 'Bài 24: Nguồn điện',
    name: 'Định luật Ohm cho toàn mạch kín',
    expression: 'I = ℰ / (R_ngoài + r)',
    meaning: 'Cường độ dòng điện trong mạch kín tỉ lệ với suất điện động và tỉ lệ nghịch với điện trở toàn phần.',
    variables: [
      { symbol: 'I', meaning: 'Cường độ dòng điện toàn mạch', unit: 'Ampe (A)' },
      { symbol: 'ℰ', meaning: 'Suất điện động của nguồn điện', unit: 'Volt (V)' },
      { symbol: 'R_ngoài', meaning: 'Điện trở tương đương mạch ngoài', unit: 'Ohm (Ω)' },
      { symbol: 'r', meaning: 'Điện trở trong của nguồn điện', unit: 'Ohm (Ω)' }
    ],
    condition: 'Mạch điện kín một nguồn một nhánh (hoặc các điện trở ghép tương đương).',
    applicationTip: 'Khi mạch ngoài đoản mạch (R_ngoài = 0), dòng điện I_max = ℰ / r rất lớn, gây nguy hiểm cháy nổ.'
  },
  {
    id: 'f-17',
    chapterId: 'chapter-4',
    chapterName: 'Chương IV: Dòng điện',
    lessonName: 'Bài 24: Nguồn điện',
    name: 'Hiệu điện thế giữa hai cực của nguồn điện',
    expression: 'U = ℰ - I · r = I · R_ngoài',
    meaning: 'Hiệu điện thế mạch ngoài giảm đi so với suất điện động do độ giảm thế trong nguồn I·r.',
    variables: [
      { symbol: 'U', meaning: 'Hiệu điện thế mạch ngoài (độ giảm thế trên R_ngoài)', unit: 'Volt (V)' },
      { symbol: 'I · r', meaning: 'Độ giảm thế bên trong nguồn điện', unit: 'Volt (V)' }
    ],
    condition: 'Mạch có dòng điện I chạy qua.',
    applicationTip: 'Khi mạch hở (I = 0), Vôn kế nối vào hai cực của pin sẽ chỉ đúng giá trị suất điện động ℰ.'
  },
  {
    id: 'f-18',
    chapterId: 'chapter-4',
    chapterName: 'Chương IV: Dòng điện',
    lessonName: 'Bài 25: Năng lượng & Công suất',
    name: 'Công và Công suất điện của nguồn & của tải',
    expression: 'A_nguồn = ℰ · I · t ; P_tải = U · I = R · I² = U² / R',
    meaning: 'Chuyển hoá năng lượng điện thành các dạng năng lượng khác (nhiệt năng, cơ năng...).',
    variables: [
      { symbol: 'A_nguồn', meaning: 'Công của toàn nguồn điện sản sinh', unit: 'Joule (J)' },
      { symbol: 'P_tải', meaning: 'Công suất tiêu thụ điện của đoạn mạch', unit: 'Watt (W)' },
      { symbol: 't', meaning: 'Thời gian dòng điện chạy qua', unit: 'giây (s)' }
    ],
    condition: 'Đoạn mạch thuần điện trở áp dụng Joule-Lenz Q = R·I²·t.',
    applicationTip: '1 kWh = 1 "số điện" = 1000 W · 3600 s = 3.600.000 J (3,6 MJ).'
  }
];

export const FORMULA_HANDBOOK = FORMULA_HANDBOOK_DATA;

