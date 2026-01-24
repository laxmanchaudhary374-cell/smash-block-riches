import React from 'react';
import { GameState } from '@/types/game';
import { Heart, Star, Zap, Coins } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
}

const GameUI: React.FC<GameUIProps> = ({ gameState }) => {
  return (
    <div className="flex flex-col w-full max-w-[400px] mx-auto mb-4 px-2 gap-2">
      {/* Main Stats Row */}
      <div className="flex justify-between items-center">
        {/* Lives */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(gameState.lives, 5) }).map((_, i) => (
            <Heart
              key={i}
              className="w-5 h-5 text-neon-magenta fill-neon-magenta animate-pulse-neon"
            />
          ))}
          {gameState.lives > 5 && (
            <span className="font-display text-sm text-neon-magenta">+{gameState.lives - 5}</span>
          )}
          {Array.from({ length: Math.max(0, Math.min(5, 3) - Math.min(gameState.lives, 3)) }).map((_, i) => (
            <Heart
              key={`empty-${i}`}
              className="w-5 h-5 text-muted-foreground/30"
            />
          ))}
        </div>

        {/* Level */}
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-neon-yellow" />
          <span className="font-display text-lg text-neon-yellow">
            LVL {gameState.level}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-neon-cyan fill-neon-cyan" />
          <span className="font-display text-lg text-neon-cyan text-glow-cyan">
            {gameState.score.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="flex justify-between items-center text-sm">
        {/* Coins */}
        <div className="flex items-center gap-1">
          <Coins className="w-4 h-4 text-neon-yellow" />
          <span className="font-display text-neon-yellow">
            {gameState.coins}
          </span>
        </div>

        {/* High Score */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="font-game text-xs">BEST:</span>
          <span className="font-display text-sm">
            {gameState.highScore.toLocaleString()}
          </span>
        </div>

        {/* Combo */}
        {gameState.combo > 0 && (
          <div className="flex items-center gap-1">
            <span className="font-display text-sm text-neon-orange animate-pulse-neon">
              {gameState.combo}x COMBO
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameUI;
