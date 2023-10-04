/**
 * Definition of a card pack from MarvelCDB
 */
export interface ICardPack {
  name: string;
  code: string;
  position: number;
  available: string;
  known: number;
  total: number;
  url: string;
  id: number;
}
