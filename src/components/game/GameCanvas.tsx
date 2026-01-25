import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Ball, Brick, Paddle, PowerUp, Particle, GameState, Laser, Coin, Explosion } from '@/types/game';
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
  getBrickTypeStyle,
  shouldDropPowerUp,
  createPowerUp,
  getPowerUpColor,
  getPowerUpLabel,
  isNegativePowerUp,
  createCoin,
  createExplosion,
  getBricksInExplosionRadius,
  getChainedBricks,
  updateMovingBricks,
} from '@/utils/gameUtils';

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
  
  const [balls, setBalls] = useState<Ball[]>([]);
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lasers, setLasers] = useState<Laser[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [ballSpeed, setBallSpeed] = useState(300);
  const [isFireball, setIsFireball] = useState(false);
  const [screenShake, setScreenShake] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState(0);
  
  const paddleTargetRef = useRef(paddle.x);
  const magnetBallRef = useRef<Ball | null>(null);

  // Initialize level
  useEffect(() => {
    if (gameState.status === 'playing' && bricks.length === 0) {
      const levelIndex = Math.min(gameState.level - 1, levels.length - 1);
      const level = levels[levelIndex];
      
      const newBricks: Brick[] = level.bricks.map((brick) => ({
        ...brick,
        id: generateId(),
        destroyed: false,
        originalX: brick.x,
      }));
      
      setBricks(newBricks);
      setBallSpeed(level.ballSpeed);
      setPowerUps([]);
      setLasers([]);
      setCoins([]);
      setExplosions([]);
      setIsFireball(false);
      setCombo(0);
      setComboTimer(0);
      setPaddle(prev => ({ 
        ...prev, 
        width: PADDLE_WIDTH,
        hasLaser: false,
        hasMagnet: false,
        hasShield: false,
      }));
      
      // Create initial ball
      setBalls([{
        id: generateId(),
        position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 60 },
        velocity: { dx: 0, dy: -level.ballSpeed },
        radius: BALL_RADIUS,
      }]);
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
      magnetBallRef.current = null;
    }
  }, [gameState.status]);

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
    
    // Create lots of particles
    createParticles(x, y, 'hsl(25, 100%, 55%)', 20);
    createParticles(x, y, 'hsl(50, 100%, 55%)', 15);
    createParticles(x, y, 'hsl(0, 100%, 60%)', 10);
  }, [createParticles, triggerScreenShake]);

  // Handle brick destruction
  const destroyBrick = useCallback((brick: Brick, addScore: boolean = true) => {
    if (brick.destroyed || brick.type === 'indestructible') return null;
    
    const scoreValue = brick.maxHits * 10 * (1 + combo * 0.1);
    
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
    }
    
    // Update combo
    setCombo(prev => prev + 1);
    setComboTimer(2); // 2 seconds to maintain combo
    
    return addScore ? scoreValue : 0;
  }, [combo, createParticles, handleExplosion]);

  // Handle paddle movement
  const handlePointerMove = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = GAME_WIDTH / rect.width;
    const x = (clientX - rect.left) * scaleX;
    paddleTargetRef.current = Math.max(0, Math.min(GAME_WIDTH - paddle.width, x - paddle.width / 2));
  }, [paddle.width]);

  // Fire laser
  const fireLaser = useCallback(() => {
    if (paddle.hasLaser) {
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
        handlePointerMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (gameState.status === 'playing' && e.touches.length > 0) {
        e.preventDefault();
        handlePointerMove(e.touches[0].clientX);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (gameState.status === 'playing' && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
        fireLaser();
      }
    };

    const handleClick = () => {
      if (gameState.status === 'playing') {
        fireLaser();
        // Release magnet ball
        if (magnetBallRef.current) {
          magnetBallRef.current = null;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('click', handleClick);
    };
  }, [gameState.status, handlePointerMove, fireLaser]);

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
      // Handle magnet ball
      if (magnetBallRef.current) {
        const magnetBall = prevBalls.find(b => b.id === magnetBallRef.current?.id);
        if (magnetBall) {
          return prevBalls.map(ball => {
            if (ball.id === magnetBall.id) {
              return {
                ...ball,
                position: { x: paddle.x + paddle.width / 2, y: paddle.y - ball.radius - 1 },
                velocity: { dx: 0, dy: 0 },
              };
            }
            return ball;
          });
        }
      }

      const newBalls = prevBalls.map(ball => {
        let { x, y } = ball.position;
        let { dx, dy } = ball.velocity;

        x += dx * deltaTime;
        y += dy * deltaTime;

        // Wall collisions
        if (x - ball.radius < 0) {
          x = ball.radius;
          dx = Math.abs(dx);
        }
        if (x + ball.radius > GAME_WIDTH) {
          x = GAME_WIDTH - ball.radius;
          dx = -Math.abs(dx);
        }
        if (y - ball.radius < 0) {
          y = ball.radius;
          dy = Math.abs(dy);
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
          setPaddle(prev => ({ ...prev, hasShield: false }));
          ball.position.y = GAME_HEIGHT - 20;
          ball.velocity.dy = -Math.abs(ball.velocity.dy);
          createParticles(ball.position.x, GAME_HEIGHT - 10, 'hsl(200, 100%, 60%)', 10);
          return true;
        }
        return false;
      });
      
      if (aliveBalls.length === 0 && prevBalls.length > 0) {
        // Lost a life
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
        
        // Reset ball
        return [{
          id: generateId(),
          position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 60 },
          velocity: { dx: (Math.random() - 0.5) * 100, dy: -ballSpeed },
          radius: BALL_RADIUS,
        }];
      }

      return aliveBalls;
    });

    // Check paddle collision
    setBalls(prevBalls => {
      return prevBalls.map(ball => {
        if (checkBallPaddleCollision(ball, paddle)) {
          const angle = calculateBounceAngle(ball, paddle);
          const speed = Math.sqrt(ball.velocity.dx ** 2 + ball.velocity.dy ** 2);
          
          createParticles(ball.position.x, ball.position.y, 'hsl(180, 100%, 50%)', 4);
          
          // Magnet catches ball
          if (paddle.hasMagnet) {
            magnetBallRef.current = ball;
          }
          
          return {
            ...ball,
            position: { ...ball.position, y: paddle.y - ball.radius - 1 },
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
    setLasers(prevLasers => {
      return prevLasers.filter(laser => {
        for (const brick of bricks) {
          if (!brick.destroyed && checkLaserBrickCollision(laser, brick)) {
            // Hit brick
            setBricks(prev => prev.map(b => {
              if (b.id === brick.id && b.type !== 'indestructible') {
                const newHits = b.hits - 1;
                if (newHits <= 0) {
                  const score = destroyBrick(b);
                  if (score) onScoreChange(gameState.score + score);
                  return { ...b, hits: 0, destroyed: true };
                }
                return { ...b, hits: newHits };
              }
              return b;
            }));
            createParticles(laser.x, laser.y, 'hsl(0, 100%, 50%)', 5);
            return false;
          }
        }
        return true;
      });
    });

    // Check brick collisions
    setBricks(prevBricks => {
      let scoreToAdd = 0;
      const updatedBricks = prevBricks.map(brick => {
        if (brick.destroyed) return brick;

        for (const ball of balls) {
          if (checkBallBrickCollision(ball, brick)) {
            // Indestructible bricks only bounce
            if (brick.type === 'indestructible') {
              createParticles(ball.position.x, ball.position.y, 'hsl(220, 20%, 60%)', 3);
              return brick;
            }
            
            const newHits = brick.hits - (isFireball ? brick.hits : 1);
            
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

      if (scoreToAdd > 0) {
        onScoreChange(gameState.score + Math.round(scoreToAdd));
      }

      // Check if level complete (ignore indestructible bricks)
      const remainingBricks = updatedBricks.filter(b => !b.destroyed && b.type !== 'indestructible');
      if (remainingBricks.length === 0 && prevBricks.some(b => !b.destroyed && b.type !== 'indestructible')) {
        setTimeout(() => onLevelComplete(), 300);
      }

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
              break;
            case 'shrink':
              setPaddle(prev => ({ ...prev, width: Math.max(40, prev.width - 20) }));
              break;
            case 'multiball':
              setBalls(prev => {
                if (prev.length < 5) {
                  const newBalls = prev.flatMap(ball => [
                    ball,
                    {
                      ...ball,
                      id: generateId(),
                      velocity: {
                        dx: ball.velocity.dx + (Math.random() - 0.5) * 100,
                        dy: ball.velocity.dy,
                      },
                    },
                  ]);
                  return newBalls;
                }
                return prev;
              });
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
              break;
            case 'fireball':
              setIsFireball(true);
              setTimeout(() => setIsFireball(false), 5000);
              break;
            case 'laser':
              setPaddle(prev => ({ ...prev, hasLaser: true }));
              setTimeout(() => setPaddle(prev => ({ ...prev, hasLaser: false })), 8000);
              break;
            case 'magnet':
              setPaddle(prev => ({ ...prev, hasMagnet: true }));
              setTimeout(() => setPaddle(prev => ({ ...prev, hasMagnet: false })), 10000);
              break;
            case 'shield':
              setPaddle(prev => ({ ...prev, hasShield: true }));
              break;
          }
          
          const color = getPowerUpColor(powerUp.type);
          createParticles(powerUp.x + powerUp.width / 2, powerUp.y, color, 10);
          
          // Add coins for positive powerups
          if (!isNegativePowerUp(powerUp.type)) {
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
  }, [paddle, balls, bricks, gameState.score, ballSpeed, isFireball, explosions, createParticles, destroyBrick, onScoreChange, onLevelComplete, onGameOver, setGameState]);

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

    // Clear
    ctx.fillStyle = 'hsl(240, 20%, 4%)';
    ctx.fillRect(-10, -10, GAME_WIDTH + 20, GAME_HEIGHT + 20);

    // Draw grid effect
    ctx.strokeStyle = 'hsla(180, 100%, 50%, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < GAME_WIDTH; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GAME_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < GAME_HEIGHT; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GAME_WIDTH, i);
      ctx.stroke();
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

    // Draw bricks
    bricks.forEach(brick => {
      if (brick.destroyed) return;
      
      // Ghost bricks fade in/out
      if (brick.type === 'ghost') {
        const visibility = (Math.sin(gameTime * 3) + 1) / 2;
        ctx.globalAlpha = 0.3 + visibility * 0.7;
      }
      
      const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.height);
      const opacity = 0.5 + (brick.hits / brick.maxHits) * 0.5;
      
      const baseColor = getBrickColor(brick.color);
      const typeStyle = getBrickTypeStyle(brick.type);
      
      gradient.addColorStop(0, baseColor.replace(')', `, ${opacity})`).replace('hsl', 'hsla'));
      gradient.addColorStop(1, baseColor.replace(')', `, ${opacity * 0.7})`).replace('hsl', 'hsla'));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
      ctx.fill();
      
      // Special brick indicators
      if (brick.type === 'explosive') {
        // Draw explosion icon
        ctx.fillStyle = 'hsla(0, 100%, 100%, 0.9)';
        ctx.font = 'bold 14px Rajdhani';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💥', brick.x + brick.width / 2, brick.y + brick.height / 2);
      } else if (brick.type === 'indestructible') {
        // Metal pattern
        ctx.strokeStyle = 'hsla(220, 20%, 60%, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(brick.x + 5, brick.y + 5);
        ctx.lineTo(brick.x + brick.width - 5, brick.y + brick.height - 5);
        ctx.moveTo(brick.x + brick.width - 5, brick.y + 5);
        ctx.lineTo(brick.x + 5, brick.y + brick.height - 5);
        ctx.stroke();
      } else if (brick.type === 'moving') {
        // Draw arrows
        ctx.fillStyle = 'hsla(280, 100%, 90%, 0.8)';
        ctx.font = 'bold 12px Rajdhani';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('↔', brick.x + brick.width / 2, brick.y + brick.height / 2);
      } else if (brick.type === 'chain') {
        // Chain link
        ctx.strokeStyle = 'hsla(50, 100%, 80%, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(brick.x + brick.width / 2, brick.y + brick.height / 2, 6, 0, Math.PI * 2);
        ctx.stroke();
      } else if (brick.type === 'coin') {
        ctx.fillStyle = 'hsla(45, 100%, 90%, 0.9)';
        ctx.font = 'bold 14px Rajdhani';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', brick.x + brick.width / 2, brick.y + brick.height / 2);
      } else if (brick.type === 'rainbow') {
        // Rainbow shimmer
        const hue = (gameTime * 100) % 360;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.shadowBlur = 15;
      }
      
      // Glow effect
      ctx.shadowColor = typeStyle.glow;
      ctx.shadowBlur = brick.type === 'indestructible' ? 5 : 10;
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Hit indicator
      if (brick.maxHits > 1 && brick.type !== 'indestructible' && !['explosive', 'moving', 'chain', 'coin'].includes(brick.type)) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Rajdhani';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(brick.hits.toString(), brick.x + brick.width / 2, brick.y + brick.height / 2);
      }
      
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

    // Draw power-ups
    powerUps.forEach(powerUp => {
      const color = getPowerUpColor(powerUp.type);
      const isNegative = isNegativePowerUp(powerUp.type);
      
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.roundRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height, 4);
      ctx.fill();
      
      // Warning border for negative powerups
      if (isNegative) {
        ctx.strokeStyle = 'hsl(0, 100%, 30%)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = isNegative ? 'white' : 'black';
      ctx.font = 'bold 10px Rajdhani';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getPowerUpLabel(powerUp.type), powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2);
    });

    // Draw paddle
    const paddleGradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height);
    
    if (paddle.hasLaser) {
      paddleGradient.addColorStop(0, 'hsl(0, 100%, 60%)');
      paddleGradient.addColorStop(1, 'hsl(0, 100%, 40%)');
      ctx.shadowColor = 'hsl(0, 100%, 50%)';
    } else if (paddle.hasMagnet) {
      paddleGradient.addColorStop(0, 'hsl(280, 100%, 60%)');
      paddleGradient.addColorStop(1, 'hsl(280, 100%, 40%)');
      ctx.shadowColor = 'hsl(280, 100%, 50%)';
    } else {
      paddleGradient.addColorStop(0, 'hsl(180, 100%, 60%)');
      paddleGradient.addColorStop(1, 'hsl(180, 100%, 40%)');
      ctx.shadowColor = 'hsl(180, 100%, 50%)';
    }
    
    ctx.fillStyle = paddleGradient;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw balls
    balls.forEach(ball => {
      const ballGradient = ctx.createRadialGradient(
        ball.position.x - 2, ball.position.y - 2, 0,
        ball.position.x, ball.position.y, ball.radius
      );
      
      if (isFireball) {
        ballGradient.addColorStop(0, 'hsl(50, 100%, 90%)');
        ballGradient.addColorStop(0.5, 'hsl(30, 100%, 60%)');
        ballGradient.addColorStop(1, 'hsl(10, 100%, 50%)');
        ctx.shadowColor = 'hsl(25, 100%, 55%)';
      } else {
        ballGradient.addColorStop(0, 'hsl(180, 100%, 90%)');
        ballGradient.addColorStop(0.5, 'hsl(180, 100%, 60%)');
        ballGradient.addColorStop(1, 'hsl(180, 100%, 40%)');
        ctx.shadowColor = 'hsl(180, 100%, 50%)';
      }
      
      ctx.fillStyle = ballGradient;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
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

  }, [paddle, balls, bricks, powerUps, particles, lasers, coins, explosions, isFireball, screenShake, gameTime, combo]);

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
