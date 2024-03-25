import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameArea } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-area-toolbar',
  template: `
    <div class="tw-flex tw-flex-row tw-gap-2">
      <div
        class="tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-items-center tw-px-2 tw-py-1 tw-bg-gray-100 tw-rounded-lg"
      >
        <span>
          <i class="fas fa-box"></i>
          {{ gameArea.deck.length }}
        </span>
        <!-- Deal card -->
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-plus"
          pTooltip="Reveal next"
          tooltipPosition="top"
          (click)="dealFromDeck()"
          [disabled]="gameArea.deck.length === 0"
        ></button>
        <!-- Search deck -->
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-magnifying-glass"
          pTooltip="Search deck"
          tooltipPosition="top"
          (click)="search()"
        ></button>
        <!-- Peek at deck -->
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-eye"
          pTooltip="Peek"
          tooltipPosition="top"
          (click)="peek()"
        ></button>
      </div>
      <div
        class="tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-items-center tw-px-2 tw-py-1 tw-bg-red-100 tw-rounded-lg"
      >
        <!-- Discard -->
        <span class="tw-text-red-500">
          <i class="fas fa-trash"></i>
          {{ gameArea.discard.length }}
        </span>
        <!-- Reset deck -->
        <button
          pButton
          class="p-button-icon p-button-outlined p-button-danger"
          icon="fas fa-arrow-rotate-left"
          pTooltip="Reset deck"
          tooltipPosition="top"
          (click)="resetDeck()"
          [disabled]="gameArea.discard.length === 0"
        ></button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class GameAreaToolbarComponent {
  private _presenter = inject(GamePresenter);

  @Input({ required: true }) gameArea: IGameArea;

  dealFromDeck() {
    this._presenter.dealFromDeck(this.gameArea);
  }

  search() {}

  peek() {}

  resetDeck() {
    this._presenter.resetDeck(this.gameArea.id);
  }
}
