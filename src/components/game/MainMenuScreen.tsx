import React, { useState } from 'react';
import { Play, Settings, Trophy, Grid3X3, Volume2, VolumeX, ChevronLeft, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getTotalLevels } from '@/utils/levels/index';
import { audioManager } from '@/utils/audioManager';
import spaceBackground from '@/assets/space-background.jpg';

interface MainMenuScreenProps {
  highScore: number;
  unlockedLevel: number;
  onStartGame: (level: number) => void;
  onBack: () => void;
}

type MenuView = 'main' | 'levels' | 'settings';

const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ 
  highScore, 
  unlockedLevel, 
  onStartGame,
  onBack 
}) => {
  const [currentView, setCurrentView] = useState<MenuView>('main');
  const [sfxVolume, setSfxVolume] = useState(audioManager.sfxVolume * 100);
  const [musicVolume, setMusicVolume] = useState(audioManager.musicVolume * 100);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);

  const totalLevels = getTotalLevels();
  const levelsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalLevels / levelsPerPage);

  const handleSfxChange = (value: number[]) => {
    const vol = value[0];
    setSfxVolume(vol);
    audioManager.sfxVolume = vol / 100;
  };

  const handleMusicChange = (value: number[]) => {
    const vol = value[0];
    setMusicVolume(vol);
    audioManager.musicVolume = vol / 100;
  };

  const toggleMute = () => {
    audioManager.toggleMute();
    setIsMuted(audioManager.isMuted);
  };

  const renderMainMenu = () => (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      {/* High Score Display */}
      {highScore > 0 && (
        <div className="flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-neon-yellow/30 mb-4">
          <Trophy className="w-6 h-6 text-neon-yellow" />
          <span className="font-display text-lg text-neon-yellow">
            {highScore.toLocaleString()}
          </span>
        </div>
      )}

      {/* Continue / Play Button */}
      <button
        onClick={() => onStartGame(unlockedLevel)}
        className="w-full group relative px-8 py-4 font-display text-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, hsl(150 100% 40%) 0%, hsl(160 100% 30%) 100%)',
          borderRadius: '12px',
          border: '2px solid hsl(150 100% 50%)',
          boxShadow: '0 0 20px rgba(0,255,150,0.3)',
          color: 'white',
        }}
      >
        <span className="flex items-center justify-center gap-3">
          <Play className="w-5 h-5 fill-current" />
          {unlockedLevel > 1 ? `CONTINUE (LVL ${unlockedLevel})` : 'NEW GAME'}
        </span>
      </button>

      {/* Level Select */}
      <button
        onClick={() => setCurrentView('levels')}
        className="w-full group relative px-8 py-4 font-display text-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, hsl(220 80% 50%) 0%, hsl(230 80% 40%) 100%)',
          borderRadius: '12px',
          border: '2px solid hsl(220 80% 60%)',
          boxShadow: '0 0 15px rgba(100,150,255,0.3)',
          color: 'white',
        }}
      >
        <span className="flex items-center justify-center gap-3">
          <Grid3X3 className="w-5 h-5" />
          SELECT LEVEL
        </span>
      </button>

      {/* Settings */}
      <button
        onClick={() => setCurrentView('settings')}
        className="w-full group relative px-8 py-4 font-display text-lg font-bold tracking-wider transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, hsl(280 80% 50%) 0%, hsl(290 80% 40%) 100%)',
          borderRadius: '12px',
          border: '2px solid hsl(280 80% 60%)',
          boxShadow: '0 0 15px rgba(180,100,255,0.3)',
          color: 'white',
        }}
      >
        <span className="flex items-center justify-center gap-3">
          <Settings className="w-5 h-5" />
          SETTINGS
        </span>
      </button>

      {/* Back to Title */}
      <button
        onClick={onBack}
        className="mt-4 px-6 py-2 font-game text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to Title
      </button>
    </div>
  );

  const renderLevelSelect = () => {
    const startLevel = currentPage * levelsPerPage + 1;
    const endLevel = Math.min(startLevel + levelsPerPage - 1, totalLevels);
    const levels = Array.from({ length: endLevel - startLevel + 1 }, (_, i) => startLevel + i);

    return (
      <div className="flex flex-col items-center w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            onClick={() => setCurrentView('main')}
            className="p-2 text-foreground hover:text-neon-cyan transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="font-display text-xl font-bold text-foreground">SELECT LEVEL</h2>
          <div className="w-10" />
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-4 gap-3 w-full mb-6">
          {levels.map((level) => {
            const isUnlocked = level <= unlockedLevel;
            const isCompleted = level < unlockedLevel;
            
            return (
              <button
                key={level}
                onClick={() => isUnlocked && onStartGame(level)}
                disabled={!isUnlocked}
                className={`
                  relative aspect-square flex flex-col items-center justify-center rounded-lg font-display text-lg font-bold
                  transition-all duration-200
                  ${isUnlocked 
                    ? 'bg-gradient-to-b from-neon-cyan/30 to-neon-cyan/10 border-2 border-neon-cyan/50 hover:scale-105 hover:border-neon-cyan' 
                    : 'bg-black/40 border-2 border-muted/30 opacity-50 cursor-not-allowed'}
                `}
              >
                {isUnlocked ? (
                  <>
                    <span className="text-foreground">{level}</span>
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1">
                        <Star className="w-4 h-4 text-neon-yellow fill-neon-yellow" />
                      </div>
                    )}
                  </>
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 font-game text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:text-neon-cyan transition-colors"
          >
            ← Prev
          </button>
          <span className="font-game text-muted-foreground">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 font-game text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:text-neon-cyan transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="flex flex-col items-center w-full max-w-xs">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-8">
        <button
          onClick={() => setCurrentView('main')}
          className="p-2 text-foreground hover:text-neon-cyan transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="font-display text-xl font-bold text-foreground">SETTINGS</h2>
        <div className="w-10" />
      </div>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className={`
          w-full flex items-center justify-between px-6 py-4 rounded-xl mb-6
          ${isMuted ? 'bg-destructive/20 border-destructive/50' : 'bg-neon-green/20 border-neon-green/50'}
          border-2 transition-all duration-300
        `}
      >
        <span className="font-display text-foreground">
          {isMuted ? 'SOUND OFF' : 'SOUND ON'}
        </span>
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-destructive" />
        ) : (
          <Volume2 className="w-6 h-6 text-neon-green" />
        )}
      </button>

      {/* SFX Volume */}
      <div className="w-full mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-game text-foreground">Sound Effects</span>
          <span className="font-game text-muted-foreground">{Math.round(sfxVolume)}%</span>
        </div>
        <Slider
          value={[sfxVolume]}
          onValueChange={handleSfxChange}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Music Volume */}
      <div className="w-full mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-game text-foreground">Music</span>
          <span className="font-game text-muted-foreground">{Math.round(musicVolume)}%</span>
        </div>
        <Slider
          value={[musicVolume]}
          onValueChange={handleMusicChange}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Game Info */}
      <div className="mt-8 text-center">
        <p className="font-game text-muted-foreground text-sm">
          NEON BREAKER v4.0
        </p>
        <p className="font-game text-muted-foreground/50 text-xs mt-1">
          {totalLevels} Levels • Space Edition
        </p>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Title (smaller in menu) */}
      <div className="relative z-10 mb-8">
        <h1 className="font-display text-3xl font-black text-glow-cyan text-foreground">
          NEON BREAKER
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center">
        {currentView === 'main' && renderMainMenu()}
        {currentView === 'levels' && renderLevelSelect()}
        {currentView === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default MainMenuScreen;
