import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable, computed, inject } from '@angular/core';
import { IGameArea, IGameCard } from '../interfaces';
import { GameplayService } from '../services/gameplay.service';

@Injectable({ providedIn: 'root' })
export class GamePresenter {
  private gameplayService = inject(GameplayService);

  public gameState$ = this.gameplayService.gameState$;

  public gameAreas$ = computed(() => this.gameState$()?.gameAreas);
  public playerAreas$ = computed(() => this.gameState$()?.playerAreas);

  drop(gameArea: IGameArea, event: CdkDragDrop<IGameCard[]>) {
    if (event.previousContainer === event.container) {
      this.gameplayService.moveCardWithinPlayArea(
        gameArea.id,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.gameplayService.moveCardInPlayToArea(
        event.previousContainer.id,
        gameArea.id,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dealFromDeck(gameArea: IGameArea, faceUp: boolean = true) {
    const card = gameArea.deck.shift();
    this.gameplayService.addCardFromDeckToGameArea(
      card,
      gameArea.id,
      gameArea.id,
      faceUp
    );
  }

  resetDeck(areaId: string) {
    this.gameplayService.resetDeck(areaId);
  }
}
