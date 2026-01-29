// Level Pattern Generator for 500+ levels
// Creates diverse brick patterns with increasing difficulty

import { LevelConfig, BrickColor } from '@/types/game';
import { 
  createBrickRow, createPyramid, createCheckerboard, createVShape,
  B, EX, IN, MV, CH, CO, RB, GH, BrickDef, COLORS
} from './levelPatterns';

// Pattern types for variety
type PatternType = 'rows' | 'pyramid' | 'checker' | 'diamond' | 'fortress' | 'spiral' | 'wave' | 'cross' | 'heart' | 'star' | 'zigzag' | 'random' | 'boss';

// Get difficulty parameters based on level
const getDifficultyParams = (level: number) => {
  const tier = Math.floor((level - 1) / 50); // 0-9 for 500 levels
  const tierProgress = ((level - 1) % 50) / 50;
  
  return {
    ballSpeed: 280 + level * 0.8 + tier * 20,
    maxHits: Math.min(1 + Math.floor(tier / 2), 4),
    explosiveChance: 0.05 + tier * 0.02,
    indestructibleChance: Math.min(0.02 + tier * 0.015, 0.1),
    movingChance: 0.03 + tier * 0.02,
    chainChance: 0.04 + tier * 0.01,
    coinChance: 0.08 - tier * 0.005,
    ghostChance: tier >= 2 ? 0.03 + tier * 0.01 : 0,
    rainbowChance: tier >= 1 ? 0.02 + tier * 0.005 : 0,
    rows: Math.min(5 + Math.floor(tier / 2), 10), // More rows with smaller bricks
    cols: 8, // More columns with smaller bricks
  };
};

// Get theme based on level range
const getTheme = (level: number): 'cyber' | 'neon' | 'space' | 'fire' | 'ice' | 'gold' => {
  const themes: ('cyber' | 'neon' | 'space' | 'fire' | 'ice' | 'gold')[] = ['cyber', 'neon', 'space', 'fire', 'ice', 'gold'];
  return themes[(Math.floor((level - 1) / 25)) % themes.length];
};

// Get level name
const getLevelName = (level: number, pattern: PatternType): string => {
  const tier = Math.floor((level - 1) / 50);
  const tierNames = ['BEGINNER', 'NOVICE', 'SKILLED', 'EXPERT', 'MASTER', 'LEGEND', 'MYTHIC', 'DIVINE', 'ULTIMATE', 'GODLIKE'];
  const patternNames: Record<PatternType, string[]> = {
    rows: ['LAYERS', 'STRIPES', 'BANDS', 'HORIZON'],
    pyramid: ['PYRAMID', 'MOUNTAIN', 'PEAK', 'SUMMIT'],
    checker: ['CHECKERS', 'GRID', 'MATRIX', 'TILES'],
    diamond: ['DIAMOND', 'GEM', 'CRYSTAL', 'JEWEL'],
    fortress: ['FORTRESS', 'CASTLE', 'BASTION', 'CITADEL'],
    spiral: ['SPIRAL', 'VORTEX', 'CYCLONE', 'WHIRL'],
    wave: ['WAVE', 'TIDE', 'RIPPLE', 'FLOW'],
    cross: ['CROSS', 'PLUS', 'JUNCTION', 'NEXUS'],
    heart: ['HEART', 'LOVE', 'PULSE', 'CORE'],
    star: ['STAR', 'NOVA', 'STELLAR', 'ASTRAL'],
    zigzag: ['ZIGZAG', 'SNAKE', 'BOLT', 'THUNDER'],
    random: ['CHAOS', 'STORM', 'MAYHEM', 'FRENZY'],
    boss: ['BOSS', 'GUARDIAN', 'TITAN', 'OVERLORD'],
  };
  
  const names = patternNames[pattern];
  const name = names[level % names.length];
  return `${tierNames[Math.min(tier, tierNames.length - 1)]} ${name}`;
};

// Determine brick type based on difficulty and randomness
const getBrickDef = (color: BrickColor, params: ReturnType<typeof getDifficultyParams>, forceNormal = false): BrickDef | null => {
  if (forceNormal) {
    return B(color, params.maxHits > 1 && Math.random() < 0.3 ? Math.ceil(Math.random() * params.maxHits) : 1);
  }
  
  const rand = Math.random();
  let cumulative = 0;
  
  cumulative += params.indestructibleChance;
  if (rand < cumulative) return IN();
  
  cumulative += params.explosiveChance;
  if (rand < cumulative) return EX(color);
  
  cumulative += params.movingChance;
  if (rand < cumulative) return MV(color, 50 + Math.random() * 50, 20 + Math.random() * 30);
  
  cumulative += params.chainChance;
  if (rand < cumulative) return CH(color);
  
  cumulative += params.coinChance;
  if (rand < cumulative) return CO();
  
  cumulative += params.ghostChance;
  if (rand < cumulative) return GH(color);
  
  cumulative += params.rainbowChance;
  if (rand < cumulative) return RB();
  
  // Normal brick with possible multiple hits
  const hits = params.maxHits > 1 && Math.random() < 0.4 ? Math.ceil(Math.random() * params.maxHits) : 1;
  return B(color, hits);
};

// Generate row pattern
const generateRowPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  const colorOffset = level % COLORS.length;
  
  for (let row = 0; row < params.rows; row++) {
    const color = COLORS[(colorOffset + row) % COLORS.length];
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    
    for (let col = 0; col < params.cols; col++) {
      // Create gaps occasionally
      if (Math.random() < 0.1 && level > 20) {
        rowBricks.push(null);
      } else {
        rowBricks.push(getBrickDef(color, params));
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate pyramid pattern
const generatePyramidPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  const color = COLORS[level % COLORS.length];
  const inverted = level % 3 === 0;
  
  if (inverted) {
    // Inverted pyramid
    for (let row = 0; row < Math.min(params.rows, 5); row++) {
      const colsInRow = params.cols - row;
      const rowBricks: (BrickDef | BrickColor | null)[] = [];
      
      for (let i = 0; i < row; i++) rowBricks.push(null);
      for (let col = 0; col < colsInRow; col++) {
        rowBricks.push(getBrickDef(COLORS[(level + row + col) % COLORS.length], params));
      }
      
      bricks.push(...createBrickRow(row, rowBricks));
    }
  } else {
    bricks.push(...createPyramid(0, Math.min(params.cols, 6), color, Math.min(params.maxHits, 2)));
  }
  
  return bricks;
};

// Generate checker pattern
const generateCheckerPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const color1 = COLORS[level % COLORS.length];
  const color2 = COLORS[(level + 3) % COLORS.length];
  return createCheckerboard(0, params.rows, params.cols, color1, color2);
};

// Generate diamond pattern
const generateDiamondPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  const centerCol = Math.floor(params.cols / 2);
  
  // Create diamond shape
  const height = Math.min(5, params.rows);
  for (let row = 0; row < height; row++) {
    const width = row < height / 2 ? row * 2 + 1 : (height - row - 1) * 2 + 1;
    const startCol = centerCol - Math.floor(width / 2);
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    
    for (let col = 0; col < params.cols; col++) {
      if (col >= startCol && col < startCol + width) {
        const color = COLORS[(level + row + col) % COLORS.length];
        rowBricks.push(getBrickDef(color, params));
      } else {
        rowBricks.push(null);
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate fortress pattern with walls
const generateFortressPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  
  for (let row = 0; row < params.rows; row++) {
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    
    for (let col = 0; col < params.cols; col++) {
      const isEdge = col === 0 || col === params.cols - 1;
      const isTop = row === 0;
      const isBottom = row === params.rows - 1;
      
      if ((isEdge || isTop) && Math.random() < 0.4 + level * 0.005) {
        rowBricks.push(IN());
      } else if (isEdge) {
        rowBricks.push(B(COLORS[level % COLORS.length], 2));
      } else {
        const color = COLORS[(level + row + col) % COLORS.length];
        rowBricks.push(getBrickDef(color, params));
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate wave pattern
const generateWavePattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  
  for (let row = 0; row < params.rows; row++) {
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    const waveOffset = Math.sin(row * 0.8 + level * 0.3) * 2;
    
    for (let col = 0; col < params.cols; col++) {
      const shouldPlace = Math.sin((col + waveOffset) * 0.8) > -0.3;
      if (shouldPlace) {
        const color = COLORS[(level + row) % COLORS.length];
        rowBricks.push(getBrickDef(color, params));
      } else {
        rowBricks.push(null);
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate cross pattern
const generateCrossPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  const centerCol = Math.floor(params.cols / 2);
  const centerRow = Math.floor(params.rows / 2);
  
  for (let row = 0; row < params.rows; row++) {
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    
    for (let col = 0; col < params.cols; col++) {
      const isHorizontalBar = row === centerRow || row === centerRow - 1;
      const isVerticalBar = col === centerCol || col === centerCol - 1 || (params.cols % 2 === 0 && col === centerCol + 1);
      
      if (isHorizontalBar || isVerticalBar) {
        const color = COLORS[(level + row + col) % COLORS.length];
        rowBricks.push(getBrickDef(color, params));
      } else {
        rowBricks.push(null);
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate zigzag pattern  
const generateZigzagPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  
  for (let row = 0; row < params.rows; row++) {
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    const offset = row % 2 === 0 ? 0 : 1;
    
    for (let col = 0; col < params.cols; col++) {
      if ((col + offset) % 2 === 0) {
        const color = COLORS[(level + row) % COLORS.length];
        rowBricks.push(getBrickDef(color, params));
      } else {
        rowBricks.push(null);
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate random chaotic pattern
const generateRandomPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  
  for (let row = 0; row < params.rows; row++) {
    const rowBricks: (BrickDef | BrickColor | null)[] = [];
    
    for (let col = 0; col < params.cols; col++) {
      if (Math.random() < 0.75) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        rowBricks.push(getBrickDef(color, params));
      } else {
        rowBricks.push(null);
      }
    }
    
    bricks.push(...createBrickRow(row, rowBricks));
  }
  
  return bricks;
};

// Generate boss level pattern
const generateBossPattern = (level: number, params: ReturnType<typeof getDifficultyParams>): LevelConfig['bricks'] => {
  const bricks: LevelConfig['bricks'] = [];
  const bossHits = 3 + Math.floor(level / 100);
  
  // Fortified center
  bricks.push(...createBrickRow(0, [IN(), B('red', bossHits), B('red', bossHits), B('red', bossHits), B('red', bossHits), IN()]));
  bricks.push(...createBrickRow(1, [MV('purple', 80), EX('red'), B('orange', bossHits - 1), B('orange', bossHits - 1), EX('red'), MV('purple', 80)]));
  bricks.push(...createBrickRow(2, [IN(), CH('yellow'), B('magenta', bossHits - 1), B('magenta', bossHits - 1), CH('yellow'), IN()]));
  bricks.push(...createBrickRow(3, [CO(), EX('red'), null, null, EX('red'), CO()]));
  bricks.push(...createBrickRow(4, [MV('cyan', 70), B('cyan', 2), EX('red'), EX('red'), B('cyan', 2), MV('cyan', 70)]));
  bricks.push(...createBrickRow(5, [IN(), 'green', CO(), CO(), 'green', IN()]));
  
  if (params.rows > 6) {
    bricks.push(...createBrickRow(6, [CH('gold'), CH('gold'), CH('gold'), CH('gold'), CH('gold'), CH('gold')]));
  }
  
  return bricks;
};

// Get pattern type for level
const getPatternType = (level: number): PatternType => {
  // Boss levels every 25 levels
  if (level % 25 === 0) return 'boss';
  
  const patterns: PatternType[] = ['rows', 'pyramid', 'checker', 'diamond', 'fortress', 'wave', 'cross', 'zigzag', 'random'];
  return patterns[(level + Math.floor(level / 10)) % patterns.length];
};

// Generate a single level
export const generateLevel = (level: number): LevelConfig => {
  const params = getDifficultyParams(level);
  const pattern = getPatternType(level);
  const theme = getTheme(level);
  const name = getLevelName(level, pattern);
  
  let bricks: LevelConfig['bricks'];
  
  switch (pattern) {
    case 'rows': bricks = generateRowPattern(level, params); break;
    case 'pyramid': bricks = generatePyramidPattern(level, params); break;
    case 'checker': bricks = generateCheckerPattern(level, params); break;
    case 'diamond': bricks = generateDiamondPattern(level, params); break;
    case 'fortress': bricks = generateFortressPattern(level, params); break;
    case 'wave': bricks = generateWavePattern(level, params); break;
    case 'cross': bricks = generateCrossPattern(level, params); break;
    case 'zigzag': bricks = generateZigzagPattern(level, params); break;
    case 'random': bricks = generateRandomPattern(level, params); break;
    case 'boss': bricks = generateBossPattern(level, params); break;
    default: bricks = generateRowPattern(level, params);
  }
  
  return {
    name,
    ballSpeed: Math.round(params.ballSpeed),
    theme,
    bricks,
  };
};

// Generate all 500 levels
export const generateAllLevels = (): LevelConfig[] => {
  const levels: LevelConfig[] = [];
  for (let i = 1; i <= 500; i++) {
    levels.push(generateLevel(i));
  }
  return levels;
};
