import { Injectable, WritableSignal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  EGameAreaType,
  ICard,
  IGameArea,
  IGameCardConfiguration,
  getDefaultGameState,
} from '../interfaces';
import { DataStore } from '../stores';

@Injectable({
  providedIn: 'root',
})
export class GameSetupService {
  constructor(private dataStore: DataStore) {}

  public cardsInGame$ = this.dataStore.cardsInGame$;
  public gameState$ = this.dataStore.gameState$;

  private _addCards(
    target: WritableSignal<Map<string, ICard>>,
    ...cards: ICard[]
  ) {
    target.mutate((value) => {
      cards
        .filter((card) => !value.has(card.code))
        .forEach((card) => value.set(card.code, card));
    });
  }

  private _removeCards(
    target: WritableSignal<Map<string, ICard>>,
    ...cards: ICard[]
  ) {
    target.mutate((value) => cards.forEach((card) => value.delete(card.code)));
  }

  addCardsToGame(...cards: ICard[]) {
    this._addCards(this.cardsInGame$, ...cards);
  }
  removeCardsFromGame(...cards: ICard[]) {
    this._removeCards(this.cardsInGame$, ...cards);
  }

  resetLoadedCards() {
    this.cardsInGame$.set(new Map());
  }

  addGameArea(label: string) {
    this.gameState$.mutate((g) => {
      const newArea: IGameArea = {
        id: uuid(),
        label,
        type: EGameAreaType.ANY,
        deck: [],
        discard: [],
        cardsInPlay: [],
        isDefault: false,
      };
      g.gameAreas.set(newArea.id, newArea);
    });
  }

  removeGameArea(id: string) {
    this.gameState$.mutate((g) => {
      g.gameAreas.delete(id);
    });
  }

  renameGameArea(id: string, label: string) {
    this.gameState$.mutate((g) => {
      g.gameAreas.get(id).label = label;
    });
  }

  setupGame(numPlayers: number, cardConfig: IGameCardConfiguration[]) {
    this.gameState$.mutate((g) => {
      // Create player area objects
      g.playerAreas = [...Array(numPlayers).keys()].map((i) => ({
        id: uuid(),
        label: `Player ${i + 1}`,
        health: 0,
        cardsInPlay: [],
        encounters: [],
      }));
      const cardsInGame = this.cardsInGame$();

      // Sort cards into decks
      cardConfig.forEach((c) => {
        const card = cardsInGame.get(c.id);
        const gameArea = g.gameAreas.get(c.gameAreaId);
        for (let i = 0; i < card.quantity; i++) {
          gameArea.deck.push({
            id: `${c.id}_${i}`,
            card,
            fromAreaId: gameArea.id,
          });
        }
      });
    });

    // Cache the game state at the start of the game
    this.dataStore.saveGameStateToLocalStorage();
  }

  resetGame() {
    this.dataStore.gameState$.set(getDefaultGameState());
  }
}
