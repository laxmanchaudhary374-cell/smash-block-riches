import { Ball, Brick, Paddle, PowerUp, PowerUpType, BrickColor } from '@/types/game';

export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 600;
export const PADDLE_WIDTH = 80;
export const PADDLE_HEIGHT = 12;
export const BALL_RADIUS = 8;

let idCounter = 0;
export const generateId = (): string => {
  return `id_${Date.now()}_${++idCounter}`;
};

export const checkBallPaddleCollision = (ball: Ball, paddle: Paddle): boolean => {
  return (
    ball.position.x + ball.radius > paddle.x &&
    ball.position.x - ball.radius < paddle.x + paddle.width &&
    ball.position.y + ball.radius > paddle.y &&
    ball.position.y - ball.radius < paddle.y + paddle.height
  );
};

export const checkBallBrickCollision = (ball: Ball, brick: Brick): boolean => {
  if (brick.destroyed) return false;
  
  return (
    ball.position.x + ball.radius > brick.x &&
    ball.position.x - ball.radius < brick.x + brick.width &&
    ball.position.y + ball.radius > brick.y &&
    ball.position.y - ball.radius < brick.y + brick.height
  );
};

export const calculateBounceAngle = (ball: Ball, paddle: Paddle): number => {
  const hitPoint = (ball.position.x - paddle.x) / paddle.width;
  const angle = (hitPoint - 0.5) * Math.PI * 0.7;
  return angle;
};

export const getBrickColor = (color: BrickColor): string => {
  const colors: Record<BrickColor, string> = {
    cyan: 'hsl(180, 100%, 50%)',
    magenta: 'hsl(320, 100%, 60%)',
    yellow: 'hsl(50, 100%, 55%)',
    green: 'hsl(150, 100%, 45%)',
    orange: 'hsl(25, 100%, 55%)',
    purple: 'hsl(280, 100%, 60%)',
  };
  return colors[color];
};

export const getBrickGradient = (color: BrickColor, hits: number, maxHits: number): string => {
  const opacity = 0.5 + (hits / maxHits) * 0.5;
  const colors: Record<BrickColor, [string, string]> = {
    cyan: ['hsl(180, 100%, 60%)', 'hsl(190, 100%, 40%)'],
    magenta: ['hsl(320, 100%, 70%)', 'hsl(330, 100%, 50%)'],
    yellow: ['hsl(50, 100%, 65%)', 'hsl(40, 100%, 45%)'],
    green: ['hsl(150, 100%, 55%)', 'hsl(160, 100%, 35%)'],
    orange: ['hsl(25, 100%, 65%)', 'hsl(15, 100%, 45%)'],
    purple: ['hsl(280, 100%, 70%)', 'hsl(270, 100%, 50%)'],
  };
  const [light, dark] = colors[color];
  return `linear-gradient(180deg, ${light} 0%, ${dark} 100%)`;
};

export const shouldDropPowerUp = (): boolean => {
  return Math.random() < 0.15;
};

export const getRandomPowerUpType = (): PowerUpType => {
  const types: PowerUpType[] = ['widen', 'multiball', 'slow', 'extralife', 'fireball'];
  const weights = [0.3, 0.25, 0.2, 0.1, 0.15];
  
  const random = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < types.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return types[i];
    }
  }
  
  return 'widen';
};

export const createPowerUp = (x: number, y: number): PowerUp => {
  return {
    id: generateId(),
    type: getRandomPowerUpType(),
    x: x - 15,
    y,
    width: 30,
    height: 15,
    velocity: 150,
  };
};

export const getPowerUpColor = (type: PowerUpType): string => {
  const colors: Record<PowerUpType, string> = {
    widen: 'hsl(180, 100%, 50%)',
    multiball: 'hsl(320, 100%, 60%)',
    slow: 'hsl(50, 100%, 55%)',
    extralife: 'hsl(150, 100%, 45%)',
    fireball: 'hsl(25, 100%, 55%)',
  };
  return colors[type];
};

export const getPowerUpLabel = (type: PowerUpType): string => {
  const labels: Record<PowerUpType, string> = {
    widen: 'W',
    multiball: 'M',
    slow: 'S',
    extralife: '+1',
    fireball: 'F',
  };
  return labels[type];
};
