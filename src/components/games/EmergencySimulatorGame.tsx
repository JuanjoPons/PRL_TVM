import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertOctagon, 
  Activity, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  Radio, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  TrendingDown,
  RotateCcw
} from 'lucide-react';
import { Language, EmergencyScenario, AnswerLog } from '../../types/prl';
import { EMERGENCY_SCENARIOS } from '../../data/gameData';
import { t } from '../../data/translations';
import { sound } from '../../utils/sound';

interface EmergencySimulatorGameProps {
  language: Language;
  onFinish: (pointsEarned: number, log: AnswerLog[]) => void;
  onExit: () => void;
}

export const EmergencySimulatorGame: React.FC<EmergencySimulatorGameProps> = ({
  language,
  onFinish,
  onExit
}) => {
  const currentT = t[language];
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [isResolved, setIsResolved] = useState(false);
  const [integrityEnv, setIntegrityEnv] = useState(100);
  const [integrityCrew, setIntegrityCrew] = useState(100);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState<AnswerLog[]>([]);

  const currentScenario = EMERGENCY_SCENARIOS[scenarioIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsResolved(false);
    setSelectedAction(null);
    const initialTime = currentScenario?.timeSeconds || 20;
    setTimeLeft(initialTime);
    sound.playAlarm();
  }, [scenarioIdx, currentScenario]);

  useEffect(() => {
    if (isResolved) return;

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
  }, [isResolved, scenarioIdx]);

  const handleTimeout = () => {
    if (isResolved) return;
    setIsResolved(true);
    setSelectedAction(null);
    setIntegrityCrew((prev) => Math.max(20, prev - 40));
    setIntegrityEnv((prev) => Math.max(20, prev - 40));
    sound.playError();

    const correctAction = currentScenario.actions[currentScenario.correctActionIndex];
    setAnswersLog((prev) => [
      ...prev,
      {
        gameId: 'emergency-sim',
        gameTitle: "Simulador d'Emergències Nàutiques",
        question: `[${currentScenario.code}] ${currentScenario.title[language]}: ${currentScenario.description[language]}`,
        selected: "Temps esgotat sense intervenció",
        correct: correctAction.label[language],
        isCorrect: false,
        justification: currentScenario.justification[language],
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleDispatch = (idx: number) => {
    if (isResolved) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAction(idx);
    setIsResolved(true);

    const isCorrect = idx === currentScenario.correctActionIndex;

    if (isCorrect) {
      sound.playSuccess();
      const points = 150 + timeLeft * 5;
      setScore((prev) => prev + points);
    } else {
      sound.playError();
      setIntegrityEnv((prev) => Math.max(30, prev - 35));
      setIntegrityCrew((prev) => Math.max(30, prev - 35));
    }

    setAnswersLog((prev) => [
      ...prev,
      {
        gameId: 'emergency-sim',
        gameTitle: "Simulador d'Emergències Nàutiques",
        question: `[${currentScenario.code}] ${currentScenario.title[language]}: ${currentScenario.description[language]}`,
        selected: currentScenario.actions[idx].label[language],
        correct: currentScenario.actions[currentScenario.correctActionIndex].label[language],
        isCorrect: isCorrect,
        justification: currentScenario.justification[language],
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleNext = () => {
    sound.playClick();
    if (scenarioIdx + 1 < EMERGENCY_SCENARIOS.length) {
      setScenarioIdx((prev) => prev + 1);
    } else {
      sound.playFanfare();
      onFinish(score, answersLog);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-rose-500/30 p-4 rounded-2xl shadow-xl">
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
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <h2 className="text-base sm:text-lg font-black text-white">
                {currentT.game3Title}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {currentScenario.location[language]} • Incidència {scenarioIdx + 1}/{EMERGENCY_SCENARIOS.length}
            </p>
          </div>
        </div>

        {/* Telemetry Integrity Indicators */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">SEGURETAT OPERARIS</span>
            <span className={`font-black ${integrityCrew > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {integrityCrew}%
            </span>
          </div>
          <div className="bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">PROTECCIÓ MEDI MARÍ</span>
            <span className={`font-black ${integrityEnv > 60 ? 'text-cyan-400' : 'text-amber-400'}`}>
              {integrityEnv}%
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Alert Console Box */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950/30 rounded-3xl border border-rose-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Urgent Alert Banner */}
        <div className="flex items-center justify-between border-b border-rose-500/30 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-rose-400 tracking-widest block uppercase">
                {currentScenario.code} • NIVELL CRÍTIC
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-white">
                {currentScenario.title[language]}
              </h3>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-rose-500/40 flex items-center space-x-2 font-mono text-rose-300">
            <Clock className="w-4 h-4 animate-spin" />
            <span className="text-lg font-black">{timeLeft}s</span>
          </div>
        </div>

        {/* Incident Narrative */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-6 text-sm sm:text-base text-slate-200 leading-relaxed">
          {currentScenario.description[language]}
        </div>

        {/* Dispatch Action Options */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Protocol de resposta i comandament a activar:
          </h4>

          {currentScenario.actions.map((act, idx) => {
            const isChosen = selectedAction === idx;
            const isCorrect = idx === currentScenario.correctActionIndex;

            let btnStyle = "bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-slate-200";
            if (isResolved) {
              if (isCorrect) {
                btnStyle = "bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500";
              } else if (isChosen && !isCorrect) {
                btnStyle = "bg-rose-950 border-rose-500 text-rose-200";
              } else {
                btnStyle = "bg-slate-950/40 border-slate-800 text-slate-500 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleDispatch(idx)}
                disabled={isResolved}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <div className="pr-4">
                  <span className="block text-sm font-bold text-white mb-0.5">
                    {act.label[language]}
                  </span>
                  <span className="text-xs text-slate-400">
                    Impacte previst: {act.impact[language]}
                  </span>
                </div>
                {isResolved && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                )}
                {isResolved && isChosen && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Debrief & Next Step */}
        {isResolved && (
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-cyan-400 block mb-1">
                AVALUACIÓ TÈCNICA DE SEGURETAT:
              </span>
              <p className="max-w-xl text-slate-400 italic">
                {currentScenario.justification[language]}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              <span>{scenarioIdx + 1 < EMERGENCY_SCENARIOS.length ? 'Següent Emergència' : currentT.finishGame}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
