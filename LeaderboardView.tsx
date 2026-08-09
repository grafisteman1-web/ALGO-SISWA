import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

export const LoopingSim: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [lapTarget, setLapTarget] = useState<number>(5);
  const [currentLap, setCurrentLap] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      if (currentLap < lapTarget) {
        timer = setTimeout(() => {
          setCurrentLap(prev => prev + 1);
        }, speedMs);
      } else {
        setIsRunning(false);
        if (onComplete) onComplete();
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentLap, lapTarget, speedMs, onComplete]);

  const handleStepOnce = () => {
    if (currentLap < lapTarget) {
      const next = currentLap + 1;
      setCurrentLap(next);
      if (next === lapTarget && onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setCurrentLap(0);
    setIsRunning(false);
  };

  return (
    <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-100/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-amber-200/60 mb-6 gap-3">
        <div>
          <h4 className="font-semibold text-lg text-amber-950 flex items-center gap-2">
            Simulasi Perulangan (Looping): Lari Keliling Lapangan PJOK
          </h4>
          <p className="text-sm text-amber-800">
            Perulangan mengeksekusi aksi lari berulang kali selama kondisi <code className="font-mono bg-amber-100 px-1 rounded">putaran &lt; {lapTarget}</code> bernilai Benar!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={currentLap >= lapTarget}
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
              currentLap >= lapTarget
                ? 'bg-amber-200 text-amber-500 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700 shadow-xs'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Jeda' : 'Jalankan Loop'}
          </button>
          <button
            onClick={handleStepOnce}
            disabled={currentLap >= lapTarget || isRunning}
            className="px-3 py-2 bg-white text-amber-900 border border-amber-300 rounded-xl text-sm font-medium hover:bg-amber-100 disabled:opacity-50 transition"
          >
            +1 Putaran
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-amber-800 hover:bg-amber-200/60 rounded-xl transition"
            title="Reset Loop"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Lap Target */}
      <div className="flex flex-wrap items-center gap-6 mb-6 bg-white p-4 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-amber-900">Target Putaran (N):</label>
          <select
            value={lapTarget}
            onChange={e => {
              setLapTarget(Number(e.target.value));
              setCurrentLap(0);
              setIsRunning(false);
            }}
            disabled={isRunning}
            className="px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900"
          >
            <option value={3}>3 Putaran</option>
            <option value={5}>5 Putaran (Standar)</option>
            <option value={8}>8 Putaran</option>
            <option value={10}>10 Putaran</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-amber-900">Kecepatan Simulation:</label>
          <input
            type="range"
            min={300}
            max={1500}
            step={100}
            value={1800 - speedMs}
            onChange={e => setSpeedMs(1800 - Number(e.target.value))}
            className="accent-amber-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Stadium Track */}
      <div className="relative w-full h-48 bg-emerald-100 rounded-2xl border-4 border-emerald-300 flex items-center justify-center p-4 overflow-hidden shadow-inner mb-6">
        {/* Track oval line */}
        <div className="w-full h-full rounded-full border-8 border-dashed border-emerald-400 flex items-center justify-center relative">
          <div className="text-center bg-white/90 backdrop-blur-xs px-6 py-3 rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Status Loop Variable</span>
            <div className="text-2xl font-black text-amber-600 mt-0.5">
              putaran = {currentLap} / {lapTarget}
            </div>
            <span className="text-xs font-medium text-slate-500">
              Kondisi ({currentLap} &lt; {lapTarget}) = {currentLap < lapTarget ? 'BENAR (Lanjut)' : 'SALAH (Selesai)'}
            </span>
          </div>

          {/* Running Avatar Indicator */}
          <div
            className="absolute transition-all duration-500 ease-in-out flex flex-col items-center"
            style={{
              top: '12%',
              left: `${10 + (currentLap / lapTarget) * 78}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md animate-bounce">
              🏃
            </div>
            <span className="text-[10px] font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded-full mt-1">
              Siswa Lari
            </span>
          </div>
        </div>
      </div>

      {/* Lap Progress Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {Array.from({ length: lapTarget }).map((_, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              idx < currentLap
                ? 'bg-amber-500 text-white shadow-xs scale-105'
                : 'bg-white border border-amber-200 text-amber-400'
            }`}
          >
            {idx < currentLap ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
            Putaran #{idx + 1}
          </div>
        ))}
      </div>

      {currentLap >= lapTarget && (
        <div className="mt-6 p-4 bg-amber-500 text-white rounded-xl text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <Award className="w-5 h-5" />
          <span className="font-semibold">Hebat! 5 Putaran Lari Selesai! Kondisi WHILE bernilai False dan Loop Dihentikan! (+30 XP)</span>
        </div>
      )}
    </div>
  );
};
