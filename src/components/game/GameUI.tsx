import React from 'react';
import { GameState } from '@/types/game';
import { Heart, Star, Zap } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
}

const GameUI: React.FC<GameUIProps> = ({ gameState }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-[400px] mx-auto mb-4 px-2">
      {/* Lives */}
      <div className="flex items-center gap-1">
        {Array.from({ length: gameState.lives }).map((_, i) => (
          <Heart
            key={i}
            className="w-5 h-5 text-neon-magenta fill-neon-magenta animate-pulse-neon"
          />
        ))}
        {Array.from({ length: Math.max(0, 3 - gameState.lives) }).map((_, i) => (
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
  );
};

export default GameUI;
