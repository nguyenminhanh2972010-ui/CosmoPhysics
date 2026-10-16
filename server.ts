import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { GRADE_11_LESSONS } from './src/data/grade11Data';
import { FORMULA_HANDBOOK_DATA } from './src/data/formulaHandbook';

dotenv.config();

// User storage interfaces
interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  grade: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  studyNotes?: any[];
  savedFormulas?: string[];
  lessonProgress?: Record<string, boolean>;
}

// Persistent user database & sessions helper
const DATA_DIR = path.join(process.cwd(), 'server_data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const SESSION_SECRET = process.env.SESSION_SECRET || 'cosmophysic-grade11-secret-key-2025';

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(SESSIONS_FILE)) {
      fs.writeFileSync(SESSIONS_FILE, JSON.stringify({}, null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('Could not initialize server storage:', err);
  }
}

function getUsers(): StoredUser[] {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write users.json:', err);
  }
}

function getSessions(): Record<string, string> {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(SESSIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSession(token: string, userId: string) {
  try {
    ensureDataFile();
    const sessions = getSessions();
    sessions[token] = userId;
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write sessions.json:', err);
  }
}

function removeSession(token: string) {
  try {
    ensureDataFile();
    const sessions = getSessions();
    delete sessions[token];
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to remove session:', err);
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function createSessionToken(userId: string): string {
  const timestamp = Date.now();
  const data = `${userId}.${timestamp}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
  const token = `${data}.${signature}`;
  saveSession(token, userId);
  return token;
}

function verifySessionToken(token: string): string | null {
  if (!token || typeof token !== 'string') return null;
  const sessions = getSessions();
  if (sessions[token]) return sessions[token];

  // Cryptographic signature fallback if file was touched
  const parts = token.split('.');
  if (parts.length === 3) {
    const [userId, timestampStr, signature] = parts;
    const data = `${userId}.${timestampStr}`;
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
    if (signature === expectedSig) {
      const timestamp = parseInt(timestampStr, 10);
      if (Date.now() - timestamp < 30 * 24 * 60 * 60 * 1000) {
        return userId;
      }
    }
  }
  return null;
}

// Grade 11 Knowledge Retrieval Engine
function retrieveGrade11Context(query: string): string {
  const q = query.toLowerCase();
  
  // Find top matching lessons
  const matchedLessons = GRADE_11_LESSONS.filter((lesson) => {
    const text = `${lesson.title} ${lesson.subtitle} ${lesson.quickGrasp} ${lesson.physicsNature} ${lesson.coreFormulas.map(f => f.name + ' ' + f.expression).join(' ')}`.toLowerCase();
    return q.split(/\s+/).some(term => term.length > 2 && text.includes(term));
  }).slice(0, 2);

  // Find top matching formulas
  const matchedFormulas = FORMULA_HANDBOOK_DATA.filter((formula) => {
    const text = `${formula.name} ${formula.expression} ${formula.meaning} ${formula.chapterName}`.toLowerCase();
    return q.split(/\s+/).some(term => term.length > 2 && text.includes(term));
  }).slice(0, 3);

  if (matchedLessons.length === 0 && matchedFormulas.length === 0) {
    return '';
  }

  let context = '=== NGUỒN TRI THỨC XÁC THỰC TỪ SGK VẬT LÍ 11 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG) ===\n';
  if (matchedLessons.length > 0) {
    context += '\n[BÀI HỌC LIÊN QUAN TRONG CHƯƠNG TRÌNH]:\n';
    matchedLessons.forEach((l) => {
      context += `- ${l.title} (${l.chapterTitle})\n`;
      context += `  + Bản chất: ${l.quickGrasp}\n`;
      context += `  + Định luật / Công thức cốt lõi:\n`;
      l.coreFormulas.forEach((f) => {
        context += `    * ${f.name}: ${f.expression} (${f.description})\n`;
        context += `      Đơn vị & Đại lượng: ${f.variables.map(v => `${v.symbol}: ${v.meaning} [${v.unit}]`).join('; ')}\n`;
      });
      if (l.commonMistakes && l.commonMistakes.length > 0) {
        context += `  + Sai lầm thường gặp: ${l.commonMistakes.join('; ')}\n`;
      }
    });
  }

  if (matchedFormulas.length > 0) {
    context += '\n[CÔNG THỨC TRỌNG TÂM CẦN DÙNG]:\n';
    matchedFormulas.forEach((f) => {
      context += `- ${f.name} [${f.chapterName}]: ${f.expression}\n`;
      context += `  Ý nghĩa: ${f.meaning}\n`;
      if (f.applicationTip) {
        context += `  Mẹo áp dụng: ${f.applicationTip}\n`;
      }
    });
  }

  return context;
}

// Detect out-of-scope queries (Grade 10 or Grade 12)
function detectOutOfScopeGrade(query: string): { outOfScope: boolean; reason?: string; grade?: number } {
  const q = query.toLowerCase();

  const grade10Keywords = [
    'rơi tự do', 'chuyển động ném ngang', 'chuyển động ném xiên', 'ném ngang', 'ném xiên',
    '3 định luật newton', 'định luật 1 newton', 'định luật 2 newton', 'định luật 3 newton',
    'định luật i newton', 'định luật ii newton', 'định luật iii newton',
    'động lượng', 'định luật bảo toàn động lượng', 'va chạm mềm', 'va chạm đàn hồi',
    'lực hướng tâm', 'gia tốc hướng tâm', 'mômen lực', 'cân bằng vật rắn',
    'công và công suất lớp 10', 'lớp 10', 'vật lý 10', 'vật lí 10'
  ];

  const grade12Keywords = [
    'nhiệt động lực học', 'nguyên lý 1 nhiệt', 'nguyên lý 2 nhiệt', 'khí lý tưởng',
    'clapeyron', 'mendeleev', 'đẳng tích', 'đẳng nhiệt', 'đẳng áp',
    'lượng tử ánh sáng', 'hiện tượng quang điện', 'quang điện ngoài', 'quang điện trong',
    'công thoát electron', 'mẫu nguyên tử bohr', 'tiên đề bohr',
    'vật lý hạt nhân', 'hạt nhân nguyên tử', 'phóng xạ hạt nhân', 'chu kỳ bán rã t',
    'năng lượng liên kết', 'độ hụt khối', 'phản ứng nhiệt hạch', 'phân hạch',
    'thuyết tương đối', 'e = mc2', 'e=mc2', 'e = mc²', 'e=mc²',
    'lớp 12', 'vật lý 12', 'vật lí 12'
  ];

  for (const kw of grade10Keywords) {
    if (q.includes(kw)) {
      return { outOfScope: true, grade: 10, reason: `Chủ đề "${kw}" thuộc chương trình Vật Lí 10` };
    }
  }

  for (const kw of grade12Keywords) {
    if (q.includes(kw)) {
      return { outOfScope: true, grade: 12, reason: `Chủ đề "${kw}" thuộc chương trình Vật Lí 12` };
    }
  }

  return { outOfScope: false };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'COSMOPHYSIC API', grade: 11 });
  });

  // ==========================================
  // REAL AUTHENTICATION BACKEND ENDPOINTS
  // ==========================================

  // POST /api/auth/register
  app.post('/api/auth/register', (req, res) => {
    try {
      const { fullName, email, password, confirmPassword } = req.body;

      if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
        return res.status(400).json({ error: 'Vui lòng nhập họ và tên của bạn.' });
      }
      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ error: 'Vui lòng nhập địa chỉ email.' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const cleanEmail = email.trim().toLowerCase();
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({ error: 'Định dạng email không hợp lệ (ví dụ: hocsinh@thpt.edu.vn).' });
      }
      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Mật khẩu phải có độ dài từ 6 ký tự trở lên.' });
      }
      if (confirmPassword !== undefined && password !== confirmPassword) {
        return res.status(400).json({ error: 'Mật khẩu xác nhận không trùng khớp.' });
      }

      const users = getUsers();
      const existing = users.find((u) => u.email === cleanEmail);
      if (existing) {
        return res.status(409).json({ error: 'Tài khoản với địa chỉ email này đã tồn tại. Vui lòng chọn Đăng nhập.' });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashPassword(password, salt);
      const userId = `student_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

      const newUser: StoredUser = {
        id: userId,
        fullName: fullName.trim(),
        email: cleanEmail,
        grade: '11',
        salt,
        passwordHash,
        createdAt: new Date().toISOString(),
        studyNotes: [],
        savedFormulas: [],
        lessonProgress: {}
      };

      users.push(newUser);
      saveUsers(users);

      const sessionToken = createSessionToken(userId);

      return res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản học sinh Lớp 11 thành công!',
        token: sessionToken,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          grade: newUser.grade,
          createdAt: newUser.createdAt,
          savedFormulas: newUser.savedFormulas,
          lessonProgress: newUser.lessonProgress
        }
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Không thể xử lý yêu cầu đăng ký lúc này. Vui lòng thử lại.' });
    }
  });

  // POST /api/auth/login
  app.post('/api/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
      }

      const cleanEmail = email.trim().toLowerCase();
      const users = getUsers();
      const user = users.find((u) => u.email === cleanEmail);

      if (!user) {
        return res.status(401).json({ error: 'Không tìm thấy tài khoản với email này. Vui lòng kiểm tra lại hoặc Đăng ký mới.' });
      }

      const computedHash = hashPassword(password, user.salt);
      if (computedHash !== user.passwordHash) {
        return res.status(401).json({ error: 'Mật khẩu không chính xác. Vui lòng thử lại hoặc sử dụng chức năng Quên mật khẩu.' });
      }

      const sessionToken = createSessionToken(user.id);

      return res.json({
        success: true,
        message: 'Đăng nhập thành công! Chào mừng bạn quay lại COSMOPHYSIC.',
        token: sessionToken,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          grade: user.grade,
          createdAt: user.createdAt,
          savedFormulas: user.savedFormulas || [],
          lessonProgress: user.lessonProgress || {}
        }
      });
    } catch (err: any) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.' });
    }
  });

  // GET /api/auth/me
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ authenticated: false, error: 'Chưa đăng nhập' });
    }

    const token = authHeader.split(' ')[1];
    const userId = verifySessionToken(token);
    if (!userId) {
      return res.status(401).json({ authenticated: false, error: 'Phiên làm việc đã hết hạn hoặc không hợp lệ.' });
    }

    const users = getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(401).json({ authenticated: false, error: 'Người dùng không tồn tại.' });
    }

    return res.json({
      authenticated: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        grade: user.grade,
        createdAt: user.createdAt,
        savedFormulas: user.savedFormulas || [],
        studyNotes: user.studyNotes || [],
        lessonProgress: user.lessonProgress || {}
      }
    });
  });

  // POST /api/auth/logout
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      removeSession(token);
    }
    return res.json({ success: true, message: 'Đăng xuất thành công.' });
  });

  // POST /api/auth/forgot-password
  app.post('/api/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Vui lòng cung cấp email của bạn.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find((u) => u.email === cleanEmail);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản với email này trong hệ thống.' });
    }

    // Generate a temporary 6-digit recovery code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = resetCode;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    saveUsers(users);

    return res.json({
      success: true,
      message: `Mã xác thực khôi phục mật khẩu là [${resetCode}] (hiệu lực trong 15 phút). Vui lòng nhập mã để đặt mật khẩu mới.`,
      resetCode
    });
  });

  // POST /api/auth/reset-password
  app.post('/api/auth/reset-password', (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin khôi phục.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find((u) => u.email === cleanEmail);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });
    }
    if (user.resetToken !== resetCode || (user.resetTokenExpiry && user.resetTokenExpiry < Date.now())) {
      return res.status(400).json({ error: 'Mã xác thực không hợp lệ hoặc đã hết hạn.' });
    }

    user.passwordHash = hashPassword(newPassword, user.salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    saveUsers(users);

    return res.json({
      success: true,
      message: 'Mật khẩu đã được cập nhật thành công! Vui lòng đăng nhập với mật khẩu mới.'
    });
  });

  // PUT /api/user/data (sync notes, formulas, progress)
  app.put('/api/user/data', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Chưa xác thực' });
    }
    const token = authHeader.split(' ')[1];
    const userId = verifySessionToken(token);
    if (!userId) {
      return res.status(401).json({ error: 'Phiên đăng nhập hết hạn' });
    }

    const users = getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    const { studyNotes, savedFormulas, lessonProgress } = req.body;
    if (studyNotes !== undefined) user.studyNotes = studyNotes;
    if (savedFormulas !== undefined) user.savedFormulas = savedFormulas;
    if (lessonProgress !== undefined) user.lessonProgress = lessonProgress;

    saveUsers(users);
    return res.json({ success: true });
  });

  // COSMO AI Server-Side Gemini API Proxy with Grade 11 Knowledge Grounding
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, conversationHistory } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Nội dung câu hỏi không hợp lệ.' });
      }

      // Step 1: Check if question is outside Grade 11 scope (Grade 10 or 12)
      const outOfScopeCheck = detectOutOfScopeGrade(message);
      if (outOfScopeCheck.outOfScope) {
        const refusalMessage = `Chào bạn! Tôi là Gia sư AI chuyên biệt Vật Lí 11 của COSMOPHYSIC.

Hiện tại tôi chỉ hỗ trợ và giải đáp kiến thức chuyên sâu trong phạm vi chương trình **Vật Lí 11** (bao gồm 4 chương trọng tâm: **Dao động**, **Sóng**, **Điện trường**, **Dòng điện & Mạch điện**).

${outOfScopeCheck.reason}.

Bạn vui lòng đặt câu hỏi về các bài học, công thức, hiện tượng hoặc bài tập thuộc 4 chương của Vật Lí 11 để tôi có thể hỗ trợ và hướng dẫn giải chi tiết theo chuẩn sư phạm nhé!`;
        return res.json({
          reply: refusalMessage,
          source: 'Phạm vi chuyên biệt: Vật Lí 11'
        });
      }

      // Fast check for common greetings
      const qClean = message.trim().toLowerCase();
      if (
        qClean === 'xin chào' ||
        qClean === 'chào' ||
        qClean === 'chào bạn' ||
        qClean === 'hello' ||
        qClean === 'hi' ||
        qClean === 'alo' ||
        qClean === 'chào ad' ||
        qClean === 'chào cosmo' ||
        qClean === 'chào thầy' ||
        qClean === 'chào cô'
      ) {
        return res.json({
          reply: 'Chào bạn! Tôi là Gia sư AI chuyên biệt Vật Lí 11 của COSMOPHYSIC. Tôi có thể giúp gì cho bạn về lý thuyết, thí nghiệm hay bài tập Vật Lí 11 hôm nay?',
          source: 'Nguồn kiến thức: SGK Vật Lí 11'
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // High quality fallback responses based on 8-step method and Grade 11 physics syllabus
        const lower = message.toLowerCase();
        let fallbackReply = '';

        if (lower.includes('con lắc') || lower.includes('dao động') || lower.includes('lò xo')) {
          fallbackReply = `### Hướng dẫn theo Phương pháp 8 Bước: Dao động điều hoà
**1. Tóm tắt:** Con lắc lò xo độ cứng $k$, vật nặng khối lượng $m$, biên độ $A$.
**2. Đại lượng cần tìm:** Tần số góc $\\omega$, chu kỳ $T$, cơ năng $W$.
**3. Công thức chuẩn:**
- $\\omega = \\sqrt{k / m}$ (rad/s)
- $T = 2\\pi \\sqrt{m / k}$ (s)
- $W = \\frac{1}{2} k A^2 = \\frac{1}{2} m \\omega^2 A^2$ (J)
**4. Bản chất:** Khi không ma sát, cơ năng bảo toàn và liên tục chuyển hoá giữa động năng và thế năng đàn hồi.
**5. Mẹo bấm máy:** Đổi $m$ sang kg, $A$ sang mét trước khi tính cơ năng!
*(Gợi ý: Cung cấp API Key Gemini trong cài đặt để nhận phân tích thời gian thực không giới hạn).*`;
        } else if (lower.includes('giao thoa') || lower.includes('sóng') || lower.includes('bước sóng')) {
          fallbackReply = `### Phân tích Bản chất Giao thoa Sóng (Chương II)
**1. Điều kiện giao thoa:** Hai nguồn kết hợp (cùng tần số, cùng phương dao động và hiệu số pha không đổi theo thời gian).
**2. Vị trí cực đại (biên độ gấp đôi):**
$$d_2 - d_1 = k \\cdot \\lambda \\quad (k \\in \\mathbb{Z})$$
**3. Vị trí cực tiểu (triệt tiêu nhau):**
$$d_2 - d_1 = (k + 0.5) \\cdot \\lambda$$
**4. Mẹo giải bài:** Bước sóng $\\lambda = v \\cdot T = v / f$. Khoảng cách giữa 2 cực đại liên tiếp trên đường nối hai nguồn là $\\lambda / 2$.
*(Nguồn: SGK Vật lí 11 — Bài 12: Giao thoa sóng).*`;
        } else if (lower.includes('coulomb') || lower.includes('điện tích') || lower.includes('điện trường')) {
          fallbackReply = `### Định luật Coulomb & Điện trường (Chương III)
**1. Công thức lực tĩnh điện:**
$$F = k \\cdot \\frac{|q_1 q_2|}{\\varepsilon \\cdot r^2}$$
với $k = 9 \\cdot 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2$, $r$ đo bằng mét (m).
**2. Cường độ điện trường:**
$$E = \\frac{F}{|q|} = k \\cdot \\frac{|Q|}{\\varepsilon \\cdot r^2}$$
**3. Lưu ý đơn vị:** $1\\mu\\text{C} = 10^{-6}\\text{C}, 1\\text{nC} = 10^{-9}\\text{C}$. Trong chân không hoặc không khí $\\varepsilon \\approx 1$.
*(Nguồn: SGK Vật lí 11 — Bài 16 & 17).*`;
        } else {
          fallbackReply = `### Chào bạn! COSMO AI đã nhận được câu hỏi về: "${message}"
Để giải bài toán Vật lý 11 này theo chuẩn Sư phạm 8 bước:
- **Bước 1:** Tóm tắt giả thiết và đổi các số liệu về đơn vị chuẩn SI ($m, s, kg, A, V, C$).
- **Bước 2:** Xác định hiện tượng vật lý thuộc Chương nào (Dao động, Sóng, Điện trường hay Dòng điện).
- **Bước 3:** Sử dụng công thức định nghĩa hoặc định luật bảo toàn tương ứng.
- **Bước 4:** Bấm máy tính cẩn thận và đối chiếu tính hợp lý thực tế.

Bạn có thể bấm vào mục **Sổ tay công thức** hoặc **Thí nghiệm ảo** trên thanh điều hướng để quan sát trực quan hiện tượng này nhé!`;
        }

        return res.json({
          reply: fallbackReply,
          source: 'SGK Vật Lí 11'
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      // Step 2: Retrieve Grade 11 verified knowledge
      const verifiedContext = retrieveGrade11Context(message);

      const systemInstruction = `Bạn là COSMO AI (Gia sư AI Vật Lý 11 của COSMOPHYSIC) - gia sư thông minh, uyên bác và tận tâm dành riêng cho học sinh THPT Lớp 11 Việt Nam theo chương trình SGK GDPT mới (Vật Lí 11).

QUY TẮC CỐT LÕI VÀ PHẠM VI:
1. Bạn CHỈ hỗ trợ kiến thức trong phạm vi Vật Lí 11 (4 Chương: I. Dao động, II. Sóng, III. Điện trường, IV. Dòng điện & Mạch điện).
2. Nếu học sinh hỏi về kiến thức Lớp 10 hoặc Lớp 12 (chuyển động ném, rơi tự do, 3 định luật Newton, nhiệt học, khí lý tưởng, lượng tử ánh sáng, phóng xạ hạt nhân...), hãy từ chối lịch sự và định hướng lại học sinh hỏi về 4 chương Vật Lí 11.
3. Nguồn chân lý cao nhất là Sách giáo khoa Vật lí 11. Tuyệt đối không bịa đặt công thức, định luật, ký hiệu hay số liệu. Sử dụng đúng ký hiệu chuẩn: $\\omega, A, T, f, \\lambda, E, U, C, \\mathcal{E}, r, R, I$.
4. Khi giải bài tập số hoặc định lượng, BẮT BUỘC tuân thủ đúng trình tự sư phạm và ghi rõ tiêu đề là "Quy trình 8 bước gợi ý của COSMOPHYSIC" (khung phương pháp sư phạm do COSMOPHYSIC xây dựng; các định luật và công thức đều tuân thủ chính xác chuẩn SGK Vật Lí 11):
   - Bước 1 — Tóm tắt dữ kiện (đổi về đơn vị chuẩn SI)
   - Bước 2 — Xác định đại lượng cần tìm
   - Bước 3 — Chọn định luật / công thức phù hợp
   - Bước 4 — Giải thích vì sao dùng công thức đó (bản chất vật lý)
   - Bước 5 — Biến đổi công thức (rút đại lượng cần tìm)
   - Bước 6 — Thay số và tính toán
   - Bước 7 — Kiểm tra đơn vị và tính hợp lý thực tế
   - Bước 8 — Kết luận
5. Với câu hỏi lý thuyết / hiện tượng:
   - Dùng cấu trúc: "Hiểu nhanh" -> "Bản chất Vật Lí" -> "Công thức liên quan" -> "Ví dụ đời sống" -> "Ghi nhớ & Lỗi cần tránh".
6. Cuối câu trả lời, luôn có phần "Nguồn tham khảo: SGK Vật Lí 11 — [Tên bài học tương ứng]". Tuyệt đối không bịa đặt tên bài hay số trang không có thật.
7. Luôn trả lời bằng Tiếng Việt trong sáng, sư phạm, thân thiện, khích lệ học sinh.

${verifiedContext ? `\n[TÀI LIỆU TRA CỨU ĐÃ ĐƯỢC XÁC THỰC TỪ SGK VẬT LÍ 11]:\n${verifiedContext}\nHãy ưu tiên sử dụng chính xác các công thức và định nghĩa trên để trả lời.` : ''}`;

      // Build conversation contents
      const rawHistory = Array.isArray(history) ? history : (Array.isArray(conversationHistory) ? conversationHistory : []);
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      for (const h of rawHistory.slice(-6)) {
        const role = (h.role === 'assistant' || h.role === 'model') ? 'model' : 'user';
        const text = h.content || h.text;
        if (text) {
          contents.push({
            role,
            parts: [{ text }]
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      let replyText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.2,
          }
        });
        replyText = response.text || '';
      } catch (primaryErr: any) {
        console.warn('Primary gemini-2.5-flash failed, attempting fallback to gemini-2.5-flash-lite:', primaryErr?.message || primaryErr);
        try {
          const secondaryResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents,
            config: {
              systemInstruction,
              temperature: 0.2,
            }
          });
          replyText = secondaryResponse.text || '';
        } catch (secondaryErr: any) {
          console.warn('Secondary AI model failed, delegating to verified Grade 11 pedagogical engine');
          throw secondaryErr;
        }
      }

      if (!replyText || !replyText.trim()) {
        throw new Error('Mô hình không trả về nội dung.');
      }
      return res.json({ reply: replyText, source: 'Nguồn kiến thức: SGK Vật Lí 11' });
    } catch (err: any) {
      console.warn('Gemini API request failed, engaging local Grade 11 pedagogical engine:', err?.message || err);

      // Local authoritative Grade 11 knowledge engine fallback
      const q = (req.body.message || '').trim().toLowerCase();
      
      // 1. Simple greeting
      if (q === 'xin chào' || q === 'chào' || q === 'hello' || q === 'hi') {
        return res.json({
          reply: 'Chào bạn! Tôi có thể giúp gì cho bạn về kiến thức hay bài tập Vật Lí 11 hôm nay?',
          source: 'Nguồn kiến thức: SGK Vật Lí 11'
        });
      }

      // 2. Distinction between interference maxima and minima
      if (q.includes('phân biệt') && (q.includes('cực đại') || q.includes('cực tiểu')) && q.includes('giao thoa')) {
        const reply = `### Hiểu nhanh về Giao thoa Sóng

Trong hiện tượng giao thoa giữa hai sóng kết hợp cùng pha (cùng tần số, cùng phương dao động và hiệu số pha không đổi), sự phân bố các vân cực đại và cực tiểu trên trường giao thoa được xác định dựa vào **hiệu đường đi** $\\Delta d = d_2 - d_1$.

### Bảng so sánh Điều kiện Cực đại và Cực tiểu Giao thoa

| Tiêu chí | Cực đại giao thoa | Cực tiểu giao thoa |
|---|---|---|
| **Hiện tượng** | Hai sóng thành phần tăng cường lẫn nhau, biên độ cực đại ($A_{\\max} = 2A$) | Hai sóng thành phần triệt tiêu lẫn nhau, dao động bị triệt tiêu ($A_{\\min} = 0$) |
| **Hiệu đường đi** | Bằng một số nguyên lần bước sóng: $$d_2 - d_1 = k\\lambda \\quad (k \\in \\mathbb{Z})$$ | Bằng một số nửa nguyên lần bước sóng: $$d_2 - d_1 = (k + 0.5)\\lambda \\quad (k \\in \\mathbb{Z})$$ |
| **Độ lệch pha** | Hai dao động cùng pha: $$\\Delta\\varphi = 2k\\pi$$ | Hai dao động ngược pha: $$\\Delta\\varphi = (2k + 1)\\pi$$ |
| **Hình ảnh quan sát** | Hệ các đường hyperbol cực đại (vân sáng đối với ánh sáng) | Hệ các đường hyperbol cực tiểu (vân tối đối với ánh sáng) |

### Ghi nhớ quan trọng

- Khoảng cách giữa hai cực đại (hoặc hai cực tiểu) liên tiếp trên đoạn thẳng nối hai nguồn sóng là $\\dfrac{\\lambda}{2}$.
- Với vân trung tâm ($k = 0$), $d_2 - d_1 = 0$, là một đường cực đại trung trực.`;
        return res.json({
          reply,
          source: 'Nguồn kiến thức: SGK Vật Lí 11'
        });
      }

      // 3. Spring pendulum period formula
      if (q.includes('chu kỳ') && (q.includes('con lắc lò xo') || q.includes('lò xo'))) {
        const reply = `### Công thức Chu kỳ Con lắc Lò xo

Chu kỳ dao động điều hòa của con lắc lò xo được xác định theo công thức:

$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$

Trong đó:
- $T$: Chu kỳ dao động của con lắc lò xo (đơn vị: giây, $\\text{s}$)
- $m$: Khối lượng của vật nặng (đơn vị: kilôgam, $\\text{kg}$)
- $k$: Độ cứng của lò xo (đơn vị: niu-tơn trên mét, $\\text{N/m}$)

### Các công thức liên quan:
- **Tần số góc:** $$\\omega = \\sqrt{\\frac{k}{m}} \\quad (\\text{rad/s})$$
- **Tần số dao động:** $$f = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}} \\quad (\\text{Hz})$$

### Bản chất Vật Lí & Ghi nhớ:
- Chu kỳ $T$ của con lắc lò xo chỉ phụ thuộc vào cấu tạo của hệ (khối lượng $m$ và độ cứng $k$), **hoàn toàn không phụ thuộc** vào biên độ dao động $A$ và vị trí kích thích ban đầu.
- Khi làm bài tập tính toán, cần chú ý đổi khối lượng $m$ từ gam ($\text{g}$) sang kilôgam ($\text{kg}$) trước khi thế số vào công thức.`;
        return res.json({
          reply,
          source: 'Nguồn kiến thức: SGK Vật Lí 11'
        });
      }

      // 4. 8-step method for spring pendulum (clarifying framework)
      if (q.includes('8 bước') || (q.includes('phương pháp') && q.includes('con lắc lò xo'))) {
        const reply = `### Quy trình 8 bước gợi ý của COSMOPHYSIC khi giải bài tập con lắc lò xo

*(Lưu ý: Đây là khung phương pháp sư phạm do COSMOPHYSIC xây dựng nhằm giúp học sinh giải bài bản, không bỏ sót giả thiết; các định luật và công thức đều tuân thủ chính xác chuẩn SGK Vật Lí 11).*

1. **Bước 1 — Tóm tắt dữ kiện:** Liệt kê các đại lượng đề bài cho ($m, k, A, x, v$) và đổi tất cả về đơn vị chuẩn hệ SI ($m \\to \\text{kg}$, $x, A \\to \\text{m}$).
2. **Bước 2 — Xác định đại lượng cần tìm:** Làm rõ yêu cầu (tìm chu kỳ $T$, cơ năng $W$, lực đàn hồi $F_{\\text{đh}}$, hay vận tốc tại li độ $x$).
3. **Bước 3 — Chọn định luật / công thức phù hợp:**
   - Dao động tự do: $T = 2\\pi\\sqrt{\\dfrac{m}{k}}$
   - Hệ thức độc lập: $A^2 = x^2 + \\dfrac{v^2}{\\omega^2}$
   - Cơ năng bảo toàn: $W = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2}mv^2 + \\dfrac{1}{2}kx^2$
4. **Bước 4 — Giải thích vì sao dùng công thức:** Xác định hệ bỏ qua ma sát nên cơ năng bảo toàn; dao động là điều hòa quanh vị trí cân bằng.
5. **Bước 5 — Biến đổi công thức:** Rút đại lượng chưa biết sang một vế trước khi thế số.
6. **Bước 6 — Thay số và tính toán:** Bấm máy cẩn thận, chú ý số mũ và căn bậc hai.
7. **Bước 7 — Kiểm tra đơn vị:** Đảm bảo đại lượng ra đúng đơn vị vật lý ($T$ là $\\text{s}$, $W$ là $\\text{J}$, $v$ là $\\text{m/s}$).
8. **Bước 8 — Kết luận:** Viết câu trả lời rõ ràng kèm nhận xét chiều hoặc ý nghĩa thực tế.`;
        return res.json({
          reply,
          source: 'Nguồn kiến thức: SGK Vật Lí 11'
        });
      }

      // 5. Match with verified Grade 11 lessons or formulas
      const matchedLesson = GRADE_11_LESSONS.find(l => {
        const text = `${l.title} ${l.subtitle} ${l.quickGrasp}`.toLowerCase();
        return q.split(/\s+/).some((term: string) => term.length > 3 && text.includes(term));
      });

      if (matchedLesson) {
        const formulaList = matchedLesson.coreFormulas.map(f => `- **${f.name}:** $$${f.expression}$$ — *${f.description}*`).join('\n');
        const reply = `### ${matchedLesson.title} (${matchedLesson.chapterTitle})

### Hiểu nhanh
${matchedLesson.quickGrasp}

### Bản chất Vật Lí
${matchedLesson.physicsNature}

### Công thức trọng tâm
${formulaList}

### Lời khuyên khi làm bài tập
${matchedLesson.commonMistakes.map(m => `- ${m}`).join('\n')}`;
        return res.json({
          reply,
          source: 'Nguồn kiến thức: SGK Vật Lí 11'
        });
      }

      // 6. Generic safe response if nothing matches
      return res.json({
        reply: `### Hướng dẫn học tập Vật Lí 11

Hiện tại tôi đã ghi nhận câu hỏi của bạn: "${req.body.message}".

Để học tập hiệu quả trong chương trình **Vật Lí 11**, bạn có thể:
1. Tra cứu trực tiếp các công thức trọng tâm tại mục **Sổ tay Vật Lí** trên thanh điều hướng.
2. Trực quan hóa hiện tượng tương ứng trong **Thư viện thí nghiệm ảo**.
3. Đặt các câu hỏi cụ thể về:
   - *Chu kỳ, tần số và năng lượng dao động điều hòa*
   - *Hiện tượng giao thoa sóng cơ và sóng ánh sáng*
   - *Định luật Coulomb và cường độ điện trường*
   - *Định luật Ohm cho toàn mạch và công suất điện*`,
        source: 'Nguồn kiến thức: SGK Vật Lí 11'
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`COSMOPHYSIC Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
