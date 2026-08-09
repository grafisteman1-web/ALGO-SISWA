import React, { useState, useEffect } from 'react';
import { Student, TeacherUser } from './types';
import {
  getStoredStudents,
  getStoredCurrentUser,
  saveStoredCurrentUser,
  updateStudentProgress,
  saveStudentsToStorage
} from './lib/storage';
import { LEARNING_MODULES } from './data/learningModules';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ModuleCard } from './components/ModuleCard';
import { DailyPuzzleView } from './components/DailyPuzzleView';
import { LeaderboardView } from './components/LeaderboardView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AskAIWidget } from './components/AskAIWidget';
import { StudentLoginModal } from './components/StudentLoginModal';
import { TeacherLoginModal } from './components/TeacherLoginModal';
import { Sparkles, Award, CheckCircle2, Wifi, WifiOff } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    role: 'student' | 'teacher';
    student?: Student;
    teacher?: TeacherUser;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'modules' | 'puzzles' | 'leaderboard' | 'teacher_panel'>('modules');
  const [showStudentLogin, setShowStudentLogin] = useState<boolean>(false);
  const [showTeacherLogin, setShowTeacherLogin] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Toast reward notification
  const [toastMsg, setToastMsg] = useState<{ title: string; points: number } | null>(null);

  useEffect(() => {
    const loadedStudents = getStoredStudents();
    setStudents(loadedStudents);

    const savedUser = getStoredCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync state changes to storage
  const handleStudentsChange = (newStudentsList: Student[]) => {
    setStudents(newStudentsList);
    saveStudentsToStorage(newStudentsList);
  };

  const handleStudentLoginSuccess = (student: Student) => {
    const session = { role: 'student' as const, student };
    setCurrentUser(session);
    saveStoredCurrentUser(session);
    setShowStudentLogin(false);
  };

  const handleTeacherLoginSuccess = (teacher: TeacherUser) => {
    const session = { role: 'teacher' as const, teacher };
    setCurrentUser(session);
    saveStoredCurrentUser(session);
    setShowTeacherLogin(false);
    setActiveTab('teacher_panel');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveStoredCurrentUser(null);
    setActiveTab('modules');
  };

  const showRewardToast = (title: string, points: number) => {
    setToastMsg({ title, points });
    setTimeout(() => {
      setToastMsg(null);
    }, 4000);
  };

  const handleCompleteModule = (moduleId: string, points: number) => {
    if (!currentUser || currentUser.role !== 'student' || !currentUser.student) {
      setShowStudentLogin(true);
      return;
    }

    const updated = updateStudentProgress(
      currentUser.student.nisn,
      points,
      moduleId,
      undefined,
      'penjelajah',
      `Menuntaskan Simulasi ${moduleId}`
    );

    if (updated) {
      setCurrentUser({ role: 'student', student: updated });
      setStudents(getStoredStudents());
      showRewardToast(`Selamat! Kamu Tuntas Modul ${moduleId}`, points);
    }
  };

  const handleSolvePuzzle = (puzzleId: string, points: number, badgeUnlock?: string) => {
    if (!currentUser || currentUser.role !== 'student' || !currentUser.student) {
      setShowStudentLogin(true);
      return;
    }

    const updated = updateStudentProgress(
      currentUser.student.nisn,
      points,
      undefined,
      puzzleId,
      badgeUnlock,
      `Memecahkan Teka-Teki Logika ${puzzleId}`
    );

    if (updated) {
      setCurrentUser({ role: 'student', student: updated });
      setStudents(getStoredStudents());
      showRewardToast(`Hebat! Teka-Teki Berhasil Dipecahkan`, points);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStudentLogin={() => setShowStudentLogin(true)}
        onOpenTeacherLogin={() => setShowTeacherLogin(true)}
        onLogout={handleLogout}
        isOnline={isOnline}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Offline Banner Alert */}
        {!isOnline && (
          <div className="mb-6 p-4 bg-amber-500 text-white rounded-2xl shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 animate-pulse" />
              <div>
                <span className="font-extrabold text-sm block">Mode Offline Aktif</span>
                <span className="text-xs text-amber-100">
                  Seluruh materi, simulasi, dan data lokal tersimpan dengan aman. Kamu tetap dapat belajar tanpa koneksi internet!
                </span>
              </div>
            </div>
            <span className="text-xs font-black bg-amber-700 px-3 py-1 rounded-full">
              Lokal Storage
            </span>
          </div>
        )}

        {/* Hero Section */}
        {activeTab === 'modules' && (
          <HeroBanner
            onStartLearning={() => {
              const el = document.getElementById('modules-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenPuzzles={() => setActiveTab('puzzles')}
            studentName={currentUser?.role === 'student' ? currentUser.student?.name : undefined}
            points={currentUser?.role === 'student' ? currentUser.student?.points : 0}
          />
        )}

        {/* Tab 1: Modules & Interactive Simulations */}
        {activeTab === 'modules' && (
          <div id="modules-section" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Modul Pembelajaran & Simulasi Algoritma
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Pelajari 5 konsep dasar algoritma Informatika SMA Kelas X secara visual & interaktif
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {LEARNING_MODULES.map(module => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  currentStudent={currentUser?.role === 'student' ? currentUser.student || null : null}
                  onCompleteModule={handleCompleteModule}
                  onNeedLogin={() => setShowStudentLogin(true)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Daily Puzzles */}
        {activeTab === 'puzzles' && (
          <DailyPuzzleView
            currentStudent={currentUser?.role === 'student' ? currentUser.student || null : null}
            onSolvePuzzle={handleSolvePuzzle}
            onNeedLogin={() => setShowStudentLogin(true)}
          />
        )}

        {/* Tab 3: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <LeaderboardView
            students={students}
            currentStudentNisn={currentUser?.role === 'student' ? currentUser.student?.nisn : undefined}
          />
        )}

        {/* Tab 4: Teacher / Admin Dashboard */}
        {activeTab === 'teacher_panel' && currentUser?.role === 'teacher' && currentUser.teacher && (
          <TeacherDashboard
            teacher={currentUser.teacher}
            students={students}
            onStudentsChange={handleStudentsChange}
            isOnline={isOnline}
          />
        )}
      </main>

      {/* Floating Ask AI Widget */}
      <AskAIWidget
        currentStudent={currentUser?.role === 'student' ? currentUser.student || null : null}
        isOnline={isOnline}
      />

      {/* Login Modals */}
      {showStudentLogin && (
        <StudentLoginModal
          students={students}
          onLoginSuccess={handleStudentLoginSuccess}
          onClose={() => setShowStudentLogin(false)}
        />
      )}

      {showTeacherLogin && (
        <TeacherLoginModal
          onLoginSuccess={handleTeacherLoginSuccess}
          onClose={() => setShowTeacherLogin(false)}
        />
      )}

      {/* Toast Notification Popup */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-2xl shadow-2xl border border-emerald-300 flex items-center gap-3 animate-bounce">
          <div className="p-2 bg-amber-400 text-slate-950 rounded-xl">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h5 className="font-extrabold text-sm">{toastMsg.title}</h5>
            <p className="text-xs text-emerald-100">+{toastMsg.points} XP Ditambahkan ke Profil Kamu!</p>
          </div>
        </div>
      )}
    </div>
  );
}
