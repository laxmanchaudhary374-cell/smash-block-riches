import { LevelConfig } from '@/types/game';
import { createBrickRow, B, EX, IN, MV, CH, CO, RB, GH } from './levelPatterns';

export const levels51to75: LevelConfig[] = [
  // Level 51: Fresh Start
  {
    name: "FRESH START",
    ballSpeed: 530,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [RB(), RB(), RB(), RB(), RB(), RB()]),
      ...createBrickRow(1, ['cyan', 'magenta', 'yellow', 'green', 'orange', 'purple']),
      ...createBrickRow(2, ['purple', 'orange', 'green', 'yellow', 'magenta', 'cyan']),
      ...createBrickRow(3, [RB(), RB(), RB(), RB(), RB(), RB()]),
    ],
  },
  // Level 52: Speed Demon
  {
    name: "SPEED DEMON",
    ballSpeed: 535,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [MV('red', 130, 60), MV('red', 120, 55), MV('red', 110, 50), MV('red', 120, 55), MV('red', 130, 60), null]),
      ...createBrickRow(1, ['orange', 'orange', 'orange', 'orange', 'orange', 'orange']),
      ...createBrickRow(2, [MV('yellow', 140, 65), MV('yellow', 130, 60), MV('yellow', 120, 55), MV('yellow', 130, 60), MV('yellow', 140, 65), null]),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 53: Ghost Town
  {
    name: "GHOST TOWN",
    ballSpeed: 540,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), GH('magenta'), GH('magenta'), GH('magenta'), GH('magenta'), GH('magenta')]),
      ...createBrickRow(2, [GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow')]),
      ...createBrickRow(3, [GH('green'), GH('green'), GH('green'), GH('green'), GH('green'), GH('green')]),
      ...createBrickRow(4, [EX('red'), 'orange', 'orange', 'orange', 'orange', EX('red')]),
    ],
  },
  // Level 54: The Bank
  {
    name: "THE BANK",
    ballSpeed: 545,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), CO(), CO(), IN(), IN()]),
      ...createBrickRow(1, [IN(), CO(), CO(), CO(), CO(), IN()]),
      ...createBrickRow(2, [CO(), CO(), B('gold', 3), B('gold', 3), CO(), CO()]),
      ...createBrickRow(3, [IN(), CO(), CO(), CO(), CO(), IN()]),
      ...createBrickRow(4, [IN(), IN(), CO(), CO(), IN(), IN()]),
    ],
  },
  // Level 55: Arrow
  {
    name: "ARROW",
    ballSpeed: 550,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [null, null, 'cyan', 'cyan', null, null]),
      ...createBrickRow(1, [null, 'cyan', 'cyan', 'cyan', 'cyan', null]),
      ...createBrickRow(2, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
      ...createBrickRow(3, [null, null, 'magenta', 'magenta', null, null]),
      ...createBrickRow(4, [null, null, 'magenta', 'magenta', null, null]),
      ...createBrickRow(5, [null, null, 'magenta', 'magenta', null, null]),
    ],
  },
  // Level 56: Explosion Chain
  {
    name: "EXPLOSION CHAIN",
    ballSpeed: 555,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, ['cyan', EX('red'), 'cyan', 'cyan', EX('red'), 'cyan']),
      ...createBrickRow(1, [EX('red'), CH('orange'), EX('red'), EX('red'), CH('orange'), EX('red')]),
      ...createBrickRow(2, ['yellow', EX('red'), CH('orange'), CH('orange'), EX('red'), 'yellow']),
      ...createBrickRow(3, [EX('red'), CH('orange'), EX('red'), EX('red'), CH('orange'), EX('red')]),
      ...createBrickRow(4, ['cyan', EX('red'), 'cyan', 'cyan', EX('red'), 'cyan']),
    ],
  },
  // Level 57: Bunker
  {
    name: "BUNKER",
    ballSpeed: 560,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(1, [IN(), B('purple', 3), B('purple', 3), B('purple', 3), B('purple', 3), IN()]),
      ...createBrickRow(2, [IN(), 'magenta', EX('red'), EX('red'), 'magenta', IN()]),
      ...createBrickRow(3, [null, null, 'yellow', 'yellow', null, null]),
      ...createBrickRow(4, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 58: Zigzag
  {
    name: "ZIGZAG",
    ballSpeed: 565,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', null, null, null, null]),
      ...createBrickRow(1, [null, null, 'magenta', 'magenta', null, null]),
      ...createBrickRow(2, [null, null, null, null, 'yellow', 'yellow']),
      ...createBrickRow(3, [null, null, 'green', 'green', null, null]),
      ...createBrickRow(4, ['orange', 'orange', null, null, null, null]),
    ],
  },
  // Level 59: Moving Target
  {
    name: "MOVING TARGET",
    ballSpeed: 570,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [null, MV('cyan', 100), null, null, MV('cyan', 100), null]),
      ...createBrickRow(1, [MV('magenta', 90), null, MV('magenta', 90), MV('magenta', 90), null, MV('magenta', 90)]),
      ...createBrickRow(2, [null, MV('yellow', 80), null, null, MV('yellow', 80), null]),
      ...createBrickRow(3, [MV('green', 70), null, MV('green', 70), MV('green', 70), null, MV('green', 70)]),
      ...createBrickRow(4, ['orange', 'orange', 'orange', 'orange', 'orange', 'orange']),
    ],
  },
  // Level 60: Diamond Core
  {
    name: "DIAMOND CORE",
    ballSpeed: 575,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [null, null, B('gold', 2), B('gold', 2), null, null]),
      ...createBrickRow(1, [null, B('gold', 2), CO(), CO(), B('gold', 2), null]),
      ...createBrickRow(2, [B('gold', 2), CO(), B('gold', 3), B('gold', 3), CO(), B('gold', 2)]),
      ...createBrickRow(3, [null, B('gold', 2), CO(), CO(), B('gold', 2), null]),
      ...createBrickRow(4, [null, null, B('gold', 2), B('gold', 2), null, null]),
    ],
  },
  // Level 61: Phantom Zone
  {
    name: "PHANTOM ZONE",
    ballSpeed: 580,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), 'cyan', GH('cyan'), 'cyan', GH('cyan'), 'cyan']),
      ...createBrickRow(1, ['magenta', GH('magenta'), 'magenta', GH('magenta'), 'magenta', GH('magenta')]),
      ...createBrickRow(2, [GH('yellow'), 'yellow', EX('red'), EX('red'), 'yellow', GH('yellow')]),
      ...createBrickRow(3, ['green', GH('green'), 'green', GH('green'), 'green', GH('green')]),
      ...createBrickRow(4, [GH('orange'), 'orange', GH('orange'), 'orange', GH('orange'), 'orange']),
    ],
  },
  // Level 62: Chain Master
  {
    name: "CHAIN MASTER",
    ballSpeed: 585,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), CH('yellow'), null, null, CH('yellow'), CH('yellow')]),
      ...createBrickRow(1, [CH('yellow'), null, CH('orange'), CH('orange'), null, CH('yellow')]),
      ...createBrickRow(2, [null, CH('orange'), CH('red'), CH('red'), CH('orange'), null]),
      ...createBrickRow(3, [CH('yellow'), null, CH('orange'), CH('orange'), null, CH('yellow')]),
      ...createBrickRow(4, [CH('yellow'), CH('yellow'), null, null, CH('yellow'), CH('yellow')]),
    ],
  },
  // Level 63: Cross Fire
  {
    name: "CROSS FIRE",
    ballSpeed: 590,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [EX('red'), null, null, null, null, EX('red')]),
      ...createBrickRow(1, [null, EX('red'), null, null, EX('red'), null]),
      ...createBrickRow(2, [null, null, 'orange', 'orange', null, null]),
      ...createBrickRow(3, [null, EX('red'), null, null, EX('red'), null]),
      ...createBrickRow(4, [EX('red'), null, null, null, null, EX('red')]),
    ],
  },
  // Level 64: Treasure Box
  {
    name: "TREASURE BOX",
    ballSpeed: 595,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(1, [IN(), CO(), CO(), CO(), CO(), IN()]),
      ...createBrickRow(2, [IN(), CO(), RB(), RB(), CO(), IN()]),
      ...createBrickRow(3, [IN(), CO(), CO(), CO(), CO(), IN()]),
      ...createBrickRow(4, [null, 'gold', 'gold', 'gold', 'gold', null]),
    ],
  },
  // Level 65: Speed Rush
  {
    name: "SPEED RUSH",
    ballSpeed: 600,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 150, 70), MV('magenta', 140, 65), MV('yellow', 130, 60), MV('green', 120, 55), MV('orange', 110, 50), null]),
      ...createBrickRow(1, ['purple', 'purple', 'purple', 'purple', 'purple', 'purple']),
      ...createBrickRow(2, [MV('orange', 110, 50), MV('green', 120, 55), MV('yellow', 130, 60), MV('magenta', 140, 65), MV('cyan', 150, 70), null]),
      ...createBrickRow(3, ['red', 'red', 'red', 'red', 'red', 'red']),
    ],
  },
  // Level 66: Hexagon
  {
    name: "HEXAGON",
    ballSpeed: 605,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [null, 'cyan', 'cyan', 'cyan', 'cyan', null]),
      ...createBrickRow(1, ['magenta', 'magenta', null, null, 'magenta', 'magenta']),
      ...createBrickRow(2, ['yellow', null, null, null, null, 'yellow']),
      ...createBrickRow(3, ['magenta', 'magenta', null, null, 'magenta', 'magenta']),
      ...createBrickRow(4, [null, 'cyan', 'cyan', 'cyan', 'cyan', null]),
    ],
  },
  // Level 67: Mixed Master
  {
    name: "MIXED MASTER",
    ballSpeed: 610,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 100), CH('yellow'), EX('red'), GH('magenta'), CO(), RB()]),
      ...createBrickRow(1, [RB(), CO(), GH('magenta'), EX('red'), CH('yellow'), MV('cyan', 100)]),
      ...createBrickRow(2, [B('purple', 2), B('purple', 2), B('purple', 2), B('purple', 2), B('purple', 2), B('purple', 2)]),
      ...createBrickRow(3, [MV('green', 90), CH('orange'), EX('red'), GH('yellow'), CO(), RB()]),
    ],
  },
  // Level 68: Fortress Max
  {
    name: "FORTRESS MAX",
    ballSpeed: 615,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(1, [IN(), null, null, null, null, IN()]),
      ...createBrickRow(2, [IN(), null, B('purple', 3), B('purple', 3), null, IN()]),
      ...createBrickRow(3, [IN(), null, EX('red'), EX('red'), null, IN()]),
      ...createBrickRow(4, [IN(), null, null, null, null, IN()]),
      ...createBrickRow(5, ['cyan', 'magenta', 'yellow', 'green', 'orange', 'purple']),
    ],
  },
  // Level 69: Fire Ring
  {
    name: "FIRE RING",
    ballSpeed: 620,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [null, EX('red'), EX('red'), EX('red'), EX('red'), null]),
      ...createBrickRow(1, [EX('red'), 'orange', 'orange', 'orange', 'orange', EX('red')]),
      ...createBrickRow(2, [EX('red'), 'orange', null, null, 'orange', EX('red')]),
      ...createBrickRow(3, [EX('red'), 'orange', 'orange', 'orange', 'orange', EX('red')]),
      ...createBrickRow(4, [null, EX('red'), EX('red'), EX('red'), EX('red'), null]),
    ],
  },
  // Level 70: Chain Explosion
  {
    name: "CHAIN EXPLOSION",
    ballSpeed: 625,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), CH('yellow'), EX('red'), EX('red'), CH('yellow'), CH('yellow')]),
      ...createBrickRow(1, [CH('yellow'), EX('red'), CH('orange'), CH('orange'), EX('red'), CH('yellow')]),
      ...createBrickRow(2, [EX('red'), CH('orange'), B('red', 3), B('red', 3), CH('orange'), EX('red')]),
      ...createBrickRow(3, [CH('yellow'), EX('red'), CH('orange'), CH('orange'), EX('red'), CH('yellow')]),
      ...createBrickRow(4, [CH('yellow'), CH('yellow'), EX('red'), EX('red'), CH('yellow'), CH('yellow')]),
    ],
  },
  // Level 71: Ghost Maze
  {
    name: "GHOST MAZE",
    ballSpeed: 630,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), IN(), GH('cyan'), GH('cyan'), IN(), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), GH('magenta'), IN(), IN(), GH('magenta'), GH('magenta')]),
      ...createBrickRow(2, [IN(), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), IN()]),
      ...createBrickRow(3, [GH('green'), GH('green'), IN(), IN(), GH('green'), GH('green')]),
      ...createBrickRow(4, [GH('orange'), IN(), GH('orange'), GH('orange'), IN(), GH('orange')]),
    ],
  },
  // Level 72: Speed Master
  {
    name: "SPEED MASTER",
    ballSpeed: 635,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 160, 75), MV('cyan', 155, 73), MV('cyan', 150, 70), MV('cyan', 155, 73), MV('cyan', 160, 75), null]),
      ...createBrickRow(1, [MV('magenta', 150, 70), null, MV('magenta', 145, 68), null, MV('magenta', 150, 70), null]),
      ...createBrickRow(2, [MV('yellow', 140, 65), MV('yellow', 135, 63), null, MV('yellow', 135, 63), MV('yellow', 140, 65), null]),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 73: Coin Rush
  {
    name: "COIN RUSH",
    ballSpeed: 640,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CO(), CO(), CO(), CO(), CO(), CO()]),
      ...createBrickRow(1, [CO(), B('gold', 2), B('gold', 2), B('gold', 2), B('gold', 2), CO()]),
      ...createBrickRow(2, [CO(), B('gold', 2), CO(), CO(), B('gold', 2), CO()]),
      ...createBrickRow(3, [CO(), B('gold', 2), B('gold', 2), B('gold', 2), B('gold', 2), CO()]),
      ...createBrickRow(4, [CO(), CO(), CO(), CO(), CO(), CO()]),
    ],
  },
  // Level 74: Pre-Final
  {
    name: "PRE-FINAL",
    ballSpeed: 645,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), MV('purple', 120), B('red', 4), B('red', 4), MV('purple', 120), IN()]),
      ...createBrickRow(1, [MV('cyan', 100), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('cyan', 100)]),
      ...createBrickRow(2, [B('magenta', 3), GH('yellow'), CO(), CO(), GH('yellow'), B('magenta', 3)]),
      ...createBrickRow(3, [MV('cyan', 100), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('cyan', 100)]),
      ...createBrickRow(4, [IN(), MV('purple', 120), B('red', 4), B('red', 4), MV('purple', 120), IN()]),
      ...createBrickRow(5, [RB(), 'green', 'green', 'green', 'green', RB()]),
    ],
  },
  // Level 75: Three-Quarter Boss
  {
    name: "THREE-QUARTER BOSS",
    ballSpeed: 650,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), B('red', 5), B('red', 5), B('red', 5), B('red', 5), IN()]),
      ...createBrickRow(1, [IN(), B('red', 4), EX('red'), EX('red'), B('red', 4), IN()]),
      ...createBrickRow(2, [MV('purple', 140, 70), B('orange', 3), B('orange', 3), B('orange', 3), B('orange', 3), MV('purple', 140, 70)]),
      ...createBrickRow(3, [CH('yellow'), CH('yellow'), B('magenta', 2), B('magenta', 2), CH('yellow'), CH('yellow')]),
      ...createBrickRow(4, [CO(), GH('cyan'), CO(), CO(), GH('cyan'), CO()]),
      ...createBrickRow(5, [RB(), RB(), 'green', 'green', RB(), RB()]),
      ...createBrickRow(6, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
];
