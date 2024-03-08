import { v4 as uuid } from 'uuid';
import { EGameAreaType, IGameArea, IGameState } from './game';

const _defaultGameAreas = [
  {
    type: EGameAreaType.VILLAIN,
    label: 'Villain',
    icon: 'fas fa-skull-crossbones',
  },
  {
    type: EGameAreaType.MAIN_SCHEME,
    label: 'Main Scheme',
    icon: 'far fa-rectangle-list',
  },
  {
    type: EGameAreaType.ENCOUNTER,
    label: 'Encounter',
    icon: 'fas fa-triangle-exclamation',
  },
  {
    type: EGameAreaType.ASIDE,
    label: 'Set aside',
    icon: 'far fa-share-from-square',
  },
];

export function getDefaultGameState(): IGameState {
  const gameAreas: IGameArea[] = _defaultGameAreas.map((t) => {
    return {
      id: uuid(),
      label: t.label,
      type: t.type,
      deck: [],
      discard: [],
      cardsInPlay: [],
      isDefault: true,
      icon: t.icon,
    };
  });

  return {
    gameAreas: new Map(gameAreas.map((a) => [a.id, a])),
    playerAreas: new Map(),
    modifiers: {
      amplify: 0,
      accelerate: 0,
      hazard: 0,
    },
  };
}
