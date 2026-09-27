import React from 'react';
import { 
  ShieldAlert, 
  Camera, 
  Radio, 
  Layers, 
  Gamepad2, 
  Award, 
  ArrowRight, 
  UserCheck, 
  Ship, 
  Trophy, 
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';
import { Language, StudentInfo, AchievementBadge } from '../types/prl';
import { t } from '../data/translations';
import { sound } from '../utils/sound';

interface DashboardProps {
  language: Language;
  student: StudentInfo;
  onOpenStudentModal: () => void;
  onStartGame: (gameId: 'epi-runner' | 'ar-scanner' | 'emergency-sim' | 'protocol-puzzle' | 'arcade-varadero') => void;
  completedGames: string[];
  badges: AchievementBadge[];
  totalAnswered: number;
  totalCorrect: number;
  globalScore: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  student,
  onOpenStudentModal,
  onStartGame,
  completedGames,
  badges,
  totalAnswered,
  totalCorrect,
  globalScore
}) => {
  const currentT = t[language];
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Student Registration / Identity Card */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
                  EXPEDIENT ACADÈMIC NÀUTIC
                </span>
                {student.name && (
                  <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Registrat
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {student.name ? `${student.name} • ${student.group}` : currentT.notRegistered}
              </h3>
              <p className="text-xs text-slate-400">
                Qualificacions enviades a: <span className="text-cyan-300 font-semibold">jpons@centredelamar.com</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenStudentModal();
            }}
            className="w-full md:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs font-bold rounded-xl transition shadow-lg shrink-0 cursor-pointer"
          >
            {student.name ? currentT.editBtn : currentT.saveBtn}
          </button>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 p-6 sm:p-8 border border-cyan-500/30 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-3">
            <Ship className="w-3.5 h-3.5 mr-1.5" /> {currentT.bannerTag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">
            {currentT.bannerTitle}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            {currentT.bannerDesc}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyan-300">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
              ⚓ FP Nàutica / IPO1
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
              🛡️ UNE-EN & NTP Vigents
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
              📡 Detecció AR en Temps Real
            </span>
          </div>
        </div>

        {/* Decorative Compass Silhouette */}
        <div className="absolute -right-10 -bottom-10 opacity-10 text-cyan-300 pointer-events-none">
          <Compass className="w-80 h-80" />
        </div>
      </div>

      {/* 5 GAME MODES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* GAME 1: EPI HAZARD RUNNER */}
        <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {currentT.game1Tag}
              </span>
              <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentT.game1Title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              {currentT.game1Desc}
            </p>
            <ul className="text-xs text-slate-300 space-y-2 mb-6">
              {currentT.game1Features.map((feat, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => onStartGame('epi-runner')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{currentT.playGame1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* GAME 2: AR HAZARD SCANNER */}
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {currentT.game2Tag}
              </span>
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentT.game2Title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              {currentT.game2Desc}
            </p>
            <ul className="text-xs text-slate-300 space-y-2 mb-6">
              {currentT.game2Features.map((feat, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => onStartGame('ar-scanner')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{currentT.playGame2}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* GAME 3: EMERGENCY SIMULATOR */}
        <div className="bg-slate-900/80 border border-rose-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-rose-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {currentT.game3Tag}
              </span>
              <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentT.game3Title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              {currentT.game3Desc}
            </p>
            <ul className="text-xs text-slate-300 space-y-2 mb-6">
              {currentT.game3Features.map((feat, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 mr-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => onStartGame('emergency-sim')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{currentT.playGame3}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* GAME 4: PROTOCOL PUZZLE / LOTO */}
        <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {currentT.game4Tag}
              </span>
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentT.game4Title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              {currentT.game4Desc}
            </p>
            <ul className="text-xs text-slate-300 space-y-2 mb-6">
              {currentT.game4Features.map((feat, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => onStartGame('protocol-puzzle')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{currentT.playGame4}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* GAME 5: ARCADE 2D VARADERO */}
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {currentT.game5Tag}
              </span>
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentT.game5Title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              {currentT.game5Desc}
            </p>
            <ul className="text-xs text-slate-300 space-y-2 mb-6">
              {currentT.game5Features.map((feat, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => onStartGame('arcade-varadero')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{currentT.playGame5}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Global Session Analytics & Badges Tracker */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Rendiment i Insígnies de Seguretat Nàutica
              </h3>
              <p className="text-xs text-slate-400">
                Assoliments pràctics obtinguts durant la sessió
              </p>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="block text-2xl font-black text-cyan-400 font-mono">
              {totalAnswered}
            </span>
            <span className="text-xs text-slate-400 font-medium">Reptes Superats</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="block text-2xl font-black text-emerald-400 font-mono">
              {accuracy}%
            </span>
            <span className="text-xs text-slate-400 font-medium">{currentT.statAccuracy}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="block text-2xl font-black text-amber-400 font-mono">
              {globalScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">{currentT.statPoints}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="block text-2xl font-black text-purple-400 font-mono">
              {completedGames.length} / 5
            </span>
            <span className="text-xs text-slate-400 font-medium">Mòduls Completats</span>
          </div>
        </div>

        {/* Badges showcase */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Insígnies Nàutiques desbloquejades:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {badges.map((b) => {
              const isUnlocked = b.unlocked || completedGames.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isUnlocked
                      ? 'bg-slate-950 border-amber-500/40 shadow-lg shadow-amber-950/20'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {isUnlocked ? '🏅' : '🔒'}
                  </div>
                  <h5 className="text-xs font-bold text-slate-200">
                    {b.title[language]}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {b.description[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
