import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Heart, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  HardHat,
  Zap,
  RotateCcw,
  Footprints,
  Shield,
  LifeBuoy
} from 'lucide-react';
import { Language, EpiHazard, AnswerLog } from '../../types/prl';
import { EPI_HAZARDS } from '../../data/gameData';
import { t } from '../../data/translations';
import { sound } from '../../utils/sound';

interface EpiRunnerGameProps {
  language: Language;
  onFinish: (pointsEarned: number, log: AnswerLog[]) => void;
  onExit: () => void;
}

export const EpiRunnerGame: React.FC<EpiRunnerGameProps> = ({
  language,
  onFinish,
  onExit
}) => {
  const currentT = t[language];
  const [hazardIndex, setHazardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState<AnswerLog[]>([]);
  const [isWalking, setIsWalking] = useState(true);

  const currentHazard = EPI_HAZARDS[hazardIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize countdown on hazard change
  useEffect(() => {
    setIsAnswered(false);
    setSelectedOptionId(null);
    setIsCorrect(false);
    setIsWalking(true);

    const initialTime = currentHazard?.timeLimitSeconds || 12;
    setTimeLeft(initialTime);

    // Walking animation into hazard
    const walkTimer = setTimeout(() => {
      setIsWalking(false);
      sound.playAlarm();
    }, 800);

    return () => clearTimeout(walkTimer);
  }, [hazardIndex, currentHazard]);

  // Timer countdown hook
  useEffect(() => {
    if (isAnswered || isWalking) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAnswered, isWalking, hazardIndex]);

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setIsCorrect(false);
    setSelectedOptionId(null);
    setLives((prev) => Math.max(0, prev - 1));
    setStreak(0);
    sound.playError();

    const correctOpt = currentHazard.options.find((o) => o.id === currentHazard.correctOptionId);
    
    setAnswersLog((prev) => [
      ...prev,
      {
        gameId: 'epi-runner',
        gameTitle: 'EPI Hazard Runner',
        question: `${currentHazard.title[language]}: ${currentHazard.hazardDescription[language]}`,
        selected: currentT.wrongPPE + ' (Temps esgotat / Tiempo agotado)',
        correct: correctOpt ? correctOpt.name[language] : '',
        isCorrect: false,
        justification: `${currentHazard.consequence[language]} Normativa: ${currentHazard.regulatoryRef}`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || isWalking) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const chosenOption = currentHazard.options.find((o) => o.id === optionId);
    const correct = chosenOption?.isCorrect ?? false;
    setIsCorrect(correct);

    const correctOpt = currentHazard.options.find((o) => o.id === currentHazard.correctOptionId);

    if (correct) {
      sound.playSuccess();
      const currentMultiplier = streak >= 3 ? 3 : streak >= 1 ? 2 : 1;
      const pointsWon = (100 + timeLeft * 10) * currentMultiplier;
      setScore((prev) => prev + pointsWon);
      setStreak((prev) => prev + 1);
    } else {
      sound.playError();
      setLives((prev) => Math.max(0, prev - 1));
      setStreak(0);
    }

    setAnswersLog((prev) => [
      ...prev,
      {
        gameId: 'epi-runner',
        gameTitle: 'EPI Hazard Runner',
        question: `${currentHazard.title[language]}: ${currentHazard.hazardDescription[language]}`,
        selected: chosenOption ? chosenOption.name[language] : 'Cap',
        correct: correctOpt ? correctOpt.name[language] : '',
        isCorrect: correct,
        justification: chosenOption ? `${chosenOption.why[language]} (${currentHazard.regulatoryRef})` : currentHazard.regulatoryRef,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleNext = () => {
    sound.playClick();
    if (hazardIndex + 1 < EPI_HAZARDS.length) {
      setHazardIndex((prev) => prev + 1);
    } else {
      sound.playFanfare();
      onFinish(score, answersLog);
    }
  };

  // Timer percentage for animated bar
  const totalTime = currentHazard.timeLimitSeconds;
  const timePercent = Math.max(0, (timeLeft / totalTime) * 100);
  const timerColor = timePercent > 50 ? 'bg-emerald-500' : timePercent > 25 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Game Navigation & Live HUD */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-cyan-500/30 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              sound.playClick();
              onExit();
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
          >
            ← {currentT.exitToDashboard}
          </button>
          <div>
            <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
              {currentHazard.zone[language]}
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              {currentHazard.title[language]}
            </h2>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center space-x-4">
          {/* Hearts / Lives */}
          <div className="flex items-center space-x-1 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-rose-500/30">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-all duration-300 ${
                  i < lives ? 'text-rose-500 fill-rose-500 scale-100' : 'text-slate-700 scale-90'
                }`}
              />
            ))}
          </div>

          {/* Points & Multiplier */}
          <div className="bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-amber-500/30 font-mono text-sm font-bold text-amber-300 flex items-center space-x-1.5">
            <span>{score} pts</span>
            {streak > 1 && (
              <span className="text-xs text-orange-400 font-bold flex items-center">
                <Flame className="w-3.5 h-3.5 mr-0.5" />
                {streak}x
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Workshop Walkway & Operator Simulation Track */}
      <div className="relative w-full h-44 sm:h-52 bg-gradient-to-b from-slate-950 via-slate-900 to-cyan-950/40 rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
        {/* Animated background perspective grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Shipyard environment indicators */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-cyan-400/80">
          <span className="flex items-center space-x-1">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>RADAR: VARADER ACTIU • SECTOR {hazardIndex + 1}/{EPI_HAZARDS.length}</span>
          </span>
          <span className="text-slate-400">
            {currentHazard.regulatoryRef}
          </span>
        </div>

        {/* Dynamic Scene: Operator & Hazard encounter */}
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 my-auto">
          {/* Worker Avatar */}
          <div className={`transition-all duration-700 flex flex-col items-center ${
            isWalking ? 'translate-x-12 opacity-80' : 'translate-x-0 opacity-100'
          }`}>
            <div className={`p-3.5 rounded-2xl border transition-all duration-300 shadow-xl flex items-center justify-center ${
              isAnswered && isCorrect
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-110 shadow-emerald-500/40'
                : isAnswered && !isCorrect
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 scale-95 shadow-rose-500/40 animate-shake'
                : 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-bounce'
            }`}>
              {isAnswered && isCorrect ? (
                <ShieldCheck className="w-9 h-9 text-emerald-400" />
              ) : isAnswered && !isCorrect ? (
                <AlertTriangle className="w-9 h-9 text-rose-400" />
              ) : (
                <HardHat className="w-9 h-9 text-cyan-400" />
              )}
            </div>
            <span className="text-[11px] font-bold text-slate-300 mt-1.5 flex items-center space-x-1">
              <span>🧑‍🔧 Operari Nàutic</span>
              {isAnswered && isCorrect && <span className="text-emerald-400 font-black">EPI OK!</span>}
            </span>
          </div>

          {/* Center Hazard Trigger Alert */}
          <div className="flex-1 max-w-md mx-6 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold mb-1 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>PERILL DETECTAT A LA ZONA</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2">
              {currentHazard.hazardDescription[language]}
            </p>
          </div>

          {/* Hazard Source Icon (Tanker, Travelift, Crane, Electric) */}
          <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-amber-400 shadow-xl">
            {hazardIndex === 0 && <ShieldAlert className="w-9 h-9 text-amber-400" />}
            {hazardIndex === 1 && <HardHat className="w-9 h-9 text-cyan-400" />}
            {hazardIndex === 2 && <LifeBuoy className="w-9 h-9 text-purple-400" />}
            {hazardIndex === 3 && <Zap className="w-9 h-9 text-yellow-400" />}
            {hazardIndex === 4 && <Footprints className="w-9 h-9 text-emerald-400" />}
          </div>
        </div>

        {/* Dynamic Animated Countdown Bar */}
        <div className="relative z-10 w-full space-y-1">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="flex items-center text-slate-400">
              <Clock className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              {currentT.timeRemaining}:
            </span>
            <span className={`font-bold ${timeLeft <= 3 ? 'text-rose-400 animate-ping' : 'text-slate-200'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 ${timerColor}`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* PPE Selection Grid (4 interactive options) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
          <Shield className="w-4 h-4 mr-1.5 text-cyan-400" />
          Selecciona ràpidament l'EPI certificat per a aquesta situació:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentHazard.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let btnStyle = "bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 text-slate-200";

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = "bg-emerald-950/60 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-900/30";
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/50";
              } else {
                btnStyle = "bg-slate-950/60 border-slate-800 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered || isWalking}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start space-x-3.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                  isAnswered && opt.isCorrect
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : isAnswered && isSelected && !opt.isCorrect
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-cyan-400'
                }`}>
                  {opt.isCorrect && isAnswered ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isSelected && !opt.isCorrect && isAnswered ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                    opt.isCorrect && isAnswered ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {opt.category}
                  </span>
                  <p className="text-sm font-semibold leading-snug">
                    {opt.name[language]}
                  </p>
                  {isAnswered && (
                    <p className={`text-xs mt-2 italic ${
                      opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                    }`}>
                      {opt.why[language]}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Feedback & Proceed Bar */}
      {isAnswered && (
        <div className={`p-5 rounded-2xl border animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isCorrect
            ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-500/40 shadow-xl shadow-emerald-950/40'
            : 'bg-gradient-to-r from-rose-950/60 to-slate-900 border-rose-500/40 shadow-xl shadow-rose-950/40'
        }`}>
          <div>
            <div className="flex items-center space-x-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400" />
              )}
              <h4 className={`text-base font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                {isCorrect ? currentT.correctPPE : currentT.wrongPPE}
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {isCorrect
                ? `Molt bé! Has equipat a temps el material homologat segons la norma ${currentHazard.regulatoryRef}.`
                : `${currentHazard.consequence[language]} Normativa: ${currentHazard.regulatoryRef}.`}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/30 transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>{hazardIndex + 1 < EPI_HAZARDS.length ? currentT.nextHazard : currentT.finishGame}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
