import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICard, ICardPack } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CardsDatabaseHttpService {
  /**
   * URL for the Marvel CDB API
   */
  // private API_URL = 'https://marvelcdb.com/api/public';

  constructor(private _http: HttpClient) {}

  /**
   * Get the list of packs
   */
  public getPacks() {
    // return this._http.get<ICardPack[]>(`${this.API_URL}/packs`);
    return this._http.get<ICardPack[]>(`/api/public/packs`);
  }

  /**
   * Get all cards in a pack
   * @param packCode pack code
   */
  public getCardsInPack(packCode: string) {
    // return this._http.get<ICardPack[]>(`${this.API_URL}/cards/${packCode}`);
    return this._http.get<ICard[]>(`/api/public/cards/${packCode}`);
  }
}
