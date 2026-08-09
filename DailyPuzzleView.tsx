import React, { useState } from 'react';
import { CloudRain, Sun, Umbrella, Bus, Navigation, CheckCircle2 } from 'lucide-react';

export const BranchingSim: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isRaining, setIsRaining] = useState<boolean>(true);
  const [hasUmbrella, setHasUmbrella] = useState<boolean>(true);
  const [hasEkskul, setHasEkskul] = useState<boolean>(false);

  // Evaluate Decision Outcome
  const getDecisionResult = () => {
    if (hasEkskul) {
      return {
        title: 'Ikut Kegiatan Ekskul di Sekolah',
        desc: 'Menuju ke Ruang Lab / Lapangan Ekskul terlebih dahulu hingga jam 16.00.',
        routeType: 'ekskul',
        icon: <Navigation className="w-6 h-6 text-purple-600" />
      };
    }

    if (isRaining) {
      if (hasUmbrella) {
        return {
          title: 'Pulang Naik Angkot / Bawa Payung',
          desc: 'Aman dari air hujan! Berjalan ke halte depan sekolah menggunakan payung lalu naik angkot.',
          routeType: 'angkot',
          icon: <Bus className="w-6 h-6 text-blue-600" />
        };
      } else {
        return {
          title: 'Berteduh di Gazebo Sekolah',
          desc: 'Menunggu hujan reda di Gazebo SMA atau menghubungi orang tua untuk dijemput.',
          routeType: 'berteduh',
          icon: <CloudRain className="w-6 h-6 text-indigo-600" />
        };
      }
    } else {
      return {
        title: 'Jalan Kaki Santai Lewat Taman Sekolah',
        desc: 'Cuaca cerah menyenangkan! Berjalan bersama Siti & Budi melewati koridor taman.',
        routeType: 'jalan_kaki',
        icon: <Sun className="w-6 h-6 text-amber-500" />
      };
    }
  };

  const result = getDecisionResult();

  return (
    <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-100/80 shadow-xs">
      <div className="pb-4 border-b border-blue-200/60 mb-6">
        <h4 className="font-semibold text-lg text-blue-950 flex items-center gap-2">
          Simulasi Percabangan (If - Else): Keputusan Pulang Sekolah
        </h4>
        <p className="text-sm text-blue-800">
          Ubah parameter kondisi di bawah ini untuk melihat bagaimana algoritma mengambil cabang keputusan yang tepat!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Toggle 1: Weather */}
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
          <label className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
            Kondisi 1: Cuaca Saat Ini
          </label>
          <div className="flex rounded-lg p-1 bg-blue-50">
            <button
              onClick={() => setIsRaining(true)}
              className={`flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                isRaining ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-100'
              }`}
            >
              <CloudRain className="w-4 h-4" /> Hujan
            </button>
            <button
              onClick={() => setIsRaining(false)}
              className={`flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                !isRaining ? 'bg-amber-500 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Sun className="w-4 h-4" /> Cerah
            </button>
          </div>
        </div>

        {/* Toggle 2: Umbrella */}
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
          <label className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
            Kondisi 2: Bawa Payung / Jas Hujan?
          </label>
          <div className="flex rounded-lg p-1 bg-blue-50">
            <button
              onClick={() => setHasUmbrella(true)}
              className={`flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                hasUmbrella ? 'bg-emerald-600 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Umbrella className="w-4 h-4" /> Ya, Bawa
            </button>
            <button
              onClick={() => setHasUmbrella(false)}
              className={`flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                !hasUmbrella ? 'bg-rose-500 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-100'
              }`}
            >
              Tidak
            </button>
          </div>
        </div>

        {/* Toggle 3: Ekskul */}
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
          <label className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
            Kondisi 3: Ada Jadwal Ekskul / OSIS?
          </label>
          <div className="flex rounded-lg p-1 bg-blue-50">
            <button
              onClick={() => setHasEkskul(true)}
              className={`flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                hasEkskul ? 'bg-purple-600 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-100'
              }`}
            >
              Ada
            </button>
            <button
              onClick={() => setHasEkskul(false)}
              className={`flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                !hasEkskul ? 'bg-slate-600 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-100'
              }`}
            >
              Tidak Ada
            </button>
          </div>
        </div>
      </div>

      {/* Decision Tree Pseudocode Output */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs mb-6 overflow-x-auto border border-slate-800">
        <div className="text-slate-400 mb-2">// Kode Logika Evaluasi Sistem:</div>
        <div><span className="text-purple-400">IF</span> (ada_ekskul == <span className="text-amber-300">{hasEkskul ? 'TRUE' : 'FALSE'}</span>) <span className="text-purple-400">THEN</span></div>
        <div className="pl-4 text-purple-300">Keputusan: "Ikut Ekskul Sekolah"</div>
        <div><span className="text-purple-400">ELSE IF</span> (cuaca == <span className="text-amber-300">"{isRaining ? 'Hujan' : 'Cerah'}"</span>) <span className="text-purple-400">THEN</span></div>
        <div className="pl-4">
          <span className="text-purple-400">IF</span> (bawa_payung == <span className="text-amber-300">{hasUmbrella ? 'TRUE' : 'FALSE'}</span>) <span className="text-purple-400">THEN</span>
        </div>
        <div className="pl-8 text-emerald-400">Keputusan: "Pulang Naik Angkot / Payung"</div>
        <div className="pl-4">
          <span className="text-purple-400">ELSE</span>
        </div>
        <div className="pl-8 text-rose-400">Keputusan: "Berteduh di Gazebo"</div>
        <div><span className="text-purple-400">ELSE</span></div>
        <div className="pl-4 text-amber-300">Keputusan: "Jalan Kaki Santai Lewat Taman"</div>
        <div><span className="text-purple-400">ENDIF</span></div>
      </div>

      {/* Decision Outcome Card */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-400 shadow-md flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-2xl">{result.icon}</div>
        <div className="flex-1">
          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full uppercase">
            Hasil Eksekusi Cabang
          </span>
          <h5 className="text-lg font-bold text-slate-900 mt-1">{result.title}</h5>
          <p className="text-sm text-slate-600 mt-1">{result.desc}</p>
        </div>
        <button
          onClick={() => {
            if (onComplete) onComplete();
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <CheckCircle2 className="w-4 h-4" /> Selesaikan
        </button>
      </div>
    </div>
  );
};
