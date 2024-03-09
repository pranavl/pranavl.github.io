import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CARDS_BY_SET } from '../data/cards-by-set';
import {
  ECardType,
  EGameAreaType,
  ICard,
  ICardSetInfo,
  IGameConfigurationViewModel,
} from '../interfaces';
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
  readonly gameAreasMap$ = computed(() => this.gameState$().gameAreas);
  readonly gameAreasList$ = computed(() => {
    return Array.from(this.gameState$().gameAreas.values());
  });

  public readonly cardToGameArea$ = signal<Map<string, string>>(new Map());

  readonly cardConfiguratorViewModel$ = computed(
    (): IGameConfigurationViewModel => {
      // Configure game area options
      const gameAreas = this.gameAreasMap$();
      const gameAreaOptions = this.gameAreasList$()
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
      const cardsInGame = cards.map((c) => {
        const gameAreaId = areaMap.get(c.code) ?? this.getDefaultGameArea(c);
        const gameAreaLabel = gameAreas.get(gameAreaId).label;
        return {
          id: c.code,
          name: c.name,
          setName: c.card_set_name,
          type: c.type_code,
          gameAreaId,
          gameAreaLabel,
        };
      });

      return {
        gameAreaOptions,
        cardsInGame,
      };
    }
  );

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
    const gameAreas = this.gameAreasList$();
    const getGameAreaIdByType = (type: EGameAreaType) =>
      gameAreas.find((ga) => ga.type == type)?.id;

    // Villain
    if (card.type_code == ECardType.VILLAIN) {
      return getGameAreaIdByType(EGameAreaType.VILLAIN);
    }
    // Main scheme
    if (card.type_code == ECardType.MAIN_SCHEME) {
      return getGameAreaIdByType(EGameAreaType.MAIN_SCHEME);
    }
    // Nemesis sets
    if (card.card_set_code.includes('nemesis')) {
      return getGameAreaIdByType(EGameAreaType.ASIDE);
    }
    // Default: encounter deck
    return getGameAreaIdByType(EGameAreaType.ENCOUNTER);
  }

  addGameArea(label: string) {
    this.setupService.addGameArea(label);
  }

  removeGameArea(id: string) {
    this.setupService.removeGameArea(id);
    // Remove any mappings to that game area
    this.cardToGameArea$.set(
      new Map([...this.cardToGameArea$()].filter((kv) => kv[1] !== id))
    );
  }

  renameGameArea(id: string, newName: string) {
    this.setupService.renameGameArea(id, newName);
  }

  addCardToGameArea(cardId: string, gameAreaId: string) {
    this.cardToGameArea$.mutate((m) => m.set(cardId, gameAreaId));
  }

  // Start game -----------------------------------------------------------------------

  startGame(numPlayers: number) {
    // TODO this
  }
}
