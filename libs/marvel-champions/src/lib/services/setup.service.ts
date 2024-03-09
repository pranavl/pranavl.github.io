import { Injectable, WritableSignal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  EGameAreaType,
  ICard,
  IGameArea,
  IGameConfigurationViewModel,
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

  startGame(
    numPlayers: number,
    gameConfig: IGameConfigurationViewModel
  ) {
    // TODO this
  }
}
