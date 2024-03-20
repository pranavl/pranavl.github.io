import { Component, ViewEncapsulation, inject } from '@angular/core';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game',
  template: `
    <div
      class="tw-flex tw-justify-between tw-m-4 tw-rounded-lg tw-border tw-border-black"
      cdkDropListGroup
    >
      <!-- Top row game areas -->
      <mc-game-area *ngFor="let area of gameAreas$()" [gameArea]="area">
      </mc-game-area>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameComponent {
  private _presenter = inject(GamePresenter);

  public gameState$ = this._presenter.gameState$;
  public gameAreas$ = this._presenter.encounterGameAreas$;
}
