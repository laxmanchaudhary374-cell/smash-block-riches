import React from 'react';
import { Play, Trophy, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuScreenProps {
  highScore: number;
  onStartGame: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ highScore, onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {/* Logo */}
      <div className="relative mb-8">
        <Gamepad2 className="w-20 h-20 text-neon-cyan animate-float" />
        <div className="absolute inset-0 blur-xl bg-neon-cyan/30 animate-pulse-neon" />
      </div>

      {/* Title */}
      <h1 className="font-display text-5xl md:text-7xl font-black text-glow-cyan text-foreground mb-2">
        NEON
      </h1>
      <h2 className="font-display text-4xl md:text-6xl font-black text-glow-magenta text-secondary mb-8">
        BREAKER
      </h2>

      {/* Subtitle */}
      <p className="font-game text-xl text-muted-foreground mb-12 max-w-xs">
        Destroy all bricks. Collect power-ups. Beat your high score!
      </p>

      {/* High Score */}
      {highScore > 0 && (
        <div className="flex items-center gap-3 mb-8 px-6 py-3 bg-card/50 rounded-lg border border-neon-yellow/30">
          <Trophy className="w-6 h-6 text-neon-yellow" />
          <span className="font-display text-lg text-neon-yellow">
            HIGH SCORE: {highScore.toLocaleString()}
          </span>
        </div>
      )}

      {/* Start Button */}
      <Button
        onClick={onStartGame}
        size="lg"
        className="group relative px-12 py-6 text-xl font-display font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta hover:opacity-90 text-primary-foreground transition-all duration-300 hover:scale-105"
      >
        <Play className="w-6 h-6 mr-2" />
        PLAY
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-neon-cyan to-neon-magenta opacity-50 blur-lg group-hover:opacity-75 transition-opacity -z-10" />
      </Button>

      {/* Instructions */}
      <div className="mt-12 text-muted-foreground font-game">
        <p className="text-sm">Move paddle with mouse or touch</p>
      </div>

      {/* Power-ups Legend */}
      <div className="mt-8 grid grid-cols-5 gap-4 text-xs font-game">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-4 rounded bg-neon-cyan flex items-center justify-center text-primary-foreground font-bold">W</div>
          <span className="text-muted-foreground">Wide</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-4 rounded bg-neon-magenta flex items-center justify-center text-primary-foreground font-bold">M</div>
          <span className="text-muted-foreground">Multi</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-4 rounded bg-neon-yellow flex items-center justify-center text-primary-foreground font-bold">S</div>
          <span className="text-muted-foreground">Slow</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-4 rounded bg-neon-green flex items-center justify-center text-primary-foreground font-bold">+1</div>
          <span className="text-muted-foreground">Life</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-4 rounded bg-neon-orange flex items-center justify-center text-primary-foreground font-bold">F</div>
          <span className="text-muted-foreground">Fire</span>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
