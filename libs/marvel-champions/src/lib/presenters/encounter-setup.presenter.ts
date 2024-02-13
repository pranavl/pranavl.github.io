import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { CARDS_BY_SET } from '../data/cards-by-set';
import { ICard, ICardSetInfo } from '../interfaces';
import { GameSetupService } from '../services';

export interface CardsSelectorOptionGroup {
  label: string;
  value: string;
  items: {
    label: string;
    value: string;
    cardsInSet: number;
    numCardsInGame: number;
    numCardsSetAside: number;
  }[];
}

export interface SetSelectorViewModel {
  setInfo: ICardSetInfo;
  cardsInSelectedSet: ICard[];
  numCardsInGame: number;
  numCardsSetAside: number;
}

const countCardsInMap = (cardMap: Map<string, ICard>, cards: ICard[]) => {
  const sumCardQuantity = (agg, c) => {
    return agg + c.quantity;
  };
  return cards
    .filter((card) => cardMap.has(card.code))
    .reduce(sumCardQuantity, 0);
};

@Injectable({ providedIn: 'root' })
export class EncounterSetupPresenter {
  constructor(private setupService: GameSetupService) {}

  private readonly selectedSetCode$: WritableSignal<string> = signal(null);
  
  public readonly cardsInGame$ = this.setupService.cardsInGame$;
  public readonly cardsSetAside$ = this.setupService.cardsSetAside$;

  readonly cardSetListViewModel$ = computed((): CardsSelectorOptionGroup[] => {
    const cardsInGame = this.setupService.cardsInGame$();
    const cardsSetAside = this.setupService.cardsSetAside$();

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
        numCardsInGame: countCardsInMap(cardsInGame, cardSet.cards_in_set),
        numCardsSetAside: countCardsInMap(cardsSetAside, cardSet.cards_in_set),
      });
    });
    return Array.from(cardsByPack.values());
  });

  readonly cardSetViewModel$ = computed((): SetSelectorViewModel => {
    const cardSet = CARDS_BY_SET.find(
      (set) => set.card_set_code == this.selectedSetCode$()
    );
    if (!cardSet) {
      return null;
    }

    const cardsInGame = this.setupService.cardsInGame$();
    const cardsSetAside = this.setupService.cardsSetAside$();

    return {
      setInfo: {
        card_set_code: cardSet.card_set_code,
        card_set_name: cardSet.card_set_name,
      },
      cardsInSelectedSet: cardSet?.cards_in_set,
      numCardsInGame: countCardsInMap(cardsInGame, cardSet?.cards_in_set),
      numCardsSetAside: countCardsInMap(cardsSetAside, cardSet?.cards_in_set),
    };
  });

  updateSelectedSet(selectedSetCode: string) {
    this.selectedSetCode$.set(selectedSetCode);
  }

  addCardsToGame(...cards: ICard[]) {
    this.setupService.addCardsToGame(...cards);
  }

  removeCardsFromGame(...cards: ICard[]) {
    this.setupService.removeCardsFromGame(...cards);
  }

  addCardsToSetAside(...cards: ICard[]) {
    this.setupService.addCardsToSetAside(...cards);
  }

  removeCardsFromSetAside(...cards: ICard[]) {
    this.setupService.removeCardsFromSetAside(...cards);
  }
}
