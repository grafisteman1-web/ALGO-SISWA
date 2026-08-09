import React from 'react';
import { Sparkles, Trophy, BookOpen, Brain, PlayCircle, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onStartLearning: () => void;
  onOpenPuzzles: () => void;
  studentName?: string;
  points?: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartLearning,
  onOpenPuzzles,
  studentName,
  points
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-white p-6 sm:p-10 mb-8 shadow-xl">
      {/* Decorative SVG Green Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Intro Text */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Mata Pelajaran Informatika Kelas X SMA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            {studentName ? (
              <>Halo, <span className="text-amber-300">{studentName}</span>! Siap Belajar Algoritma?</>
            ) : (
              <>Belajar & Simulasi <span className="text-amber-300">Algoritma Interaktif</span> dengan Seru!</>
            )}
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
            Pahami bentuk-bentuk algoritma (Sekuensial, Percabangan, Perulangan, Pencarian, Pengurutan) lewat simulasi kasus nyata SMA! Selesaikan teka-teki logika harian, kumpulkan XP, dan raih posisi puncak papan peringkat!
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              onClick={onStartLearning}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <PlayCircle className="w-5 h-5 text-emerald-900" /> Mulai Simulasi Modul
            </button>
            <button
              onClick={onOpenPuzzles}
              className="px-6 py-3 bg-emerald-700/80 hover:bg-emerald-600/90 text-white font-bold rounded-2xl text-sm border border-emerald-500/50 transition flex items-center gap-2 backdrop-blur-xs"
            >
              <Brain className="w-5 h-5 text-amber-300" /> Tantangan Teka-Teki Logika
            </button>
          </div>
        </div>

        {/* Right Illustration Card Badge */}
        <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl flex flex-col gap-4 text-emerald-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Ilustrasi Edukasi SMA
            </span>
            <span className="bg-emerald-500/40 text-emerald-100 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              Go Green Logic
            </span>
          </div>

          {/* Friendly Illustrated Character Scene Simulation Box */}
          <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/30 text-center">
            <div className="text-3xl mb-2 flex justify-center gap-2">
              <span>🌱</span><span>🪴</span><span>🌳</span><span>♻️</span>
            </div>
            <div className="text-xs font-bold text-amber-200">
              "Lani, Budi, Maya, & Siti"
            </div>
            <p className="text-[11px] text-emerald-200/90 mt-1">
              "Menggunakan Algoritma Efisiensi untuk Menyiram Tanaman & Daur Ulang Sampah Sekolah!"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
              <span className="text-lg font-black text-amber-300 block">5 Modul</span>
              <span className="text-[10px] text-emerald-200">Simulasi Interaktif</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
              <span className="text-lg font-black text-amber-300 block">{points || 0} XP</span>
              <span className="text-[10px] text-emerald-200">Poin Hadiah Kamu</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
