import React from 'react';
import { Anchor, User, Award, Flame, Volume2, VolumeX, Globe, Home } from 'lucide-react';
import { Language, StudentInfo } from '../types/prl';
import { t } from '../data/translations';
import { sound } from '../utils/sound';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  student: StudentInfo;
  globalPoints: number;
  streak: number;
  isMuted: boolean;
  onToggleSound: () => void;
  onGoHome: () => void;
  onOpenStudentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  student,
  globalPoints,
  streak,
  isMuted,
  onToggleSound,
  onGoHome,
  onOpenStudentModal
}) => {
  const currentT = t[language];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-3 shadow-lg shadow-cyan-950/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div 
          onClick={onGoHome} 
          className="flex items-center space-x-3 cursor-pointer group transition select-none"
        >
          <div className="bg-gradient-to-tr from-cyan-600 via-sky-600 to-blue-600 p-2.5 rounded-2xl shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 bg-clip-text text-transparent tracking-tight">
                {currentT.appTitle}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hidden sm:inline-block">
                FP Nàutica
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              {currentT.appSubtitle}
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Active Student Pill */}
          <button
            onClick={onOpenStudentModal}
            className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
            title="Editar dades de l'alumne"
          >
            <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-200 max-w-[120px] sm:max-w-[170px] truncate">
              {student.name ? `${student.name} (${student.group || 'Alumne'})` : currentT.notRegistered}
            </span>
          </button>

          {/* Points & Streak Indicator */}
          <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-inner">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-black text-amber-300 tracking-tight font-mono">
              {globalPoints} <span className="text-[11px] font-normal text-slate-400">{currentT.points}</span>
            </span>
            {streak > 1 && (
              <span className="flex items-center text-xs font-bold text-orange-400 pl-1 border-l border-slate-700 animate-pulse">
                <Flame className="w-3.5 h-3.5 mr-0.5" />
                {streak}x
              </span>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 hover:text-cyan-400 transition"
            title={isMuted ? currentT.soundMuted : currentT.soundOn}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700/80 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => {
                sound.playClick();
                onLanguageChange('ca');
              }}
              className={`px-2.5 py-1 rounded-lg transition ${
                language === 'ca'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CA
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onLanguageChange('es');
              }}
              className={`px-2.5 py-1 rounded-lg transition ${
                language === 'es'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ES
            </button>
          </div>

          {/* Home Nav */}
          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="hidden sm:flex items-center space-x-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{currentT.navHome}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
