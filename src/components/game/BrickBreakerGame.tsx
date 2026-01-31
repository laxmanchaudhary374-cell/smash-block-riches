import React, { useState, useCallback, useEffect } from 'react';
import { GameState } from '@/types/game';
import { getTotalLevels } from '@/utils/levels/index';
import GameCanvas from './GameCanvas';
import GameUI from './GameUI';
import MenuScreen from './MenuScreen';
import GameOverScreen from './GameOverScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import AudioControls from './AudioControls';
import { audioManager } from '@/utils/audioManager';
const STORAGE_KEY = 'neon_breaker_highscore';

const getStoredHighScore = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};

const setStoredHighScore = (score: number): void => {
  try {
    localStorage.setItem(STORAGE_KEY, score.toString());
  } catch {
    // Ignore storage errors
  }
};

const BrickBreakerGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'menu',
    score: 0,
    lives: 3,
    level: 1,
    highScore: getStoredHighScore(),
    coins: 0,
    combo: 0,
    maxCombo: 0,
  });

  const [isNewHighScore, setIsNewHighScore] = useState(false);

  // Update high score when game ends
  useEffect(() => {
    if (gameState.status === 'gameover' || gameState.status === 'won') {
      if (gameState.score > gameState.highScore) {
        setStoredHighScore(gameState.score);
        setGameState(prev => ({ ...prev, highScore: gameState.score }));
        setIsNewHighScore(true);
      }
    }
  }, [gameState.status, gameState.score, gameState.highScore]);

  const handleStartGame = useCallback(() => {
    setIsNewHighScore(false);
    setGameState({
      status: 'playing',
      score: 0,
      lives: 3,
      level: 1,
      highScore: getStoredHighScore(),
      coins: 0,
      combo: 0,
      maxCombo: 0,
    });
  }, []);

  const handleGameOver = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'gameover' }));
  }, []);

  const handleLevelComplete = useCallback(() => {
    const totalLevels = getTotalLevels();
    
    if (gameState.level >= totalLevels) {
      setGameState(prev => ({ ...prev, status: 'won' }));
    } else {
      setGameState(prev => ({ ...prev, status: 'levelcomplete' }));
    }
  }, [gameState.level]);

  const handleNextLevel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      level: prev.level + 1,
      lives: 3, // Reset lives for each new level
    }));
  }, []);

  const handleMainMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'menu',
      score: 0,
      lives: 3,
      level: 1,
    }));
  }, []);

  const handleScoreChange = useCallback((newScore: number) => {
    setGameState(prev => ({ ...prev, score: newScore }));
  }, []);

  const handleComboChange = useCallback((newCombo: number) => {
    setGameState(prev => ({ 
      ...prev, 
      combo: newCombo,
      maxCombo: Math.max(prev.maxCombo, newCombo),
    }));
  }, []);

  const handleRestart = useCallback(() => {
    setIsNewHighScore(false);
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      score: 0,
      lives: 3,
      level: 1,
      coins: 0,
      combo: 0,
      maxCombo: 0,
    }));
  }, []);

  // Play sounds on game state changes
  useEffect(() => {
    if (gameState.status === 'levelcomplete' || gameState.status === 'won') {
      audioManager.playLevelComplete();
    } else if (gameState.status === 'gameover') {
      audioManager.playGameOver();
    }
  }, [gameState.status]);

  if (gameState.status === 'menu') {
    return (
      <>
        <AudioControls isPlaying={false} />
        <MenuScreen
          highScore={gameState.highScore}
          onStartGame={handleStartGame}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 select-none">
      <AudioControls isPlaying={gameState.status === 'playing'} />
      <div className="mb-4 text-center">
        <h1 className="font-display text-2xl font-bold text-glow-cyan text-foreground">
          NEON BREAKER
        </h1>
      </div>

      {/* Game UI */}
      <GameUI gameState={gameState} />

      {/* Game Area */}
      <div className="relative">
        <GameCanvas
          gameState={gameState}
          setGameState={setGameState}
          onGameOver={handleGameOver}
          onLevelComplete={handleLevelComplete}
          onScoreChange={handleScoreChange}
        />

        {/* Overlays */}
        {gameState.status === 'gameover' && (
          <GameOverScreen
            gameState={gameState}
            isNewHighScore={isNewHighScore}
            onRestart={handleRestart}
            onMainMenu={handleMainMenu}
          />
        )}

        {(gameState.status === 'levelcomplete' || gameState.status === 'won') && (
          <LevelCompleteScreen
            gameState={gameState}
            onNextLevel={handleNextLevel}
            onMainMenu={handleMainMenu}
          />
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-muted-foreground font-game text-sm">
        <p>Move paddle with mouse or touch</p>
      </div>
    </div>
  );
};

export default BrickBreakerGame;
