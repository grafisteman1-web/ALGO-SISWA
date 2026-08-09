import { Student, StudentActivityLog, TeacherUser } from '../types';
import { INITIAL_STUDENTS_DATA } from '../data/initialStudents';

const STUDENTS_STORAGE_KEY = 'algosma_students_v1';
const CURRENT_USER_KEY = 'algosma_current_user_v1';
const AI_CHAT_KEY = 'algosma_ai_chat_v1';
const PENDING_SYNC_KEY = 'algosma_pending_sync_v1';

// Load students from localStorage or fallback to initial CSV data
export function getStoredStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored students:', e);
  }
  // Initial save
  saveStudentsToStorage(INITIAL_STUDENTS_DATA);
  return INITIAL_STUDENTS_DATA;
}

export function saveStudentsToStorage(students: Student[]) {
  try {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students to storage:', e);
  }
}

// Find student by NISN (case insensitive trim)
export function findStudentByNisn(nisnInput: string): Student | null {
  const cleanNisn = nisnInput.trim();
  const students = getStoredStudents();
  return students.find(s => s.nisn.trim() === cleanNisn) || null;
}

// Active session storage
export function getStoredCurrentUser(): { role: 'student' | 'teacher'; student?: Student; teacher?: TeacherUser } | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading current user:', e);
  }
  return null;
}

export function saveStoredCurrentUser(user: { role: 'student' | 'teacher'; student?: Student; teacher?: TeacherUser } | null) {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Error saving current user:', e);
  }
}

// Award points and badges to a student
export function updateStudentProgress(
  nisn: string,
  addPoints: number,
  completedModuleId?: string,
  solvedPuzzleId?: string,
  newBadgeId?: string,
  activityTitle?: string
): Student | null {
  const students = getStoredStudents();
  const index = students.findIndex(s => s.nisn.trim() === nisn.trim());
  if (index === -1) return null;

  const student = { ...students[index] };
  student.points = (student.points || 0) + addPoints;
  student.lastActive = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (completedModuleId && !student.completedModules.includes(completedModuleId)) {
    student.completedModules = [...student.completedModules, completedModuleId];
  }

  if (solvedPuzzleId && !student.solvedPuzzles.includes(solvedPuzzleId)) {
    student.solvedPuzzles = [...student.solvedPuzzles, solvedPuzzleId];
  }

  if (newBadgeId && !student.badges.includes(newBadgeId)) {
    student.badges = [...student.badges, newBadgeId];
  }

  // Record Activity Log
  const activityLog: StudentActivityLog = {
    id: 'act-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    type: completedModuleId ? 'module_complete' : solvedPuzzleId ? 'puzzle_solve' : 'quiz_score',
    title: activityTitle || (completedModuleId ? `Tuntas Modul ${completedModuleId}` : `Memecahkan Teka-Teki ${solvedPuzzleId}`),
    scoreOrPoints: addPoints,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  };

  student.historyLog = [activityLog, ...(student.historyLog || [])].slice(0, 20);

  students[index] = student;
  saveStudentsToStorage(students);

  // If current logged-in user is this student, update session
  const activeUser = getStoredCurrentUser();
  if (activeUser && activeUser.role === 'student' && activeUser.student?.nisn === nisn) {
    saveStoredCurrentUser({ role: 'student', student });
  }

  return student;
}

// Teacher CRUD Functions
export function addStudentByTeacher(newStudent: Omit<Student, 'points' | 'completedModules' | 'solvedPuzzles' | 'badges'>): Student {
  const students = getStoredStudents();
  const fullStudent: Student = {
    ...newStudent,
    points: 0,
    completedModules: [],
    solvedPuzzles: [],
    badges: ['pemula'],
    lastActive: 'Baru ditambahkan'
  };
  students.push(fullStudent);
  saveStudentsToStorage(students);
  return fullStudent;
}

export function updateStudentByTeacher(updated: Student): boolean {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.id === updated.id || s.nisn === updated.nisn);
  if (idx !== -1) {
    students[idx] = updated;
    saveStudentsToStorage(students);
    return true;
  }
  return false;
}

export function deleteStudentByTeacher(nisn: string): boolean {
  let students = getStoredStudents();
  const initialLen = students.length;
  students = students.filter(s => s.nisn !== nisn);
  if (students.length !== initialLen) {
    saveStudentsToStorage(students);
    return true;
  }
  return false;
}

// AI Chat Storage
export function getStoredAIChat(): Array<{ id: string; sender: 'user' | 'ai'; text: string; timestamp: string }> {
  try {
    const raw = localStorage.getItem(AI_CHAT_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveAIChatToStorage(messages: Array<{ id: string; sender: 'user' | 'ai'; text: string; timestamp: string }>) {
  try {
    localStorage.setItem(AI_CHAT_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error(e);
  }
}
