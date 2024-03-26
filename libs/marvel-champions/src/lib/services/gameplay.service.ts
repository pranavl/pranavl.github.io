import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import {
  EGameAreaClass,
  IGameCard,
  IGameState,
  getDefaultGameState,
} from '../interfaces';
import { DataStore } from '../stores';
import { randomShuffle } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class GameplayService {
  constructor(private dataStore: DataStore) {}

  /**
   * Shuffle function
   */
  private shuffle = randomShuffle;

  // Signals ------------------------------------------------------------------

  public gameState$ = this.dataStore.gameState$;

  // Helpers ------------------------------------------------------------------

  private filterCardFromArray(card: IGameCard, array: IGameCard[]) {
    return array.filter((c) => c.id !== card.id);
  }

  // Game state ---------------------------------------------------------------

  resetGame() {
    this.dataStore.gameState$.set(getDefaultGameState());
  }

  private createCardInPlay(card: IGameCard, faceUp: boolean): IGameCard {
    const perHeroMultiplier = this.gameState$()?.playerAreas?.length ?? 1;
    const health = card.card.health
      ? {
          health:
            card.card.health *
            (card.card.health_per_hero ? perHeroMultiplier : 1),
          usesHealth: !!card.card.health,
        }
      : {};
    const threat = card.card.threat
      ? {
          threat:
            card.card.base_threat *
            (card.card.base_threat_fixed ? 1 : perHeroMultiplier),
          maxThreat:
            card.card.threat * (card.card.threat_fixed ? 1 : perHeroMultiplier),
          usesThreat: !!card.card.threat,
        }
      : {};
    return {
      ...card,
      inPlayState: {
        isFaceUp: faceUp,
        ...health,
        ...threat,
      },
    };
  }

  /**
   * When a card is put in play, modify the game state accordingly
   * - update modifiers
   * @param card
   */
  // private onPutCardInPlay(card: IGameCard) {}

  // Manipulate decks ---------------------------------------------------------

  resetDeck(gameAreaId: string) {
    this.gameState$.mutate((g) => {
      const gameArea = g.gameAreas.get(gameAreaId);
      gameArea.deck = this.shuffle([...gameArea.deck, ...gameArea.discard]);
      gameArea.discard = [];
    });
  }

  // Move cards ---------------------------------------------------------------

  private _getArea(g: IGameState, id: string) {
    // Check game areas
    const gameArea = g.gameAreas.get(id);
    if (gameArea) {
      return { type: EGameAreaClass.SCENARIO, data: gameArea };
    }
    // Check player areas
    const playerArea = g.playerAreas.find((p) => p.id == id);
    if (playerArea) {
      return { type: EGameAreaClass.PLAYER, data: playerArea };
    }
    // Otherwise, raise an exception
    throw new Error(`Unable to find game area with id ${id}`);
  }

  public getArea(id: string) {
    return this._getArea(this.gameState$(), id);
  }

  /**
   * Reorder cards within a game area
   * @param card
   * @param areaId
   * @param fromIndex
   * @param toIndex
   */
  moveCardWithinPlayArea(areaId: string, fromIndex: number, toIndex: number) {
    this.gameState$.mutate((g) => {
      const { data: gameArea } = this._getArea(g, areaId);
      moveItemInArray(gameArea.cardsInPlay, fromIndex, toIndex);
    });
  }

  /**
   * Move cards from one area to another
   * @param fromAreaId
   * @param toAreaId
   * @param fromIndex
   * @param toIndex
   */
  moveCardInPlayToArea(
    fromAreaId: string,
    toAreaId: string,
    fromIndex: number,
    toIndex: number
  ) {
    this.gameState$.mutate((g) => {
      const { data: fromArea } = this._getArea(g, fromAreaId);
      const { data: toArea } = this._getArea(g, toAreaId);
      transferArrayItem(
        fromArea.cardsInPlay,
        toArea.cardsInPlay,
        fromIndex,
        toIndex
      );
    });
  }

  addCardFromDeckToGameArea(
    card: IGameCard,
    fromAreaId: string,
    targetAreaId: string,
    faceUp: boolean = true
  ) {
    this.gameState$.mutate((g) => {
      const fromArea = g.gameAreas.get(fromAreaId);
      const toArea = g.gameAreas.get(targetAreaId);
      fromArea.deck = this.filterCardFromArray(card, fromArea.deck);
      toArea.cardsInPlay.push(this.createCardInPlay(card, faceUp));
    });
  }

  /**
   * Deal a card from the top of a deck to a player's encounter pile
   * @param fromAreaId
   * @param playerAreaIndex
   */
  dealEncounterCard(fromAreaId: string, playerAreaIndex: number) {
    this.gameState$.mutate((g) => {
      const fromArea = g.gameAreas.get(fromAreaId);
      const card = fromArea.deck.shift();
      g.playerAreas[playerAreaIndex].encounters.push(card);
    });
  }

  /**
   * Deal a card from a deck to a player's encounter pile
   * @param card
   * @param fromAreaId
   * @param playerAreaIndex
   */
  dealAsEncounterCard(
    card: IGameCard,
    fromAreaId: string,
    playerAreaIndex: number
  ) {
    this.gameState$.mutate((g) => {
      const fromArea = g.gameAreas.get(fromAreaId);
      fromArea.deck = this.filterCardFromArray(card, fromArea.deck);
      g.playerAreas[playerAreaIndex].encounters.push(card);
    });
  }

  /**
   * Reveal the next card in the encounter queue
   * @param playerAreaIndex
   */
  revealNextEncounterCard(playerAreaIndex: number) {
    this.gameState$.mutate((g) => {
      const playerArea = g.playerAreas[playerAreaIndex];
      const card = playerArea.encounters.shift();
      if (!card) {
        return;
      }
      playerArea.cardsInPlay.push(card);
    });
  }

  /**
   * Discard a card from a game area
   * @param card
   * @param fromAreaId
   * @param targetAreaId
   */
  discardCard(card: IGameCard, fromAreaId: string, targetAreaId?: string) {
    this.gameState$.mutate((g) => {
      // Remove the card from the current area
      const fromArea = g.gameAreas.get(fromAreaId);
      fromArea.cardsInPlay = this.filterCardFromArray(
        card,
        fromArea.cardsInPlay
      );
      // Add it to the discard pile in where it came from
      const toArea = g.gameAreas.get(targetAreaId ?? card.fromAreaId);
      card.inPlayState = null;
      toArea.discard.unshift(card);
    });
  }

  /**
   * Discard a card from a player area
   * @param card
   * @param playerAreaIndex
   * @param targetAreaId
   */
  discardCardFromPlayerArea(
    card: IGameCard,
    playerAreaIndex: number,
    targetAreaId?: string
  ) {
    this.gameState$.mutate((g) => {
      // Remove the card from the current area
      const fromArea = g.playerAreas[playerAreaIndex];
      fromArea.cardsInPlay = this.filterCardFromArray(
        card,
        fromArea.cardsInPlay
      );
      // Add it to the discard pile in where it came from
      const toArea = g.gameAreas.get(targetAreaId ?? card.fromAreaId);
      card.inPlayState = null;
      toArea.discard.unshift(card);
    });
  }

  /**
   * Shuffle the deck in a game area
   * @param areaId
   */
  shuffleDeck(areaId: string) {
    this.gameState$.mutate((g) => {
      const gameArea = g.gameAreas.get(areaId);
      this.shuffle(gameArea.deck);
    });
  }

  // Update modifiers ---------------------------------------------------------

  addAccelerate() {
    this.gameState$.mutate((g) => (g.modifiers.accelerate += 1));
  }

  removeAccelerate() {
    this.gameState$.mutate((g) => (g.modifiers.accelerate -= 1));
  }

  addAmplify() {
    this.gameState$.mutate((g) => (g.modifiers.amplify += 1));
  }

  removeAmplify() {
    this.gameState$.mutate((g) => (g.modifiers.amplify -= 1));
  }

  addHazard() {
    this.gameState$.mutate((g) => (g.modifiers.hazard += 1));
  }

  removeHazard() {
    this.gameState$.mutate((g) => (g.modifiers.hazard -= 1));
  }

  // Save and load game -------------------------------------------------------

  saveGame() {
    this.dataStore.saveGameStateToLocalStorage();
  }

  loadGame() {
    this.dataStore.loadGameStateFromLocalStorage();
  }

  discardSavedGame() {
    this.dataStore.discardSavedGame();
  }
}
