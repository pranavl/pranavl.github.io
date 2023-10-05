import { Injectable, WritableSignal, signal } from '@angular/core';
import { ICard } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  readonly deck$: WritableSignal<ICard[]> = signal([]);

  // constructor(private cdbService: CardsDatabaseHttpService) {}

  getCardCodeSet(cards: ICard[]) {
    return new Set(cards.map((card) => card.code));
  }

  addCardsToDeck(...cards: ICard[]) {
    this.deck$.mutate((value) => {
      const cardsInDeck = this.getCardCodeSet(value);
      cards
        .filter((card) => !cardsInDeck.has(card.code))
        .forEach((card) => value.push(card));
    });
  }

  removeCardsFromDeck(...cards: ICard[]) {
    const cardsToRemove = this.getCardCodeSet(cards);
    this.deck$.mutate((value) =>
      value.filter((card) => !cardsToRemove.has(card.code))
    );
  }

  resetLoadedCards() {
    this.deck$.set([]);
  }
}
