import { EGameAreaType } from '../interfaces';

export const MainEncounterAreaDefinitions: Map<
  EGameAreaType,
  { type: EGameAreaType; sortOrder: number }
> = new Map([
  [EGameAreaType.VILLAIN, { type: EGameAreaType.VILLAIN, sortOrder: 0 }],
  [
    EGameAreaType.MAIN_SCHEME,
    {
      type: EGameAreaType.MAIN_SCHEME,
      sortOrder: 1,
    },
  ],
  [EGameAreaType.ENCOUNTER, { type: EGameAreaType.ENCOUNTER, sortOrder: 2 }],
]);
