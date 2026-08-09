import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY belum dikonfigurasi di lingkungan server.');
    }
    return new GoogleGenAI({ apiKey });
  };

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Tanya AI (Gemini AI Assistant for Algorithm Guidance)
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { prompt, studentName, studentClass, topicContext } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
      }

      const ai = getGeminiClient();

      const systemInstruction = `
Kamu adalah "AlgoBot SMA", asisten AI yang ramah, penyabar, dan cerdas untuk mata pelajaran Informatika SMA Kelas X (Materi Algoritma & Pemrograman).
Siswa yang bertanya bernama ${studentName || 'Siswa'} dari kelas ${studentClass || 'X'}.
Topik saat ini: ${topicContext || 'Algoritma umum'}.

Panduan menjawab:
1. Gunakan bahasa Indonesia yang ramah, suportif, mudah dipahami siswa SMA usia 15-16 tahun.
2. Kaitkan penjelasan algoritma dengan contoh kasus kehidupan nyata siswa SMA (seperti menyusun jadwal pelajaran, memilih rute sekolah, lari olahraga, mencari kontak teman di HP, mengurutkan nilai tugas).
3. Berikan penjelasan langkah demi langkah, singkat, dan berikan dorongan semangat.
4. Jika meminta contoh pseudocode atau flowchart, berikan dengan format yang rapi dan mudah dibaca.
5. Jangan memberikan jawaban langsung secara lengkap untuk teka-teki harian, berikan petunjuk (hint) yang memicu logika berpikir siswa.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nPertanyaan Siswa: ${prompt}` }] }
        ]
      });

      const replyText = response.text || 'Maaf, AlgoBot sedang tidak dapat memproses jawaban saat ini. Coba tanyakan lagi ya!';

      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Error handling /api/ai/ask:', error);
      return res.status(500).json({
        error: 'Gagal mendapatkan respon AI.',
        details: error?.message || String(error)
      });
    }
  });

  // API Route: Export Rekap Nilai ke Google Sheets
  app.post('/api/gsheet/export', async (req, res) => {
    try {
      const { students, teacherName } = req.body;

      if (!Array.isArray(students)) {
        return res.status(400).json({ error: 'Data siswa tidak valid.' });
      }

      // Format data rows for Google Sheet
      const headers = ['NISN', 'Nama Siswa', 'Kelas', 'Gender', 'Total Poin XP', 'Modul Tuntas', 'Teka-Teki Selesai', 'Lencana Unlocked', 'Terakhir Aktif'];
      const rows = students.map((s: any) => [
        s.nisn || '-',
        s.name || '-',
        s.studentClass || '-',
        s.gender || '-',
        s.points || 0,
        (s.completedModules || []).join(', ') || 'Belum ada',
        (s.solvedPuzzles || []).length || 0,
        (s.badges || []).join(', ') || '-',
        s.lastActive || new Date().toLocaleDateString('id-ID')
      ]);

      const dataMatrix = [headers, ...rows];

      // Return structured JSON response and ready CSV backup string
      const csvHeader = headers.join(';') + '\n';
      const csvRows = rows.map((r: any[]) => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(';')).join('\n');
      const csvContent = csvHeader + csvRows;

      return res.json({
        success: true,
        message: `Berhasil menyiapkan rekap nilai ${students.length} siswa.`,
        syncedCount: students.length,
        timestamp: new Date().toISOString(),
        csvData: csvContent,
        spreadsheetTitle: `Rekap Nilai AlgoSMA Kelas X - ${teacherName || 'Guru'}`
      });
    } catch (error: any) {
      console.error('Error handling /api/gsheet/export:', error);
      return res.status(500).json({
        error: 'Gagal mengeksport data ke Google Sheets.',
        details: error?.message || String(error)
      });
    }
  });

  // Vite Development / Production Server Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
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
    console.log(`Server AlgoSMA running on http://localhost:${PORT}`);
  });
}

startServer();
