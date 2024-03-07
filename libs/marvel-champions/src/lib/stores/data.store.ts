import { Injectable, WritableSignal, signal } from '@angular/core';
import { ICard, IGameState, getDefaultGameState } from '../interfaces';

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
}
