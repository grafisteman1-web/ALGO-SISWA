import React from 'react';
import { BookOpen, Trophy, Puzzle, Brain, UserCheck, Wifi, WifiOff, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { Student, TeacherUser } from '../types';

interface NavbarProps {
  currentUser: { role: 'student' | 'teacher'; student?: Student; teacher?: TeacherUser } | null;
  activeTab: 'modules' | 'puzzles' | 'leaderboard' | 'teacher_panel';
  setActiveTab: (tab: 'modules' | 'puzzles' | 'leaderboard' | 'teacher_panel') => void;
  onOpenStudentLogin: () => void;
  onOpenTeacherLogin: () => void;
  onLogout: () => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenStudentLogin,
  onOpenTeacherLogin,
  onLogout,
  isOnline
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('modules')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                AlgoSMA
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Kelas X
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium hidden sm:block">
              Belajar & Simulasi Algoritma Interaktif
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-emerald-50/80 p-1.5 rounded-2xl border border-emerald-100/80">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'modules'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Modul & Simulasi
          </button>

          <button
            onClick={() => setActiveTab('puzzles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'puzzles'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50'
            }`}
          >
            <Puzzle className="w-4 h-4 text-amber-500" /> Teka-Teki Logika
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'leaderboard'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" /> Papan Peringkat
          </button>

          {currentUser?.role === 'teacher' && (
            <button
              onClick={() => setActiveTab('teacher_panel')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === 'teacher_panel'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-emerald-800 hover:bg-emerald-200/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" /> Panel Guru
            </button>
          )}
        </nav>

        {/* User Account / Login & Network Status */}
        <div className="flex items-center gap-3">
          {/* Network Indicator */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
              isOnline
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
            title={isOnline ? 'Terhubung ke Internet' : 'Mode Offline Aktif (Materi Tetap Dapat Diakses)'}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-600" /> : <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />}
            <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline Mode'}</span>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-1.5 pl-3 rounded-2xl">
              <div className="text-right">
                <span className="text-xs font-extrabold text-emerald-950 block truncate max-w-[120px]">
                  {currentUser.role === 'student' ? currentUser.student?.name : currentUser.teacher?.name}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 flex items-center justify-end gap-1">
                  {currentUser.role === 'student' ? (
                    <>
                      <Sparkles className="w-3 h-3 text-amber-500" /> {currentUser.student?.points} XP ({currentUser.student?.studentClass})
                    </>
                  ) : (
                    'Guru / Admin'
                  )}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-rose-100 text-rose-600 rounded-xl transition"
                title="Keluar / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenStudentLogin}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Login Siswa (NISN)
              </button>
              <button
                onClick={onOpenTeacherLogin}
                className="px-3 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition"
              >
                Login Guru
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around bg-emerald-50/90 border-t border-emerald-100 py-2 px-2 text-xs font-bold text-emerald-800">
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
            activeTab === 'modules' ? 'text-emerald-900 bg-white shadow-2xs' : 'text-emerald-700'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Modul
        </button>
        <button
          onClick={() => setActiveTab('puzzles')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
            activeTab === 'puzzles' ? 'text-emerald-900 bg-white shadow-2xs' : 'text-emerald-700'
          }`}
        >
          <Puzzle className="w-4 h-4 text-amber-500" /> Teka-Teki
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
            activeTab === 'leaderboard' ? 'text-emerald-900 bg-white shadow-2xs' : 'text-emerald-700'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" /> Peringkat
        </button>
        {currentUser?.role === 'teacher' && (
          <button
            onClick={() => setActiveTab('teacher_panel')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
              activeTab === 'teacher_panel' ? 'text-white bg-emerald-700' : 'text-emerald-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" /> Panel Guru
          </button>
        )}
      </div>
    </header>
  );
};
