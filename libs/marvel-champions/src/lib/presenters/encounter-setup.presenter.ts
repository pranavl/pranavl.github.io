import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CARDS_BY_SET } from '../data/cards-by-set';
import { EGameAreaType, ICard, ICardSetInfo } from '../interfaces';
import { GameSetupService } from '../services';

export interface CardsSelectorOptionGroup {
  label: string;
  value: string;
  items: {
    label: string;
    value: string;
    cardsInSet: number;
    numCardsInGame: number;
    hasCardsInGame: boolean;
  }[];
}

export interface SetSelectorViewModel {
  setInfo: ICardSetInfo;
  cardsInSelectedSet: ICard[];
  numCardsInGame: number;
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
  private setupService = inject(GameSetupService);

  private readonly selectedSetCode$: WritableSignal<string> = signal(null);

  public readonly cardsInGame$ = this.setupService.cardsInGame$;

  readonly cardSetListViewModel$ = computed((): CardsSelectorOptionGroup[] => {
    const cardsInGame = this.setupService.cardsInGame$();

    const cardsByPack = new Map<string, CardsSelectorOptionGroup>();
    CARDS_BY_SET.forEach((cardSet) => {
      if (!cardsByPack.has(cardSet.pack_code)) {
        cardsByPack.set(cardSet.pack_code, {
          label: cardSet.pack_name,
          value: cardSet.pack_code,
          items: [],
        });
      }

      const numCardsInGame = countCardsInMap(cardsInGame, cardSet.cards_in_set);

      cardsByPack.get(cardSet.pack_code).items.push({
        label: cardSet.card_set_name,
        value: cardSet.card_set_code,
        cardsInSet: cardSet.cards_in_set.length,
        numCardsInGame,
        hasCardsInGame: numCardsInGame > 0,
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

    return {
      setInfo: {
        card_set_code: cardSet.card_set_code,
        card_set_name: cardSet.card_set_name,
      },
      cardsInSelectedSet: cardSet?.cards_in_set,
      numCardsInGame: countCardsInMap(cardsInGame, cardSet?.cards_in_set),
    };
  });

  public readonly gameState$ = this.setupService.gameState$;
  readonly gameAreas$ = computed(() => {
    return Array.from(this.gameState$().gameAreas.values());
  });

  public readonly cardToGameArea$ = signal<Map<string, string>>(new Map());

  readonly cardConfiguratorViewModel$ = computed(() => {
    // Configure game area options
    const gameAreas = this.gameAreas$();
    const gameAreaOptions = Array.from(gameAreas.values())
      .map((ga) => ({
        type: ga.type,
        value: ga.id,
        label: ga.label,
        icon: ga.icon,
      }))
      .sort((a) => (a.type === EGameAreaType.ASIDE ? 1 : 0));

    // Row data
    const cards = Array.from(this.cardsInGame$().values());
    const areaMap = this.cardToGameArea$();
    cards.map((c) => ({
      name: c.name,
      setName: c.card_set_name,
      type: c.faction_name,
      gameArea: areaMap.get(c.code) ?? '',
    }));
  });

  // Card selection -------------------------------------------------------------------

  updateSelectedSet(selectedSetCode: string) {
    this.selectedSetCode$.set(selectedSetCode);
  }

  addCardsToGame(...cards: ICard[]) {
    this.setupService.addCardsToGame(...cards);
  }

  removeCardsFromGame(...cards: ICard[]) {
    this.setupService.removeCardsFromGame(...cards);
  }

  // Game configuration ---------------------------------------------------------------

  private getDefaultGameArea(card: ICard) {
    const gameAreas = this.gameAreas$();
    // TODO pick up from here

  }

  addGameArea(label: string) {
    this.setupService.addGameArea(label);
  }

  removeGameArea(id: string) {
    this.setupService.removeGameArea(id);
  }

  renameGameArea(id: string, newName: string) {
    this.setupService.renameGameArea(id, newName);
  }

  addCardToGameArea(cardId: string, gameAreaId: string) {
    this.cardToGameArea$.mutate((m) => m.set(cardId, gameAreaId));
  }

  // Start game -----------------------------------------------------------------------

  startGame() {
    // TODO this
  }
}
