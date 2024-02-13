import { Injectable, WritableSignal } from '@angular/core';
import { ICard } from '../interfaces';
import { DataStore } from '../stores';

@Injectable({
  providedIn: 'root',
})
export class GameSetupService {
  constructor(private dataStore: DataStore) {}

  public cardsInGame$ = this.dataStore.cardsInGame$;
  public cardsSetAside$ = this.dataStore.cardsSetAside$;

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
    this.removeCardsFromSetAside(...cards);
    this._addCards(this.cardsInGame$, ...cards);
  }
  removeCardsFromGame(...cards: ICard[]) {
    this._removeCards(this.cardsInGame$, ...cards);
  }
  addCardsToSetAside(...cards: ICard[]) {
    this.removeCardsFromGame(...cards);
    this._addCards(this.cardsSetAside$, ...cards);
  }
  removeCardsFromSetAside(...cards: ICard[]) {
    this._removeCards(this.cardsSetAside$, ...cards);
  }

  resetLoadedCards() {
    this.cardsInGame$.set(new Map());
    this.cardsSetAside$.set(new Map());
  }
}
