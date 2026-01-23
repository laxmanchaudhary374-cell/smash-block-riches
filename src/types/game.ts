export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Ball {
  id: string;
  position: Position;
  velocity: Velocity;
  radius: number;
}

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Brick {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hits: number;
  maxHits: number;
  color: BrickColor;
  destroyed: boolean;
}

export type BrickColor = 'cyan' | 'magenta' | 'yellow' | 'green' | 'orange' | 'purple';

export interface PowerUp {
  id: string;
  type: PowerUpType;
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
}

export type PowerUpType = 'widen' | 'multiball' | 'slow' | 'extralife' | 'fireball';

export interface Particle {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  color: string;
  size: number;
}

export interface GameState {
  status: 'menu' | 'playing' | 'paused' | 'gameover' | 'levelcomplete' | 'won';
  score: number;
  lives: number;
  level: number;
  highScore: number;
}

export interface LevelConfig {
  bricks: Omit<Brick, 'id' | 'destroyed'>[];
  ballSpeed: number;
  name: string;
}
