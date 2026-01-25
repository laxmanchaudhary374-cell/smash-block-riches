import React from 'react';
import { ArrowRight, Star, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';
import { getTotalLevels } from '@/utils/levels/index';

interface LevelCompleteScreenProps {
  gameState: GameState;
  onNextLevel: () => void;
  onMainMenu: () => void;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({
  gameState,
  onNextLevel,
  onMainMenu,
}) => {
  const isGameWon = gameState.level >= getTotalLevels();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-10">
      {isGameWon ? (
        <>
          <PartyPopper className="w-20 h-20 text-neon-yellow mb-4 animate-float" />
          <h2 className="font-display text-4xl font-black text-glow-yellow text-neon-yellow mb-2">
            YOU WIN!
          </h2>
          <p className="font-game text-xl text-muted-foreground mb-6">
            All levels completed!
          </p>
        </>
      ) : (
        <>
          <Star className="w-16 h-16 text-neon-green fill-neon-green mb-4 animate-pulse-neon" />
          <h2 className="font-display text-4xl font-black text-neon-green mb-2">
            LEVEL COMPLETE!
          </h2>
          <p className="font-game text-xl text-muted-foreground mb-6">
            Level {gameState.level} cleared
          </p>
        </>
      )}

      <div className="flex items-center gap-3 mb-8">
        <span className="font-display text-3xl text-foreground">
          {gameState.score.toLocaleString()}
        </span>
        <span className="font-game text-muted-foreground">points</span>
      </div>

      <div className="flex gap-4">
        {isGameWon ? (
          <Button
            onClick={onMainMenu}
            className="px-8 py-4 font-display bg-gradient-to-r from-neon-yellow to-neon-orange hover:opacity-90"
          >
            MAIN MENU
          </Button>
        ) : (
          <>
            <Button
              onClick={onNextLevel}
              className="px-8 py-4 font-display bg-gradient-to-r from-neon-cyan to-neon-green hover:opacity-90"
            >
              NEXT LEVEL
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={onMainMenu}
              variant="outline"
              className="px-8 py-4 font-display border-muted-foreground/50 hover:bg-muted"
            >
              MENU
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LevelCompleteScreen;
