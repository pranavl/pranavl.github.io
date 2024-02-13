import { Injectable, WritableSignal, signal } from '@angular/core';
import { ICard } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataStore {
  public readonly cardsInGame$: WritableSignal<Map<string, ICard>> = signal(
    new Map()
  );

  public readonly cardsSetAside$: WritableSignal<Map<string, ICard>> = signal(
    new Map()
  );

}
