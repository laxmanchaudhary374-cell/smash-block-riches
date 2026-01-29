import { LevelConfig } from '@/types/game';
import { generateAllLevels } from './levelGenerator';

// Generate all 500 levels dynamically
export const levels: LevelConfig[] = generateAllLevels();

export const getTotalLevels = () => levels.length;
