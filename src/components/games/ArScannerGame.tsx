import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  VideoOff, 
  Scan, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Crosshair, 
  CheckCircle2, 
  Key, 
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Language, ArHazardTarget, AnswerLog } from '../../types/prl';
import { AR_HAZARDS } from '../../data/gameData';
import { t } from '../../data/translations';
import { sound } from '../../utils/sound';

interface ArScannerGameProps {
  language: Language;
  onFinish: (pointsEarned: number, log: AnswerLog[]) => void;
  onExit: () => void;
}

export const ArScannerGame: React.FC<ArScannerGameProps> = ({
  language,
  onFinish,
  onExit
}) => {
  const currentT = t[language];
  const [useCamera, setUseCamera] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [hazards, setHazards] = useState<ArHazardTarget[]>(AR_HAZARDS);
  const [activeTarget, setActiveTarget] = useState<ArHazardTarget | null>(null);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const [isActionEvaluated, setIsActionEvaluated] = useState(false);
  const [unlockedCode, setUnlockedCode] = useState<string[]>([]);
  const [answersLog, setAnswersLog] = useState<AnswerLog[]>([]);
  const [score, setScore] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      sound.playClick();
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setUseCamera(true);
      sound.playScan();
    } catch {
      setCameraError(true);
      setUseCamera(false);
      sound.playError();
    }
  };

  const stopCamera = () => {
    sound.playClick();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setUseCamera(false);
  };

  const handleSelectHazard = (target: ArHazardTarget) => {
    if (target.scanned) return;
    sound.playScan();
    setActiveTarget(target);
    setSelectedActionIndex(null);
    setIsActionEvaluated(false);
  };

  const handleApplyAction = (actionIdx: number) => {
    if (!activeTarget || isActionEvaluated) return;
    setSelectedActionIndex(actionIdx);
    setIsActionEvaluated(true);

    const isCorrect = actionIdx === activeTarget.correctActionIndex;

    if (isCorrect) {
      sound.playSuccess();
      setScore((prev) => prev + 150);
      setUnlockedCode((prev) => [...prev, activeTarget.codeDigit]);

      // Mark target as scanned
      setHazards((prev) =>
        prev.map((h) => (h.id === activeTarget.id ? { ...h, scanned: true } : h))
      );
    } else {
      sound.playError();
    }

    setAnswersLog((prev) => [
      ...prev,
      {
        gameId: 'ar-scanner',
        gameTitle: 'Escàner AR de Riscos',
        question: `AR Target [${activeTarget.name[language]}]: ${activeTarget.description[language]}`,
        selected: activeTarget.actions[actionIdx][language],
        correct: activeTarget.actions[activeTarget.correctActionIndex][language],
        isCorrect: isCorrect,
        justification: activeTarget.justification[language],
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleCloseDetail = () => {
    sound.playClick();
    setActiveTarget(null);
    setSelectedActionIndex(null);
    setIsActionEvaluated(false);

    // If all scanned, trigger fanfare
    const allScanned = hazards.every((h) => h.scanned);
    if (allScanned) {
      sound.playFanfare();
    }
  };

  const handleFinishAll = () => {
    sound.playFanfare();
    onFinish(score, answersLog);
  };

  const scannedCount = hazards.filter((h) => h.scanned).length;
  const isMissionComplete = scannedCount === hazards.length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Bar with Camera toggle & Code tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-cyan-500/30 p-4 rounded-2xl shadow-xl">
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
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h2 className="text-base sm:text-lg font-black text-white">
                {currentT.game2Title}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {currentT.arScannerActive} • {scannedCount}/{hazards.length} {currentT.arTargetCount}
            </p>
          </div>
        </div>

        {/* Camera Feed Toggle & Security Code */}
        <div className="flex items-center space-x-3">
          {/* Security Code Token Display */}
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-cyan-500/40 flex items-center space-x-2">
            <Key className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-slate-400">Codi Seguretat:</span>
            <div className="flex space-x-1 font-mono font-black text-sm text-cyan-300">
              {hazards.map((h, i) => (
                <span
                  key={h.id}
                  className={`w-6 h-6 flex items-center justify-center rounded border ${
                    h.scanned
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {h.scanned ? h.codeDigit : '•'}
                </span>
              ))}
            </div>
          </div>

          {/* Toggle Camera button */}
          {useCamera ? (
            <button
              onClick={stopCamera}
              className="px-3.5 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <VideoOff className="w-4 h-4" />
              <span>{currentT.arSimMode}</span>
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30 transition flex items-center space-x-1.5"
            >
              <Camera className="w-4 h-4" />
              <span>{currentT.arLiveCamera}</span>
            </button>
          )}
        </div>
      </div>

      {cameraError && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{currentT.arCameraDenied}</span>
        </div>
      )}

      {/* Main AR Viewport (Live Camera or High-tech Shipyard Sim) */}
      <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl">
        {/* Background Layer: Real Video Stream or Stylized Nautical 3D Workshop Canvas */}
        {useCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full bg-gradient-to-tr from-slate-950 via-[#0a162e] to-[#04203a] flex items-center justify-center overflow-hidden">
            {/* Architectural shipyard illustration elements in SVG */}
            <svg className="w-full h-full opacity-35" viewBox="0 0 1000 600" fill="none">
              {/* Dry Dock Yacht Silhouette */}
              <path d="M 150 480 L 850 480 L 920 320 L 780 200 L 400 200 L 250 290 Z" stroke="#38bdf8" strokeWidth="2" fill="rgba(14, 165, 233, 0.04)" />
              {/* Mast & Rigging */}
              <line x1="550" y1="200" x2="550" y2="40" stroke="#38bdf8" strokeWidth="3" />
              <line x1="550" y1="40" x2="250" y2="290" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="550" y1="40" x2="780" y2="200" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Travelift Crane Portal Structure */}
              <rect x="80" y="80" width="40" height="420" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
              <rect x="880" y="80" width="40" height="420" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
              <line x1="100" y1="90" x2="900" y2="90" stroke="#f59e0b" strokeWidth="4" />
              {/* Floor pontoon grid */}
              <line x1="0" y1="520" x2="1000" y2="520" stroke="#0284c7" strokeWidth="2" />
              <line x1="100" y1="520" x2="50" y2="600" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="300" y1="520" x2="250" y2="600" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="500" y1="520" x2="500" y2="600" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="700" y1="520" x2="750" y2="600" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="900" y1="520" x2="950" y2="600" stroke="#0284c7" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* AR Holographic HUD Overlays */}
        {/* Radar Scanning Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-radar" />
        </div>

        {/* Corner Reticles */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* Center Crosshair / Sonar Compass */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
          <Crosshair className="w-24 h-24 text-cyan-300 stroke-[1]" />
        </div>

        {/* HUD Top Stats Header */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center space-x-2 pointer-events-none">
          <Scan className="w-3.5 h-3.5 animate-spin" />
          <span>ESCÀNER AR • DETECCIÓ MULTI-RISC NÀUTICA</span>
        </div>

        {/* Interactive AR Hazard Nodes Placed in Coordinates */}
        {hazards.map((target) => {
          const isDone = target.scanned;
          return (
            <button
              key={target.id}
              onClick={() => handleSelectHazard(target)}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                isDone
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 scale-90'
                  : 'bg-rose-950/85 border-rose-500 text-rose-300 hover:scale-110 shadow-lg shadow-rose-900/50 animate-pulse'
              }`}
            >
              {isDone ? (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              )}

              {/* Tooltip Tag */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/95 border border-cyan-500/40 text-slate-100 text-[11px] font-bold px-3 py-1 rounded-xl shadow-xl z-20">
                {target.name[language]}
                <span className="block text-[10px] text-cyan-400 font-normal">
                  {isDone ? 'Neutralitzat' : 'Clic per inspeccionar'}
                </span>
              </div>
            </button>
          );
        })}

        {/* Target Action / Diagnosis Modal Overlaid inside HUD */}
        {activeTarget && (
          <div className="absolute inset-4 sm:inset-10 bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 rounded-3xl p-5 sm:p-8 flex flex-col justify-between overflow-y-auto z-30 shadow-2xl animate-fadeIn">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold block">
                      INCIDÈNCIA DETECTADA PER L'ESCÀNER
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-white">
                      {activeTarget.name[language]}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCloseDetail}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Tancar
                </button>
              </div>

              {/* Description */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-5 text-sm text-slate-300">
                <p>{activeTarget.description[language]}</p>
              </div>

              {/* Preventive Action Options */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {currentT.arActionPrompt}
                </h4>
                {activeTarget.actions.map((act, idx) => {
                  const isChosen = selectedActionIndex === idx;
                  const isCorrect = idx === activeTarget.correctActionIndex;

                  let style = "bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-slate-200";
                  if (isActionEvaluated) {
                    if (isCorrect) {
                      style = "bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500";
                    } else if (isChosen && !isCorrect) {
                      style = "bg-rose-950 border-rose-500 text-rose-200";
                    } else {
                      style = "bg-slate-950/50 border-slate-800 text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleApplyAction(idx)}
                      disabled={isActionEvaluated}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between cursor-pointer disabled:cursor-default ${style}`}
                    >
                      <span>{act[language]}</span>
                      {isActionEvaluated && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-3" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification & Code Unlocked Banner */}
            {isActionEvaluated && (
              <div className="pt-4 border-t border-slate-800 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-emerald-400">
                    {currentT.arVerified} <span className="font-mono text-base font-bold text-white px-2 py-0.5 bg-slate-900 rounded border border-emerald-500/40">{activeTarget.codeDigit}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">
                    {activeTarget.justification[language]}
                  </p>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="w-full sm:w-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg transition"
                >
                  Continuar Inspecció
                </button>
              </div>
            )}
          </div>
        )}

        {/* Completion Message over AR Viewport */}
        {isMissionComplete && !activeTarget && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-fadeIn">
            <div className="p-4 rounded-3xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 mb-4 shadow-xl shadow-cyan-500/30">
              <Sparkles className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Inspecció de Seguretat Completada!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              Has localitzat i resolt tots els punts crítics del varader. El codi d'accés segur desbloquejat és:
            </p>
            <div className="flex space-x-2 font-mono text-2xl font-black text-amber-300 mb-8 bg-slate-900 border border-cyan-500/40 px-6 py-3 rounded-2xl shadow-xl">
              {hazards.map((h) => (
                <span key={h.id}>{h.codeDigit}</span>
              ))}
            </div>
            <button
              onClick={handleFinishAll}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center space-x-2"
            >
              <span>{currentT.finishGame}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
