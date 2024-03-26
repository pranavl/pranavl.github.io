import { ICard } from './cards';

export interface IPlayState {
  isFaceUp?: boolean;
  isExhausted?: boolean;
  tough?: number;
  stunned?: number;
  confused?: number;
  usesHealth?: boolean;
  health?: number;
  usesThreat?: boolean;
  threat?: number;
  maxThreat?: number;
  usesCounters?: boolean;
  counters?: number;
}

export interface IGameCard {
  id: string;
  card: ICard;
  fromAreaId: string;
  inPlayState?: IPlayState;
}

export enum EGameAreaClass {
  SCENARIO = 'SCENARIO',
  PLAYER = 'PLAYER',
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

export interface ICachedGameState {
  data: {
    gameAreas: [string, IGameArea][];
    playerAreas: IPlayerArea[];
    modifiers: {
      accelerate: number;
      amplify: number;
      hazard: number;
    };
  };
  timestamp?: number;
}

export enum EFocusType {
  GAME_AREA = 'GAME_AREA',
  PLAYER_AREA = 'PLAYER_AREA',
  DECK = 'DECK',
  DISCARD = 'DISCARD',
}

export interface IFocusedElement {
  type: EFocusType;
  data: IGameArea | IPlayerArea;
  card?: IGameCard;
}
