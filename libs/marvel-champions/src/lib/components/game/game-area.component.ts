import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameArea } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-area',
  template: `
    <div
      class="tw-flex tw-flex-col tw-gap-4tw-p-4 tw-border tw-border-gray-500"
    >
      <!-- Game area header -->
      <div class="tw-flex tw-flex-row tw-justify-between">
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
      <div cdkDropList [id]="gameArea.id" (cdkDropListDropped)="drop($event)">
        <div *ngFor="let card of gameArea.cardsInPlay">
          <!-- Cards -->
          <div class="tw-p-4 tw-border tw-border-orange-400" cdkDrag>
            {{ card.card.name }}
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameAreaComponent {
  private _presenter = inject(GamePresenter);

  @Input({ required: true }) gameArea: IGameArea;

  drop($event) {
    this._presenter.drop(this.gameArea, $event);
  }

  dealFromDeck() {
    this._presenter.dealFromDeck(this.gameArea);
  }

  resetDeck() {
    this._presenter.resetDeck(this.gameArea.id);
  }
}
