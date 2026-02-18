import React, { useState, useCallback, useEffect } from 'react';
import { GameState } from '@/types/game';
import { getTotalLevels } from '@/utils/levels/index';
import GameCanvas from './GameCanvas';
import GameUI from './GameUI';
import SplashScreen from './SplashScreen';
import MainMenuScreen from './MainMenuScreen';
import GameOverScreen from './GameOverScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import AudioControls from './AudioControls';
import DailyRewards, { checkDailyReward } from './DailyRewards';
import LuckyWheel from './LuckyWheel';
import ShopScreen, { ShopItem } from './ShopScreen';
import { audioManager } from '@/utils/audioManager';
import spaceBackground from '@/assets/space-background.jpg';
import { Pause, Play, Gift, ShoppingBag, Star as StarIcon } from 'lucide-react';

const STORAGE_KEY = 'neon_breaker_highscore';
const LEVEL_KEY = 'neon_breaker_unlocked_level';
const COINS_KEY = 'neon_breaker_coins';

const getStoredHighScore = (): number => {
  try { return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10); } catch { return 0; }
};
const setStoredHighScore = (score: number) => {
  try { localStorage.setItem(STORAGE_KEY, score.toString()); } catch {}
};
const getStoredUnlockedLevel = (): number => {
  try { return parseInt(localStorage.getItem(LEVEL_KEY) || '1', 10); } catch { return 1; }
};
const setStoredUnlockedLevel = (level: number) => {
  try { localStorage.setItem(LEVEL_KEY, level.toString()); } catch {}
};
const getStoredCoins = (): number => {
  try { return parseInt(localStorage.getItem(COINS_KEY) || '0', 10); } catch { return 0; }
};
const setStoredCoins = (coins: number) => {
  try { localStorage.setItem(COINS_KEY, coins.toString()); } catch {}
};

type ScreenState = 'splash' | 'menu' | 'playing' | 'paused' | 'gameover' | 'levelcomplete' | 'won';
type ModalType = 'none' | 'daily' | 'wheel' | 'shop';

const BrickBreakerGame: React.FC = () => {
  const [screenState, setScreenState] = useState<ScreenState>('splash');
  const [unlockedLevel, setUnlockedLevel] = useState(getStoredUnlockedLevel());
  const [persistentCoins, setPersistentCoins] = useState(getStoredCoins());
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [pendingPowerUps, setPendingPowerUps] = useState<string[]>([]);

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

  // Save coins to persistent storage whenever they change in gameState
  useEffect(() => {
    if (gameState.coins > 0) {
      const total = persistentCoins + gameState.coins;
      // We don't double-add; game coins are tracked separately; merge on level complete
    }
  }, [gameState.coins]);

  // Update high score and unlocked level when game ends
  useEffect(() => {
    if (screenState === 'gameover' || screenState === 'won' || screenState === 'levelcomplete') {
      if (gameState.score > gameState.highScore) {
        setStoredHighScore(gameState.score);
        setGameState(prev => ({ ...prev, highScore: gameState.score }));
        setIsNewHighScore(true);
      }
      if (screenState === 'levelcomplete' || screenState === 'won') {
        const nextLevel = gameState.level + 1;
        if (nextLevel > unlockedLevel) {
          setUnlockedLevel(nextLevel);
          setStoredUnlockedLevel(nextLevel);
        }
        // Award coins for completing the level
        const coinReward = 20 + gameState.level * 5;
        const newTotal = persistentCoins + gameState.coins + coinReward;
        setPersistentCoins(newTotal);
        setStoredCoins(newTotal);
      }
    }
  }, [screenState, gameState.score, gameState.highScore, gameState.level, unlockedLevel]);

  // Show daily reward after splash if applicable
  const handlePlayFromSplash = useCallback(() => {
    setScreenState('menu');
    const { shouldShow } = checkDailyReward();
    if (shouldShow) {
      setTimeout(() => setActiveModal('daily'), 400);
    }
  }, []);

  const handleDailyRewardClose = useCallback((reward?: { type: string; amount: number }) => {
    setActiveModal('none');
    if (reward) {
      if (reward.type === 'coins') {
        const newTotal = persistentCoins + reward.amount;
        setPersistentCoins(newTotal);
        setStoredCoins(newTotal);
      } else {
        setPendingPowerUps(prev => [...prev, reward.type]);
      }
    }
  }, [persistentCoins]);

  const handleWheelClose = useCallback((reward?: { type: string; amount: number; label: string }) => {
    setActiveModal('none');
    if (reward) {
      if (reward.type === 'coins') {
        const newTotal = persistentCoins + reward.amount;
        setPersistentCoins(newTotal);
        setStoredCoins(newTotal);
      } else {
        setPendingPowerUps(prev => [...prev, reward.type]);
      }
    }
  }, [persistentCoins]);

  const handleShopPurchase = useCallback((item: ShopItem) => {
    if (persistentCoins < item.cost) return;
    const newTotal = persistentCoins - item.cost;
    setPersistentCoins(newTotal);
    setStoredCoins(newTotal);
    if (item.category === 'powerup') {
      setPendingPowerUps(prev => [...prev, item.type]);
    }
  }, [persistentCoins]);

  const handleBackToSplash = useCallback(() => {
    setScreenState('splash');
  }, []);

  const handleStartGame = useCallback((level: number = 1) => {
    setIsNewHighScore(false);
    setGameState({
      status: 'playing',
      score: 0,
      lives: 3,
      level: level,
      highScore: getStoredHighScore(),
      coins: 0,
      combo: 0,
      maxCombo: 0,
    });
    setScreenState('playing');
  }, []);

  const handleGameOver = useCallback(() => {
    setScreenState('gameover');
    setGameState(prev => ({ ...prev, status: 'gameover' }));
  }, []);

  const handleLevelComplete = useCallback(() => {
    const totalLevels = getTotalLevels();
    if (gameState.level >= totalLevels) {
      setScreenState('won');
      setGameState(prev => ({ ...prev, status: 'won' }));
    } else {
      setScreenState('levelcomplete');
      setGameState(prev => ({ ...prev, status: 'levelcomplete' }));
    }
  }, [gameState.level]);

  const handleNextLevel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      level: prev.level + 1,
      lives: 3,
    }));
    setScreenState('playing');
  }, []);

  // Retry: properly restart current level from scratch
  const handleReplayLevel = useCallback(() => {
    setIsNewHighScore(false);
    const currentLevel = gameState.level;
    const currentHighScore = gameState.highScore;
    // Go to menu briefly to force reinit, then back
    setScreenState('menu');
    requestAnimationFrame(() => {
      setTimeout(() => {
        setGameState({
          status: 'playing',
          score: 0,
          lives: 3,
          level: currentLevel,
          highScore: currentHighScore,
          coins: 0,
          combo: 0,
          maxCombo: 0,
        });
        setScreenState('playing');
      }, 80);
    });
  }, [gameState.level, gameState.highScore]);

  const handleMainMenu = useCallback(() => {
    setScreenState('menu');
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
    setScreenState('playing');
  }, []);

  // Play sounds on screen state changes
  useEffect(() => {
    if (screenState === 'levelcomplete' || screenState === 'won') {
      audioManager.playLevelComplete();
    } else if (screenState === 'gameover') {
      audioManager.playGameOver();
    }
  }, [screenState]);

  const handleTogglePause = useCallback(() => {
    if (screenState === 'playing') {
      setScreenState('paused');
      setGameState(prev => ({ ...prev, status: 'paused' }));
    } else if (screenState === 'paused') {
      setScreenState('playing');
      setGameState(prev => ({ ...prev, status: 'playing' }));
    }
  }, [screenState]);

  // Show splash screen
  if (screenState === 'splash') {
    return <SplashScreen onPlay={handlePlayFromSplash} />;
  }

  // Show main menu
  if (screenState === 'menu') {
    return (
      <>
        <MainMenuScreen
          highScore={gameState.highScore}
          unlockedLevel={unlockedLevel}
          persistentCoins={persistentCoins}
          onStartGame={handleStartGame}
          onBack={handleBackToSplash}
          onOpenShop={() => setActiveModal('shop')}
          onOpenWheel={() => setActiveModal('wheel')}
        />
        {activeModal === 'daily' && <DailyRewards onClose={handleDailyRewardClose} />}
        {activeModal === 'wheel' && <LuckyWheel onClose={handleWheelClose} />}
        {activeModal === 'shop' && (
          <ShopScreen
            coins={persistentCoins}
            onPurchase={handleShopPurchase}
            onClose={() => setActiveModal('none')}
          />
        )}
      </>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 select-none"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for gameplay visibility */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none" />
      
      <AudioControls isPlaying={screenState === 'playing' || screenState === 'paused'} />
      
      {/* Pause Button */}
      {(screenState === 'playing' || screenState === 'paused') && (
        <button
          onClick={handleTogglePause}
          className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background transition-colors"
        >
          {screenState === 'paused' ? (
            <Play className="w-5 h-5 text-neon-cyan" />
          ) : (
            <Pause className="w-5 h-5 text-neon-cyan" />
          )}
        </button>
      )}
      
      <div className="relative z-10 mb-4 text-center">
        <h1 className="font-display text-2xl font-bold text-glow-cyan text-foreground">
          NEON BREAKER
        </h1>
      </div>

      {/* Game UI */}
      <div className="relative z-10">
        <GameUI gameState={gameState} persistentCoins={persistentCoins} />
      </div>

      {/* Game Area */}
      <div className="relative z-10">
        <GameCanvas
          gameState={gameState}
          setGameState={setGameState}
          onGameOver={handleGameOver}
          onLevelComplete={handleLevelComplete}
          onScoreChange={handleScoreChange}
        />

        {/* Overlays */}
        {screenState === 'paused' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-lg">
            <div className="text-center p-6">
              <h2 className="font-display text-3xl text-neon-cyan text-glow-cyan mb-6">PAUSED</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleTogglePause}
                  className="w-48 py-3 px-6 bg-gradient-to-r from-neon-cyan to-neon-cyan/70 hover:from-neon-cyan/90 hover:to-neon-cyan/60 text-black font-display text-lg rounded-lg transition-all transform hover:scale-105"
                >
                  RESUME
                </button>
                <button
                  onClick={handleReplayLevel}
                  className="w-48 py-3 px-6 bg-gradient-to-r from-neon-yellow to-neon-yellow/70 hover:from-neon-yellow/90 hover:to-neon-yellow/60 text-black font-display text-lg rounded-lg transition-all transform hover:scale-105"
                >
                  RETRY
                </button>
                <button
                  onClick={handleMainMenu}
                  className="w-48 py-3 px-6 bg-gradient-to-r from-muted-foreground to-muted-foreground/70 hover:from-muted-foreground/90 hover:to-muted-foreground/60 text-black font-display text-lg rounded-lg transition-all transform hover:scale-105"
                >
                  MAIN MENU
                </button>
              </div>
            </div>
          </div>
        )}
        
        {screenState === 'gameover' && (
          <GameOverScreen
            gameState={gameState}
            isNewHighScore={isNewHighScore}
            onRestart={handleRestart}
            onMainMenu={handleMainMenu}
          />
        )}

        {(screenState === 'levelcomplete' || screenState === 'won') && (
          <LevelCompleteScreen
            gameState={gameState}
            onNextLevel={handleNextLevel}
            onReplay={handleReplayLevel}
            onMainMenu={handleMainMenu}
          />
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-4 text-center text-muted-foreground font-game text-sm">
        <p>Move paddle with mouse or touch</p>
      </div>
    </div>
  );
};

export default BrickBreakerGame;
