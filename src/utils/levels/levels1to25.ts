import { LevelConfig } from '@/types/game';
import { createBrickRow, createPyramid, createCheckerboard, B, EX, IN, MV, CH, CO, RB, GH } from './levelPatterns';

export const levels1to25: LevelConfig[] = [
  // Level 1: Welcome
  {
    name: "WELCOME",
    ballSpeed: 280,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 2: Rainbow
  {
    name: "RAINBOW",
    ballSpeed: 285,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, ['red', 'red', 'red', 'red', 'red', 'red']),
      ...createBrickRow(1, ['orange', 'orange', 'orange', 'orange', 'orange', 'orange']),
      ...createBrickRow(2, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
      ...createBrickRow(4, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
    ],
  },
  // Level 3: First Boom
  {
    name: "FIRST BOOM",
    ballSpeed: 290,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', EX('red'), EX('red'), 'cyan', 'cyan']),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, ['yellow', EX('red'), 'yellow', 'yellow', EX('red'), 'yellow']),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 4: Walls
  {
    name: "WALLS",
    ballSpeed: 295,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), 'cyan', 'cyan', 'cyan', 'cyan', IN()]),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, [IN(), 'yellow', 'yellow', 'yellow', 'yellow', IN()]),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 5: Movers
  {
    name: "MOVERS",
    ballSpeed: 300,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 80, 40), null, MV('cyan', 60, 30), null, MV('cyan', 80, 40), null]),
      ...createBrickRow(1, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(2, [null, MV('yellow', 70, 35), null, MV('yellow', 70, 35), null, MV('yellow', 70, 35)]),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 6: Chain Gang
  {
    name: "CHAIN GANG",
    ballSpeed: 305,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
      ...createBrickRow(1, ['cyan', null, null, null, null, 'cyan']),
      ...createBrickRow(2, [CH('orange'), null, 'magenta', 'magenta', null, CH('orange')]),
      ...createBrickRow(3, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
    ],
  },
  // Level 7: Gold Rush
  {
    name: "GOLD RUSH",
    ballSpeed: 310,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CO(), 'cyan', CO(), CO(), 'cyan', CO()]),
      ...createBrickRow(1, ['magenta', CO(), 'magenta', 'magenta', CO(), 'magenta']),
      ...createBrickRow(2, [CO(), 'yellow', 'yellow', 'yellow', 'yellow', CO()]),
      ...createBrickRow(3, ['green', CO(), 'green', 'green', CO(), 'green']),
    ],
  },
  // Level 8: Ghosts
  {
    name: "PHANTOMS",
    ballSpeed: 315,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), 'cyan', GH('cyan'), GH('cyan'), 'cyan', GH('cyan')]),
      ...createBrickRow(1, ['magenta', GH('magenta'), 'magenta', 'magenta', GH('magenta'), 'magenta']),
      ...createBrickRow(2, [GH('yellow'), 'yellow', 'yellow', 'yellow', 'yellow', GH('yellow')]),
      ...createBrickRow(3, ['green', 'green', GH('green'), GH('green'), 'green', 'green']),
    ],
  },
  // Level 9: Pyramid
  {
    name: "PYRAMID",
    ballSpeed: 320,
    theme: 'gold',
    bricks: [
      ...createPyramid(0, 6, 'gold'),
    ],
  },
  // Level 10: Checkers
  {
    name: "CHECKERS",
    ballSpeed: 325,
    theme: 'neon',
    bricks: [
      ...createCheckerboard(0, 5, 6, 'cyan', 'magenta'),
    ],
  },
  // Level 11: Fortress
  {
    name: "FORTRESS",
    ballSpeed: 330,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), 'purple', 'purple', 'purple', 'purple', IN()]),
      ...createBrickRow(1, ['cyan', null, EX('red'), EX('red'), null, 'cyan']),
      ...createBrickRow(2, ['cyan', 'magenta', 'magenta', 'magenta', 'magenta', 'cyan']),
      ...createBrickRow(3, [IN(), null, null, null, null, IN()]),
      ...createBrickRow(4, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 12: Rainbow Road
  {
    name: "SPECTRUM",
    ballSpeed: 335,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [RB(), 'cyan', 'cyan', 'cyan', 'cyan', RB()]),
      ...createBrickRow(1, ['magenta', RB(), 'magenta', 'magenta', RB(), 'magenta']),
      ...createBrickRow(2, ['yellow', 'yellow', RB(), RB(), 'yellow', 'yellow']),
      ...createBrickRow(3, [RB(), 'green', 'green', 'green', 'green', RB()]),
    ],
  },
  // Level 13: Brick Wall
  {
    name: "BRICK WALL",
    ballSpeed: 340,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [B('red', 2), B('red', 2), B('red', 2), B('red', 2), B('red', 2), B('red', 2)]),
      ...createBrickRow(1, [B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2)]),
      ...createBrickRow(2, [B('yellow', 2), B('yellow', 2), B('yellow', 2), B('yellow', 2), B('yellow', 2), B('yellow', 2)]),
    ],
  },
  // Level 14: Striped
  {
    name: "STRIPES",
    ballSpeed: 345,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, ['cyan', null, 'cyan', null, 'cyan', null]),
      ...createBrickRow(1, [null, 'magenta', null, 'magenta', null, 'magenta']),
      ...createBrickRow(2, ['yellow', null, 'yellow', null, 'yellow', null]),
      ...createBrickRow(3, [null, 'green', null, 'green', null, 'green']),
      ...createBrickRow(4, ['orange', null, 'orange', null, 'orange', null]),
    ],
  },
  // Level 15: Cross
  {
    name: "CROSS",
    ballSpeed: 350,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [null, null, 'cyan', 'cyan', null, null]),
      ...createBrickRow(1, [null, null, 'cyan', 'cyan', null, null]),
      ...createBrickRow(2, ['magenta', 'magenta', 'magenta', 'magenta', 'magenta', 'magenta']),
      ...createBrickRow(3, [null, null, 'cyan', 'cyan', null, null]),
      ...createBrickRow(4, [null, null, 'cyan', 'cyan', null, null]),
    ],
  },
  // Level 16: Explosive Core
  {
    name: "CORE BREACH",
    ballSpeed: 355,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
      ...createBrickRow(1, ['cyan', EX('red'), 'magenta', 'magenta', EX('red'), 'cyan']),
      ...createBrickRow(2, ['cyan', 'magenta', EX('red'), EX('red'), 'magenta', 'cyan']),
      ...createBrickRow(3, ['cyan', 'magenta', EX('red'), EX('red'), 'magenta', 'cyan']),
      ...createBrickRow(4, ['cyan', EX('red'), 'magenta', 'magenta', EX('red'), 'cyan']),
      ...createBrickRow(5, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
    ],
  },
  // Level 17: Moving Walls
  {
    name: "MOVING WALLS",
    ballSpeed: 360,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 90, 45), 'magenta', 'magenta', 'magenta', 'magenta', MV('cyan', 90, 45)]),
      ...createBrickRow(1, ['yellow', MV('green', 70, 35), null, null, MV('green', 70, 35), 'yellow']),
      ...createBrickRow(2, ['yellow', null, MV('orange', 80, 40), MV('orange', 80, 40), null, 'yellow']),
      ...createBrickRow(3, ['yellow', MV('green', 70, 35), null, null, MV('green', 70, 35), 'yellow']),
      ...createBrickRow(4, [MV('cyan', 90, 45), 'magenta', 'magenta', 'magenta', 'magenta', MV('cyan', 90, 45)]),
    ],
  },
  // Level 18: Chain Reaction
  {
    name: "CHAIN REACTION",
    ballSpeed: 365,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), null, null, null, null, CH('yellow')]),
      ...createBrickRow(1, [CH('yellow'), CH('orange'), null, null, CH('orange'), CH('yellow')]),
      ...createBrickRow(2, [CH('yellow'), CH('orange'), CH('red'), CH('red'), CH('orange'), CH('yellow')]),
      ...createBrickRow(3, [CH('yellow'), CH('orange'), null, null, CH('orange'), CH('yellow')]),
      ...createBrickRow(4, [CH('yellow'), null, null, null, null, CH('yellow')]),
    ],
  },
  // Level 19: The Maze
  {
    name: "LABYRINTH",
    ballSpeed: 370,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), 'cyan', 'cyan', 'cyan', 'cyan', IN()]),
      ...createBrickRow(1, [IN(), null, IN(), null, null, IN()]),
      ...createBrickRow(2, [IN(), null, IN(), 'magenta', null, IN()]),
      ...createBrickRow(3, [IN(), null, null, 'magenta', null, IN()]),
      ...createBrickRow(4, [IN(), IN(), null, null, null, IN()]),
      ...createBrickRow(5, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 20: Boss Intro
  {
    name: "MINI BOSS",
    ballSpeed: 375,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [null, B('red', 3), B('red', 3), B('red', 3), B('red', 3), null]),
      ...createBrickRow(1, [B('red', 2), EX('red'), B('red', 2), B('red', 2), EX('red'), B('red', 2)]),
      ...createBrickRow(2, [B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2)]),
      ...createBrickRow(3, [null, 'yellow', 'yellow', 'yellow', 'yellow', null]),
      ...createBrickRow(4, [CO(), CO(), CO(), CO(), CO(), CO()]),
    ],
  },
  // Level 21: Diamond
  {
    name: "DIAMOND",
    ballSpeed: 380,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [null, null, 'cyan', 'cyan', null, null]),
      ...createBrickRow(1, [null, 'cyan', 'magenta', 'magenta', 'cyan', null]),
      ...createBrickRow(2, ['cyan', 'magenta', 'yellow', 'yellow', 'magenta', 'cyan']),
      ...createBrickRow(3, [null, 'cyan', 'magenta', 'magenta', 'cyan', null]),
      ...createBrickRow(4, [null, null, 'cyan', 'cyan', null, null]),
    ],
  },
  // Level 22: Inverted Pyramid
  {
    name: "INVERTED",
    ballSpeed: 385,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, ['gold', 'gold', 'gold', 'gold', 'gold', 'gold']),
      ...createBrickRow(1, [null, 'gold', 'gold', 'gold', 'gold', null]),
      ...createBrickRow(2, [null, null, 'gold', 'gold', null, null]),
    ],
  },
  // Level 23: Mixed Chaos
  {
    name: "CHAOS",
    ballSpeed: 390,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [EX('red'), CH('yellow'), MV('cyan', 60), GH('magenta'), RB(), CO()]),
      ...createBrickRow(1, [CO(), RB(), GH('magenta'), MV('cyan', 60), CH('yellow'), EX('red')]),
      ...createBrickRow(2, [MV('green', 70), EX('red'), CO(), RB(), GH('orange'), CH('yellow')]),
      ...createBrickRow(3, [CH('yellow'), GH('orange'), RB(), CO(), EX('red'), MV('green', 70)]),
    ],
  },
  // Level 24: Strong Wall
  {
    name: "IRON WALL",
    ballSpeed: 395,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [B('purple', 3), B('purple', 3), B('purple', 3), B('purple', 3), B('purple', 3), B('purple', 3)]),
      ...createBrickRow(1, [EX('red'), B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2), EX('red')]),
      ...createBrickRow(2, ['cyan', 'cyan', EX('red'), EX('red'), 'cyan', 'cyan']),
      ...createBrickRow(3, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
  // Level 25: Quarter Boss
  {
    name: "QUARTER BOSS",
    ballSpeed: 400,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), B('red', 4), B('red', 4), B('red', 4), B('red', 4), IN()]),
      ...createBrickRow(1, [MV('purple', 100), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('purple', 100)]),
      ...createBrickRow(2, [IN(), B('magenta', 3), B('magenta', 3), B('magenta', 3), B('magenta', 3), IN()]),
      ...createBrickRow(3, [CO(), CH('yellow'), null, null, CH('yellow'), CO()]),
      ...createBrickRow(4, [MV('cyan', 80), B('cyan', 2), EX('red'), EX('red'), B('cyan', 2), MV('cyan', 80)]),
      ...createBrickRow(5, [IN(), 'green', CO(), CO(), 'green', IN()]),
      ...createBrickRow(6, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
];
