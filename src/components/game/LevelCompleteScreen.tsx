import React from 'react';
import { ArrowRight, RotateCcw, Home, Star, PartyPopper, Trophy, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';
import { getTotalLevels } from '@/utils/levels/index';

interface LevelCompleteScreenProps {
  gameState: GameState;
  onNextLevel: () => void;
  onReplay: () => void;
  onMainMenu: () => void;
}

// Calculate star rating based on performance
const calculateStars = (gameState: GameState): number => {
  const { lives, combo, maxCombo, score, level } = gameState;
  
  // Base score needed per level (increases with level)
  const baseScore = level * 500;
  const scoreRatio = Math.min(score / baseScore, 2);
  
  // Factors for star calculation
  const livesBonus = lives === 3 ? 1 : lives === 2 ? 0.5 : 0;
  const comboBonus = Math.min((maxCombo || 0) / 10, 1);
  
  // Calculate total score (0-3)
  const totalScore = scoreRatio + livesBonus + comboBonus;
  
  if (totalScore >= 2.5) return 3;
  if (totalScore >= 1.5) return 2;
  return 1;
};

const StarRating: React.FC<{ stars: number; isGameWon: boolean }> = ({ stars, isGameWon }) => {
  return (
    <div className="flex gap-2 mb-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`transform transition-all duration-500 ${
            i <= stars ? 'scale-100' : 'scale-75 opacity-40'
          }`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <Star
            className={`w-10 h-10 sm:w-12 sm:h-12 ${
              i <= stars
                ? isGameWon
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                  : 'text-neon-yellow fill-neon-yellow drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                : 'text-muted-foreground/50'
            } ${i <= stars ? 'animate-pulse' : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg">
    {icon}
    <span className="font-game text-xs text-muted-foreground">{label}</span>
    <span className="ml-auto font-display text-sm text-foreground">{value}</span>
  </div>
);

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({
  gameState,
  onNextLevel,
  onReplay,
  onMainMenu,
}) => {
  const isGameWon = gameState.level >= getTotalLevels();
  const stars = calculateStars(gameState);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md z-10 p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-neon-magenta/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Header */}
        {isGameWon ? (
          <>
            <PartyPopper className="w-16 h-16 sm:w-20 sm:h-20 text-neon-yellow mb-3 animate-bounce" />
            <h2 className="font-display text-3xl sm:text-4xl font-black bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-magenta bg-clip-text text-transparent mb-1">
              VICTORY!
            </h2>
            <p className="font-game text-sm text-muted-foreground mb-4">
              All {getTotalLevels()} levels completed!
            </p>
          </>
        ) : (
          <>
            <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-neon-green mb-3" />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-neon-green mb-1">
              LEVEL {gameState.level}
            </h2>
            <p className="font-game text-sm text-muted-foreground mb-4">
              COMPLETE
            </p>
          </>
        )}

        {/* Star Rating */}
        <StarRating stars={stars} isGameWon={isGameWon} />

        {/* Performance Stats */}
        <div className="w-full space-y-2 mb-6">
          <StatItem
            icon={<Target className="w-4 h-4 text-neon-cyan" />}
            label="Score"
            value={gameState.score.toLocaleString()}
          />
          <StatItem
            icon={<Zap className="w-4 h-4 text-neon-yellow" />}
            label="Max Combo"
            value={`${gameState.maxCombo || 0}x`}
          />
          <StatItem
            icon={<Star className="w-4 h-4 text-neon-magenta" />}
            label="Lives Left"
            value={gameState.lives}
          />
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          {isGameWon ? (
            <>
              <Button
                onClick={onReplay}
                className="w-full py-5 font-display text-lg bg-gradient-to-r from-neon-green to-neon-cyan hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                PLAY AGAIN
              </Button>
              <Button
                onClick={onMainMenu}
                variant="outline"
                className="w-full py-5 font-display text-lg border-muted-foreground/50 hover:bg-muted transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                MAIN MENU
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onNextLevel}
                className="w-full py-5 font-display text-lg bg-gradient-to-r from-neon-cyan to-neon-green hover:opacity-90 transition-opacity"
              >
                NEXT LEVEL
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="flex gap-3">
                <Button
                  onClick={onReplay}
                  variant="outline"
                  className="flex-1 py-4 font-display border-muted-foreground/50 hover:bg-muted transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  REPLAY
                </Button>
                <Button
                  onClick={onMainMenu}
                  variant="outline"
                  className="flex-1 py-4 font-display border-muted-foreground/50 hover:bg-muted transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  MENU
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelCompleteScreen;
