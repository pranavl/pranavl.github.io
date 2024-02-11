import { ICard } from './cards';

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

export interface ICardSetInfo {
  card_set_code: string;
  card_set_name: string;
}

export interface ICardSet extends ICardSetInfo {
  pack_code: string;
  pack_name: string;
  cards_in_set: ICard[];
}
