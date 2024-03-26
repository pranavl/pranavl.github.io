import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  EFocusType,
  EGameAreaClass,
  EGameAreaType,
  IFocusedElement,
  IGameArea,
  IGameCard,
} from '../interfaces';
import { GameplayService } from '../services/gameplay.service';

@Injectable({ providedIn: 'root' })
export class GamePresenter {
  private gameplayService = inject(GameplayService);

  public gameState$ = this.gameplayService.gameState$;

  public gameAreas$ = computed(() => this.gameState$()?.gameAreas);

  /**
   * List of game areas
   */
  private gameAreasList$ = computed(() => [
    ...(this.gameAreas$()?.values() ?? []),
  ]);

  /**
   * Main scheme game area
   */
  public mainSchemeGameArea$ = computed(() =>
    this.gameAreasList$().find((g) => g.type === EGameAreaType.MAIN_SCHEME)
  );

  /**
   * Villain game area
   */
  public villainGameArea$ = computed(() =>
    this.gameAreasList$().find((g) => g.type === EGameAreaType.VILLAIN)
  );

  /**
   * Encounter deck game area
   */
  public encounterDeckGameArea$ = computed(() =>
    this.gameAreasList$().find((g) => g.type === EGameAreaType.ENCOUNTER)
  );

  /**
   * Set aside game area
   */
  public setAsideArea$ = computed(() =>
    this.gameAreasList$().find((a) => a.type === EGameAreaType.ASIDE)
  );

  /**
   * Player areas
   */
  public playerAreas$ = computed(() => this.gameState$()?.playerAreas);

  /**
   * Game modifier state
   */
  public gameModifiers$ = computed(() => this.gameState$()?.modifiers);

  public focused$ = signal<IFocusedElement>(null);

  focusOnDeck(areaId: string) {
    const { type, data } = this.gameplayService.getArea(areaId);
    if (type !== EGameAreaClass.SCENARIO) {
      console.error(`Unsupported type for focusOnDeck function: ${type}`);
    }

    this.focused$.set({
      type: EFocusType.DECK,
      data,
    });
  }

  focusOnDiscard(areaId: string) {
    const { type, data } = this.gameplayService.getArea(areaId);
    if (type !== EGameAreaClass.SCENARIO) {
      console.error(`Unsupported type for focusOnDeck function: ${type}`);
    }

    this.focused$.set({
      type: EFocusType.DISCARD,
      data,
    });
  }

  focusOnArea(areaId: string, card?: IGameCard) {
    const { type, data } = this.gameplayService.getArea(areaId);
    const focusType =
      type === EGameAreaClass.SCENARIO
        ? EFocusType.GAME_AREA
        : type === EGameAreaClass.PLAYER
        ? EFocusType.PLAYER_AREA
        : null;

    if (!focusType) {
      console.error(`Unsupported type for focusOnArea function: ${type}`);
    }

    this.focused$.set({
      type: focusType,
      data,
      card,
    });
  }

  /**
   * Function for handling drag/drop interactions between game areas
   * @param event
   */
  cdkDropCard(event: CdkDragDrop<IGameCard[]>) {
    if (event.previousContainer === event.container) {
      this.gameplayService.moveCardWithinPlayArea(
        event.container.id,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.gameplayService.moveCardInPlayToArea(
        event.previousContainer.id,
        event.container.id,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * Deal a card from a deck into its game area
   * @param gameArea game area to deal from
   * @param faceUp face up or down?
   */
  dealFromDeck(gameArea: IGameArea, faceUp: boolean = true) {
    if (gameArea.deck.length < 1) {
      console.error('Cannot deal card from empty deck');
      return;
    }
    const card = gameArea.deck.shift();
    this.gameplayService.addCardFromDeckToGameArea(
      card,
      gameArea.id,
      gameArea.id,
      faceUp
    );
  }

  /**
   * Shuffle a discard pile back into a deck
   * @param areaId game area id
   */
  resetDeck(areaId: string) {
    this.gameplayService.resetDeck(areaId);
  }

  discard(card: IGameCard, fromAreaId: string) {
    this.gameplayService.discardCard(card, fromAreaId);
  }

  // Save and load game -------------------------------------------------------

  saveGame() {
    this.gameplayService.saveGame();
  }

  loadGame() {
    this.gameplayService.loadGame();
  }

  resetGame() {
    this.gameplayService.resetGame();
  }

  discardSavedGame() {
    this.gameplayService.discardSavedGame();
  }
}
