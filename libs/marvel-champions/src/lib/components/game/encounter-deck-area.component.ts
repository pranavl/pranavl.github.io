import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameArea } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-encounter-deck-area',
  template: `
    <div class="tw-flex tw-flex-col tw-border tw-border-gray-500 tw-rounded-lg">
      <!-- Game area header -->
      <div
        class="tw-flex tw-flex-row tw-justify-center tw-p-2 tw-bg-white tw-rounded-t-lg"
      >
        <div class="tw-capitalize tw-text-gray-600">
          {{ gameArea.label }}
        </div>
      </div>
      <!-- Body -->
      <div
        class="tw-flex tw-flex-row tw-gap-2 tw-p-2 tw-justify-center"
      >
        <!-- Deck -->
        <div class="tw-flex tw-flex-col tw-flex-grow tw-gap-4 tw-max-w-1/2">
          <div
            class="tw-bg-blue-100 tw-flex tw-flex-grow tw-items-center tw-justify-center"
          >
            {{ gameArea.deck.length }}
          </div>
        </div>
        <!-- Discard -->
        <div class="tw-flex tw-flex-col tw-flex-grow tw-gap-4 tw-max-w-1/2">
          <div
            class="tw-bg-red-100 tw-flex tw-gap-2 tw-flex-grow tw-items-center tw-justify-center"
          >
            <i class="fas fa-trash"></i>
            {{ gameArea.discard.length }}
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EncounterDeckAreaComponent {
  private _presenter = inject(GamePresenter);

  @Input({ required: true }) gameArea: IGameArea;

  dealFromDeck() {
    this._presenter.dealFromDeck(this.gameArea);
  }

  resetDeck() {
    this._presenter.resetDeck(this.gameArea.id);
  }
}
