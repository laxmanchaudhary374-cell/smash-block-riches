import { LevelConfig } from '@/types/game';
import { createBrickRow, B, EX, IN, MV, CH, CO, RB, GH } from './levelPatterns';

export const levels76to100: LevelConfig[] = [
  // Level 76: Endgame Start
  {
    name: "ENDGAME",
    ballSpeed: 655,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [B('cyan', 2), B('cyan', 2), B('cyan', 2), B('cyan', 2), B('cyan', 2), B('cyan', 2)]),
      ...createBrickRow(1, [B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2)]),
      ...createBrickRow(2, [B('yellow', 2), B('yellow', 2), B('yellow', 2), B('yellow', 2), B('yellow', 2), B('yellow', 2)]),
      ...createBrickRow(3, [B('green', 2), B('green', 2), B('green', 2), B('green', 2), B('green', 2), B('green', 2)]),
      ...createBrickRow(4, [B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2), B('orange', 2)]),
    ],
  },
  // Level 77: Lucky 77
  {
    name: "LUCKY 77",
    ballSpeed: 660,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CO(), CO(), CO(), CO(), CO(), CO()]),
      ...createBrickRow(1, [CO(), RB(), CO(), CO(), RB(), CO()]),
      ...createBrickRow(2, [CO(), CO(), B('gold', 3), B('gold', 3), CO(), CO()]),
      ...createBrickRow(3, [CO(), RB(), CO(), CO(), RB(), CO()]),
      ...createBrickRow(4, [CO(), CO(), CO(), CO(), CO(), CO()]),
    ],
  },
  // Level 78: Ghost Storm
  {
    name: "GHOST STORM",
    ballSpeed: 665,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), EX('red'), GH('magenta'), GH('magenta'), EX('red'), GH('magenta')]),
      ...createBrickRow(2, [GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow')]),
      ...createBrickRow(3, [GH('green'), EX('red'), GH('green'), GH('green'), EX('red'), GH('green')]),
      ...createBrickRow(4, [GH('orange'), GH('orange'), GH('orange'), GH('orange'), GH('orange'), GH('orange')]),
    ],
  },
  // Level 79: Maximum Chain
  {
    name: "MAXIMUM CHAIN",
    ballSpeed: 670,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
      ...createBrickRow(1, [CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange')]),
      ...createBrickRow(2, [CH('red'), CH('red'), EX('red'), EX('red'), CH('red'), CH('red')]),
      ...createBrickRow(3, [CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange')]),
      ...createBrickRow(4, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
    ],
  },
  // Level 80: Ultra Speed
  {
    name: "ULTRA SPEED",
    ballSpeed: 675,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 180, 85), MV('cyan', 170, 80), MV('cyan', 160, 75), MV('cyan', 170, 80), MV('cyan', 180, 85), null]),
      ...createBrickRow(1, [MV('magenta', 170, 80), MV('magenta', 160, 75), MV('magenta', 150, 70), MV('magenta', 160, 75), MV('magenta', 170, 80), null]),
      ...createBrickRow(2, [MV('yellow', 160, 75), MV('yellow', 150, 70), MV('yellow', 140, 65), MV('yellow', 150, 70), MV('yellow', 160, 75), null]),
      ...createBrickRow(3, ['green', 'green', 'green', 'green', 'green', 'green']),
    ],
  },
  // Level 81: Iron Prison
  {
    name: "IRON PRISON",
    ballSpeed: 680,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(1, [IN(), B('purple', 4), B('purple', 4), B('purple', 4), B('purple', 4), IN()]),
      ...createBrickRow(2, [IN(), B('magenta', 3), EX('red'), EX('red'), B('magenta', 3), IN()]),
      ...createBrickRow(3, [IN(), B('purple', 4), B('purple', 4), B('purple', 4), B('purple', 4), IN()]),
      ...createBrickRow(4, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
    ],
  },
  // Level 82: Rainbow Storm
  {
    name: "RAINBOW STORM",
    ballSpeed: 685,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [RB(), RB(), RB(), RB(), RB(), RB()]),
      ...createBrickRow(1, [RB(), 'magenta', 'magenta', 'magenta', 'magenta', RB()]),
      ...createBrickRow(2, [RB(), 'magenta', RB(), RB(), 'magenta', RB()]),
      ...createBrickRow(3, [RB(), 'magenta', 'magenta', 'magenta', 'magenta', RB()]),
      ...createBrickRow(4, [RB(), RB(), RB(), RB(), RB(), RB()]),
    ],
  },
  // Level 83: Bomb Rain
  {
    name: "BOMB RAIN",
    ballSpeed: 690,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [EX('red'), EX('red'), EX('red'), EX('red'), EX('red'), EX('red')]),
      ...createBrickRow(1, ['orange', EX('red'), 'orange', 'orange', EX('red'), 'orange']),
      ...createBrickRow(2, [EX('red'), 'yellow', EX('red'), EX('red'), 'yellow', EX('red')]),
      ...createBrickRow(3, ['green', EX('red'), 'green', 'green', EX('red'), 'green']),
      ...createBrickRow(4, [EX('red'), EX('red'), EX('red'), EX('red'), EX('red'), EX('red')]),
    ],
  },
  // Level 84: Mixed Fortress
  {
    name: "MIXED FORTRESS",
    ballSpeed: 695,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), MV('cyan', 120), CH('yellow'), CH('yellow'), MV('cyan', 120), IN()]),
      ...createBrickRow(1, [MV('magenta', 110), GH('purple'), EX('red'), EX('red'), GH('purple'), MV('magenta', 110)]),
      ...createBrickRow(2, [IN(), B('orange', 3), CO(), CO(), B('orange', 3), IN()]),
      ...createBrickRow(3, [MV('magenta', 110), GH('purple'), EX('red'), EX('red'), GH('purple'), MV('magenta', 110)]),
      ...createBrickRow(4, [IN(), MV('cyan', 120), CH('yellow'), CH('yellow'), MV('cyan', 120), IN()]),
    ],
  },
  // Level 85: Five Stars
  {
    name: "FIVE STARS",
    ballSpeed: 700,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [null, null, B('gold', 2), B('gold', 2), null, null]),
      ...createBrickRow(1, [B('gold', 2), B('gold', 2), B('gold', 2), B('gold', 2), B('gold', 2), B('gold', 2)]),
      ...createBrickRow(2, [null, B('gold', 2), B('gold', 2), B('gold', 2), B('gold', 2), null]),
      ...createBrickRow(3, [null, B('gold', 2), null, null, B('gold', 2), null]),
      ...createBrickRow(4, [B('gold', 2), null, null, null, null, B('gold', 2)]),
    ],
  },
  // Level 86: Nightmare
  {
    name: "NIGHTMARE",
    ballSpeed: 705,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('cyan'), IN(), IN(), GH('cyan'), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), IN(), GH('magenta'), GH('magenta'), IN(), GH('magenta')]),
      ...createBrickRow(2, [IN(), GH('yellow'), EX('red'), EX('red'), GH('yellow'), IN()]),
      ...createBrickRow(3, [GH('green'), IN(), GH('green'), GH('green'), IN(), GH('green')]),
      ...createBrickRow(4, [GH('orange'), GH('orange'), IN(), IN(), GH('orange'), GH('orange')]),
    ],
  },
  // Level 87: Chain Master Pro
  {
    name: "CHAIN MASTER PRO",
    ballSpeed: 710,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), null, CH('yellow'), CH('yellow'), null, CH('yellow')]),
      ...createBrickRow(1, [null, CH('orange'), CH('orange'), CH('orange'), CH('orange'), null]),
      ...createBrickRow(2, [CH('yellow'), CH('orange'), B('red', 3), B('red', 3), CH('orange'), CH('yellow')]),
      ...createBrickRow(3, [null, CH('orange'), CH('orange'), CH('orange'), CH('orange'), null]),
      ...createBrickRow(4, [CH('yellow'), null, CH('yellow'), CH('yellow'), null, CH('yellow')]),
    ],
  },
  // Level 88: Speed Freak
  {
    name: "SPEED FREAK",
    ballSpeed: 715,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 200, 95), MV('cyan', 190, 90), MV('cyan', 180, 85), MV('cyan', 190, 90), MV('cyan', 200, 95), null]),
      ...createBrickRow(1, [EX('red'), 'magenta', 'magenta', 'magenta', 'magenta', EX('red')]),
      ...createBrickRow(2, [MV('yellow', 190, 90), MV('yellow', 180, 85), MV('yellow', 170, 80), MV('yellow', 180, 85), MV('yellow', 190, 90), null]),
      ...createBrickRow(3, [EX('red'), 'green', 'green', 'green', 'green', EX('red')]),
    ],
  },
  // Level 89: Coin Jackpot
  {
    name: "COIN JACKPOT",
    ballSpeed: 720,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CO(), CO(), CO(), CO(), CO(), CO()]),
      ...createBrickRow(1, [CO(), CO(), CO(), CO(), CO(), CO()]),
      ...createBrickRow(2, [CO(), CO(), B('gold', 4), B('gold', 4), CO(), CO()]),
      ...createBrickRow(3, [CO(), CO(), CO(), CO(), CO(), CO()]),
      ...createBrickRow(4, [CO(), CO(), CO(), CO(), CO(), CO()]),
    ],
  },
  // Level 90: Almost There
  {
    name: "ALMOST THERE",
    ballSpeed: 725,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [B('red', 3), B('red', 3), B('red', 3), B('red', 3), B('red', 3), B('red', 3)]),
      ...createBrickRow(1, [EX('red'), B('orange', 2), EX('red'), EX('red'), B('orange', 2), EX('red')]),
      ...createBrickRow(2, [B('orange', 2), EX('red'), B('yellow', 2), B('yellow', 2), EX('red'), B('orange', 2)]),
      ...createBrickRow(3, [EX('red'), B('orange', 2), EX('red'), EX('red'), B('orange', 2), EX('red')]),
      ...createBrickRow(4, [B('red', 3), B('red', 3), B('red', 3), B('red', 3), B('red', 3), B('red', 3)]),
    ],
  },
  // Level 91: Ultra Ghost
  {
    name: "ULTRA GHOST",
    ballSpeed: 730,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), B('purple', 3), GH('magenta'), GH('magenta'), B('purple', 3), GH('magenta')]),
      ...createBrickRow(2, [GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow'), GH('yellow')]),
      ...createBrickRow(3, [GH('green'), B('purple', 3), GH('green'), GH('green'), B('purple', 3), GH('green')]),
      ...createBrickRow(4, [GH('orange'), GH('orange'), GH('orange'), GH('orange'), GH('orange'), GH('orange')]),
    ],
  },
  // Level 92: Maximum Chaos
  {
    name: "MAXIMUM CHAOS",
    ballSpeed: 735,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 150), CH('yellow'), EX('red'), GH('magenta'), CO(), RB()]),
      ...createBrickRow(1, [RB(), MV('orange', 140), CH('green'), EX('red'), GH('purple'), CO()]),
      ...createBrickRow(2, [CO(), RB(), MV('magenta', 130), CH('cyan'), EX('red'), GH('yellow')]),
      ...createBrickRow(3, [GH('green'), CO(), RB(), MV('yellow', 120), CH('orange'), EX('red')]),
      ...createBrickRow(4, [EX('red'), GH('cyan'), CO(), RB(), MV('purple', 110), CH('red')]),
    ],
  },
  // Level 93: Iron Core
  {
    name: "IRON CORE",
    ballSpeed: 740,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(1, [IN(), IN(), B('purple', 5), B('purple', 5), IN(), IN()]),
      ...createBrickRow(2, [IN(), B('purple', 4), EX('red'), EX('red'), B('purple', 4), IN()]),
      ...createBrickRow(3, [IN(), IN(), B('purple', 5), B('purple', 5), IN(), IN()]),
      ...createBrickRow(4, ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']),
    ],
  },
  // Level 94: Rainbow Finale
  {
    name: "RAINBOW FINALE",
    ballSpeed: 745,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [RB(), RB(), RB(), RB(), RB(), RB()]),
      ...createBrickRow(1, [RB(), B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2), RB()]),
      ...createBrickRow(2, [RB(), B('magenta', 2), RB(), RB(), B('magenta', 2), RB()]),
      ...createBrickRow(3, [RB(), B('magenta', 2), B('magenta', 2), B('magenta', 2), B('magenta', 2), RB()]),
      ...createBrickRow(4, [RB(), RB(), RB(), RB(), RB(), RB()]),
    ],
  },
  // Level 95: Pre-Ultimate
  {
    name: "PRE-ULTIMATE",
    ballSpeed: 750,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), B('red', 5), B('red', 5), B('red', 5), B('red', 5), IN()]),
      ...createBrickRow(1, [MV('purple', 160), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('purple', 160)]),
      ...createBrickRow(2, [B('magenta', 4), GH('yellow'), CO(), CO(), GH('yellow'), B('magenta', 4)]),
      ...createBrickRow(3, [MV('cyan', 140), CH('orange'), EX('red'), EX('red'), CH('orange'), MV('cyan', 140)]),
      ...createBrickRow(4, [IN(), B('red', 5), B('red', 5), B('red', 5), B('red', 5), IN()]),
      ...createBrickRow(5, [RB(), RB(), 'green', 'green', RB(), RB()]),
    ],
  },
  // Level 96: Ultimate Speed
  {
    name: "ULTIMATE SPEED",
    ballSpeed: 755,
    theme: 'neon',
    bricks: [
      ...createBrickRow(0, [MV('cyan', 220, 100), MV('cyan', 210, 95), MV('cyan', 200, 90), MV('cyan', 210, 95), MV('cyan', 220, 100), null]),
      ...createBrickRow(1, [MV('magenta', 210, 95), MV('magenta', 200, 90), MV('magenta', 190, 85), MV('magenta', 200, 90), MV('magenta', 210, 95), null]),
      ...createBrickRow(2, [MV('yellow', 200, 90), MV('yellow', 190, 85), EX('red'), EX('red'), MV('yellow', 190, 85), MV('yellow', 200, 90)]),
      ...createBrickRow(3, [MV('green', 190, 85), MV('green', 180, 80), MV('green', 170, 75), MV('green', 180, 80), MV('green', 190, 85), null]),
    ],
  },
  // Level 97: Ultimate Ghost
  {
    name: "ULTIMATE GHOST",
    ballSpeed: 760,
    theme: 'ice',
    bricks: [
      ...createBrickRow(0, [GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan'), GH('cyan')]),
      ...createBrickRow(1, [GH('magenta'), GH('magenta'), GH('magenta'), GH('magenta'), GH('magenta'), GH('magenta')]),
      ...createBrickRow(2, [GH('yellow'), GH('yellow'), B('purple', 4), B('purple', 4), GH('yellow'), GH('yellow')]),
      ...createBrickRow(3, [GH('green'), GH('green'), GH('green'), GH('green'), GH('green'), GH('green')]),
      ...createBrickRow(4, [GH('orange'), GH('orange'), GH('orange'), GH('orange'), GH('orange'), GH('orange')]),
    ],
  },
  // Level 98: Ultimate Chain
  {
    name: "ULTIMATE CHAIN",
    ballSpeed: 765,
    theme: 'gold',
    bricks: [
      ...createBrickRow(0, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
      ...createBrickRow(1, [CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange')]),
      ...createBrickRow(2, [CH('red'), CH('red'), B('red', 4), B('red', 4), CH('red'), CH('red')]),
      ...createBrickRow(3, [CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange'), CH('orange')]),
      ...createBrickRow(4, [CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow'), CH('yellow')]),
    ],
  },
  // Level 99: Ultimate Fortress
  {
    name: "ULTIMATE FORTRESS",
    ballSpeed: 770,
    theme: 'cyber',
    bricks: [
      ...createBrickRow(0, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(1, [IN(), B('purple', 5), B('purple', 5), B('purple', 5), B('purple', 5), IN()]),
      ...createBrickRow(2, [IN(), B('magenta', 4), EX('red'), EX('red'), B('magenta', 4), IN()]),
      ...createBrickRow(3, [IN(), B('purple', 5), B('purple', 5), B('purple', 5), B('purple', 5), IN()]),
      ...createBrickRow(4, [IN(), IN(), IN(), IN(), IN(), IN()]),
      ...createBrickRow(5, ['cyan', 'magenta', 'yellow', 'green', 'orange', 'purple']),
    ],
  },
  // Level 100: FINAL BOSS
  {
    name: "FINAL BOSS",
    ballSpeed: 800,
    theme: 'fire',
    bricks: [
      ...createBrickRow(0, [IN(), B('red', 6), B('red', 6), B('red', 6), B('red', 6), IN()]),
      ...createBrickRow(1, [IN(), B('red', 5), EX('red'), EX('red'), B('red', 5), IN()]),
      ...createBrickRow(2, [MV('purple', 180, 85), B('orange', 4), B('orange', 4), B('orange', 4), B('orange', 4), MV('purple', 180, 85)]),
      ...createBrickRow(3, [CH('yellow'), CH('yellow'), B('magenta', 3), B('magenta', 3), CH('yellow'), CH('yellow')]),
      ...createBrickRow(4, [CO(), GH('cyan'), CO(), CO(), GH('cyan'), CO()]),
      ...createBrickRow(5, [MV('green', 160, 75), B('cyan', 2), EX('red'), EX('red'), B('cyan', 2), MV('green', 160, 75)]),
      ...createBrickRow(6, [RB(), RB(), 'green', 'green', RB(), RB()]),
      ...createBrickRow(7, ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']),
    ],
  },
];
