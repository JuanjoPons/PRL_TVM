import React, { useState } from 'react';
import { 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Language, ProtocolPuzzle, ProtocolStep, AnswerLog } from '../../types/prl';
import { PROTOCOL_PUZZLES } from '../../data/gameData';
import { t } from '../../data/translations';
import { sound } from '../../utils/sound';

interface ProtocolPuzzleGameProps {
  language: Language;
  onFinish: (pointsEarned: number, log: AnswerLog[]) => void;
  onExit: () => void;
}

export const ProtocolPuzzleGame: React.FC<ProtocolPuzzleGameProps> = ({
  language,
  onFinish,
  onExit
}) => {
  const currentT = t[language];
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const currentPuzzle = PROTOCOL_PUZZLES[puzzleIdx];

  // Scramble steps initially
  const [currentSteps, setCurrentSteps] = useState<ProtocolStep[]>(() => {
    return [...currentPuzzle.steps].reverse();
  });
  const [isValidated, setIsValidated] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState<AnswerLog[]>([]);

  // Reset when puzzle changes
  const loadPuzzle = (idx: number) => {
    setPuzzleIdx(idx);
    setIsValidated(false);
    setIsAllCorrect(false);
    setCurrentSteps([...PROTOCOL_PUZZLES[idx].steps].reverse());
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (isValidated) return;
    sound.playClick();
    const newSteps = [...currentSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;

    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setCurrentSteps(newSteps);
  };

  const handleValidate = () => {
    sound.playClick();
    setIsValidated(true);

    // Check if order matches 1, 2, 3...
    const correctlyOrdered = currentSteps.every((step, i) => step.order === i + 1);
    setIsAllCorrect(correctlyOrdered);

    if (correctlyOrdered) {
      sound.playSuccess();
      setScore((prev) => prev + 200);
    } else {
      sound.playError();
    }

    setAnswersLog((prev) => [
      ...prev,
      {
        gameId: 'protocol-puzzle',
        gameTitle: 'Puzle de Protocolos i LOTO',
        question: `${currentPuzzle.title[language]}: Ordenar seqüència normativa`,
        selected: correctlyOrdered ? "Seqüència ordenada correctament" : "Ordre incorrecte",
        correct: "Seqüència ordenada 1-2-3 segons normativa",
        isCorrect: correctlyOrdered,
        justification: currentPuzzle.regulatoryBasis[language],
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleNext = () => {
    sound.playClick();
    if (puzzleIdx + 1 < PROTOCOL_PUZZLES.length) {
      loadPuzzle(puzzleIdx + 1);
    } else {
      sound.playFanfare();
      onFinish(score, answersLog);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-purple-500/30 p-4 rounded-2xl shadow-xl">
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
              <Layers className="w-4 h-4 text-purple-400" />
              <h2 className="text-base sm:text-lg font-black text-white">
                {currentT.game4Title}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Repte {puzzleIdx + 1} de {PROTOCOL_PUZZLES.length}
            </p>
          </div>
        </div>

        <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-purple-500/30 font-mono text-sm font-bold text-purple-300">
          {score} pts
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/20 rounded-3xl border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 tracking-wider uppercase block mb-1">
            SEQÜÈNCIA OPERATIVA DE PREVENCIÓ
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            {currentPuzzle.title[language]}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentPuzzle.description[language]}
          </p>
        </div>

        {/* Interactive Steps List */}
        <div className="space-y-3">
          {currentSteps.map((step, idx) => {
            const isTargetOrder = step.order === idx + 1;
            let cardStyle = "bg-slate-900/90 border-slate-800";

            if (isValidated) {
              cardStyle = isTargetOrder
                ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200"
                : "bg-rose-950/50 border-rose-500/40 text-rose-200";
            }

            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${cardStyle}`}
              >
                <div className="flex items-start space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {step.text[language]}
                    </p>
                    <span className="text-[11px] text-slate-400 italic">
                      {step.hint[language]}
                    </span>
                  </div>
                </div>

                {/* Move buttons */}
                {!isValidated && (
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => moveStep(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-purple-600 disabled:opacity-30 disabled:hover:bg-slate-800 text-white transition cursor-pointer"
                      title="Moure Amunt"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveStep(idx, 'down')}
                      disabled={idx === currentSteps.length - 1}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-purple-600 disabled:opacity-30 disabled:hover:bg-slate-800 text-white transition cursor-pointer"
                      title="Moure Avall"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Validation Indicator */}
                {isValidated && (
                  <div className="shrink-0">
                    {isTargetOrder ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Validation Action Button */}
        {!isValidated ? (
          <button
            onClick={handleValidate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Verificar Ordre Reglamentari del Protocol</span>
          </button>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div>
              <h4 className={`text-base font-bold ${isAllCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isAllCorrect ? 'Ordre Correcte!' : 'Seqüència Errada! Revisa la normativa:'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentPuzzle.regulatoryBasis[language]}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              <span>{puzzleIdx + 1 < PROTOCOL_PUZZLES.length ? 'Següent Protocol' : currentT.finishGame}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
