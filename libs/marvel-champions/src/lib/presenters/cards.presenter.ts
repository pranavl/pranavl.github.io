import { Injectable } from '@angular/core';
import { CardsService } from '../services';

@Injectable()
export class CardsPresenter {
  constructor(private cardsService: CardsService) {}
}
