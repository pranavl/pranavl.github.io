import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  ICachedGameState,
  ICard,
  IGameState,
  getDefaultGameState,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataStore {
  public readonly cardsInGame$: WritableSignal<Map<string, ICard>> = signal(
    new Map()
  );

  public readonly gameState$: WritableSignal<IGameState> = signal(
    getDefaultGameState()
  );

  public saveGameStateToLocalStorage() {
    const gameState = this.gameState$();
    const toWrite: ICachedGameState = {
      data: {
        gameAreas: Array.from(gameState.gameAreas),
        playerAreas: gameState.playerAreas,
        modifiers: gameState.modifiers,
      },
    };
    localStorage.setItem('savedGameState', JSON.stringify(toWrite));
  }

  public loadGameStateFromLocalStorage() {
    const gameState = localStorage.getItem('savedGameState');
    if (!gameState) {
      return;
    }
    const parsed: ICachedGameState = JSON.parse(gameState);
    const loaded: IGameState = {
      gameAreas: new Map(parsed.data.gameAreas),
      playerAreas: parsed.data.playerAreas,
      modifiers: parsed.data.modifiers,
    };
    this.gameState$.set(loaded);
  }
}
