import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameArea, IGameCard } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-area',
  template: `
    <div
      class="tw-flex tw-flex-col tw-min-w-[400px] tw-border tw-border-gray-500"
    >
      <!-- Game area header -->
      <div class="tw-flex tw-flex-row tw-justify-between tw-p-4">
        <div class="tw-capitalize tw-text-gray-600">
          {{ gameArea.label }}
        </div>
        <button
          pButton
          class="p-button-rounded p-button-danger"
          [label]="'Deck: ' + gameArea.deck.length.toString()"
          [disabled]="gameArea.deck.length === 0"
          (click)="dealFromDeck()"
        ></button>
        <button
          pButton
          class="p-button-rounded p-button-danger"
          icon="fa-solid fa-arrow-rotate-left"
          label="Reset"
          (click)="resetDeck()"
        ></button>
      </div>
      <!-- List of cards -->
      <div
        class="draggable-card-list tw-flex tw-min-h-[10rem] tw-max-w-[600px] tw-overflow-x-auto tw-bg-gray-200"
        cdkDropList
        cdkDropListOrientation="horizontal"
        [id]="gameArea.id"
        (cdkDropListDropped)="dropCard($event)"
      >
        <!-- Cards -->
        <mc-card
          *ngFor="let card of gameArea.cardsInPlay; trackBy: _trackById"
          class="draggable-card"
          cdkDrag
          [card]="card.card"
        ></mc-card>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameAreaComponent {
  private _presenter = inject(GamePresenter);

  @Input({ required: true }) gameArea: IGameArea;

  _trackById(_: number, card: IGameCard) {
    return card.id;
  }

  dropCard($event) {
    this._presenter.cdkDropCard($event);
  }

  dealFromDeck() {
    this._presenter.dealFromDeck(this.gameArea);
  }

  resetDeck() {
    this._presenter.resetDeck(this.gameArea.id);
  }
}
