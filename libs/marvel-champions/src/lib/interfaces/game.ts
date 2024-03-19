import { ICard } from './cards';

export interface IPlayState {
  isFaceUp?: boolean;
  isExhausted?: boolean;
  usesHealth?: boolean;
  health?: number;
  usesThreat?: boolean;
  threat?: number;
  usesCounters?: boolean;
  counters?: number;
}

export interface IGameCard {
  id: string;
  card: ICard;
  fromAreaId: string;
  inPlayState?: IPlayState;
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
  playerAreas: IPlayerArea[];
  modifiers: {
    accelerate: number;
    amplify: number;
    hazard: number;
  };
}
