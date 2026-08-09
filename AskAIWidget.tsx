import React, { useState } from 'react';
import { Search, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface StudentCard {
  nisn: string;
  name: string;
}

const SAMPLE_STUDENTS: StudentCard[] = [
  { nisn: '0101', name: 'Ali' },
  { nisn: '0102', name: 'Budi' },
  { nisn: '0103', name: 'Dwi' },
  { nisn: '0104', name: 'Fadhil' },
  { nisn: '0105', name: 'Jesika' },
  { nisn: '0106', name: 'Lani' },
  { nisn: '0107', name: 'Maya' },
  { nisn: '0108', name: 'Nabil' },
  { nisn: '0109', name: 'Siti' },
  { nisn: '0110', name: 'Zack' }
];

export const SearchingSim: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [targetName, setTargetName] = useState<string>('Lani');
  const [algorithm, setAlgorithm] = useState<'linear' | 'binary'>('linear');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [binaryRange, setBinaryRange] = useState<{ low: number; high: number; mid: number } | null>(null);
  const [stepsCount, setStepsCount] = useState<number>(0);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const startSearch = async () => {
    setIsSearching(true);
    setFoundIndex(null);
    setCurrentIndex(null);
    setBinaryRange(null);
    setStepsCount(0);

    const target = targetName.toLowerCase();

    if (algorithm === 'linear') {
      let steps = 0;
      for (let i = 0; i < SAMPLE_STUDENTS.length; i++) {
        steps++;
        setCurrentIndex(i);
        setStepsCount(steps);
        await new Promise(r => setTimeout(r, 600));

        if (SAMPLE_STUDENTS[i].name.toLowerCase() === target) {
          setFoundIndex(i);
          setIsSearching(false);
          if (onComplete) onComplete();
          return;
        }
      }
    } else {
      // Binary Search
      let low = 0;
      let high = SAMPLE_STUDENTS.length - 1;
      let steps = 0;

      while (low <= high) {
        steps++;
        const mid = Math.floor((low + high) / 2);
        setBinaryRange({ low, high, mid });
        setCurrentIndex(mid);
        setStepsCount(steps);
        await new Promise(r => setTimeout(r, 900));

        const midName = SAMPLE_STUDENTS[mid].name.toLowerCase();
        if (midName === target) {
          setFoundIndex(mid);
          setIsSearching(false);
          if (onComplete) onComplete();
          return;
        } else if (midName < target) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    }

    setIsSearching(false);
  };

  const handleReset = () => {
    setCurrentIndex(null);
    setBinaryRange(null);
    setStepsCount(0);
    setFoundIndex(null);
    setIsSearching(false);
  };

  return (
    <div className="bg-purple-50/60 rounded-2xl p-6 border border-purple-100/80 shadow-xs">
      <div className="pb-4 border-b border-purple-200/60 mb-6">
        <h4 className="font-semibold text-lg text-purple-950 flex items-center gap-2">
          Simulasi Pencarian Data Kontak Siswa (Linear vs Binary)
        </h4>
        <p className="text-sm text-purple-800">
          Cari nama teman kelas X di kontak terurut dan perhatikan perbedaan efisiensi langkah pencariannya!
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-xl border border-purple-200">
        <div>
          <label className="text-xs font-bold text-purple-900 block mb-1">Target Nama Siswa:</label>
          <select
            value={targetName}
            onChange={e => {
              setTargetName(e.target.value);
              handleReset();
            }}
            disabled={isSearching}
            className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-lg text-xs font-semibold text-purple-950"
          >
            {SAMPLE_STUDENTS.map(s => (
              <option key={s.nisn} value={s.name}>
                {s.name} (NISN: {s.nisn})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-purple-900 block mb-1">Metode Algoritma:</label>
          <select
            value={algorithm}
            onChange={e => {
              setAlgorithm(e.target.value as any);
              handleReset();
            }}
            disabled={isSearching}
            className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-lg text-xs font-semibold text-purple-950"
          >
            <option value="linear">Linear Search (Cari Satu per Satu)</option>
            <option value="binary">Binary Search (Bagi Dua Wilayah Data)</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={startSearch}
            disabled={isSearching}
            className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <Play className="w-4 h-4" /> Cari Sekarang
          </button>
          <button
            onClick={handleReset}
            disabled={isSearching}
            className="p-2 border border-purple-300 rounded-xl hover:bg-purple-100 text-purple-800"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Stats Counter */}
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-xs font-bold text-purple-900 uppercase">
          Metode: <span className="text-purple-600">{algorithm === 'linear' ? 'Linear Search' : 'Binary Search'}</span>
        </span>
        <span className="text-xs font-bold bg-purple-200 text-purple-900 px-3 py-1 rounded-full">
          Jumlah Langkah Pembandingan: {stepsCount}
        </span>
      </div>

      {/* Cards Visualization */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-6">
        {SAMPLE_STUDENTS.map((st, idx) => {
          const isInspected = currentIndex === idx;
          const isFound = foundIndex === idx;
          const isInBinaryRange = binaryRange && idx >= binaryRange.low && idx <= binaryRange.high;
          const isMid = binaryRange && binaryRange.mid === idx;

          return (
            <div
              key={st.nisn}
              className={`p-2.5 rounded-xl border text-center transition-all duration-300 ${
                isFound
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md ring-2 ring-emerald-300'
                  : isInspected
                  ? 'bg-purple-600 text-white border-purple-700 scale-105 shadow-md animate-pulse'
                  : isMid
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : isInBinaryRange
                  ? 'bg-purple-100 border-purple-300 text-purple-900'
                  : 'bg-white border-purple-100 text-purple-400 opacity-60'
              }`}
            >
              <span className="text-[10px] block opacity-75">#{idx}</span>
              <span className="font-bold text-xs block truncate mt-0.5">{st.name}</span>
              <span className="text-[9px] block opacity-80 mt-1">NISN:{st.nisn}</span>
            </div>
          );
        })}
      </div>

      {foundIndex !== null && (
        <div className="p-4 bg-purple-600 text-white rounded-xl text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple-200" />
          <span className="font-semibold">
            Data "{SAMPLE_STUDENTS[foundIndex].name}" ditemukan pada indeks ke-{foundIndex} hanya dalam {stepsCount} langkah! (+30 XP)
          </span>
        </div>
      )}
    </div>
  );
};
