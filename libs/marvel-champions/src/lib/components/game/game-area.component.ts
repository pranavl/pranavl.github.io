import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameArea, IGameCard } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-area',
  template: `
    <div class="tw-flex tw-flex-col tw-border-2 tw-border-gray-500 tw-rounded-lg">
      <!-- Game area header -->
      <div
        class="tw-flex tw-flex-row tw-gap-2 tw-justify-between tw-items-center tw-p-2 tw-bg-white tw-rounded-t-lg"
      >
        <div class="tw-pl-2 tw-uppercase tw-font-semibold tw-text-gray-600">
          <i [class]="gameArea.icon"></i>
          {{ gameArea.label }}
        </div>
        <mc-game-area-toolbar [gameArea]="gameArea"></mc-game-area-toolbar>
      </div>
      <!-- Cards in the game area -->
      <div
        class="draggable-card-list tw-flex tw-min-h-[240px] tw-gap-2 tw-overflow-x-auto tw-bg-gray-200 tw-rounded-b-lg tw-justify-center tw-items-center tw-py-2"
        cdkDropList
        cdkDropListOrientation="horizontal"
        [id]="gameArea.id"
        (cdkDropListDropped)="dropCard($event)"
      >
        <!-- Cards -->
        <mc-game-card
          *ngFor="let card of gameArea.cardsInPlay; trackBy: _trackById"
          class="draggable-card"
          cdkDrag
          [card]="card"
          [areaId]="gameArea.id"
        ></mc-game-card>
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
