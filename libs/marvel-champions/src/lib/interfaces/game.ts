import { ICard } from './cards';

export interface IGameCard {
  card: ICard;
  fromAreaId: string;
  isFaceUp: boolean;
  isExhausted: boolean;
  usesHealth?: boolean;
  health?: number;
  usesThreat?: boolean;
  threat?: number;
  usesCounters?: boolean;
  counters?: number;
}

export enum EGameAreaType {
  ANY = 'ANY',
  VILLAIN = 'VILLAIN',
  MAIN_SCHEME = 'MAIN_SCHEME',
  ENCOUNTER = 'ENCOUNTER',
  ASIDE = 'ASIDE',
}

export interface IGameArea {
  id: string;
  label: string;
  type: EGameAreaType;
  deck: IGameCard[];
  discard: IGameCard[];
  cardsInPlay: IGameCard[];
  isDefault: boolean;
  icon?: string;
}

export interface IPlayerArea {
  id: string;
  label: string;
  health: number;
  cardsInPlay: IGameCard[];
  encounters: IGameCard[];
}

export interface IGameState {
  gameAreas: Map<string, IGameArea>;
  playerAreas: Map<string, IPlayerArea>;
  modifiers: {
    amplify: number;
    accelerate: number;
    hazard: number;
  };
}
