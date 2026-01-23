import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Ball, Brick, Paddle, PowerUp, Particle, GameState } from '@/types/game';
import { useGameLoop } from '@/hooks/useGameLoop';
import { levels } from '@/utils/levels';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
  generateId,
  checkBallPaddleCollision,
  checkBallBrickCollision,
  calculateBounceAngle,
  getBrickGradient,
  getBrickColor,
  shouldDropPowerUp,
  createPowerUp,
  getPowerUpColor,
  getPowerUpLabel,
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
  });
  
  const [balls, setBalls] = useState<Ball[]>([]);
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ballSpeed, setBallSpeed] = useState(300);
  const [isFireball, setIsFireball] = useState(false);
  
  const paddleTargetRef = useRef(paddle.x);
  const lastTouchRef = useRef<number | null>(null);

  // Initialize level
  useEffect(() => {
    if (gameState.status === 'playing' && bricks.length === 0) {
      const levelIndex = Math.min(gameState.level - 1, levels.length - 1);
      const level = levels[levelIndex];
      
      const newBricks: Brick[] = level.bricks.map((brick) => ({
        ...brick,
        id: generateId(),
        destroyed: false,
      }));
      
      setBricks(newBricks);
      setBallSpeed(level.ballSpeed);
      setPowerUps([]);
      setIsFireball(false);
      setPaddle(prev => ({ ...prev, width: PADDLE_WIDTH }));
      
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

  // Handle paddle movement
  const handlePointerMove = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = GAME_WIDTH / rect.width;
    const x = (clientX - rect.left) * scaleX;
    paddleTargetRef.current = Math.max(0, Math.min(GAME_WIDTH - paddle.width, x - paddle.width / 2));
  }, [paddle.width]);

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
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [gameState.status, handlePointerMove]);

  // Game loop
  const gameLoop = useCallback((deltaTime: number) => {
    // Smooth paddle movement
    setPaddle(prev => {
      const diff = paddleTargetRef.current - prev.x;
      const newX = prev.x + diff * Math.min(1, deltaTime * 15);
      return { ...prev, x: newX };
    });

    // Update balls
    setBalls(prevBalls => {
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

      // Check for balls that fell off
      const aliveBalls = newBalls.filter(ball => ball.position.y < GAME_HEIGHT + 50);
      
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

    // Check brick collisions
    setBricks(prevBricks => {
      let scoreToAdd = 0;
      const updatedBricks = prevBricks.map(brick => {
        if (brick.destroyed) return brick;

        for (const ball of balls) {
          if (checkBallBrickCollision(ball, brick)) {
            const newHits = brick.hits - 1;
            
            if (newHits <= 0 || isFireball) {
              scoreToAdd += brick.maxHits * 10;
              createParticles(
                brick.x + brick.width / 2,
                brick.y + brick.height / 2,
                getBrickColor(brick.color),
                12
              );
              
              // Maybe drop power-up
              if (shouldDropPowerUp()) {
                const powerUp = createPowerUp(brick.x + brick.width / 2, brick.y + brick.height);
                setPowerUps(prev => [...prev, powerUp]);
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

      if (scoreToAdd > 0) {
        onScoreChange(gameState.score + scoreToAdd);
      }

      // Check if level complete
      const remainingBricks = updatedBricks.filter(b => !b.destroyed);
      if (remainingBricks.length === 0 && prevBricks.some(b => !b.destroyed)) {
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
            case 'extralife':
              setGameState(prev => ({ ...prev, lives: prev.lives + 1 }));
              break;
            case 'fireball':
              setIsFireball(true);
              setTimeout(() => setIsFireball(false), 5000);
              break;
          }
          
          createParticles(powerUp.x + powerUp.width / 2, powerUp.y, getPowerUpColor(powerUp.type), 10);
          return false;
        }
        
        if (newY > GAME_HEIGHT) return false;
        
        powerUp.y = newY;
        return true;
      });
    });

    // Update particles
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.dx * deltaTime,
          y: particle.y + particle.dy * deltaTime,
          dy: particle.dy + 200 * deltaTime, // gravity
          life: particle.life - deltaTime * 2,
        }))
        .filter(particle => particle.life > 0);
    });
  }, [paddle, balls, bricks, gameState.score, ballSpeed, isFireball, createParticles, onScoreChange, onLevelComplete, onGameOver, setGameState]);

  useGameLoop(gameLoop, gameState.status === 'playing');

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = 'hsl(240, 20%, 4%)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

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

    // Draw bricks
    bricks.forEach(brick => {
      if (brick.destroyed) return;
      
      const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.height);
      const opacity = 0.5 + (brick.hits / brick.maxHits) * 0.5;
      
      const baseColor = getBrickColor(brick.color);
      gradient.addColorStop(0, baseColor.replace(')', `, ${opacity})`).replace('hsl', 'hsla'));
      gradient.addColorStop(1, baseColor.replace(')', `, ${opacity * 0.7})`).replace('hsl', 'hsla'));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
      ctx.fill();
      
      // Glow effect
      ctx.shadowColor = baseColor;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Hit indicator
      if (brick.maxHits > 1) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Rajdhani';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(brick.hits.toString(), brick.x + brick.width / 2, brick.y + brick.height / 2);
      }
    });

    // Draw power-ups
    powerUps.forEach(powerUp => {
      const color = getPowerUpColor(powerUp.type);
      
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.roundRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = 'black';
      ctx.font = 'bold 10px Rajdhani';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getPowerUpLabel(powerUp.type), powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2);
    });

    // Draw paddle
    const paddleGradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height);
    paddleGradient.addColorStop(0, 'hsl(180, 100%, 60%)');
    paddleGradient.addColorStop(1, 'hsl(180, 100%, 40%)');
    
    ctx.fillStyle = paddleGradient;
    ctx.shadowColor = 'hsl(180, 100%, 50%)';
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

  }, [paddle, balls, bricks, powerUps, particles, isFireball]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[400px] mx-auto touch-none"
    >
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="w-full h-auto rounded-lg box-glow-cyan"
        style={{ 
          aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
};

export default GameCanvas;
