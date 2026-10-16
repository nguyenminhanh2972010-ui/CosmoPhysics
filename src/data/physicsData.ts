import { FeatureItem, LearningCardItem, PhysicsTopicItem, SearchResultItem } from '../types';

export const QUICK_FEATURES: FeatureItem[] = [
  {
    id: 'easy-knowledge',
    icon: 'book',
    title: 'Kiến thức dễ hiểu',
    description: 'Biến lý thuyết khô khan thành những câu chuyện thú vị.'
  },
  {
    id: 'virtual-experiments',
    icon: 'flask',
    title: 'Thí nghiệm ảo sinh động',
    description: 'Trực quan hóa các hiện tượng Vật lý qua mô phỏng hiện đại.'
  },
  {
    id: 'mind-maps',
    icon: 'document',
    title: 'Cẩm nang & Sơ đồ tư duy',
    description: 'Tóm tắt ngắn gọn, dễ nhớ, hiệu quả cao.'
  },
  {
    id: 'step-by-step',
    icon: 'target',
    title: 'Bài giải chi tiết từng bước',
    description: 'Hiểu bản chất, nắm phương pháp, không học thuộc lòng.'
  },
  {
    id: 'free-for-all',
    icon: 'heart',
    title: 'Miễn phí cho học sinh',
    description: 'Cùng nhau lan tỏa tri thức, không thu hẹp khoảng cách.'
  }
];

export const LEARNING_CARDS: LearningCardItem[] = [
  {
    id: 'explore-world',
    title: 'Khám phá thế giới Vật lý',
    description: 'Từ những hiện tượng quen thuộc trong đời sống đến những bí ẩn của vũ trụ.',
    visualType: 'cosmic',
    badge: 'Khởi đầu tự nhiên',
    stats: '120+ Hiện tượng',
    tagline: 'Vũ trụ & Cuộc sống'
  },
  {
    id: 'virtual-labs',
    title: 'Thí nghiệm ảo & mô phỏng',
    description: 'Trực quan hóa kiến thức bằng các mô hình 3D và thí nghiệm sinh động.',
    visualType: 'simulation',
    badge: 'Tương tác trực tiếp',
    stats: '45+ Phòng thí nghiệm 3D',
    tagline: 'Mô phỏng chân thực'
  },
  {
    id: 'mind-maps-handbook',
    title: 'Sơ đồ tư duy & Cẩm nang học tập',
    description: 'Hệ thống hóa kiến thức nhanh chóng, logic, dễ nhớ, dễ ôn.',
    visualType: 'mindmap',
    badge: 'Tóm tắt trọng tâm',
    stats: '60+ Sơ đồ logic',
    tagline: 'Ghi nhớ bản chất'
  },
  {
    id: 'step-solutions',
    title: 'Bài giải chi tiết từng bước',
    description: 'Hiểu rõ bản chất, nắm vững phương pháp, tự tin làm bài.',
    visualType: 'equations',
    badge: 'Phương pháp chuẩn',
    stats: '500+ Dạng bài mẫu',
    tagline: 'Tự tin bứt phá'
  }
];

export const PHYSICS_TOPICS: PhysicsTopicItem[] = [
  {
    id: 'chapter-1',
    title: 'Chương I: Dao động',
    subtitle: 'Dao động điều hoà · Con lắc lò xo · Con lắc đơn · Năng lượng',
    grade: '11',
    keyConcepts: ['Dao động điều hoà & Phương trình li độ', 'Vận tốc, gia tốc & Pha dao động', 'Cơ năng con lắc lò xo & con lắc đơn', 'Dao động tắt dần & Hiện tượng cộng hưởng'],
    visualType: 'mechanics',
    summary: 'Nền tảng về chuyển động tuần hoàn: từ sự đu đưa êm ả của con lắc đơn, nhịp đập đàn hồi của lò xo đến cách phòng tránh hiện tượng cộng hưởng phá hủy công trình.',
    formulas: [
      { formula: 'x = A · cos(ωt + φ)', meaning: 'Phương trình li độ dao động điều hoà' },
      { formula: 'v = -ωA · sin(ωt + φ)', meaning: 'Vận tốc biến thiên điều hoà sớm pha π/2 so với li độ' },
      { formula: 'a = -ω²x', meaning: 'Gia tốc luôn hướng về vị trí cân bằng và tỉ lệ thuận với li độ' },
      { formula: 'T = 2π · √(m/k) = 2π · √(l/g)', meaning: 'Chu kỳ dao động của con lắc lò xo và con lắc đơn' },
      { formula: 'W = ½ kA² = ½ mω²A²', meaning: 'Cơ năng bảo toàn trong dao động điều hoà' }
    ],
    interactiveDemoId: 'exp-oscillation'
  },
  {
    id: 'chapter-2',
    title: 'Chương II: Sóng',
    subtitle: 'Sóng cơ · Giao thoa · Sóng dừng · Sóng ánh sáng',
    grade: '11',
    keyConcepts: ['Sự truyền sóng cơ & Bước sóng', 'Hiện tượng giao thoa sóng cơ', 'Sóng dừng trên dây đàn', 'Khúc xạ, tán sắc & Giao thoa ánh sáng'],
    visualType: 'optics',
    summary: 'Bản chất sự lan truyền năng lượng dao động trong không gian: từ sóng âm thanh, sóng mặt nước đến giao thoa vân sáng tối khe Young khẳng định tính chất sóng của ánh sáng.',
    formulas: [
      { formula: 'λ = v · T = v / f', meaning: 'Mối liên hệ giữa bước sóng, tốc độ truyền sóng và chu kỳ/tần số' },
      { formula: 'd₂ - d₁ = k · λ (k ∈ ℤ)', meaning: 'Điều kiện cực đại giao thoa giữa hai nguồn kết hợp đồng pha' },
      { formula: 'L = k · (λ / 2)', meaning: 'Điều kiện xảy ra sóng dừng trên dây có hai đầu cố định' },
      { formula: 'i = (λ · D) / a', meaning: 'Khoảng cách giữa hai vân sáng hoặc hai vân tối liên tiếp (khe Young)' }
    ],
    interactiveDemoId: 'exp-waves'
  },
  {
    id: 'chapter-3',
    title: 'Chương III: Điện trường',
    subtitle: 'Lực tĩnh điện Coulomb · Cường độ điện trường · Thế năng · Tụ điện',
    grade: '11',
    keyConcepts: ['Định luật Coulomb về tương tác tĩnh điện', 'Cường độ điện trường & Đường sức điện', 'Công của lực điện & Điện thế, hiệu điện thế', 'Tụ điện & Năng lượng điện trường'],
    visualType: 'electromagnetism',
    summary: 'Thế giới vi mô của các hạt mang điện: lực hút - đẩy giữa các điện tích điểm, véc tơ cường độ điện trường và khả năng tích trữ năng lượng tĩnh điện trong tụ điện.',
    formulas: [
      { formula: 'F = k · |q₁·q₂| / (ε · r²)', meaning: 'Định luật Coulomb (k = 9·10⁹ N·m²/C²)' },
      { formula: 'E = F / |q| = k · |Q| / (ε · r²)', meaning: 'Cường độ điện trường do điện tích điểm Q gây ra' },
      { formula: 'A = q · E · d = q · U', meaning: 'Công của lực điện trường dịch chuyển điện tích q' },
      { formula: 'C = Q / U', meaning: 'Điện dung của tụ điện đặc trưng cho khả năng tích điện' }
    ],
    interactiveDemoId: 'exp-electric'
  },
  {
    id: 'chapter-4',
    title: 'Chương IV: Dòng điện & Mạch điện',
    subtitle: 'Dòng điện không đổi · Suất điện động · Định luật Ohm toàn mạch',
    grade: '11',
    keyConcepts: ['Cường độ dòng điện & Mật độ dòng điện', 'Nguồn điện, suất điện động & Điện trở trong', 'Định luật Ohm cho toàn mạch kín', 'Năng lượng, công suất điện & Định luật Joule - Lenz'],
    visualType: 'thermodynamics',
    summary: 'Dòng chuyển dời có hướng của các điện tích tự do: nguồn sinh ra dòng điện, định luật Ohm toàn mạch chi phối các mạch kín và các định luật nhiệt lượng Joule - Lenz.',
    formulas: [
      { formula: 'I = q / t = n · S · v · |e|', meaning: 'Định nghĩa cường độ dòng điện' },
      { formula: 'I = ℰ / (R_N + r)', meaning: 'Định luật Ohm cho toàn mạch kín có nguồn (ℰ, r)' },
      { formula: 'U_N = ℰ - I · r = I · R_N', meaning: 'Hiệu điện thế mạch ngoài' },
      { formula: 'Q = I² · R · t', meaning: 'Nhiệt lượng tỏa ra trên điện trở (Định luật Joule - Lenz)' },
      { formula: 'P = U · I = ℰ · I', meaning: 'Công suất tiêu thụ và công suất toàn phần của nguồn điện' }
    ],
    interactiveDemoId: 'exp-circuit'
  }
];

export const SEARCH_DATABASE: SearchResultItem[] = [
  { id: 's-1', title: 'Phương trình dao động điều hoà x = A·cos(ωt + φ)', category: 'Công thức', description: 'Li độ, biên độ, tần số góc và pha ban đầu trong Dao động điều hoà', targetId: 'chapter-1' },
  { id: 's-2', title: 'Chu kỳ và cơ năng của con lắc lò xo', category: 'Chủ đề', description: 'T = 2π√(m/k) và công thức bảo toàn cơ năng W = ½ kA²', targetId: 'chapter-1' },
  { id: 's-3', title: 'Thí nghiệm ảo con lắc đơn & Cộng hưởng cơ', category: 'Thí nghiệm ảo', description: 'Mô phỏng thay đổi chiều dài dây, gia tốc g và hiện tượng biên độ cực đại', targetId: 'chapter-1' },
  { id: 's-4', title: 'Hiện tượng giao thoa sóng cơ trên mặt nước', category: 'Chủ đề', description: 'Hai nguồn kết hợp, vị trí vân cực đại và cực tiểu giao thoa', targetId: 'chapter-2' },
  { id: 's-5', title: 'Thí nghiệm giao thoa ánh sáng khe Young', category: 'Thí nghiệm ảo', description: 'Xác định bước sóng ánh sáng λ thông qua đo khoảng vân i', targetId: 'chapter-2' },
  { id: 's-6', title: 'Sóng dừng trên sợi dây đàn hồi', category: 'Công thức', description: 'L = k·λ/2 đối với hai đầu cố định, xác định nút và bụng sóng', targetId: 'chapter-2' },
  { id: 's-7', title: 'Định luật Coulomb về tương tác tĩnh điện', category: 'Công thức', description: 'F = k·|q₁q₂|/(ε·r²) giữa hai điện tích điểm đặt trong điện môi', targetId: 'chapter-3' },
  { id: 's-8', title: 'Điện trường đều & Tụ điện phẳng', category: 'Chủ đề', description: 'Véc tơ E, công lực điện A = qEd và điện dung C = Q/U', targetId: 'chapter-3' },
  { id: 's-9', title: 'Định luật Ohm cho toàn mạch kín', category: 'Công thức', description: 'I = ℰ/(R_N + r) — Quan hệ giữa suất điện động và điện trở trong', targetId: 'chapter-4' },
  { id: 's-10', title: 'Định luật Joule - Lenz & Năng lượng điện', category: 'Chủ đề', description: 'Q = I²Rt — Nhiệt lượng tỏa ra và công suất nguồn điện', targetId: 'chapter-4' }
];

export const WHY_CHECKPOINTS = [
  'Biên soạn chuyên sâu, bám sát chuẩn SGK Vật Lí 11 GDPT mới.',
  'Phương pháp sư phạm 8 bước giải bài tập chuẩn chỉ, chi tiết.',
  'Hệ thống thí nghiệm ảo tương tác và máy tính chuyên dụng.',
  'Gia sư AI đồng hành cá nhân hoá, thấu hiểu tư duy học sinh.'
];
