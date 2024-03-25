import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameArea } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-area-toolbar',
  template: `
    <div class="tw-flex tw-flex-row tw-gap-4">
      <div
        class="tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-items-center"
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
          (click)="dealFromDeck()"
          [disabled]="gameArea.deck.length === 0"
        ></button>
        <!-- Search deck -->
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-magnifying-glass"
          pTooltip="Search deck"
          (click)="searchDeck()"
        ></button>
        <!-- Peek at deck -->
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-eye"
          pTooltip="Peek deck"
          (click)="peek()"
        ></button>
      </div>
      <div
        class="tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-items-center"
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

  searchDeck() {}

  peek() {}

  resetDeck() {
    this._presenter.resetDeck(this.gameArea.id);
  }
}
