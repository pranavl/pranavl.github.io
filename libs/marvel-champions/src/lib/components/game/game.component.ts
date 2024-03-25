import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EGameAreaType } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game',
  template: `
    <div class="tw-h-screen tw-flex tw-flex-col tw-gap-2">
      <!-- Header -->
      <div class="tw-flex tw-gap-2 tw-bg-gray-100 tw-p-2 tw-justify-end">
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-floppy-disk"
          (click)="saveGame()"
        ></button>
        <button
          pButton
          class="p-button-icon p-button-outlined"
          icon="fas fa-download"
          (click)="loadGame()"
        ></button>
      </div>

      <div class="tw-flex tw-flex-grow tw-flex-row tw-gap-4 tw-overflow-hidden">
        <!-- Board -->
        <div
          class="tw-flex-1 tw-h-full tw-overflow-y-auto tw-flex tw-flex-col tw-gap-2 tw-p-2"
          cdkDropListGroup
        >
          <!-- Top row game areas: main scheme, villain -->
          <div
            class="tw-flex tw-justify-between tw-p-2 tw-gap-4 tw-rounded-lg tw-bg-orange-100"
          >
            <mc-game-area class="tw-w-full" [gameArea]="mainSchemeArea$()">
            </mc-game-area>
            <mc-game-area class="tw-w-full" [gameArea]="villainArea$()">
            </mc-game-area>
          </div>
          <!-- Second row: Encounter -->
          <div
            class="tw-flex tw-justify-between tw-p-2 tw-gap-4 tw-rounded-lg tw-bg-orange-100"
          >
            <mc-game-area class="tw-w-full" [gameArea]="encounterArea$()">
            </mc-game-area>
          </div>
        </div>

        <!-- Action panel -->
        <div class="tw-w-[300px] tw-overflow-y-auto">
          <mc-action-panel></mc-action-panel>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameComponent {
  private _presenter = inject(GamePresenter);

  public gameState$ = this._presenter.gameState$;

  public villainArea$ = this._presenter.villainGameArea$;
  public mainSchemeArea$ = this._presenter.mainSchemeGameArea$;
  public encounterArea$ = this._presenter.encounterDeckGameArea$;

  public GameAreaType = EGameAreaType;

  saveGame() {
    this._presenter.saveGame();
  }

  loadGame() {
    this._presenter.loadGame();
  }
}
