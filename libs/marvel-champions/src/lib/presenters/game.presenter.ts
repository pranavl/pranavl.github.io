import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable, computed, inject } from '@angular/core';
import { EGameAreaType, IGameArea, IGameCard } from '../interfaces';
import { GameplayService } from '../services/gameplay.service';
import { MainEncounterAreaDefinitions } from './config';

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
   * Main encounter game areas
   */
  public encounterGameAreas$ = computed(() =>
    this.gameAreasList$()
      .filter((a) => MainEncounterAreaDefinitions.has(a.type))
      .sort(
        (a, b) =>
          MainEncounterAreaDefinitions.get(a.type).sortOrder -
          MainEncounterAreaDefinitions.get(b.type).sortOrder
      )
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

  // Save and load game -------------------------------------------------------

  saveGame() {
    this.gameplayService.saveGame();
  }

  loadGame() {
    this.gameplayService.loadGame();
  }
}
