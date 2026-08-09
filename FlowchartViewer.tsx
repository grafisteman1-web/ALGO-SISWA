import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, ArrowRight, BookOpen, Shirt, Utensils, Backpack } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const SequentialSim: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps: Step[] = [
    { id: 1, title: 'Lihat Jadwal Hari Senin', desc: 'Mengecek buku paket Informatika & Matematika', icon: <BookOpen className="w-5 h-5 text-emerald-600" /> },
    { id: 2, title: 'Susun Buku ke Tas', desc: 'Memasukkan buku paket dan catatan rapi ke tas sekolah', icon: <Backpack className="w-5 h-5 text-emerald-600" /> },
    { id: 3, title: 'Pakai Seragam SMA', desc: 'Mengenakan seragam putih-abu lengkap dengan dasi & sepatu', icon: <Shirt className="w-5 h-5 text-emerald-600" /> },
    { id: 4, title: 'Bawa Bekal Makan Pagi', desc: 'Memasukkan tempat makan bekal sehat ke dalam kantong tas', icon: <Utensils className="w-5 h-5 text-emerald-600" /> }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStep < steps.length) {
        timer = setTimeout(() => {
          setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
          setCurrentStep(prev => prev + 1);
        }, 1500);
      } else {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, onComplete]);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === steps.length && onComplete) {
        onComplete();
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  return (
    <div className="bg-emerald-50/60 rounded-2xl p-6 border border-emerald-100/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-emerald-200/60 mb-6 gap-3">
        <div>
          <h4 className="font-semibold text-lg text-emerald-950 flex items-center gap-2">
            Simulasi Sekuensial: Persiapan Sekolah Budi
          </h4>
          <p className="text-sm text-emerald-700">Setiap instruksi dijalankan berurutan. Coba jalankan simulasi!</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStep >= steps.length}
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
              currentStep >= steps.length
                ? 'bg-emerald-200 text-emerald-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Jeda' : 'Mulai Otomatis'}
          </button>
          <button
            onClick={handleNextStep}
            disabled={currentStep >= steps.length || isPlaying}
            className="px-3 py-2 bg-white text-emerald-800 border border-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-100 disabled:opacity-50 transition flex items-center gap-1"
          >
            Langkah Selanjutnya <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-emerald-700 hover:bg-emerald-200/60 rounded-xl transition"
            title="Reset Simulasi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-emerald-200/70 h-2.5 rounded-full mb-8 overflow-hidden">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Sequential Steps Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const isCurrent = currentStep === idx;
          const isDone = completedSteps.includes(idx);

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400 scale-102'
                  : isDone
                  ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
                  : 'bg-white/60 border-emerald-100 text-emerald-600/70 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-800">
                    Langkah #{step.id}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isCurrent ? (
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  ) : null}
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl w-fit mb-3">{step.icon}</div>
                <h5 className="font-semibold text-sm text-emerald-950 mb-1">{step.title}</h5>
                <p className="text-xs text-emerald-800 leading-relaxed">{step.desc}</p>
              </div>

              {isCurrent && (
                <div className="mt-3 pt-2 border-t border-emerald-100 text-xs text-emerald-600 font-medium animate-pulse">
                  Sedang Diproses...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {currentStep >= steps.length && (
        <div className="mt-6 p-4 bg-emerald-600 text-white rounded-xl text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="font-semibold">Selamat! Budi berhasil menyelesaikan persiapan sekolah secara terurut & sempurna! (+30 XP)</span>
        </div>
      )}
    </div>
  );
};
