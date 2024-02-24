export enum GameStatus {
  NEW,
  PLAYING,
  WIN,
  OVER,
}

export interface PickedUpCard {
  row: number;
  column: number;
}

export interface GameCategory {
  cards: string[];
  numCorrect?: number;
  solved?: {
    name: string;
    level: number;
  };
}

export interface GameState {
  categories: GameCategory[];
  livesRemaining: number;
  maxLives: number;
  gameStatus: GameStatus;
  userHasPlayed: boolean;
}

export interface Score {
  levels: number[][];
  icons: string[];
}