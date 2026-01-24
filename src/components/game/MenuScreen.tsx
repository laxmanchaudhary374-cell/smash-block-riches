import React from 'react';
import { Play, Trophy, Gamepad2, Zap, Flame, Target, Shield, Magnet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuScreenProps {
  highScore: number;
  onStartGame: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ highScore, onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center overflow-y-auto">
      {/* Logo */}
      <div className="relative mb-6">
        <Gamepad2 className="w-16 h-16 text-neon-cyan animate-float" />
        <div className="absolute inset-0 blur-xl bg-neon-cyan/30 animate-pulse-neon" />
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl md:text-6xl font-black text-glow-cyan text-foreground mb-1">
        NEON
      </h1>
      <h2 className="font-display text-3xl md:text-5xl font-black text-glow-magenta text-secondary mb-4">
        BREAKER
      </h2>

      {/* Subtitle */}
      <p className="font-game text-lg text-muted-foreground mb-6 max-w-xs">
        Destroy bricks. Chain explosions. Collect power-ups. Beat your high score!
      </p>

      {/* High Score */}
      {highScore > 0 && (
        <div className="flex items-center gap-3 mb-6 px-5 py-2 bg-card/50 rounded-lg border border-neon-yellow/30">
          <Trophy className="w-5 h-5 text-neon-yellow" />
          <span className="font-display text-base text-neon-yellow">
            HIGH SCORE: {highScore.toLocaleString()}
          </span>
        </div>
      )}

      {/* Start Button */}
      <Button
        onClick={onStartGame}
        size="lg"
        className="group relative px-10 py-5 text-lg font-display font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta hover:opacity-90 text-primary-foreground transition-all duration-300 hover:scale-105 mb-6"
      >
        <Play className="w-5 h-5 mr-2" />
        PLAY
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-neon-cyan to-neon-magenta opacity-50 blur-lg group-hover:opacity-75 transition-opacity -z-10" />
      </Button>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs">
        <div className="flex items-center gap-2 px-3 py-2 bg-card/30 rounded-lg border border-border/50">
          <Flame className="w-4 h-4 text-neon-orange" />
          <span className="font-game text-xs text-foreground">Explosive Bricks</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-card/30 rounded-lg border border-border/50">
          <Target className="w-4 h-4 text-neon-purple" />
          <span className="font-game text-xs text-foreground">Moving Targets</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-card/30 rounded-lg border border-border/50">
          <Zap className="w-4 h-4 text-neon-yellow" />
          <span className="font-game text-xs text-foreground">Chain Reactions</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-card/30 rounded-lg border border-border/50">
          <Shield className="w-4 h-4 text-neon-cyan" />
          <span className="font-game text-xs text-foreground">10+ Power-ups</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-muted-foreground font-game text-sm mb-4">
        <p>Move paddle with mouse or touch</p>
        <p className="text-xs mt-1">Tap to fire lasers when active</p>
      </div>

      {/* Power-ups Legend */}
      <div className="grid grid-cols-5 gap-2 text-xs font-game max-w-xs">
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-4 rounded bg-neon-cyan flex items-center justify-center text-primary-foreground font-bold text-[10px]">W</div>
          <span className="text-muted-foreground text-[10px]">Wide</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-4 rounded bg-neon-magenta flex items-center justify-center text-primary-foreground font-bold text-[10px]">M</div>
          <span className="text-muted-foreground text-[10px]">Multi</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-4 rounded bg-neon-orange flex items-center justify-center text-primary-foreground font-bold text-[10px]">F</div>
          <span className="text-muted-foreground text-[10px]">Fire</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-4 rounded bg-destructive flex items-center justify-center text-primary-foreground font-bold text-[10px]">L</div>
          <span className="text-muted-foreground text-[10px]">Laser</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-4 rounded bg-neon-green flex items-center justify-center text-primary-foreground font-bold text-[10px]">+1</div>
          <span className="text-muted-foreground text-[10px]">Life</span>
        </div>
      </div>

      {/* Version */}
      <div className="mt-6 text-muted-foreground/50 font-game text-xs">
        v2.0 • 12 Levels • Made for Mobile
      </div>
    </div>
  );
};

export default MenuScreen;
