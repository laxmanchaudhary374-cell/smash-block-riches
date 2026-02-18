import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface LuckyWheelProps {
  onClose: (reward?: { type: string; amount: number; label: string }) => void;
}

const SEGMENTS = [
  { label: '50 Coins', type: 'coins', amount: 50, color: 'hsl(45, 100%, 50%)', emoji: '🪙' },
  { label: 'Shield', type: 'shield', amount: 1, color: 'hsl(200, 80%, 50%)', emoji: '🛡️' },
  { label: '100 Coins', type: 'coins', amount: 100, color: 'hsl(50, 100%, 55%)', emoji: '🪙' },
  { label: 'Laser', type: 'laser', amount: 1, color: 'hsl(0, 80%, 55%)', emoji: '🔫' },
  { label: '25 Coins', type: 'coins', amount: 25, color: 'hsl(40, 90%, 45%)', emoji: '🪙' },
  { label: 'Fireball', type: 'fireball', amount: 1, color: 'hsl(20, 100%, 55%)', emoji: '🔥' },
  { label: '200 Coins', type: 'coins', amount: 200, color: 'hsl(55, 100%, 60%)', emoji: '💰' },
  { label: 'Multiball', type: 'multiball', amount: 1, color: 'hsl(280, 80%, 60%)', emoji: '⚡' },
];

const STORAGE_KEYS = {
  lastSpin: 'lucky_wheel_last_spin',
};

const SPIN_COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 hours

export const canSpin = (): { can: boolean; timeLeft: string } => {
  try {
    const lastSpin = localStorage.getItem(STORAGE_KEYS.lastSpin);
    if (!lastSpin) return { can: true, timeLeft: '' };
    const diff = Date.now() - parseInt(lastSpin, 10);
    if (diff >= SPIN_COOLDOWN_MS) return { can: true, timeLeft: '' };
    const remaining = SPIN_COOLDOWN_MS - diff;
    const h = Math.floor(remaining / (1000 * 60 * 60));
    const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return { can: false, timeLeft: `${h}h ${m}m` };
  } catch {
    return { can: true, timeLeft: '' };
  }
};

const recordSpin = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.lastSpin, Date.now().toString());
  } catch {}
};

const LuckyWheel: React.FC<LuckyWheelProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<(typeof SEGMENTS)[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const { can, timeLeft } = canSpin();

  const drawWheel = (rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 10;
    const segAngle = (2 * Math.PI) / SEGMENTS.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    SEGMENTS.forEach((seg, i) => {
      const startAngle = rot + i * segAngle;
      const endAngle = startAngle + segAngle;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      // Segment border
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px Orbitron, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 3;
      ctx.fillText(seg.emoji + ' ' + seg.label, r - 10, 4);
      ctx.restore();
    });

    // Center circle
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    cg.addColorStop(0, 'hsl(240, 20%, 20%)');
    cg.addColorStop(1, 'hsl(240, 25%, 10%)');
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'hsl(50, 100%, 55%)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'hsl(50, 100%, 70%)';
    ctx.font = 'bold 10px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', cx, cy);
  };

  useEffect(() => {
    drawWheel(0);
  }, []);

  const spin = () => {
    if (isSpinning || !can) return;
    setIsSpinning(true);
    setResult(null);

    const targetIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segAngle = (2 * Math.PI) / SEGMENTS.length;
    // We want the target segment at the top (pointer is at top = -PI/2)
    // The segment center should be at -PI/2
    const targetAngle = -Math.PI / 2 - (targetIndex * segAngle + segAngle / 2);
    const extraSpins = 5 + Math.floor(Math.random() * 5); // 5-10 full rotations
    const finalRotation = targetAngle + extraSpins * Math.PI * 2;

    const startTime = performance.now();
    const duration = 4000;
    const startRot = rotationRef.current;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const currentRot = startRot + (finalRotation - startRot) * eased;
      rotationRef.current = currentRot;
      drawWheel(currentRot);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setResult(SEGMENTS[targetIndex]);
        recordSpin();
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-88 max-w-sm w-full rounded-2xl overflow-hidden border border-neon-cyan/30 shadow-2xl p-6"
        style={{
          background: 'linear-gradient(160deg, hsl(240 25% 10%) 0%, hsl(260 30% 8%) 100%)',
          boxShadow: '0 0 60px hsla(180, 100%, 50%, 0.15)',
          maxWidth: '340px',
        }}
      >
        <button
          onClick={() => onClose()}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <h2 className="font-display text-xl font-black text-center text-neon-cyan mb-1">🎡 LUCKY WHEEL</h2>
        <p className="font-game text-xs text-center text-muted-foreground mb-4">
          {can ? 'Spin to win rewards!' : `Next spin in ${timeLeft}`}
        </p>

        {/* Wheel container */}
        <div className="relative flex justify-center mb-4">
          {/* Pointer */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '20px solid hsl(50, 100%, 55%)',
              }}
            />
          </div>
          <canvas ref={canvasRef} width={240} height={240} className="rounded-full" />
        </div>

        {/* Result */}
        {result && (
          <div
            className="mb-4 py-3 px-4 rounded-xl text-center animate-scale-in"
            style={{
              background: 'linear-gradient(135deg, hsl(50 100% 30%) 0%, hsl(40 100% 20%) 100%)',
              border: '1px solid hsl(50 100% 50%)',
            }}
          >
            <span className="text-2xl">{result.emoji}</span>
            <p className="font-display text-sm text-neon-yellow mt-1">You won {result.label}!</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {!result ? (
            <button
              onClick={spin}
              disabled={isSpinning || !can}
              className="flex-1 py-3 font-display text-sm font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: can ? 'linear-gradient(180deg, hsl(180 100% 45%) 0%, hsl(190 100% 35%) 100%)' : 'hsl(240 20% 20%)',
                color: 'white',
                boxShadow: can ? '0 4px 20px hsla(180, 100%, 50%, 0.3)' : 'none',
              }}
            >
              {isSpinning ? '🌀 Spinning...' : can ? '🎡 SPIN!' : `⏳ ${timeLeft}`}
            </button>
          ) : (
            <button
              onClick={() => onClose(result)}
              className="flex-1 py-3 font-display text-sm font-bold rounded-xl transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(180deg, hsl(50 100% 50%) 0%, hsl(45 100% 40%) 100%)',
                color: 'black',
              }}
            >
              🎉 COLLECT!
            </button>
          )}
          <button
            onClick={() => onClose()}
            className="px-4 py-3 font-game text-sm text-muted-foreground hover:text-foreground transition-colors rounded-xl bg-muted/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuckyWheel;
