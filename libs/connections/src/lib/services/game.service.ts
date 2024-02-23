import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { GAME_CONFIG } from '../config';
import { Card, ConnectionsGameData } from '../interfaces';
import {
  GameCategory,
  GameState,
  PickedUpCard,
} from '../interfaces/game-state';
import { shuffleArray } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsGameService {
  /**
   * Puzzle data
   */
  public puzzle$ = signal<ConnectionsGameData>(null);

  /**
   * Extract answers from the puzzle in an easier to use format
   */
  private _answers$ = computed(() =>
    this.puzzle$()?.categories.map((cat) => ({
      name: cat.title,
      cards: new Set(cat.cards.map((c) => c.content)),
    }))
  );

  /**
   * Game state object
   */
  public gameState$ = signal<GameState>(null);

  /**
   * Row and column index of a card that is being swapped
   */
  private _movingCard$ = signal<PickedUpCard>(null);

  constructor(private _http: HttpClient) {
    this.getGameData();
  }

  /**
   * Format the URL for today's date
   */
  private formatUrl() {
    // private API_URL = 'https://www.nytimes.com/svc/connections/v2';
    const date = new Date();
    const day = date.getDate();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `/nyt-connections/${year}-${month}-${day}.json`;
  }

  /**
   * Get game data from NYT
   */
  public getGameData() {
    this._http.get<ConnectionsGameData>(this.formatUrl()).subscribe((res) => {
      this.puzzle$.set(res);
      this.initGame();
    });
  }

  /**
   * Create the initial game state
   */
  private initGame() {
    const cards = this.puzzle$()
      ?.categories?.flatMap((cat) => cat.cards)
      ?.sort((a, b) => a.position - b.position);
    const chunks: Card[][] = [];
    for (let i = 0; i < cards.length; i += 4) {
      chunks.push(cards.slice(i, i + 4));
    }
    const game: GameState = {
      categories: chunks.map((chunk) => ({
        cards: chunk.map((c) => c.content),
      })),
      livesRemaining: GAME_CONFIG.STARTING_LIVES,
      maxLives: GAME_CONFIG.STARTING_LIVES,
      userHasPlayed: false,
    };
    this.gameState$.set(game);
  }

  /**
   * When a card is being dragged, keep track of which one it is
   * @param rowIndex row index where a card is being dragged from
   * @param columnIndex column index where a card is being dragged from
   */
  public dragCard(rowIndex: number, columnIndex: number) {
    this._movingCard$.set({ row: rowIndex, column: columnIndex });
  }

  /**
   * Swap two cards in the game
   * @param row1 category index of the first card
   * @param col1 column index of the first card
   * @param row2 category index of the second card
   * @param col2 column index of the second card
   */
  private swapCards(row1: number, col1: number, row2: number, col2: number) {
    this.gameState$.mutate((s) => {
      [s.categories[row1].cards[col1], s.categories[row2].cards[col2]] = [
        s.categories[row2].cards[col2],
        s.categories[row1].cards[col1],
      ];
    });
  }

  /**
   * When a card is dropped, swap it
   * @param rowIndex row index where a card is being dragged from
   * @param columnIndex column index where a card is being dragged from
   */
  public dropCard(rowIndex: number, columnIndex: number) {
    const dragged = this._movingCard$();
    if (!dragged) {
      return;
    }

    this.swapCards(dragged.row, dragged.column, rowIndex, columnIndex);
    this._movingCard$.set(null);
  }

  /**
   * Check how many cards are in the right category
   */
  private checkMatches(cards: string[]): GameCategory {
    return this._answers$()
      .map((a, idx) => {
        const numCorrect = cards
          .map((c) => a.cards.has(c))
          .filter(Boolean).length;
        return {
          cards,
          numCorrect,
          solved:
            numCorrect === 4
              ? {
                  name: a.name,
                  level: idx,
                }
              : null,
        };
      })
      .reduce((a, b) => (a.numCorrect > b.numCorrect ? a : b));
  }

  /**
   * Update the game state after a turn has been taken
   */
  public updateGame() {
    this.gameState$.update((gameState) => {
      // Keep track of whether there are any misses
      let hasMiss: boolean = false;

      // Check each row for matches
      const categories: GameCategory[] = gameState.categories.map((cat) => {
        const matches = this.checkMatches(cat.cards);
        if (!matches.solved) {
          hasMiss = true;
        }
        return matches;
      });

      // Update the game state
      return {
        categories,
        livesRemaining: hasMiss
          ? gameState.livesRemaining - 1
          : gameState.livesRemaining,
        maxLives: gameState.maxLives,
        userHasPlayed: true,
      };
    });
  }

  /**
   * Shuffle the cards in the game that are not in the correct group
   */
  public shuffleCardsInGame() {
    this.gameState$.update((gameState) => {
      // Get a list of cards that are not in the right categories
      const cardsToShuffle = [];
      gameState.categories.forEach((cat) => {
        if (cat.solved) {
          return;
        }
        cardsToShuffle.push(...cat.cards);
      });

      // Shuffle them
      const shuffled = shuffleArray(cardsToShuffle);

      // Put them back in the game
      let i = 0;
      gameState.categories.forEach((cat) => {
        if (cat.solved) {
          return;
        }
        for (let j = 0; j < 4; j++, i++) {
          cat.cards[j] = shuffled[i];
        }
      });

      return gameState;
    });
  }

}
