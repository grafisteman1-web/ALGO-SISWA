import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ArrowUpDown, CheckCircle2 } from 'lucide-react';

export const SortingSim: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [array, setArray] = useState<number[]>([68, 85, 72, 94, 55, 80, 60]);
  const [comparingIdx, setComparingIdx] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);

  const startBubbleSort = async () => {
    setIsSorting(true);
    setSortedIndices([]);

    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIdx([j, j + 1]);
        await new Promise(r => setTimeout(r, speedMs));

        if (arr[j] > arr[j + 1]) {
          // Swap
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise(r => setTimeout(r, speedMs));
        }
      }
      setSortedIndices(prev => [...prev, n - 1 - i]);
    }

    setSortedIndices(Array.from({ length: n }, (_, k) => k));
    setComparingIdx(null);
    setIsSorting(false);
    if (onComplete) onComplete();
  };

  const resetArray = () => {
    setArray([68, 85, 72, 94, 55, 80, 60]);
    setComparingIdx(null);
    setSortedIndices([]);
    setIsSorting(false);
  };

  return (
    <div className="bg-rose-50/60 rounded-2xl p-6 border border-rose-100/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-rose-200/60 mb-6 gap-3">
        <div>
          <h4 className="font-semibold text-lg text-rose-950 flex items-center gap-2">
            Simulasi Pengurutan Nilai Tugas Informatika (Bubble Sort)
          </h4>
          <p className="text-sm text-rose-800">
            Bubble Sort membandingkan pasangan nilai bersebelahan dan menukarnya jika nilai kiri &gt; kanan!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startBubbleSort}
            disabled={isSorting}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            <Play className="w-4 h-4" /> Urutkan (Sort)
          </button>
          <button
            onClick={resetArray}
            disabled={isSorting}
            className="p-2 border border-rose-300 rounded-xl hover:bg-rose-100 text-rose-800"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-white p-6 rounded-2xl border border-rose-200 mb-6">
        <div className="flex items-end justify-center gap-3 md:gap-6 h-56 pt-6">
          {array.map((val, idx) => {
            const isComparing = comparingIdx && (comparingIdx[0] === idx || comparingIdx[1] === idx);
            const isSorted = sortedIndices.includes(idx);

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[56px]">
                <span className="text-xs font-bold text-slate-700">{val}</span>
                <div
                  className={`w-full rounded-t-xl transition-all duration-300 flex items-end justify-center pb-2 ${
                    isSorted
                      ? 'bg-emerald-500 shadow-md'
                      : isComparing
                      ? 'bg-rose-600 shadow-lg scale-105 animate-pulse'
                      : 'bg-rose-300'
                  }`}
                  style={{ height: `${val * 1.8}px` }}
                >
                  <span className="text-[10px] text-white font-mono">#{idx}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {sortedIndices.length === array.length && (
        <div className="p-4 bg-emerald-600 text-white rounded-xl text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="font-semibold">
            Seluruh Nilai Tugas Berhasil Terurut Sempurna dari Terendah ke Tertinggi! (+30 XP)
          </span>
        </div>
      )}
    </div>
  );
};
