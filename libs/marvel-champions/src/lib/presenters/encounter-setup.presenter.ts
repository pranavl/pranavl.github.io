import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { CARDS_BY_SET } from '../data/cards-by-set';
import { ICard, ICardSetInfo } from '../interfaces';
import { CardsService } from '../services';

export interface CardsSelectorOptionGroup {
  label: string;
  value: string;
  items: {
    label: string;
    value: string;
    cardsInSet: number;
    cardsSelected: number;
  }[];
}

@Injectable({ providedIn: 'root' })
export class EncounterSetupPresenter {
  readonly cardSetListViewModel$ = computed(() =>
    this.buildSetListViewModel(this.cardsService.deck$())
  );

  readonly selectedSet$: WritableSignal<ICardSetInfo> = signal(null);
  readonly cardsInSelectedSet$: WritableSignal<ICard[]> = signal([]);

  constructor(private cardsService: CardsService) {}

  private buildSetListViewModel(deck: ICard[]): CardsSelectorOptionGroup[] {
    const cardsInDeck = this.cardsService.getCardCodeSet(deck);
    const cardsByPack = new Map<string, CardsSelectorOptionGroup>();
    CARDS_BY_SET.forEach((cardSet) => {
      if (!cardsByPack.has(cardSet.pack_code)) {
        cardsByPack.set(cardSet.pack_code, {
          label: cardSet.pack_name,
          value: cardSet.pack_code,
          items: [],
        });
      }
      cardsByPack.get(cardSet.pack_code).items.push({
        label: cardSet.card_set_name,
        value: cardSet.card_set_code,
        cardsInSet: cardSet.cards_in_set.length,
        cardsSelected: cardSet.cards_in_set.filter((card) =>
          cardsInDeck.has(card.code)
        ).length,
      });
    });
    return Array.from(cardsByPack.values());
  }

  updateSelectedSet(selectedSetCode) {
    const cardSet = CARDS_BY_SET.find(
      (set) => set.card_set_code == selectedSetCode
    );
    this.selectedSet$.set({
      card_set_code: cardSet.card_set_code,
      card_set_name: cardSet.card_set_name,
    });
    this.cardsInSelectedSet$.set(cardSet?.cards_in_set);
  }
}
