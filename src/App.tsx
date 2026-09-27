import React, { useState, useEffect } from 'react';
import { Language, StudentInfo, AnswerLog } from './types/prl';
import { BADGES } from './data/gameData';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StudentModal } from './components/StudentModal';
import { ResultsModal } from './components/ResultsModal';
import { EpiRunnerGame } from './components/games/EpiRunnerGame';
import { ArScannerGame } from './components/games/ArScannerGame';
import { EmergencySimulatorGame } from './components/games/EmergencySimulatorGame';
import { ProtocolPuzzleGame } from './components/games/ProtocolPuzzleGame';
import { ArcadeVaraderoGame } from './components/games/ArcadeVaraderoGame';
import { sound } from './utils/sound';

export default function App() {
  const [language, setLanguage] = useState<Language>('ca');
  
  // Student persistent info
  const [student, setStudent] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem('prl_nautica_student');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { name: '', group: '', emailTarget: 'jpons@centredelamar.com' };
  });

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Global Session State
  const [globalPoints, setGlobalPoints] = useState(0);
  const [streak, setStreak] = useState(1);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [badges, setBadges] = useState(BADGES);

  // Active View State
  const [activeView, setActiveView] = useState<
    'dashboard' | 'epi-runner' | 'ar-scanner' | 'emergency-sim' | 'protocol-puzzle' | 'arcade-varadero'
  >('dashboard');

  // Results Modal State
  const [resultsModal, setResultsModal] = useState<{
    isOpen: boolean;
    score: number;
    answersLog: AnswerLog[];
  }>({
    isOpen: false,
    score: 0,
    answersLog: []
  });

  // Save student to storage on update
  const handleSaveStudent = (info: StudentInfo) => {
    setStudent(info);
    try {
      localStorage.setItem('prl_nautica_student', JSON.stringify(info));
    } catch {
      // ignore
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGame = (
    gameId: 'epi-runner' | 'ar-scanner' | 'emergency-sim' | 'protocol-puzzle' | 'arcade-varadero'
  ) => {
    // Prompt student name if missing
    if (!student.name || !student.group) {
      setIsStudentModalOpen(true);
      return;
    }
    sound.playClick();
    setActiveView(gameId);
  };

  const handleGameFinish = (gameScore: number, log: AnswerLog[]) => {
    setGlobalPoints((prev) => prev + gameScore);
    setTotalAnswered((prev) => prev + log.length);
    const correctCount = log.filter((l) => l.isCorrect).length;
    setTotalCorrect((prev) => prev + correctCount);

    if (activeView !== 'dashboard' && !completedGames.includes(activeView)) {
      setCompletedGames((prev) => [...prev, activeView]);
    }

    setResultsModal({
      isOpen: true,
      score: gameScore,
      answersLog: log
    });
  };

  const handleCloseResults = () => {
    sound.playClick();
    setResultsModal((prev) => ({ ...prev, isOpen: false }));
    setActiveView('dashboard');
  };

  const handleRetryGame = () => {
    sound.playClick();
    setResultsModal((prev) => ({ ...prev, isOpen: false }));
    // keep current activeView
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070d1d] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Universal Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        student={student}
        globalPoints={globalPoints}
        streak={streak}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onGoHome={() => {
          sound.playClick();
          setActiveView('dashboard');
        }}
        onOpenStudentModal={() => {
          sound.playClick();
          setIsStudentModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex-1">
        {activeView === 'dashboard' && (
          <Dashboard
            language={language}
            student={student}
            onOpenStudentModal={() => setIsStudentModalOpen(true)}
            onStartGame={handleStartGame}
            completedGames={completedGames}
            badges={badges}
            totalAnswered={totalAnswered}
            totalCorrect={totalCorrect}
            globalScore={globalPoints}
          />
        )}

        {activeView === 'epi-runner' && (
          <EpiRunnerGame
            language={language}
            onFinish={handleGameFinish}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'ar-scanner' && (
          <ArScannerGame
            language={language}
            onFinish={handleGameFinish}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'emergency-sim' && (
          <EmergencySimulatorGame
            language={language}
            onFinish={handleGameFinish}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'protocol-puzzle' && (
          <ProtocolPuzzleGame
            language={language}
            onFinish={handleGameFinish}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'arcade-varadero' && (
          <ArcadeVaraderoGame
            language={language}
            onFinish={handleGameFinish}
            onExit={() => setActiveView('dashboard')}
          />
        )}
      </main>

      {/* Student Identification Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        language={language}
        student={student}
        onSave={handleSaveStudent}
      />

      {/* Results & Grading Modal */}
      <ResultsModal
        isOpen={resultsModal.isOpen}
        language={language}
        student={student}
        score={resultsModal.score}
        answersLog={resultsModal.answersLog}
        onGoHome={handleCloseResults}
        onRetry={handleRetryGame}
      />

      {/* Footer */}
      <footer className="border-t border-cyan-950/60 bg-slate-950/60 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            PRL en Manteniment d'Embarcacions de Recreo • Centre de la Mar (FP Nàutica / IPO1)
          </p>
          <p className="text-slate-400">
            Qualificacions enviades a: <span className="text-cyan-400 font-semibold">jpons@centredelamar.com</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
