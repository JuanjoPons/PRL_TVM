import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Heart, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  Sparkles, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Language, AnswerLog } from '../../types/prl';
import { t } from '../../data/translations';
import { sound } from '../../utils/sound';

interface ArcadeVaraderoGameProps {
  language: Language;
  onFinish: (pointsEarned: number, log: AnswerLog[]) => void;
  onExit: () => void;
}

interface Item {
  id: number;
  x: number;
  y: number;
  name: string;
  collected: boolean;
}

interface HazardObstacle {
  id: number;
  x: number;
  y: number;
  speed: number;
}

export const ArcadeVaraderoGame: React.FC<ArcadeVaraderoGameProps> = ({
  language,
  onFinish,
  onExit
}) => {
  const currentT = t[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [player, setPlayer] = useState({ x: 50, y: 280, vx: 0, vy: 0, isGrounded: true });
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [collectedCount, setCollectedCount] = useState(0);

  // Safety items to collect
  const itemsRef = useRef<Item[]>([
    { id: 1, x: 220, y: 260, name: "🦺 Arnès EN 361", collected: false },
    { id: 2, x: 440, y: 170, name: "⛑️ Casc amb Barboqueig", collected: false },
    { id: 3, x: 620, y: 240, name: "🥽 Ulleres Químiques EN 166", collected: false }
  ]);

  // Falling hazards (sparks / unsecured tools)
  const hazardsRef = useRef<HazardObstacle[]>([
    { id: 1, x: 260, y: 20, speed: 2.2 },
    { id: 2, x: 520, y: 60, speed: 2.8 },
    { id: 3, x: 680, y: 10, speed: 2.0 }
  ]);

  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Countdown timer
  useEffect(() => {
    if (isGameOver || isVictory) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, isVictory]);

  // Key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleGameOver = () => {
    setIsGameOver(true);
    sound.playError();
  };

  const handleVictory = () => {
    setIsVictory(true);
    sound.playFanfare();
  };

  // Main Game Loop on 2D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const platforms = [
      { x: 0, y: 340, w: 800, h: 60 }, // Dock floor
      { x: 160, y: 290, w: 140, h: 14 }, // Scaffold 1
      { x: 380, y: 200, w: 180, h: 14 }, // Yacht deck high
      { x: 580, y: 270, w: 140, h: 14 }  // Rigging ladder platform
    ];

    let pX = 50;
    let pY = 280;
    let pVx = 0;
    let pVy = 0;
    let pGrounded = true;

    const loop = () => {
      if (isGameOver || isVictory) return;

      // Handle keyboard controls
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['a'] || keysPressed.current['A']) {
        pVx = -3.8;
      } else if (keysPressed.current['ArrowRight'] || keysPressed.current['d'] || keysPressed.current['D']) {
        pVx = 3.8;
      } else {
        pVx *= 0.8;
      }

      if ((keysPressed.current['ArrowUp'] || keysPressed.current['w'] || keysPressed.current['W'] || keysPressed.current[' ']) && pGrounded) {
        pVy = -8.8;
        pGrounded = false;
        sound.playClick();
      }

      // Gravity
      pVy += 0.45;
      pX += pVx;
      pY += pVy;

      // Platform Collisions
      pGrounded = false;
      platforms.forEach((plat) => {
        if (
          pX + 24 > plat.x &&
          pX < plat.x + plat.w &&
          pY + 36 >= plat.y &&
          pY + 36 <= plat.y + 14 &&
          pVy >= 0
        ) {
          pY = plat.y - 36;
          pVy = 0;
          pGrounded = true;
        }
      });

      // Clamp X
      pX = Math.max(10, Math.min(760, pX));

      // Check item collisions
      itemsRef.current.forEach((item) => {
        if (!item.collected) {
          const dx = item.x - pX;
          const dy = item.y - pY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 32) {
            item.collected = true;
            sound.playSuccess();
            setScore((prev) => prev + 120);
            setCollectedCount((prev) => {
              const updated = prev + 1;
              if (updated >= 3) {
                handleVictory();
              }
              return updated;
            });
          }
        }
      });

      // Update falling hazard obstacles
      hazardsRef.current.forEach((haz) => {
        haz.y += haz.speed;
        if (haz.y > 330) {
          haz.y = -20;
          haz.x = 120 + Math.random() * 560;
        }

        // Collision with player
        const hdx = haz.x - pX;
        const hdy = haz.y - pY;
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy);
        if (hdist < 26) {
          haz.y = -30;
          sound.playError();
          setLives((prev) => {
            const nextL = prev - 1;
            if (nextL <= 0) handleGameOver();
            return Math.max(0, nextL);
          });
        }
      });

      // DRAW CANVAS
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#061325');
      bgGrad.addColorStop(1, '#020712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw boat hull outline
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(350, 340);
      ctx.lineTo(600, 340);
      ctx.lineTo(640, 200);
      ctx.lineTo(330, 200);
      ctx.closePath();
      ctx.stroke();

      // Draw platforms
      platforms.forEach((p, idx) => {
        ctx.fillStyle = idx === 0 ? '#1e293b' : '#0369a1';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
      });

      // Draw items
      itemsRef.current.forEach((item) => {
        if (!item.collected) {
          ctx.font = '22px Outfit, sans-serif';
          ctx.fillText(item.name.substring(0, 2), item.x, item.y + 10);
        }
      });

      // Draw falling hazards (sparks / drops)
      hazardsRef.current.forEach((haz) => {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(haz.x, haz.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw player
      ctx.font = '28px Outfit, sans-serif';
      ctx.fillText('🧑‍🔧', pX, pY + 28);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isGameOver, isVictory]);

  const handleFinish = () => {
    sound.playFanfare();
    const finalLog: AnswerLog[] = [
      {
        gameId: 'arcade-varadero',
        gameTitle: 'Arcade Varadero: Coberta Segura',
        question: "Recollida d'EPIs i esquiva d'espurnes a coberta de varader",
        selected: isVictory ? "3 EPIs homologats recollits" : "Intents d'habilitat esgotats",
        correct: "3 EPIs homologats recollits",
        isCorrect: isVictory,
        justification: "Equipament integral amb casc EN 397, arnès EN 361 i ulleres EN 166 previ al treball a coberta.",
        timestamp: new Date().toLocaleTimeString()
      }
    ];
    onFinish(score, finalLog);
  };

  const moveLeftTouch = () => {
    keysPressed.current['ArrowLeft'] = true;
    setTimeout(() => { keysPressed.current['ArrowLeft'] = false; }, 200);
  };
  const moveRightTouch = () => {
    keysPressed.current['ArrowRight'] = true;
    setTimeout(() => { keysPressed.current['ArrowRight'] = false; }, 200);
  };
  const jumpTouch = () => {
    keysPressed.current['ArrowUp'] = true;
    setTimeout(() => { keysPressed.current['ArrowUp'] = false; }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl shadow-xl">
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
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-black text-white">
                {currentT.game5Title}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Recull els 3 EPIs a les bastides del veler esquivant les espurnes!
            </p>
          </div>
        </div>

        {/* Lives & Score */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`}
              />
            ))}
          </div>
          <div className="bg-slate-950 px-3 py-1 rounded-xl border border-emerald-500/30 font-mono text-sm text-emerald-300">
            {score} pts
          </div>
          <div className="bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Arcade Canvas Box */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl bg-slate-950">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-[320px] sm:h-[400px] block"
        />

        {/* Victory Overlay */}
        {isVictory && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="p-4 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 mb-3 shadow-xl">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Coberta Totalment Segura!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mb-6">
              Has recollit els 3 equips de protecció individual i equipat el tècnic abans d'iniciar els treballs.
            </p>
            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg transition"
            >
              {currentT.finishGame}
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && !isVictory && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="p-4 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-400/40 mb-3 shadow-xl">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Torn Esgotat al Varader
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mb-6">
              Has tingut impactes d'espurnes o s'ha esgotat el temps de seguretat.
            </p>
            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition"
            >
              Veure Resultats
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Touch Controls for Mobile/Touchscreens */}
      <div className="flex items-center justify-center space-x-4 pt-2">
        <button
          onClick={moveLeftTouch}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-700 active:bg-cyan-600 text-white shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={jumpTouch}
          className="px-8 py-4 rounded-2xl bg-cyan-600 active:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-600/30 cursor-pointer flex items-center space-x-2"
        >
          <ArrowUp className="w-6 h-6" />
          <span>Saltar</span>
        </button>
        <button
          onClick={moveRightTouch}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-700 active:bg-cyan-600 text-white shadow-lg cursor-pointer"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
