import * as migration_20260514_070458 from './20260514_070458';
import * as migration_20260515_094929 from './20260515_094929';
import * as migration_20260515_095803 from './20260515_095803';

export const migrations = [
  {
    up: migration_20260514_070458.up,
    down: migration_20260514_070458.down,
    name: '20260514_070458',
  },
  {
    up: migration_20260515_094929.up,
    down: migration_20260515_094929.down,
    name: '20260515_094929',
  },
  {
    up: migration_20260515_095803.up,
    down: migration_20260515_095803.down,
    name: '20260515_095803'
  },
];
