import { LevelConfig } from '@/types/game';
import { createBrickRow, createPyramid, createCheckerboard, B, EX, IN, MV, CH, CO, RB, GH } from './levelPatterns';

export const levels26to50: LevelConfig[] = [
  // Level 26: Speed Zone
  {
    name: "SPEED ZONE",
    ballSpeed: 405,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 100, 50), MV('cyan', 110, 50), MV('cyan', 120, 50), MV('cyan', 110, 50), MV('cyan', 100, 50), null]),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, [null, MV('yellow', 100, 50), MV('yellow', 110, 50), MV('yellow', 120, 50), MV('yellow', 110, 50), MV('yellow', 100, 50)]),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 27: Ghost House
  {
    name: "GHOST HOUSE",
    ballSpeed: 410,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), 'magenta', GH('magenta'), GH('magenta'), 'magenta', GH('magenta')]),
      ...createBrickRow(2, [GH('yellow'), GH('yellow'), 'yellow', 'yellow', GH('yellow'), GH('yellow')]),
      ...createBrickRow(3, [GH('green'), 'green', 'green', 'green', 'green', GH('green')]),
      ...createBrickRow(4, [EX('red'), GH('orange'), GH('orange'), GH('orange'), GH('orange'), EX('red')]),
    ],
  },
  // Level 28: Coin Heaven
  {
    name: "COIN HEAVEN",
    ballSpeed: 415,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CO(), CO(), CO(), CO(), CO(), CO()]),
      ...createBrickRow(1, ['gold', CO(), 'gold', 'gold', CO(), 'gold']),
      ...createBrickRow(2, [CO(), 'gold', CO(), CO(), 'gold', CO()]),
      ...createBrickRow(3, ['gold', CO(), 'gold', 'gold', CO(), 'gold']),
      ...createBrickRow(4, [CO(), CO(), CO(), CO(), CO(), CO()]),
    ],
  },
  // Level 29: X Marks
  {
    name: "X MARKS",
    ballSpeed: 420,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, ['cyan', null, null, null, null, 'cyan']),
      ...createBrickRow(1, [null, 'magenta', null, null, 'magenta', null]),
      ...createBrickRow(2, [null, null, 'yellow', 'yellow', null, null]),
      ...createBrickRow(3, [null, 'magenta', null, null, 'magenta', null]),
      ...createBrickRow(4, ['cyan', null, null, null, null, 'cyan']),
    ],
  },
  // Level 30: Bomb Field
  {
    name: "BOMB FIELD",
    ballSpeed: 425,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [EX('red'), 'cyan', EX('red'), 'cyan', EX('red'), 'cyan']),
      ...createBrickRow(1, ['magenta', EX('red'), 'magenta', EX('red'), 'magenta', EX('red')]),
      ...createBrickRow(2, [EX('red'), 'yellow', EX('red'), 'yellow', EX('red'), 'yellow']),
      ...createBrickRow(3, ['green', EX('red'), 'green', EX('red'), 'green', EX('red')]),
    ],
  },
  // Level 31: Fort Knox
  {
    name: "FORT KNOX",
    ballSpeed: 430,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), 'gold', 'gold', IN(), IN()]),
      ...createBrickRow(1, [IN(), CO(), CO(), CO(), CO(), IN()]),
      ...createBrickRow(2, ['gold', CO(), B('gold', 3), B('gold', 3), CO(), 'gold']),
      ...createBrickRow(3, [IN(), CO(), CO(), CO(), CO(), IN()]),
      ...createBrickRow(4, [IN(), IN(), 'gold', 'gold', IN(), IN()]),
    ],
  },
  // Level 32: Chain Lightning
  {
    name: "CHAIN LIGHTNING",
    ballSpeed: 435,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [CH('cyan'), CH('cyan'), CH('cyan'), CH('cyan'), CH('cyan'), CH('cyan')]),
      ...createBrickRow(1, [null, CH('magenta'), CH('magenta'), CH('magenta'), CH('magenta'), null]),
      ...createBrickRow(2, [null, null, CH('yellow'), CH('yellow'), null, null]),
      ...createBrickRow(3, [null, CH('magenta'), CH('magenta'), CH('magenta'), CH('magenta'), null]),
      ...createBrickRow(4, [CH('cyan'), CH('cyan'), CH('cyan'), CH('cyan'), CH('cyan'), CH('cyan')]),
    ],
  },
  // Level 33: Rainbow Bridge
  {
    name: "RAINBOW BRIDGE",
    ballSpeed: 440,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [RB(), null, null, null, null, RB()]),
      ...createBrickRow(1, [RB(), RB(), null, null, RB(), RB()]),
      ...createBrickRow(2, ['magenta', RB(), RB(), RB(), RB(), 'magenta']),
      ...createBrickRow(3, [RB(), RB(), null, null, RB(), RB()]),
      ...createBrickRow(4, [RB(), null, null, null, null, RB()]),
    ],
  },
  // Level 34: Spiral
  {
    name: "SPIRAL",
    ballSpeed: 445,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', null]),
      ...createBrickRow(1, [null, null, null, null, 'magenta', null]),
      ...createBrickRow(2, ['yellow', 'yellow', 'yellow', null, 'magenta', null]),
      ...createBrickRow(3, ['yellow', null, null, null, 'magenta', null]),
      ...createBrickRow(4, ['yellow', 'green', 'green', 'green', 'green', null]),
    ],
  },
  // Level 35: Double Diamond
  {
    name: "DOUBLE DIAMOND",
    ballSpeed: 450,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [null, 'cyan', null, null, 'cyan', null]),
      ...createBrickRow(1, ['cyan', 'magenta', 'cyan', 'cyan', 'magenta', 'cyan']),
      ...createBrickRow(2, [null, 'cyan', null, null, 'cyan', null]),
      ...createBrickRow(3, [EX('red'), null, EX('red'), EX('red'), null, EX('red')]),
    ],
  },
  // Level 36: Castle
  {
    name: "CASTLE",
    ballSpeed: 455,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [B('purple', 2), null, B('purple', 2), B('purple', 2), null, B('purple', 2)]),
      ...createBrickRow(1, [B('purple', 2), null, B('purple', 2), B('purple', 2), null, B('purple', 2)]),
      ...createBrickRow(2, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(3, [IN(), 'gold', null, null, 'gold', IN()]),
      ...createBrickRow(4, [IN(), 'gold', 'gold', 'gold', 'gold', IN()]),
    ],
  },
  // Level 37: Checkerboard Pro
  {
    name: "CHECKERS PRO",
    ballSpeed: 460,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [B('cyan', 2), null, B('cyan', 2), null, B('cyan', 2), null]),
      ...createBrickRow(1, [null, B('magenta', 2), null, B('magenta', 2), null, B('magenta', 2)]),
      ...createBrickRow(2, [B('cyan', 2), null, EX('red'), null, B('cyan', 2), null]),
      ...createBrickRow(3, [null, B('magenta', 2), null, B('magenta', 2), null, B('magenta', 2)]),
      ...createBrickRow(4, [B('cyan', 2), null, B('cyan', 2), null, B('cyan', 2), null]),
    ],
  },
  // Level 38: Moving Maze
  {
    name: "MOVING MAZE",
    ballSpeed: 465,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), MV('cyan', 80), null, null, MV('cyan', 80), IN()]),
      ...createBrickRow(1, [null, IN(), MV('magenta', 70), MV('magenta', 70), IN(), null]),
      ...createBrickRow(2, [MV('yellow', 90), null, IN(), IN(), null, MV('yellow', 90)]),
      ...createBrickRow(3, ['green', 'green', null, null, 'green', 'green']),
      ...createBrickRow(4, ['orange', 'orange', 'orange', 'orange', 'orange', 'orange']),
    ],
  },
  // Level 39: Ghost Parade
  {
    name: "GHOST PARADE",
    ballSpeed: 470,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('magenta'), GH('yellow'), GH('green'), GH('orange'), GH('purple')]),
      ...createBrickRow(1, [GH('purple'), GH('cyan'), GH('magenta'), GH('yellow'), GH('green'), GH('orange')]),
      ...createBrickRow(2, [GH('orange'), GH('purple'), GH('cyan'), GH('magenta'), GH('yellow'), GH('green')]),
      ...createBrickRow(3, ['cyan', 'magenta', 'yellow', 'green', 'orange', 'purple']),
    ],
  },
  // Level 40: Ring of Fire
  {
    name: "RING OF FIRE",
    ballSpeed: 475,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [EX('red'), EX('red'), EX('red'), EX('red'), EX('red'), EX('red')]),
      ...createBrickRow(1, [EX('red'), 'orange', 'orange', 'orange', 'orange', EX('red')]),
      ...createBrickRow(2, [EX('red'), 'orange', 'yellow', 'yellow', 'orange', EX('red')]),
      ...createBrickRow(3, [EX('red'), 'orange', 'orange', 'orange', 'orange', EX('red')]),
      ...createBrickRow(4, [EX('red'), EX('red'), EX('red'), EX('red'), EX('red'), EX('red')]),
    ],
  },
  // Level 41: Tri-Force
  {
    name: "TRI-FORCE",
    ballSpeed: 480,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [null, null, B('gold', 2), B('gold', 2), null, null]),
      ...createBrickRow(1, [null, B('gold', 2), CO(), CO(), B('gold', 2), null]),
      ...createBrickRow(2, [B('gold', 2), CO(), B('gold', 2), B('gold', 2), CO(), B('gold', 2)]),
    ],
  },
  // Level 42: Binary
  {
    name: "BINARY",
    ballSpeed: 485,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, ['cyan', null, 'cyan', 'cyan', null, null]),
      ...createBrickRow(1, [null, 'cyan', null, null, 'cyan', null]),
      ...createBrickRow(2, ['cyan', 'cyan', null, 'cyan', null, 'cyan']),
      ...createBrickRow(3, [null, null, 'cyan', null, 'cyan', 'cyan']),
    ],
  },
  // Level 43: Chain Storm
  {
    name: "CHAIN STORM",
    ballSpeed: 490,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [CH('cyan'), 'magenta', CH('cyan'), CH('cyan'), 'magenta', CH('cyan')]),
      ...createBrickRow(1, ['magenta', CH('yellow'), 'magenta', 'magenta', CH('yellow'), 'magenta']),
      ...createBrickRow(2, [CH('cyan'), 'magenta', EX('red'), EX('red'), 'magenta', CH('cyan')]),
      ...createBrickRow(3, ['magenta', CH('yellow'), 'magenta', 'magenta', CH('yellow'), 'magenta']),
      ...createBrickRow(4, [CH('cyan'), 'magenta', CH('cyan'), CH('cyan'), 'magenta', CH('cyan')]),
    ],
  },
  // Level 44: Stairs
  {
    name: "STAIRS",
    ballSpeed: 495,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, ['cyan', null, null, null, null, null]),
      ...createBrickRow(1, ['cyan', 'magenta', null, null, null, null]),
      ...createBrickRow(2, ['cyan', 'magenta', 'yellow', null, null, null]),
      ...createBrickRow(3, ['cyan', 'magenta', 'yellow', 'green', null, null]),
      ...createBrickRow(4, ['cyan', 'magenta', 'yellow', 'green', 'orange', null]),
      ...createBrickRow(5, ['cyan', 'magenta', 'yellow', 'green', 'orange', 'purple']),
    ],
  },
  // Level 45: Heart
  {
    name: "HEART",
    ballSpeed: 500,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [null, 'magenta', null, null, 'magenta', null]),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(3, [null, 'magenta', 'magenta', 'magenta', 'magenta', null]),
      ...createBrickRow(4, [null, null, 'magenta', 'magenta', null, null]),
    ],
  },
  // Level 46: Fortress 2
  {
    name: "FORTRESS II",
    ballSpeed: 505,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), B('purple', 3), B('purple', 3), IN(), IN()]),
      ...createBrickRow(1, [IN(), EX('red'), 'magenta', 'magenta', EX('red'), IN()]),
      ...createBrickRow(2, [B('purple', 2), 'magenta', 'yellow', 'yellow', 'magenta', B('purple', 2)]),
      ...createBrickRow(3, [IN(), EX('red'), 'magenta', 'magenta', EX('red'), IN()]),
      ...createBrickRow(4, [IN(), IN(), B('purple', 3), B('purple', 3), IN(), IN()]),
    ],
  },
  // Level 47: Wave
  {
    name: "WAVE",
    ballSpeed: 510,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, ['cyan', null, null, 'cyan', null, null]),
      ...createBrickRow(1, ['cyan', 'cyan', null, 'cyan', 'cyan', null]),
      ...createBrickRow(2, [null, 'cyan', 'cyan', null, 'cyan', 'cyan']),
      ...createBrickRow(3, [null, null, 'cyan', null, null, 'cyan']),
    ],
  },
  // Level 48: Mega Boom
  {
    name: "MEGA BOOM",
    ballSpeed: 515,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [EX('red'), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), EX('red')]),
      ...createBrickRow(1, [B('orange', 2), EX('red'), B('yellow', 2), B('yellow', 2), EX('red'), B('orange', 2)]),
      ...createBrickRow(2, [B('orange', 2), B('yellow', 2), EX('red'), EX('red'), B('yellow', 2), B('orange', 2)]),
      ...createBrickRow(3, [B('orange', 2), EX('red'), B('yellow', 2), B('yellow', 2), EX('red'), B('orange', 2)]),
      ...createBrickRow(4, [EX('red'), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), EX('red')]),
    ],
  },
  // Level 49: Pre-Boss
  {
    name: "PRE-BOSS",
    ballSpeed: 520,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), MV('purple', 100), B('red', 3), B('red', 3), MV('purple', 100), IN()]),
      ...createBrickRow(1, [MV('cyan', 80), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('cyan', 80)]),
      ...createBrickRow(2, [B('magenta', 3), CO(), GH('yellow'), GH('yellow'), CO(), B('magenta', 3)]),
      ...createBrickRow(3, [MV('cyan', 80), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('cyan', 80)]),
      ...createBrickRow(4, [IN(), MV('purple', 100), B('red', 3), B('red', 3), MV('purple', 100), IN()]),
    ],
  },
  // Level 50: Half Boss
  {
    name: "HALF BOSS",
    ballSpeed: 525,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), B('red', 4), B('red', 4), B('red', 4), B('red', 4), IN()]),
      ...createBrickRow(1, [IN(), B('red', 4), EX('red'), EX('red'), B('red', 4), IN()]),
      ...createBrickRow(2, [MV('purple', 120, 60), B('orange', 3), B('orange', 3), B('orange', 3), B('orange', 3), MV('purple', 120, 60)]),
      ...createBrickRow(3, [CH('yellow'), CH('yellow'), B('magenta', 2), B('magenta', 2), CH('yellow'), CH('yellow')]),
      ...createBrickRow(4, [CO(), CO(), GH('cyan'), GH('cyan'), CO(), CO()]),
      ...createBrickRow(5, ['green', RB(), 'green', 'green', RB(), 'green']),
      ...createBrickRow(6, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
];
