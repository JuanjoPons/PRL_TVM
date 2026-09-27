import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Send, 
  Copy, 
  Check, 
  CheckCircle2, 
  XCircle, 
  Home, 
  RotateCcw,
  Sparkles,
  Mail,
  User,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { Language, StudentInfo, AnswerLog } from '../types/prl';
import { t } from '../data/translations';
import { sound } from '../utils/sound';

interface ResultsModalProps {
  isOpen: boolean;
  language: Language;
  student: StudentInfo;
  score: number;
  answersLog: AnswerLog[];
  onGoHome: () => void;
  onRetry: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  language,
  student,
  score,
  answersLog,
  onGoHome,
  onRetry
}) => {
  const currentT = t[language];
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const total = answersLog.length;
  const correct = answersLog.filter((a) => a.isCorrect).length;
  const incorrect = total - correct;
  const grade = total > 0 ? ((correct / total) * 10).toFixed(1) : "10.0";
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;

  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if canvas confetti fails
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buildReport = () => {
    let text = `====================================================\n`;
    text += `   CERTIFICAT DE QUALIFICACIÓ PRL EMBARCACIONS      \n`;
    text += `       Manteniment d'Embarcacions de Recreo        \n`;
    text += `====================================================\n\n`;
    text += `ALUMNE / ALUMNA: ${student.name || "No indicat"}\n`;
    text += `GRUP / CURS:     ${student.group || "No indicat"}\n`;
    text += `DATA I HORA:     ${new Date().toLocaleString(language === 'ca' ? 'ca-ES' : 'es-ES')}\n`;
    text += `DESTINATARI:     jpons@centredelamar.com\n\n`;
    text += `----------------------------------------------------\n`;
    text += `QUALIFICACIÓ FINAL: ${grade} / 10\n`;
    text += `PRECISIÓ:           ${accuracy}%\n`;
    text += `PUNTS TOTALS:       ${score} punts\n`;
    text += `RESPOSTES:          ${correct} correctes / ${total} totals\n`;
    text += `----------------------------------------------------\n\n`;
    text += `REGISTRE DETALLAT DE SITUACIONS DE RISC:\n\n`;

    answersLog.forEach((item, idx) => {
      text += `[${idx + 1}] MODALITAT: ${item.gameTitle}\n`;
      text += `    SITUACIÓ: ${item.question}\n`;
      text += `    RESPOSTA ALUMNE: ${item.selected}\n`;
      text += `    ESTAT: ${item.isCorrect ? 'CORRECTE [✓]' : 'ERRADA [✗]'}\n`;
      text += `    JUSTIFICACIÓ NORMATIVA: ${item.justification}\n\n`;
    });

    return text;
  };

  const handleCopy = () => {
    sound.playClick();
    const report = buildReport();
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSendEmail = () => {
    sound.playClick();
    const targetEmail = "jpons@centredelamar.com";
    const subject = encodeURIComponent(
      `Qualificació PRL Nàutica - ${student.name || "Alumne"} (${student.group || "Grup"}) - Nota: ${grade}/10`
    );
    const body = encodeURIComponent(buildReport());

    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    setEmailSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl my-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="text-center mb-6">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/30 mb-3">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {currentT.resSuccessTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Avaluació de Seguretat en Tallers i Varaders d'Embarcacions
          </p>
        </div>

        {/* Student Grade Certificate Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/60 border border-cyan-500/40 rounded-2xl p-5 mb-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-cyan-400 block">
                {currentT.resGradeTitle}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span>{student.name || "Alumne sense registrar"}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Grup: <span className="text-slate-200 font-semibold">{student.group || "Grup no indicat"}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Envia a: <span className="text-cyan-400">jpons@centredelamar.com</span>
              </p>
            </div>

            {/* Final Grade Badge */}
            <div className="bg-slate-950 border border-cyan-400/40 px-6 py-3.5 rounded-2xl text-center shrink-0 shadow-inner">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">
                {currentT.resFinalGrade}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">
                {grade} <span className="text-base text-slate-400 font-normal">/ 10</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-center">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="block text-xl font-black text-emerald-400 font-mono">{correct}</span>
            <span className="text-[11px] text-slate-400">{currentT.correctLabel}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="block text-xl font-black text-rose-400 font-mono">{incorrect}</span>
            <span className="text-[11px] text-slate-400">{currentT.incorrectLabel}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="block text-xl font-black text-amber-300 font-mono">{score}</span>
            <span className="text-[11px] text-slate-400">{currentT.pointsEarned}</span>
          </div>
        </div>

        {/* Detailed Solutions Review Panel */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {currentT.resReviewHeader}:
          </h4>
          <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1.5">
            {answersLog.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl text-xs border ${
                  item.isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/30'
                    : 'bg-rose-950/30 border-rose-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-300">
                    #{idx + 1} {item.gameTitle}
                  </span>
                  <span className={`font-mono font-bold ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.isCorrect ? 'CORRECTE' : 'INCORRECTE'}
                  </span>
                </div>
                <p className="text-slate-300 font-medium mb-1">{item.question}</p>
                <p className="text-slate-400">
                  <span className="text-slate-300 font-semibold">Tria:</span> {item.selected}
                </p>
                <p className="text-slate-500 italic mt-1 border-t border-slate-800/80 pt-1">
                  {item.justification}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: 1-Click Send to Teacher & Clipboard Copy */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleSendEmail}
            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-cyan-600/30 transition flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Send className="w-5 h-5" />
            <span>{currentT.resSendEmail}</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="w-full sm:w-1/2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? currentT.resCopiedToast : currentT.resCopyReport}</span>
            </button>

            <button
              onClick={onGoHome}
              className="w-full sm:w-1/2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{currentT.navHome}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
