import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Ball, Brick, Paddle, PowerUp, Particle, GameState, Laser, Coin, Explosion, Plane, LevelCoin } from '@/types/game';
import { useGameLoop } from '@/hooks/useGameLoop';
import { levels } from '@/utils/levels/index';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
  generateId,
  checkBallPaddleCollision,
  checkBallBrickCollision,
  checkLaserBrickCollision,
  calculateBounceAngle,
  getBrickColor,
  shouldDropPowerUp,
  createPowerUp,
  getPowerUpColor,
  isNegativePowerUp,
  createCoin,
  createExplosion,
  getBricksInExplosionRadius,
  getChainedBricks,
  updateMovingBricks,
} from '@/utils/gameUtils';
import { drawPremiumBrick, drawPremiumPaddle, drawPremiumBall } from '@/utils/brickRenderer';
import { drawPowerUp } from '@/utils/powerUpRenderer';
import { audioManager } from '@/utils/audioManager';

interface GameCanvasProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onGameOver: () => void;
  onLevelComplete: () => void;
  onScoreChange: (score: number) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  setGameState,
  onGameOver,
  onLevelComplete,
  onScoreChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [paddle, setPaddle] = useState<Paddle>({
    x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
    y: GAME_HEIGHT - 40,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    hasLaser: false,
    hasMagnet: false,
    hasShield: false,
  });
  
  // Track shield expiry time
  const shieldTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [balls, setBalls] = useState<Ball[]>([]);
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lasers, setLasers] = useState<Laser[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [levelCoins, setLevelCoins] = useState<LevelCoin[]>([]);
  const [plane, setPlane] = useState<Plane | null>(null);
  const [ballSpeed, setBallSpeed] = useState(300);
  const [isFireball, setIsFireball] = useState(false);
  const [isShock, setIsShock] = useState(false);
  const [isAutoPaddle, setIsAutoPaddle] = useState(false);
  const [screenShake, setScreenShake] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState(0);
  const [isBigBall, setIsBigBall] = useState(false);
  const [lastPowerUpTime, setLastPowerUpTime] = useState(0);
  
  const paddleTargetRef = useRef(paddle.x);
  const magnetBallRef = useRef<Ball | null>(null);
  const laserAutoFireRef = useRef<NodeJS.Timeout | null>(null);
  const aimAngleRef = useRef<number>(-Math.PI / 2); // Start pointing up (-90 degrees)

  // Track previous level to only reinitialize on level change
  const prevLevelRef = useRef<number | null>(null);
  const prevStatusRef = useRef<string | null>(null);

  // Track user override for auto-paddle
  const userOverrideRef = useRef(false);
  
  // Initialize level - only reinitialize when level actually changes (not on pause/resume)
  useEffect(() => {
    const levelChanged = prevLevelRef.current !== gameState.level;
    const justStartedPlaying = prevStatusRef.current !== 'playing' && gameState.status === 'playing' && 
                               prevStatusRef.current !== 'paused'; // Don't reinit when unpausing
    
    prevLevelRef.current = gameState.level;
    prevStatusRef.current = gameState.status;
    
    // Only initialize if level changed or we're starting fresh (not resuming from pause)
    if (gameState.status === 'playing' && (levelChanged || justStartedPlaying)) {
      const levelIndex = Math.min(gameState.level - 1, levels.length - 1);
      const level = levels[levelIndex];
      
      // Always reinitialize bricks when level changes
      const newBricks: Brick[] = level.bricks.map((brick) => ({
        ...brick,
        id: generateId(),
        destroyed: false,
        originalX: brick.x,
      }));
      
      setBricks(newBricks);
      
      // Reset ball speed to base level speed (normalize)
      const baseBallSpeed = level.ballSpeed;
      setBallSpeed(baseBallSpeed);
      
      setPowerUps([]);
      setLasers([]);
      setCoins([]);
      setExplosions([]);
      setPlane(null);
      setIsFireball(false);
      setIsBigBall(false);
      setIsShock(false);
      setIsAutoPaddle(false);
      setCombo(0);
      setComboTimer(0);
      setLastPowerUpTime(0);
      setPaddle(prev => ({ 
        ...prev, 
        width: PADDLE_WIDTH,
        hasLaser: false,
        hasMagnet: false,
        hasShield: false,
      }));
      
      // Generate level coins (3-5 coins per level based on difficulty)
      const numCoins = 3 + Math.floor(gameState.level / 50);
      const newLevelCoins: LevelCoin[] = [];
      for (let i = 0; i < numCoins; i++) {
        newLevelCoins.push({
          id: generateId(),
          x: 50 + Math.random() * (GAME_WIDTH - 100),
          y: 100 + Math.random() * 200,
          collected: false,
          value: 10 + Math.floor(gameState.level / 10) * 5,
        });
      }
      setLevelCoins(newLevelCoins);
      
      // Create initial ball with normalized speed - ball waits for touch to launch
      magnetBallRef.current = {
        id: generateId(),
        position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 60 },
        velocity: { dx: 0, dy: 0 },
        radius: BALL_RADIUS,
      };
      setBalls([magnetBallRef.current]);
    }
  }, [gameState.status, gameState.level]);

  // Reset on game over
  useEffect(() => {
    if (gameState.status === 'menu' || gameState.status === 'gameover') {
      setBricks([]);
      setBalls([]);
      setPowerUps([]);
      setParticles([]);
      setLasers([]);
      setCoins([]);
      setExplosions([]);
      setLevelCoins([]);
      setPlane(null);
      magnetBallRef.current = null;
      aimAngleRef.current = -Math.PI / 2;
    }
  }, [gameState.status]);

  // Track previous brick count for level completion check
  const prevBrickCountRef = useRef<number>(0);
  
  // Check for level completion (catches laser/explosion destroyed bricks)
  useEffect(() => {
    if (gameState.status !== 'playing') return;
    
    const remainingBricks = bricks.filter(b => !b.destroyed && b.type !== 'indestructible');
    const hadBricks = prevBrickCountRef.current > 0;
    
    // Only trigger level complete if we had bricks before and now have none
    if (remainingBricks.length === 0 && hadBricks) {
      setTimeout(() => onLevelComplete(), 300);
    }
    
    prevBrickCountRef.current = remainingBricks.length;
  }, [bricks, gameState.status, onLevelComplete]);

  // Create particles
  const createParticles = useCallback((x: number, y: number, color: string, count: number = 8) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      const speed = 100 + Math.random() * 150;
      newParticles.push({
        id: generateId(),
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 1,
        color,
        size: 3 + Math.random() * 3,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Trigger screen shake
  const triggerScreenShake = useCallback((intensity: number) => {
    setScreenShake(intensity);
  }, []);

  // Handle explosion chain
  const handleExplosion = useCallback((x: number, y: number) => {
    const explosion = createExplosion(x, y, 90);
    setExplosions(prev => [...prev, explosion]);
    triggerScreenShake(8);
    audioManager.playExplosion();
    
    // Create lots of particles
    createParticles(x, y, 'hsl(25, 100%, 55%)', 20);
    createParticles(x, y, 'hsl(50, 100%, 55%)', 15);
    createParticles(x, y, 'hsl(0, 100%, 60%)', 10);
  }, [createParticles, triggerScreenShake]);

  // Handle brick destruction
  const destroyBrick = useCallback((brick: Brick, addScore: boolean = true) => {
    if (brick.destroyed || brick.type === 'indestructible') return null;
    
    const scoreValue = brick.maxHits * 10 * (1 + combo * 0.1);
    
    audioManager.playBrickDestroy();
    if (combo > 1) {
      audioManager.playCombo(combo);
    }
    
    createParticles(
      brick.x + brick.width / 2,
      brick.y + brick.height / 2,
      getBrickColor(brick.color),
      12
    );
    
    // Handle special brick types
    if (brick.type === 'explosive') {
      handleExplosion(brick.x + brick.width / 2, brick.y + brick.height / 2);
    }
    
    if (brick.type === 'coin') {
      const coin = createCoin(brick.x + brick.width / 2, brick.y + brick.height / 2, 25);
      setCoins(prev => [...prev, coin]);
    }
    
    // Maybe drop power-up
    if (shouldDropPowerUp() && brick.type !== 'coin') {
      const powerUp = createPowerUp(brick.x + brick.width / 2, brick.y + brick.height);
      setPowerUps(prev => [...prev, powerUp]);
      setLastPowerUpTime(gameTime);
    }
    
    // Update combo
    setCombo(prev => prev + 1);
    setComboTimer(2); // 2 seconds to maintain combo
    
    return addScore ? scoreValue : 0;
  }, [combo, createParticles, handleExplosion, gameTime]);

  // Handle paddle movement and aim direction (allows user control override during auto-paddle)
  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = GAME_WIDTH / rect.width;
    const scaleY = GAME_HEIGHT / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    // Allow user to override auto-paddle with their own control
    if (isAutoPaddle) {
      userOverrideRef.current = true;
    }
    
    // Update paddle target - always allow user control (override auto-paddle)
    paddleTargetRef.current = Math.max(0, Math.min(GAME_WIDTH - paddle.width, x - paddle.width / 2));
    
    // Update aim angle if ball is on paddle - allow full 180-degree range
    if (magnetBallRef.current) {
      const ball = balls.find(b => b.id === magnetBallRef.current?.id);
      if (ball) {
        const dx = x - ball.position.x;
        const dy = y - ball.position.y;
        // Calculate angle from ball to touch point
        let angle = Math.atan2(dy, dx);
        // Clamp angle to full upper hemisphere (90 degrees on each side = 180 degree range)
        // -180 to 0 degrees (or -π to 0 radians) is the full upper half
        if (angle > 0) angle = -0.01; // If pointing down, set to nearly horizontal right
        if (angle < -Math.PI) angle = -Math.PI + 0.01; // If beyond left, clamp
        aimAngleRef.current = angle;
      }
    }
  }, [paddle.width, balls, isAutoPaddle]);

  // Fire laser
  const fireLaser = useCallback(() => {
    if (paddle.hasLaser) {
      audioManager.playLaser();
      setLasers(prev => [
        ...prev,
        { id: generateId(), x: paddle.x + 10, y: paddle.y, speed: 600 },
        { id: generateId(), x: paddle.x + paddle.width - 10, y: paddle.y, speed: 600 },
      ]);
    }
  }, [paddle]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameState.status === 'playing') {
        handlePointerMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (gameState.status === 'playing' && e.touches.length > 0) {
        e.preventDefault();
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const releaseMagnetBall = () => {
      if (magnetBallRef.current) {
        const ballId = magnetBallRef.current.id;
        const angle = aimAngleRef.current;
        magnetBallRef.current = null;
        audioManager.playMagnetRelease();
        // Give the ball velocity when released
        setBalls(prevBalls => prevBalls.map(ball => {
          if (ball.id === ballId) {
            const speed = ballSpeed;
            return {
              ...ball,
              velocity: { 
                dx: Math.cos(angle) * speed, 
                dy: Math.sin(angle) * speed 
              },
            };
          }
          return ball;
        }));
        aimAngleRef.current = -Math.PI / 2; // Reset to up
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (gameState.status === 'playing' && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        // Release magnet ball on touch
        if (magnetBallRef.current) {
          releaseMagnetBall();
        }
        // Laser fires automatically now - no manual fire on touch
      }
    };

    const handleClick = () => {
      if (gameState.status === 'playing') {
        // Release magnet ball on click
        if (magnetBallRef.current) {
          releaseMagnetBall();
        }
        // Laser fires automatically now - no manual fire on click
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('click', handleClick);
    };
  }, [gameState.status, handlePointerMove, ballSpeed]);
  
  // Auto-fire laser when paddle has laser power-up
  useEffect(() => {
    // Clear any existing interval first
    if (laserAutoFireRef.current) {
      clearInterval(laserAutoFireRef.current);
      laserAutoFireRef.current = null;
    }
    
    if (paddle.hasLaser && gameState.status === 'playing') {
      // Fire immediately when getting the power-up
      fireLaser();
      
      // Then continue auto-fire every 300ms
      laserAutoFireRef.current = setInterval(() => {
        if (paddle.hasLaser) {
          fireLaser();
        }
      }, 300);
    }
    
    return () => {
      if (laserAutoFireRef.current) {
        clearInterval(laserAutoFireRef.current);
        laserAutoFireRef.current = null;
      }
    };
  }, [paddle.hasLaser, gameState.status]);

  // Game loop
  const gameLoop = useCallback((deltaTime: number) => {
    setGameTime(prev => prev + deltaTime);
    
    // Update combo timer
    setComboTimer(prev => {
      if (prev > 0) {
        const newTimer = prev - deltaTime;
        if (newTimer <= 0) {
          setCombo(0);
          return 0;
        }
        return newTimer;
      }
      return 0;
    });
    
    // Update screen shake
    setScreenShake(prev => Math.max(0, prev - deltaTime * 20));

    // Spawn plane if no power-up dropped for 90 seconds (1.5 minutes)
    if (gameTime - lastPowerUpTime > 90 && !plane) {
      setPlane({
        id: generateId(),
        x: -60,
        y: 35,
        speed: 100,
        hasPowerUp: true,
      });
      setLastPowerUpTime(gameTime);
    }

    // Update plane
    if (plane) {
      const newX = plane.x + plane.speed * deltaTime;
      
      // Drop power-up when plane reaches middle
      if (plane.hasPowerUp && newX >= GAME_WIDTH / 2) {
        const powerUp = createPowerUp(newX, plane.y + 20);
        setPowerUps(prev => [...prev, powerUp]);
        setPlane(prev => prev ? { ...prev, hasPowerUp: false } : null);
      }
      
      // Remove plane when it exits
      if (newX > GAME_WIDTH + 60) {
        setPlane(null);
      } else {
        setPlane(prev => prev ? { ...prev, x: newX } : null);
      }
    }

    // Auto-paddle logic - follow the closest ball (only if user hasn't overridden)
    if (isAutoPaddle && !userOverrideRef.current) {
      const activeBalls = balls.filter(b => b.velocity.dy !== 0 || b.velocity.dx !== 0);
      if (activeBalls.length > 0) {
        // Find the lowest ball (closest to paddle)
        const lowestBall = activeBalls.reduce((lowest, ball) => 
          ball.position.y > lowest.position.y ? ball : lowest
        );
        paddleTargetRef.current = Math.max(0, Math.min(GAME_WIDTH - paddle.width, lowestBall.position.x - paddle.width / 2));
      }
    }
    
    // Reset user override after a short delay if they stop touching
    if (!isAutoPaddle) {
      userOverrideRef.current = false;
    }

    // Smooth paddle movement
    setPaddle(prev => {
      const diff = paddleTargetRef.current - prev.x;
      const newX = prev.x + diff * Math.min(1, deltaTime * 15);
      return { ...prev, x: newX };
    });

    // Update moving bricks
    setBricks(prev => updateMovingBricks(prev, deltaTime));

    // Update balls
    setBalls(prevBalls => {
      const newBalls = prevBalls.map(ball => {
        // If this ball is magnetized, keep it stuck to paddle
        if (magnetBallRef.current && ball.id === magnetBallRef.current.id) {
          return {
            ...ball,
            position: { x: paddle.x + paddle.width / 2, y: paddle.y - ball.radius - 1 },
            velocity: { dx: 0, dy: 0 },
          };
        }
        
        // Otherwise, move the ball normally
        let { x, y } = ball.position;
        let { dx, dy } = ball.velocity;

        x += dx * deltaTime;
        y += dy * deltaTime;

        // Wall collisions
        if (x - ball.radius < 0) {
          x = ball.radius;
          dx = Math.abs(dx);
          audioManager.playWallBounce();
        }
        if (x + ball.radius > GAME_WIDTH) {
          x = GAME_WIDTH - ball.radius;
          dx = -Math.abs(dx);
          audioManager.playWallBounce();
        }
        if (y - ball.radius < 0) {
          y = ball.radius;
          dy = Math.abs(dy);
          audioManager.playWallBounce();
        }

        return {
          ...ball,
          position: { x, y },
          velocity: { dx, dy },
        };
      });

      // Check for balls that fell off (with shield check)
      const aliveBalls = newBalls.filter(ball => {
        if (ball.position.y < GAME_HEIGHT + 50) return true;
        
        // Shield bounces ball back
        if (paddle.hasShield) {
          // Shield stays active - don't deactivate on ball save
          ball.position.y = GAME_HEIGHT - 20;
          ball.velocity.dy = -Math.abs(ball.velocity.dy);
          createParticles(ball.position.x, GAME_HEIGHT - 10, 'hsl(200, 100%, 60%)', 10);
          return true;
        }
        return false;
      });
      
      if (aliveBalls.length === 0 && prevBalls.length > 0) {
        // Lost a life
        audioManager.playBallLost();
        setGameState(prev => {
          const newLives = prev.lives - 1;
          if (newLives <= 0) {
            setTimeout(() => onGameOver(), 100);
            return { ...prev, lives: 0, status: 'gameover' };
          }
          return { ...prev, lives: newLives };
        });
        
        // Reset combo
        setCombo(0);
        setComboTimer(0);
        
        // Reset ball - wait for touch to launch (velocity 0)
        magnetBallRef.current = {
          id: generateId(),
          position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 60 },
          velocity: { dx: 0, dy: 0 },
          radius: BALL_RADIUS,
        };
        return [magnetBallRef.current];
      }

      return aliveBalls;
    });

    // Check paddle collision - only if ball is moving downward to prevent stuck balls
    setBalls(prevBalls => {
      return prevBalls.map(ball => {
        // Skip if ball is already magnetized or moving upward
        if (magnetBallRef.current?.id === ball.id) return ball;
        if (ball.velocity.dy <= 0) return ball;
        
        if (checkBallPaddleCollision(ball, paddle)) {
          const angle = calculateBounceAngle(ball, paddle);
          const speed = Math.sqrt(ball.velocity.dx ** 2 + ball.velocity.dy ** 2) || ballSpeed;
          
          audioManager.playPaddleHit();
          createParticles(ball.position.x, ball.position.y, 'hsl(180, 100%, 50%)', 4);
          
          // Magnet catches ball (only catch one ball)
          if (paddle.hasMagnet && !magnetBallRef.current) {
            magnetBallRef.current = ball;
            audioManager.playMagnetCatch();
            return {
              ...ball,
              position: { x: paddle.x + paddle.width / 2, y: paddle.y - ball.radius - 1 },
              velocity: { dx: 0, dy: 0 },
            };
          }
          
          return {
            ...ball,
            position: { ...ball.position, y: paddle.y - ball.radius - 2 },
            velocity: {
              dx: Math.sin(angle) * speed,
              dy: -Math.abs(Math.cos(angle) * speed),
            },
          };
        }
        return ball;
      });
    });

    // Update lasers
    setLasers(prevLasers => {
      return prevLasers
        .map(laser => ({ ...laser, y: laser.y - laser.speed * deltaTime }))
        .filter(laser => laser.y > 0);
    });

    // Check laser-brick collisions
    let laserDestroyedBrick = false;
    setLasers(prevLasers => {
      return prevLasers.filter(laser => {
        for (const brick of bricks) {
          if (!brick.destroyed && checkLaserBrickCollision(laser, brick)) {
            // Hit brick
            setBricks(prev => {
              const updated = prev.map(b => {
                if (b.id === brick.id && b.type !== 'indestructible') {
                  const newHits = b.hits - 1;
                  if (newHits <= 0) {
                    const score = destroyBrick(b);
                    if (score) onScoreChange(gameState.score + score);
                    laserDestroyedBrick = true;
                    return { ...b, hits: 0, destroyed: true };
                  }
                  return { ...b, hits: newHits };
                }
                return b;
              });
              return updated;
            });
            createParticles(laser.x, laser.y, 'hsl(0, 100%, 50%)', 5);
            return false;
          }
        }
        return true;
      });
    });

    // Check brick collisions - only process one collision per ball per frame
    setBricks(prevBricks => {
      let scoreToAdd = 0;
      const ballsHitBricks = new Set<string>(); // Track which balls already hit a brick this frame
      
      const updatedBricks = prevBricks.map(brick => {
        if (brick.destroyed) return brick;

        for (const ball of balls) {
          // Skip if this ball already hit a brick this frame (prevents breaking multiple bricks)
          if (ballsHitBricks.has(ball.id)) continue;
          
          if (checkBallBrickCollision(ball, brick)) {
            // Mark this ball as having hit a brick
            if (!isFireball && !isBigBall) {
              ballsHitBricks.add(ball.id);
            }
            
            // Indestructible bricks only bounce
            if (brick.type === 'indestructible') {
              createParticles(ball.position.x, ball.position.y, 'hsl(220, 20%, 60%)', 3);
              return brick;
            }
            
            // Big ball or fireball destroys any brick in one hit
            const newHits = brick.hits - ((isFireball || isBigBall) ? brick.hits : 1);
            
            if (newHits <= 0) {
              const score = destroyBrick(brick);
              if (score) scoreToAdd += score;
              
              // Handle chain reaction
              if (brick.type === 'chain') {
                const chainedBricks = getChainedBricks(brick, prevBricks);
                chainedBricks.forEach(cb => {
                  if (cb.id !== brick.id && !cb.destroyed) {
                    const chainScore = destroyBrick(cb);
                    if (chainScore) scoreToAdd += chainScore;
                  }
                });
              }
              
              // Handle shock power-up - destroy nearby bricks (increased radius)
              if (isShock) {
                const shockRadius = 120; // Increased from 80 to 120
                prevBricks.forEach(nearbyBrick => {
                  if (nearbyBrick.id !== brick.id && !nearbyBrick.destroyed && nearbyBrick.type !== 'indestructible') {
                    const dx = nearbyBrick.x + nearbyBrick.width / 2 - (brick.x + brick.width / 2);
                    const dy = nearbyBrick.y + nearbyBrick.height / 2 - (brick.y + brick.height / 2);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < shockRadius) {
                      nearbyBrick.destroyed = true;
                      nearbyBrick.hits = 0;
                      const shockScore = destroyBrick(nearbyBrick);
                      if (shockScore) scoreToAdd += shockScore;
                      // Create lightning effect
                      createParticles(nearbyBrick.x + nearbyBrick.width / 2, nearbyBrick.y + nearbyBrick.height / 2, 'hsl(55, 100%, 60%)', 8);
                    }
                  }
                });
              }
              
              return { ...brick, hits: 0, destroyed: true };
            }
            
            scoreToAdd += 5;
            createParticles(
              brick.x + brick.width / 2,
              brick.y + brick.height / 2,
              getBrickColor(brick.color),
              4
            );
            
            return { ...brick, hits: newHits };
          }
        }
        return brick;
      });

      // Handle explosions affecting bricks
      explosions.forEach(explosion => {
        const affectedBricks = getBricksInExplosionRadius(
          { x: explosion.x, y: explosion.y, radius: explosion.maxRadius * 0.8 },
          updatedBricks
        );
        affectedBricks.forEach(brick => {
          const brickIndex = updatedBricks.findIndex(b => b.id === brick.id);
          if (brickIndex !== -1 && !updatedBricks[brickIndex].destroyed) {
            const score = destroyBrick(updatedBricks[brickIndex]);
            if (score) scoreToAdd += score;
            updatedBricks[brickIndex] = { ...updatedBricks[brickIndex], destroyed: true, hits: 0 };
          }
        });
      });

    // Check ball-level coin collisions
    setLevelCoins(prevCoins => {
      return prevCoins.map(coin => {
        if (coin.collected) return coin;
        
        for (const ball of balls) {
          const dx = ball.position.x - coin.x;
          const dy = ball.position.y - coin.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < ball.radius + 12) {
            // Collect the coin
            setGameState(prev => ({ ...prev, coins: prev.coins + coin.value }));
            createParticles(coin.x, coin.y, 'hsl(45, 100%, 55%)', 10);
            audioManager.playCoinCollect();
            return { ...coin, collected: true };
          }
        }
        return coin;
      });
    });

      if (scoreToAdd > 0) {
        onScoreChange(gameState.score + Math.round(scoreToAdd));
      }

      // Level completion check is now handled by useEffect watching bricks state

      return updatedBricks;
    });

    // Ball-brick collision response
    setBalls(prevBalls => {
      return prevBalls.map(ball => {
        for (const brick of bricks) {
          if (!brick.destroyed && checkBallBrickCollision(ball, brick)) {
            // Determine collision side
            const ballCenterX = ball.position.x;
            const ballCenterY = ball.position.y;
            const brickCenterX = brick.x + brick.width / 2;
            const brickCenterY = brick.y + brick.height / 2;
            
            const dx = ballCenterX - brickCenterX;
            const dy = ballCenterY - brickCenterY;
            
            const overlapX = (ball.radius + brick.width / 2) - Math.abs(dx);
            const overlapY = (ball.radius + brick.height / 2) - Math.abs(dy);
            
            if (!isFireball) {
              if (overlapX < overlapY) {
                return {
                  ...ball,
                  velocity: { ...ball.velocity, dx: dx > 0 ? Math.abs(ball.velocity.dx) : -Math.abs(ball.velocity.dx) },
                };
              } else {
                return {
                  ...ball,
                  velocity: { ...ball.velocity, dy: dy > 0 ? Math.abs(ball.velocity.dy) : -Math.abs(ball.velocity.dy) },
                };
              }
            }
          }
        }
        return ball;
      });
    });

    // Update power-ups
    setPowerUps(prevPowerUps => {
      return prevPowerUps.filter(powerUp => {
        const newY = powerUp.y + powerUp.velocity * deltaTime;
        
        // Check paddle collision
        if (
          newY + powerUp.height > paddle.y &&
          newY < paddle.y + paddle.height &&
          powerUp.x + powerUp.width > paddle.x &&
          powerUp.x < paddle.x + paddle.width
        ) {
          // Apply power-up
          switch (powerUp.type) {
            case 'widen':
              setPaddle(prev => ({ ...prev, width: Math.min(150, prev.width + 30) }));
              setTimeout(() => setPaddle(prev => ({ ...prev, width: PADDLE_WIDTH })), 10000);
              break;
            case 'shrink':
              setPaddle(prev => ({ ...prev, width: Math.max(40, prev.width - 20) }));
              setTimeout(() => setPaddle(prev => ({ ...prev, width: PADDLE_WIDTH })), 10000);
              break;
            case 'multiball': {
              // Double: keep main ball direction, add new ball going upward
              setBalls(prev => {
                const newBalls: Ball[] = [];
                prev.forEach(ball => {
                  const speed = Math.sqrt(ball.velocity.dx ** 2 + ball.velocity.dy ** 2) || ballSpeed;
                  // Keep original ball with its direction
                  newBalls.push(ball);
                  // Add new ball going upward
                  newBalls.push({
                    ...ball,
                    id: generateId(),
                    velocity: {
                      dx: (Math.random() - 0.5) * speed * 0.4,
                      dy: -Math.abs(speed),
                    },
                  });
                });
                return newBalls;
              });
              break;
            }
            case 'sevenball': {
              // Keep main ball direction, add 6 new balls going upward
              setBalls(prev => {
                const newBalls: Ball[] = [];
                prev.forEach(ball => {
                  const speed = Math.sqrt(ball.velocity.dx ** 2 + ball.velocity.dy ** 2) || ballSpeed;
                  // Keep original ball with its direction
                  newBalls.push(ball);
                  // Add 6 new balls spreading in a fan pattern upward
                  for (let i = 0; i < 6; i++) {
                    const spreadAngle = ((i - 2.5) / 2.5) * (Math.PI * 0.35);
                    newBalls.push({
                      id: generateId(),
                      position: { ...ball.position },
                      velocity: {
                        dx: Math.sin(spreadAngle) * speed,
                        dy: -Math.abs(Math.cos(spreadAngle) * speed),
                      },
                      radius: ball.radius,
                    });
                  }
                });
                return newBalls;
              });
              break;
            }
            case 'bigball':
              // Make all balls bigger and one-hit kill for 10 seconds
              setBalls(prev => prev.map(ball => ({
                ...ball,
                radius: BALL_RADIUS * 1.8,
              })));
              setIsBigBall(true);
              setTimeout(() => {
                setBalls(prev => prev.map(ball => ({
                  ...ball,
                  radius: BALL_RADIUS,
                })));
                setIsBigBall(false);
              }, 10000);
              break;
            case 'slow':
              setBalls(prev => prev.map(ball => ({
                ...ball,
                velocity: {
                  dx: ball.velocity.dx * 0.7,
                  dy: ball.velocity.dy * 0.7,
                },
              })));
              break;
            case 'speedup':
              setBalls(prev => prev.map(ball => ({
                ...ball,
                velocity: {
                  dx: ball.velocity.dx * 1.3,
                  dy: ball.velocity.dy * 1.3,
                },
              })));
              break;
            case 'extralife':
              setGameState(prev => ({ ...prev, lives: prev.lives + 1 }));
              audioManager.playExtraLife();
              break;
            case 'fireball':
              setIsFireball(true);
              setTimeout(() => setIsFireball(false), 10000);
              break;
            case 'laser':
              setPaddle(prev => ({ ...prev, hasLaser: true }));
              setTimeout(() => setPaddle(prev => ({ ...prev, hasLaser: false })), 7000);
              break;
            case 'magnet':
              setPaddle(prev => ({ ...prev, hasMagnet: true }));
              setTimeout(() => setPaddle(prev => ({ ...prev, hasMagnet: false })), 10000);
              break;
            case 'shield':
              // Clear existing shield timer
              if (shieldTimerRef.current) {
                clearTimeout(shieldTimerRef.current);
              }
              setPaddle(prev => ({ ...prev, hasShield: true }));
              // Shield lasts 10 seconds
              shieldTimerRef.current = setTimeout(() => {
                setPaddle(prev => ({ ...prev, hasShield: false }));
              }, 10000);
              break;
            case 'autopaddle':
              setIsAutoPaddle(true);
              setTimeout(() => setIsAutoPaddle(false), 10000);
              break;
            case 'shock':
              setIsShock(true);
              setTimeout(() => setIsShock(false), 10000);
              break;
          }
          
          const color = getPowerUpColor(powerUp.type);
          createParticles(powerUp.x + powerUp.width / 2, powerUp.y, color, 10);
          
          // Play sound and add coins
          if (isNegativePowerUp(powerUp.type)) {
            audioManager.playPowerDown();
          } else {
            audioManager.playPowerUp();
            setGameState(prev => ({ ...prev, coins: prev.coins + 5 }));
          }
          
          return false;
        }
        
        if (newY > GAME_HEIGHT) return false;
        
        powerUp.y = newY;
        return true;
      });
    });

    // Update coins
    setCoins(prevCoins => {
      return prevCoins.filter(coin => {
        const newY = coin.y + coin.velocity * deltaTime;
        
        // Check paddle collision
        if (
          newY + 15 > paddle.y &&
          newY < paddle.y + paddle.height &&
          coin.x + 10 > paddle.x &&
          coin.x - 10 < paddle.x + paddle.width
        ) {
          setGameState(prev => ({ ...prev, coins: prev.coins + coin.value }));
          createParticles(coin.x, coin.y, 'hsl(45, 100%, 55%)', 8);
          audioManager.playCoinCollect();
          return false;
        }
        
        if (newY > GAME_HEIGHT) return false;
        
        coin.y = newY;
        return true;
      });
    });

    // Update explosions
    setExplosions(prevExplosions => {
      return prevExplosions
        .map(explosion => ({
          ...explosion,
          radius: explosion.radius + deltaTime * 400,
          life: explosion.life - deltaTime * 2,
        }))
        .filter(explosion => explosion.life > 0);
    });

    // Update particles
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.dx * deltaTime,
          y: particle.y + particle.dy * deltaTime,
          dy: particle.dy + 200 * deltaTime,
          life: particle.life - deltaTime * 2,
        }))
        .filter(particle => particle.life > 0);
    });
  }, [paddle, balls, bricks, gameState.score, ballSpeed, isFireball, isBigBall, isShock, isAutoPaddle, explosions, createParticles, destroyBrick, onScoreChange, onLevelComplete, onGameOver, setGameState, plane, lastPowerUpTime, gameTime, levelCoins]);

  useGameLoop(gameLoop, gameState.status === 'playing');

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Apply screen shake
    ctx.save();
    if (screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * screenShake;
      const shakeY = (Math.random() - 0.5) * screenShake;
      ctx.translate(shakeX, shakeY);
    }

    // Clear with deep blue gradient background (matching reference)
    const bgGradient = ctx.createRadialGradient(
      GAME_WIDTH / 2, GAME_HEIGHT * 0.3, 0,
      GAME_WIDTH / 2, GAME_HEIGHT * 0.5, GAME_HEIGHT
    );
    bgGradient.addColorStop(0, 'hsl(215, 60%, 18%)');
    bgGradient.addColorStop(0.5, 'hsl(215, 65%, 12%)');
    bgGradient.addColorStop(1, 'hsl(220, 70%, 6%)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(-10, -10, GAME_WIDTH + 20, GAME_HEIGHT + 20);

    // Subtle star/dust particles in background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 30; i++) {
      const starX = ((i * 137) % GAME_WIDTH);
      const starY = ((i * 89) % GAME_HEIGHT);
      const starSize = (i % 3) + 0.5;
      ctx.beginPath();
      ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw shield at bottom
    if (paddle.hasShield) {
      const shieldGradient = ctx.createLinearGradient(0, GAME_HEIGHT - 5, 0, GAME_HEIGHT);
      shieldGradient.addColorStop(0, 'hsla(200, 100%, 60%, 0.8)');
      shieldGradient.addColorStop(1, 'hsla(200, 100%, 60%, 0)');
      ctx.fillStyle = shieldGradient;
      ctx.fillRect(0, GAME_HEIGHT - 8, GAME_WIDTH, 8);
      
      ctx.shadowColor = 'hsl(200, 100%, 60%)';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = 'hsl(200, 100%, 70%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GAME_HEIGHT - 5);
      ctx.lineTo(GAME_WIDTH, GAME_HEIGHT - 5);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw plane if present
    if (plane) {
      ctx.save();
      ctx.translate(plane.x, plane.y);
      
      // Plane body
      ctx.fillStyle = 'hsl(220, 40%, 50%)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 30, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Cockpit
      ctx.fillStyle = 'hsl(200, 100%, 70%)';
      ctx.beginPath();
      ctx.ellipse(15, -2, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Wings
      ctx.fillStyle = 'hsl(220, 35%, 45%)';
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(-5, -18);
      ctx.lineTo(5, -18);
      ctx.lineTo(10, 0);
      ctx.closePath();
      ctx.fill();
      
      // Tail
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.lineTo(-30, -10);
      ctx.lineTo(-20, -10);
      ctx.closePath();
      ctx.fill();
      
      // Power-up indicator
      if (plane.hasPowerUp) {
        ctx.fillStyle = 'hsl(50, 100%, 60%)';
        ctx.beginPath();
        ctx.arc(0, 12, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }

    // Draw level coins (static coins in level)
    levelCoins.forEach(coin => {
      if (coin.collected) return;
      
      const pulse = 1 + Math.sin(gameTime * 4) * 0.1;
      
      ctx.fillStyle = 'hsl(45, 100%, 55%)';
      ctx.shadowColor = 'hsl(45, 100%, 55%)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, 10 * pulse, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner ring
      ctx.strokeStyle = 'hsl(35, 100%, 40%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, 6 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      
      // Dollar sign
      ctx.fillStyle = 'hsl(35, 100%, 35%)';
      ctx.font = 'bold 10px Rajdhani';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', coin.x, coin.y);
      ctx.shadowBlur = 0;
    });

    // Draw explosions
    explosions.forEach(explosion => {
      const gradient = ctx.createRadialGradient(
        explosion.x, explosion.y, 0,
        explosion.x, explosion.y, explosion.radius
      );
      gradient.addColorStop(0, `hsla(50, 100%, 70%, ${explosion.life * 0.8})`);
      gradient.addColorStop(0.3, `hsla(25, 100%, 55%, ${explosion.life * 0.6})`);
      gradient.addColorStop(0.7, `hsla(0, 100%, 50%, ${explosion.life * 0.3})`);
      gradient.addColorStop(1, 'hsla(0, 100%, 50%, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw bricks with premium 3D rendering
    bricks.forEach(brick => {
      if (brick.destroyed) return;
      
      // Ghost bricks fade in/out
      if (brick.type === 'ghost') {
        const visibility = (Math.sin(gameTime * 3) + 1) / 2;
        ctx.globalAlpha = 0.3 + visibility * 0.7;
      }
      
      // Use premium 3D brick renderer
      drawPremiumBrick(ctx, brick, gameTime);
      
      ctx.globalAlpha = 1;
    });

    // Draw coins
    coins.forEach(coin => {
      ctx.fillStyle = 'hsl(45, 100%, 55%)';
      ctx.shadowColor = 'hsl(45, 100%, 55%)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'hsl(35, 100%, 40%)';
      ctx.font = 'bold 10px Rajdhani';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', coin.x, coin.y);
      ctx.shadowBlur = 0;
    });

    // Draw lasers
    lasers.forEach(laser => {
      ctx.fillStyle = 'hsl(0, 100%, 60%)';
      ctx.shadowColor = 'hsl(0, 100%, 50%)';
      ctx.shadowBlur = 10;
      ctx.fillRect(laser.x - 2, laser.y, 4, 15);
      ctx.shadowBlur = 0;
    });

    // Draw power-ups with icons
    powerUps.forEach(powerUp => {
      drawPowerUp(ctx, powerUp, gameTime);
    });

    // Draw paddle with premium 3D rendering
    drawPremiumPaddle(
      ctx,
      paddle.x,
      paddle.y,
      paddle.width,
      paddle.height + 8, // Make paddle taller for 3D effect
      paddle.hasLaser,
      paddle.hasMagnet,
      paddle.hasShield
    );

    // Draw aiming line when ball is stationary on paddle (magnetized or waiting to launch)
    if (magnetBallRef.current) {
      const ball = balls.find(b => b.id === magnetBallRef.current?.id);
      if (ball) {
        const startX = ball.position.x;
        const startY = ball.position.y;
        const lineLength = 200; // Bigger line
        const angle = aimAngleRef.current;
        
        // Draw dotted aiming line in aim direction
        ctx.save();
        
        // Draw dots along the line
        const dotSpacing = 15;
        const numDots = Math.floor(lineLength / dotSpacing);
        const startOffsetX = Math.cos(angle) * ball.radius;
        const startOffsetY = Math.sin(angle) * ball.radius;
        
        for (let i = 0; i < numDots; i++) {
          const t = (i + 1) / numDots;
          const animOffset = ((gameTime * 3) % 1) * dotSpacing;
          const dotX = startX + startOffsetX + Math.cos(angle) * (i * dotSpacing + animOffset);
          const dotY = startY + startOffsetY + Math.sin(angle) * (i * dotSpacing + animOffset);
          
          // Fade dots further from ball
          const alpha = 0.9 - t * 0.6;
          const dotSize = 4 - t * 2; // Bigger dots
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw arrow tip at the end
        const tipX = startX + Math.cos(angle) * (lineLength + ball.radius);
        const tipY = startY + Math.sin(angle) * (lineLength + ball.radius);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(tipX + Math.cos(angle) * 10, tipY + Math.sin(angle) * 10);
        ctx.lineTo(tipX + Math.cos(angle + 2.5) * 10, tipY + Math.sin(angle + 2.5) * 10);
        ctx.lineTo(tipX + Math.cos(angle - 2.5) * 10, tipY + Math.sin(angle - 2.5) * 10);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Draw balls with premium 3D rendering
    balls.forEach(ball => {
      drawPremiumBall(ctx, ball.position.x, ball.position.y, ball.radius, isFireball, isBigBall);
    });

    // Draw particles
    particles.forEach(particle => {
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    });

    // Draw combo indicator
    if (combo > 1) {
      ctx.fillStyle = 'hsl(50, 100%, 55%)';
      ctx.shadowColor = 'hsl(50, 100%, 55%)';
      ctx.shadowBlur = 15;
      ctx.font = 'bold 20px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(`${combo}x COMBO!`, GAME_WIDTH / 2, 35);
      ctx.shadowBlur = 0;
    }

    ctx.restore();

  }, [paddle, balls, bricks, powerUps, particles, lasers, coins, explosions, levelCoins, plane, isFireball, isBigBall, isShock, isAutoPaddle, screenShake, gameTime, combo]);

  // Set up HiDPI canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = GAME_WIDTH * dpr;
    canvas.height = GAME_HEIGHT * dpr;
    canvas.style.width = `${GAME_WIDTH}px`;
    canvas.style.height = `${GAME_HEIGHT}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[400px] mx-auto touch-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg box-glow-cyan"
        style={{ 
          aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
        }}
      />
    </div>
  );
};

export default GameCanvas;
