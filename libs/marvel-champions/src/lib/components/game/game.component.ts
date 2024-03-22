import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EGameAreaType } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game',
  template: `
    <div class="tw-flex tw-flex-col tw-gap-2">
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

      <!-- Board -->
      <div class="tw-p-2">
        <div
          class="tw-flex tw-justify-between tw-p-4 tw-gap-4 tw-rounded-lg tw-bg-orange-100"
          cdkDropListGroup
        >
          <!-- Top row game areas: villain, main scheme, encounter -->
          <ng-container *ngFor="let area of gameAreas$()">
            <!-- Encounter deck -->
            <mc-encounter-deck-area
              *ngIf="area.type === GameAreaType.ENCOUNTER; else generalGameArea"
              class="tw-w-1/3"
              [gameArea]="area"
            >
            </mc-encounter-deck-area>
            <!-- General game area -->
            <ng-template #generalGameArea>
              <mc-game-area class="tw-w-1/3" [gameArea]="area"> </mc-game-area>
            </ng-template>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameComponent {
  private _presenter = inject(GamePresenter);

  public gameState$ = this._presenter.gameState$;
  public gameAreas$ = this._presenter.encounterGameAreas$;

  public GameAreaType = EGameAreaType;

  saveGame() {
    this._presenter.saveGame();
  }

  loadGame() {
    this._presenter.loadGame();
  }
}
