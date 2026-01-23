import { LevelConfig, BrickColor } from '@/types/game';

const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 25;
const BRICK_PADDING = 4;
const GAME_WIDTH = 400;

const createBrickRow = (
  row: number,
  pattern: (BrickColor | null)[],
  hits: number = 1
) => {
  const bricks: LevelConfig['bricks'] = [];
  const startX = (GAME_WIDTH - (pattern.length * (BRICK_WIDTH + BRICK_PADDING))) / 2;
  
  pattern.forEach((color, col) => {
    if (color) {
      bricks.push({
        x: startX + col * (BRICK_WIDTH + BRICK_PADDING),
        y: 60 + row * (BRICK_HEIGHT + BRICK_PADDING),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        hits,
        maxHits: hits,
        color,
      });
    }
  });
  
  return bricks;
};

export const levels: LevelConfig[] = [
  // Level 1: Simple Introduction
  {
    name: "INITIATION",
    ballSpeed: 300,
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 2: Pyramid
  {
    name: "PYRAMID",
    ballSpeed: 320,
    bricks: [
      ...createBrickRow(0, [null, null, 'purple', 'purple', null, null], 2),
      ...createBrickRow(1, [null, 'cyan', 'cyan', 'cyan', 'cyan', null]),
      ...createBrickRow(2, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(3, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 3: Checkered
  {
    name: "MATRIX",
    ballSpeed: 340,
    bricks: [
      ...createBrickRow(0, ['cyan', null, 'cyan', null, 'cyan', null]),
      ...createBrickRow(1, [null, 'magenta', null, 'magenta', null, 'magenta']),
      ...createBrickRow(2, ['yellow', null, 'yellow', null, 'yellow', null]),
      ...createBrickRow(3, [null, 'green', null, 'green', null, 'green'], 2),
      ...createBrickRow(4, ['orange', null, 'orange', null, 'orange', null]),
    ],
  },
  // Level 4: Fortress
  {
    name: "FORTRESS",
    ballSpeed: 360,
    bricks: [
      ...createBrickRow(0, ['purple', 'purple', 'purple', 'purple', 'purple', 'purple'], 3),
      ...createBrickRow(1, ['cyan', null, null, null, null, 'cyan'], 2),
      ...createBrickRow(2, ['cyan', null, 'magenta', 'magenta', null, 'cyan'], 2),
      ...createBrickRow(3, ['cyan', null, null, null, null, 'cyan'], 2),
      ...createBrickRow(4, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 5: Diamond
  {
    name: "DIAMOND",
    ballSpeed: 380,
    bricks: [
      ...createBrickRow(0, [null, null, 'purple', 'purple', null, null], 3),
      ...createBrickRow(1, [null, 'cyan', 'cyan', 'cyan', 'cyan', null], 2),
      ...createBrickRow(2, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(3, [null, 'yellow', 'yellow', 'yellow', 'yellow', null], 2),
      ...createBrickRow(4, [null, null, 'green', 'green', null, null], 3),
    ],
  },
  // Level 6: Invaders
  {
    name: "INVADERS",
    ballSpeed: 400,
    bricks: [
      ...createBrickRow(0, [null, 'purple', null, null, 'purple', null], 2),
      ...createBrickRow(1, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
      ...createBrickRow(2, ['magenta', null, 'magenta', 'magenta', null, 'magenta'], 2),
      ...createBrickRow(3, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
      ...createBrickRow(4, [null, 'green', null, null, 'green', null]),
      ...createBrickRow(5, ['orange', null, null, null, null, 'orange'], 3),
    ],
  },
];

export const getTotalLevels = () => levels.length;
