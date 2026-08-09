import { LearningModule, DailyPuzzle, Badge } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'sekvensial',
    title: '1. Algoritma Sekuensial (Sequential)',
    category: 'Dasar Algoritma',
    iconName: 'ListOrdered',
    summary: 'Instruksi yang dieksekusi secara berurutan baris demi baris tanpa lompatan.',
    smaCaseTitle: 'Menyiapkan Bekal & Jadwal Pelajaran SMA X-1',
    smaCaseDescription: 'Di pagi hari sebelum berangkat ke sekolah, Budi harus menyiapkan seragam, menyusun jadwal buku pelajaran sesuai hari Senin, dan menyiapkan tas bekal secara sistematis.',
    flowchartNodes: [
      { id: '1', label: 'Mulai', type: 'start', next: '2' },
      { id: '2', label: 'Buka Jadwal Pelajaran Hari Ini', type: 'process', next: '3' },
      { id: '3', label: 'Masukkan Buku Paket & Catatan ke Tas', type: 'process', next: '4' },
      { id: '4', label: 'Pakai Seragam SMA & Sepatu', type: 'process', next: '5' },
      { id: '5', label: 'Bawa Bekal Makanan', type: 'process', next: '6' },
      { id: '6', label: 'Selesai & Berangkat', type: 'end' }
    ],
    pseudocode: [
      'ALGORITMA Persiapan_Sekolah',
      '1. DEKLARASI: buku, seragam, bekal',
      '2. Buka jadwal pelajaran hari Senin',
      '3. Ambil buku Informatika, Matematika, B.Indonesia',
      '4. Masukkan buku ke dalam tas sekolah',
      '5. Pakai seragam putih abu-abu dan sepatu hitam',
      '6. Ambil kotak bekal di meja makan',
      '7. Selesai (Siap Berangkat)'
    ],
    simulationType: 'sequential',
    quiz: [
      {
        id: 'q-seq-1',
        question: 'Apa ciri utama dari algoritma sekuensial?',
        options: [
          'Setiap instruksi dieksekusi berurutan dari atas ke bawah',
          'Instruksi melompat secara acak',
          'Selalu membutuhkan kondisi benar/salah',
          'Proses diulang terus-menerus tanpa henti'
        ],
        correctAnswer: 0,
        explanation: 'Algoritma sekuensial mengeksekusi instruksi satu per satu secara berurutan sesuai urutan penulisan.'
      },
      {
        id: 'q-seq-2',
        question: 'Jika langkah ke-3 (memasukkan buku) dilakukan sebelum langkah ke-2 (membaca jadwal), apa akibatnya?',
        options: [
          'Tas bisa berisi buku yang salah / tidak sesuai jadwal',
          'Proses algoritma akan otomatis memperbaiki diri',
          'Komputer akan memberikan peringatan error',
          'Tidak ada bedanya sama sekali'
        ],
        correctAnswer: 0,
        explanation: 'Dalam algoritma sekuensial, urutan instruksi sangat menentukan kebenaran hasil output.'
      }
    ]
  },
  {
    id: 'percabangan',
    title: '2. Algoritma Percabangan (Branching / Selection)',
    category: 'Pengambilan Keputusan',
    iconName: 'GitFork',
    summary: 'Eksekusi instruksi berdasarkan pilihan kondisi (If - Else) Benar atau Salah.',
    smaCaseTitle: 'Penentuan Rute Pulang Sekolah & Kegiatan Ekskul',
    smaCaseDescription: 'Saat jam sekolah usai, Siti harus memutuskan apakah langsung pulang atau ikut ekskul berdasarkan kondisi cuaca dan jadwal rapat OSIS.',
    flowchartNodes: [
      { id: '1', label: 'Mulai Pulang Sekolah', type: 'start', next: '2' },
      { id: '2', label: 'Apakah Hujan Deras?', type: 'decision', nextTrue: '3', nextFalse: '4' },
      { id: '3', label: 'Naik Angkot / Dijemput & Bawa Payung', type: 'process', next: '5' },
      { id: '4', label: 'Jalan Kaki Bersama Teman Melalui Taman', type: 'process', next: '5' },
      { id: '5', label: 'Tiba di Rumah dengan Selamat', type: 'end' }
    ],
    pseudocode: [
      'ALGORITMA Penentuan_Rute',
      'IF (cuaca == "Hujan") THEN',
      '   Pilih rute naik Angkot / Dijemput',
      '   Buka Payung',
      'ELSE',
      '   Jalan kaki santai lewat taman sekolah',
      'ENDIF'
    ],
    simulationType: 'branching',
    quiz: [
      {
        id: 'q-branch-1',
        question: 'Kapan blok kode di dalam bagian ELSE akan dieksekusi?',
        options: [
          'Ketika kondisi IF bernilai FALSE (Salah)',
          'Ketika kondisi IF bernilai TRUE (Benar)',
          'Selalu dieksekusi dalam setiap keadaan',
          'Tidak akan pernah dieksekusi'
        ],
        correctAnswer: 0,
        explanation: 'Blok ELSE hanya dijalankan jika syarat kondisi pada ekspresi IF tidak terpenuhi (bernilai False).'
      }
    ]
  },
  {
    id: 'perulangan',
    title: '3. Algoritma Perulangan (Looping)',
    category: 'Struktur Kontrol',
    iconName: 'Repeat',
    summary: 'Mengulang sekumpulan instruksi selama kondisi tertentu masih terpenuhi (For / While).',
    smaCaseTitle: 'Latihan Fisik Lari 5 Putaran Lapangan Olahraga',
    smaCaseDescription: 'Pak Guru PJOK meminta siswa kelas X melari mengelilingi lapangan sebanyak 5 kali putaran. Setiap kali melewati garis start, hitungan putaran bertambah 1.',
    flowchartNodes: [
      { id: '1', label: 'Mulai Olahraga (putaran = 0)', type: 'start', next: '2' },
      { id: '2', label: 'Apakah putaran < 5?', type: 'decision', nextTrue: '3', nextFalse: '5' },
      { id: '3', label: 'Lari 1 Putaran Lapangan', type: 'process', next: '4' },
      { id: '4', label: 'putaran = putaran + 1', type: 'process', next: '2' },
      { id: '5', label: 'Istirahat & Minum Air (Selesai)', type: 'end' }
    ],
    pseudocode: [
      'ALGORITMA Lari_Lapangan',
      'DEKLARASI putaran = 0',
      'WHILE (putaran < 5) DO',
      '   Lari keliling lapangan 1 kali',
      '   putaran = putaran + 1',
      'ENDWHILE',
      'Cetak "Selesai 5 Putaran! Istirahat"'
    ],
    simulationType: 'looping',
    quiz: [
      {
        id: 'q-loop-1',
        question: 'Berapa kali loop lari akan berjalan jika batas target diset ke 5 putaran?',
        options: [
          '5 kali',
          '4 kali',
          '6 kali',
          'Tak berhingga'
        ],
        correctAnswer: 0,
        explanation: 'Loop dimulai dari 0 sampai kurang dari 5 (yaitu putaran 0, 1, 2, 3, 4), total 5 kali perulangan.'
      }
    ]
  },
  {
    id: 'pencarian',
    title: '4. Algoritma Pencarian (Searching)',
    category: 'Manajemen Data',
    iconName: 'Search',
    summary: 'Teknik menemukan letak data tertentu dalam kumpulan data (Linear Search vs Binary Search).',
    smaCaseTitle: 'Mencari NISN atau Nama Teman di Daftar Kontak Siswa',
    smaCaseDescription: 'Ketua kelas X ingin mencari data NISN teman bernama "LANI" di dalam daftar 100 siswa. Bandingkan pencarian satu per satu (Linear) dengan pencarian membagi dua (Binary).',
    flowchartNodes: [
      { id: '1', label: 'Mulai Pencarian', type: 'start', next: '2' },
      { id: '2', label: 'Bandingkan Elemen dengan Kata Kunci', type: 'process', next: '3' },
      { id: '3', label: 'Apakah Cocok?', type: 'decision', nextTrue: '4', nextFalse: '5' },
      { id: '4', label: 'Data Ditemukan! Tampilkan Posisi', type: 'process', next: '6' },
      { id: '5', label: 'Lanjut ke Elemen Berikutnya', type: 'process', next: '2' },
      { id: '6', label: 'Selesai', type: 'end' }
    ],
    pseudocode: [
      'ALGORITMA Linear_Search(Daftar, Target)',
      'FOR i = 0 TO Panjang(Daftar) DO',
      '   IF Daftar[i] == Target THEN',
      '      RETURN "Ditemukan di indeks " + i',
      '   ENDIF',
      'ENDFOR',
      'RETURN "Data Tidak Ditemukan"'
    ],
    simulationType: 'searching',
    quiz: [
      {
        id: 'q-search-1',
        question: 'Apa syarat utama agar Binary Search bisa digunakan?',
        options: [
          'Data harus sudah terurut (Sorted)',
          'Data harus berjumlah genap',
          'Data tidak boleh mengandung angka negatif',
          'Data harus diinput oleh guru'
        ],
        correctAnswer: 0,
        explanation: 'Binary Search hanya dapat membagi area pencarian menjadi dua bagian jika koleksi data sudah terurut lebih dahulu.'
      }
    ]
  },
  {
    id: 'pengurutan',
    title: '5. Algoritma Pengurutan (Sorting)',
    category: 'Struktur Data',
    iconName: 'ArrowUpDown',
    summary: 'Menyusun elemen data ke dalam urutan tertentu (Ascending / Descending) seperti Bubble Sort.',
    smaCaseTitle: 'Mengurutkan Nilai Tugas Informatika Siswa Kelas X',
    smaCaseDescription: 'Guru Informatika ingin mengurutkan nilai tugas 6 siswa dari yang terendah ke tertinggi untuk menentukan peringkat dan memberikan apresiasi.',
    flowchartNodes: [
      { id: '1', label: 'Mulai Pengurutan Nilai', type: 'start', next: '2' },
      { id: '2', label: 'Bandingkan Pasangan Elemen Bersebelahan', type: 'process', next: '3' },
      { id: '3', label: 'Apakah Kiri > Kanan?', type: 'decision', nextTrue: '4', nextFalse: '5' },
      { id: '4', label: 'Tukar (Swap) Posisi Elemen', type: 'process', next: '5' },
      { id: '5', label: 'Ulangi sampai Seluruh Data Terurut', type: 'process', next: '6' },
      { id: '6', label: 'Nilai Terurut Sempurna', type: 'end' }
    ],
    pseudocode: [
      'ALGORITMA Bubble_Sort(NilaiArray)',
      'FOR i = 0 TO N-1 DO',
      '   FOR j = 0 TO N-i-2 DO',
      '      IF NilaiArray[j] > NilaiArray[j+1] THEN',
      '         TUKAR NilaiArray[j] DENGAN NilaiArray[j+1]',
      '      ENDIF',
      '   ENDFOR',
      'ENDFOR'
    ],
    simulationType: 'sorting',
    quiz: [
      {
        id: 'q-sort-1',
        question: 'Bagaimana cara kerja dasar dari Bubble Sort?',
        options: [
          'Membandingkan elemen bersebelahan lalu menukarnya jika urutannya salah',
          'Mengambil elemen secara acak dan menaruhnya di akhir',
          'Membagi data menjadi dua bagian lalu digabung kembali',
          'Menghapus angka paling kecil di awal'
        ],
        correctAnswer: 0,
        explanation: 'Bubble Sort secara berulang membandingkan dua elemen berdampingan dan menukarnya jika posisi nilainya belum sesuai.'
      }
    ]
  }
];

export const DAILY_PUZZLES: DailyPuzzle[] = [
  {
    id: 'puz-1',
    date: '2026-08-08',
    title: 'Teka-Teki Antrean Kantin Sekolah',
    difficulty: 'Mudah',
    story: 'Budi, Lani, Maya, dan Siti sedang mengantre di kantin SMA. Lani berdiri di depan Maya. Siti tidak berdiri di paling belakang. Budi berada persis di belakang Maya.',
    question: 'Siapakah yang berada pada urutan antrean PALING DEPAN?',
    options: ['Lani', 'Maya', 'Siti', 'Budi'],
    correctIndex: 0,
    explanation: 'Urutan dari depan ke belakang: Lani -> Maya -> Budi. Karena Siti tidak di paling belakang, Siti berada di antara Lani dan Maya atau di paling depan? Namun Lani di depan Maya dan Budi di belakang Maya. Jadi Lani adalah yang paling depan!',
    rewardPoints: 50,
    badgeUnlock: 'detektif_logika'
  },
  {
    id: 'puz-2',
    date: '2026-08-09',
    title: 'Teka-Teki Saklar Lampu Lab Komputer',
    difficulty: 'Sedang',
    story: 'Di Lab Komputer SMA terdapat 3 saklar (A, B, C) untuk 3 lampu di dalam ruangan tertutup. Anda hanya boleh masuk ke dalam ruangan lab 1 kali saja.',
    codeSnippet: 'IF (saklar_disalakan_lama) THEN lampu_hangat = true;',
    question: 'Bagaimana cara mengetahui saklar mana yang terhubung ke lampu mana?',
    options: [
      'Nyalakan saklar A agak lama, matikan. Nyalakan B lalu masuk lab. (Lampu nyala = B, lampu hangat = A, lampu dingin = C)',
      'Nyalakan semua saklar bersamaan lalu masuk',
      'Tekan saklar A dan B berulang kali dengan cepat',
      'Tidak bisa diketahui hanya dengan 1 kali masuk'
    ],
    correctIndex: 0,
    explanation: 'Memanfaatkan variabel fisik "suhu bohlam": Lampu yang menyala adalah saklar B, lampu yang mati tapi hangat adalah saklar A, dan lampu mati & dingin adalah saklar C.',
    rewardPoints: 75,
    badgeUnlock: 'master_kondisi'
  },
  {
    id: 'puz-3',
    date: '2026-08-10',
    title: 'Teka-Teki Jalur Terpendek Antar Kelas',
    difficulty: 'Tantangan',
    story: 'Ali ingin mengantar dokumen dari Kelas X-1 ke Kelas X-10. Ada 3 jalur rute koridor sekolah dengan bobot waktu: Rute A (10 menit), Rute B (6 menit + percabangan 3 menit), Rute C (15 menit).',
    question: 'Rute manakah yang memiliki Algoritma Efisiensi Waktu Terbaik (Tercepat)?',
    options: ['Rute B (Total 9 Menit)', 'Rute A (Total 10 Menit)', 'Rute C (Total 15 Menit)', 'Semua Rute Sama'],
    correctIndex: 0,
    explanation: 'Rute B membutuhkan total 6 + 3 = 9 menit, yang mana lebih kecil dibandingkan Rute A (10 menit) dan Rute C (15 menit). Algoritma memilih rute minimum.',
    rewardPoints: 100,
    badgeUnlock: 'navigator_algoritma'
  }
];

export const BADGES_LIST: Badge[] = [
  { id: 'pemula', title: 'Pemula Algoritma', description: 'Telah memulai perjalanan belajar algoritma', icon: 'Sparkles', category: 'General' },
  { id: 'penjelajah', title: 'Penjelajah Logika', description: 'Menyelesaikan 2 modul pembelajaran interaktif', icon: 'Compass', category: 'Modul' },
  { id: 'logika_master', title: 'Master Sekuensial', description: 'Menguasai struktur langkah berurutan', icon: 'Layers', category: 'Modul' },
  { id: 'detektif_data', title: 'Detektif Data', description: 'Memahami algoritma pencarian data', icon: 'Search', category: 'Modul' },
  { id: 'master_sorting', title: 'Master Pengurutan', description: 'Menguasai algoritma Bubble Sort', icon: 'ArrowUpDown', category: 'Modul' },
  { id: 'detektif_logika', title: 'Detektif Logika', description: 'Berhasil memecahkan teka-teki harian pertama', icon: 'Brain', category: 'Teka-teki' },
  { id: 'master_kondisi', title: 'Pakar Percabangan', description: 'Memecahkan kasus percabangan tingkat sedang', icon: 'GitFork', category: 'Teka-teki' },
  { id: 'navigator_algoritma', title: 'Navigator Algoritma', description: 'Memecahkan teka-teki efisiensi rute', icon: 'MapPin', category: 'Teka-teki' }
];
