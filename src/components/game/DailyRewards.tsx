import React, { useState, useEffect } from 'react';
import { Gift, X, Star, Shield, Zap, Heart, Coins } from 'lucide-react';

interface DailyRewardsProps {
  onClose: (reward?: { type: string; amount: number }) => void;
}

const REWARDS = [
  { day: 1, type: 'coins', amount: 50, icon: '🪙', label: '50 Coins' },
  { day: 2, type: 'shield', amount: 1, icon: '🛡️', label: 'Shield x1' },
  { day: 3, type: 'coins', amount: 100, icon: '🪙', label: '100 Coins' },
  { day: 4, type: 'fireball', amount: 1, icon: '🔥', label: 'Fireball x1' },
  { day: 5, type: 'coins', amount: 150, icon: '🪙', label: '150 Coins' },
  { day: 6, type: 'multiball', amount: 1, icon: '⚡', label: 'Multiball x1' },
  { day: 7, type: 'extralife', amount: 1, icon: '❤️', label: 'Extra Life x1' },
];

const STORAGE_KEYS = {
  lastClaim: 'daily_reward_last_claim',
  streak: 'daily_reward_streak',
  claimed: 'daily_reward_claimed_today',
};

export const checkDailyReward = (): { shouldShow: boolean; day: number } => {
  try {
    const lastClaim = localStorage.getItem(STORAGE_KEYS.lastClaim);
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10);
    const claimedToday = localStorage.getItem(STORAGE_KEYS.claimed);
    
    const now = new Date();
    const today = now.toDateString();
    
    if (claimedToday === today) return { shouldShow: false, day: 0 };
    
    if (!lastClaim) return { shouldShow: true, day: 1 };
    
    const lastDate = new Date(lastClaim);
    const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day
      const nextDay = ((streak % 7) + 1);
      return { shouldShow: true, day: nextDay };
    } else if (daysDiff > 1) {
      // Streak broken
      return { shouldShow: true, day: 1 };
    }
    
    return { shouldShow: false, day: 0 };
  } catch {
    return { shouldShow: false, day: 0 };
  }
};

export const claimDailyReward = (day: number) => {
  try {
    const now = new Date();
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10);
    localStorage.setItem(STORAGE_KEYS.lastClaim, now.toISOString());
    localStorage.setItem(STORAGE_KEYS.streak, (streak + 1).toString());
    localStorage.setItem(STORAGE_KEYS.claimed, now.toDateString());
  } catch {}
};

const DailyRewards: React.FC<DailyRewardsProps> = ({ onClose }) => {
  const { day } = checkDailyReward();
  const reward = REWARDS[Math.max(0, Math.min(day - 1, 6))];
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    claimDailyReward(day);
    setClaimed(true);
    setTimeout(() => {
      onClose({ type: reward.type, amount: reward.amount });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-80 rounded-2xl overflow-hidden border border-neon-yellow/30 shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, hsl(240 25% 10%) 0%, hsl(260 30% 8%) 100%)',
          boxShadow: '0 0 60px hsla(50, 100%, 50%, 0.2)',
        }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 text-center"
          style={{ background: 'linear-gradient(180deg, hsl(50 90% 45%) 0%, hsl(40 90% 35%) 100%)' }}
        >
          <div className="text-4xl mb-1">🎁</div>
          <h2 className="font-display text-xl font-black text-white">DAILY REWARD</h2>
          <p className="font-game text-sm text-yellow-100/80">Day {day} of 7</p>
        </div>

        {/* Day tracker */}
        <div className="flex justify-center gap-2 px-6 py-4">
          {REWARDS.map((r) => (
            <div
              key={r.day}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1.5 transition-all ${
                r.day < day
                  ? 'opacity-50'
                  : r.day === day
                  ? 'ring-2 ring-neon-yellow scale-110'
                  : 'opacity-40'
              }`}
              style={{
                background: r.day <= day
                  ? 'hsl(50 80% 25%)'
                  : 'hsl(240 20% 15%)',
              }}
            >
              <span className="text-sm leading-none">{r.icon}</span>
              <span className="font-display text-[9px] text-yellow-300">{r.day}</span>
            </div>
          ))}
        </div>

        {/* Today's reward */}
        <div className="px-6 pb-2 flex flex-col items-center gap-4">
          <div
            className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-lg animate-pulse"
            style={{
              background: 'linear-gradient(135deg, hsl(50 100% 40%) 0%, hsl(40 100% 30%) 100%)',
              boxShadow: '0 0 30px hsla(50, 100%, 50%, 0.4)',
            }}
          >
            <span className="text-4xl leading-none mb-1">{reward.icon}</span>
            <span className="font-display text-xs text-yellow-100">{reward.label}</span>
          </div>

          {!claimed ? (
            <button
              onClick={handleClaim}
              className="w-full py-3 font-display text-base font-bold text-black rounded-xl transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(180deg, hsl(50 100% 55%) 0%, hsl(45 100% 45%) 100%)',
                boxShadow: '0 4px 20px hsla(50, 100%, 50%, 0.4)',
              }}
            >
              🎉 CLAIM REWARD
            </button>
          ) : (
            <div className="w-full py-3 text-center font-display text-base text-neon-yellow animate-pulse">
              ✅ Claimed! Come back tomorrow!
            </div>
          )}

          <button
            onClick={() => onClose()}
            className="font-game text-sm text-muted-foreground hover:text-foreground transition-colors pb-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyRewards;
