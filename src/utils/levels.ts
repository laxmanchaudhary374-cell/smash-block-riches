import { LevelConfig, BrickColor, BrickType } from '@/types/game';

const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 25;
const BRICK_PADDING = 4;
const GAME_WIDTH = 400;

interface BrickDef {
  color: BrickColor;
  hits?: number;
  type?: BrickType;
  moveSpeed?: number;
  moveRange?: number;
}

const createBrickRow = (
  row: number,
  pattern: (BrickDef | BrickColor | null)[],
  defaultHits: number = 1
) => {
  const bricks: LevelConfig['bricks'] = [];
  const startX = (GAME_WIDTH - (pattern.length * (BRICK_WIDTH + BRICK_PADDING))) / 2;
  
  pattern.forEach((item, col) => {
    if (item) {
      const def: BrickDef = typeof item === 'string' ? { color: item } : item;
      const hits = def.type === 'indestructible' ? 999 : (def.hits ?? defaultHits);
      
      bricks.push({
        x: startX + col * (BRICK_WIDTH + BRICK_PADDING),
        y: 60 + row * (BRICK_HEIGHT + BRICK_PADDING),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        hits,
        maxHits: hits,
        color: def.color,
        type: def.type || 'normal',
        moveSpeed: def.moveSpeed,
        moveRange: def.moveRange,
        originalX: startX + col * (BRICK_WIDTH + BRICK_PADDING),
      });
    }
  });
  
  return bricks;
};

// Helper to create brick definitions
const B = (color: BrickColor, hits?: number): BrickDef => ({ color, hits });
const EX = (color: BrickColor): BrickDef => ({ color, type: 'explosive', hits: 1 });
const IN = (): BrickDef => ({ color: 'purple', type: 'indestructible' });
const MV = (color: BrickColor, speed = 60, range = 30): BrickDef => ({ 
  color, type: 'moving', hits: 1, moveSpeed: speed, moveRange: range 
});
const CH = (color: BrickColor): BrickDef => ({ color, type: 'chain', hits: 1 });
const CO = (): BrickDef => ({ color: 'gold', type: 'coin', hits: 1 });
const RB = (): BrickDef => ({ color: 'magenta', type: 'rainbow', hits: 1 });
const GH = (color: BrickColor): BrickDef => ({ color, type: 'ghost', hits: 1 });

export const levels: LevelConfig[] = [
  // Level 1: Introduction
  {
    name: "INITIATION",
    ballSpeed: 280,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 2: First Explosives
  {
    name: "KABOOM",
    ballSpeed: 290,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', EX('red'), EX('red'), 'cyan', 'cyan']),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, ['yellow', EX('red'), 'yellow', 'yellow', EX('red'), 'yellow']),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 3: The Fortress
  {
    name: "FORTRESS",
    ballSpeed: 300,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), 'purple', 'purple', 'purple', 'purple', IN()]),
      ...createBrickRow(1, ['cyan', null, EX('red'), EX('red'), null, 'cyan']),
      ...createBrickRow(2, ['cyan', 'magenta', 'magenta', 'magenta', 'magenta', 'cyan']),
      ...createBrickRow(3, [IN(), null, null, null, null, IN()]),
      ...createBrickRow(4, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 4: Moving Targets
  {
    name: "MOVERS",
    ballSpeed: 310,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 80, 40), null, MV('cyan', 60, 30), null, MV('cyan', 80, 40), null]),
      ...createBrickRow(1, [null, MV('magenta', 70, 35), null, MV('magenta', 70, 35), null, MV('magenta', 70, 35)]),
      ...createBrickRow(2, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
      ...createBrickRow(3, [null, EX('red'), null, null, EX('red'), null]),
      ...createBrickRow(4, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 5: Chain Reaction
  {
    name: "CHAIN GANG",
    ballSpeed: 320,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
      ...createBrickRow(1, ['cyan', null, null, null, null, 'cyan']),
      ...createBrickRow(2, [CH('orange'), null, EX('red'), EX('red'), null, CH('orange')]),
      ...createBrickRow(3, [CH('orange'), null, null, null, null, CH('orange')]),
      ...createBrickRow(4, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
    ],
  },
  // Level 6: Gold Rush
  {
    name: "GOLD RUSH",
    ballSpeed: 330,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CO(), 'cyan', CO(), CO(), 'cyan', CO()]),
      ...createBrickRow(1, ['magenta', CO(), 'magenta', 'magenta', CO(), 'magenta']),
      ...createBrickRow(2, [CO(), 'yellow', EX('red'), EX('red'), 'yellow', CO()]),
      ...createBrickRow(3, ['green', CO(), 'green', 'green', CO(), 'green']),
      ...createBrickRow(4, [CO(), 'orange', CO(), CO(), 'orange', CO()]),
    ],
  },
  // Level 7: The Maze
  {
    name: "LABYRINTH",
    ballSpeed: 340,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), 'cyan', 'cyan', 'cyan', 'cyan', IN()]),
      ...createBrickRow(1, [IN(), null, null, null, null, IN()]),
      ...createBrickRow(2, [IN(), null, EX('red'), EX('red'), null, IN()]),
      ...createBrickRow(3, [IN(), null, 'magenta', 'magenta', null, IN()]),
      ...createBrickRow(4, [IN(), null, null, null, null, IN()]),
      ...createBrickRow(5, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 8: Ultimate Challenge
  {
    name: "ULTIMATUM",
    ballSpeed: 350,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), MV('purple', 90, 45), EX('red'), EX('red'), MV('purple', 90, 45), IN()]),
      ...createBrickRow(1, [CH('cyan'), CH('cyan'), null, null, CH('cyan'), CH('cyan')]),
      ...createBrickRow(2, [CO(), B('magenta', 2), B('magenta', 3), B('magenta', 3), B('magenta', 2), CO()]),
      ...createBrickRow(3, [CH('yellow'), null, IN(), IN(), null, CH('yellow')]),
      ...createBrickRow(4, [MV('green', 70, 35), 'green', EX('red'), EX('red'), 'green', MV('green', 70, 35)]),
      ...createBrickRow(5, [CO(), 'orange', 'orange', 'orange', 'orange', CO()]),
    ],
  },
  // Level 9: Rainbow Road
  {
    name: "SPECTRUM",
    ballSpeed: 360,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [RB(), 'cyan', 'cyan', 'cyan', 'cyan', RB()]),
      ...createBrickRow(1, ['magenta', RB(), 'magenta', 'magenta', RB(), 'magenta']),
      ...createBrickRow(2, ['yellow', 'yellow', RB(), RB(), 'yellow', 'yellow']),
      ...createBrickRow(3, [EX('red'), 'green', 'green', 'green', 'green', EX('red')]),
      ...createBrickRow(4, ['orange', RB(), 'orange', 'orange', RB(), 'orange']),
      ...createBrickRow(5, [RB(), 'purple', 'purple', 'purple', 'purple', RB()]),
    ],
  },
  // Level 10: Final Boss
  {
    name: "APOCALYPSE",
    ballSpeed: 380,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), B('red', 3), B('red', 3), B('red', 3), B('red', 3), IN()]),
      ...createBrickRow(1, [MV('purple', 100, 50), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('purple', 100, 50)]),
      ...createBrickRow(2, [IN(), B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2), IN()]),
      ...createBrickRow(3, [CO(), CH('yellow'), null, null, CH('yellow'), CO()]),
      ...createBrickRow(4, [MV('cyan', 80, 40), B('cyan', 2), EX('red'), EX('red'), B('cyan', 2), MV('cyan', 80, 40)]),
      ...createBrickRow(5, [IN(), 'green', CO(), CO(), 'green', IN()]),
      ...createBrickRow(6, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 11: Ghost Zone
  {
    name: "PHANTOM",
    ballSpeed: 390,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), 'cyan', GH('cyan'), GH('cyan'), 'cyan', GH('cyan')]),
      ...createBrickRow(1, ['magenta', GH('magenta'), 'magenta', 'magenta', GH('magenta'), 'magenta']),
      ...createBrickRow(2, [GH('yellow'), 'yellow', EX('red'), EX('red'), 'yellow', GH('yellow')]),
      ...createBrickRow(3, ['green', GH('green'), 'green', 'green', GH('green'), 'green']),
      ...createBrickRow(4, [GH('orange'), 'orange', GH('orange'), GH('orange'), 'orange', GH('orange')]),
    ],
  },
  // Level 12: The Gauntlet
  {
    name: "GAUNTLET",
    ballSpeed: 400,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), EX('red'), EX('red'), IN(), IN()]),
      ...createBrickRow(1, [MV('cyan', 100, 50), null, B('purple', 3), B('purple', 3), null, MV('cyan', 100, 50)]),
      ...createBrickRow(2, [CH('yellow'), CH('yellow'), null, null, CH('yellow'), CH('yellow')]),
      ...createBrickRow(3, [CO(), B('magenta', 2), IN(), IN(), B('magenta', 2), CO()]),
      ...createBrickRow(4, [MV('green', 90, 45), null, EX('red'), EX('red'), null, MV('green', 90, 45)]),
      ...createBrickRow(5, [RB(), 'orange', 'orange', 'orange', 'orange', RB()]),
      ...createBrickRow(6, [CO(), CO(), RB(), RB(), CO(), CO()]),
    ],
  },
];

export const getTotalLevels = () => levels.length;
