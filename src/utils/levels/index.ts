import { LevelConfig } from '@/types/game';
import { levels1to25 } from './levels1to25';
import { levels26to50 } from './levels26to50';
import { levels51to75 } from './levels51to75';
import { levels76to100 } from './levels76to100';

export const levels: LevelConfig[] = [
  ...levels1to25,
  ...levels26to50,
  ...levels51to75,
  ...levels76to100,
];

export const getTotalLevels = () => levels.length;
