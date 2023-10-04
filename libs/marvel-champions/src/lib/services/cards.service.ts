import { Injectable, WritableSignal, signal } from '@angular/core';
import { ECardFaction, IAnyCard, ICardPack } from '../interfaces';
import { CardsDatabaseHttpService } from './cdb.http-service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  readonly packsList: WritableSignal<ICardPack[]> = signal([]);
  readonly loadedCards: WritableSignal<IAnyCard[]> = signal([]);

  constructor(private cdbService: CardsDatabaseHttpService) {}

  loadPacks() {
    this.cdbService.getPacks().subscribe((packs) => this.packsList.set(packs));
  }

  loadCardsInPack(packCode: string, factions: ECardFaction[]) {
    this.cdbService.getCardsInPack(packCode).subscribe((cards) => {
      // Filter by faction
      const filteredCards = cards.filter((card) =>
        factions.includes(card.faction_code)
      );
      // Update the list of loaded cards
      this.loadedCards.mutate((value) => {
        const cardMap = new Map<string, IAnyCard>(
          value.map((v) => [v.code, v])
        );
        filteredCards.forEach((card) => cardMap.set(card.code, card));
        return Array.from(cardMap.values());
      });
    });
  }

  unloadCardsInPack(packCode: string) {
    this.loadedCards.mutate((value) =>
      value.filter((card) => card.pack_code !== packCode)
    );
  }

  resetPacksList() {
    this.packsList.set([]);
  }
  resetLoadedCards() {
    this.loadedCards.set([]);
  }
}
