import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game',
  template: `
    <div cdkDropListGroup>
      <!-- Game areas -->
      <mc-game-area *ngFor="let area of gameAreas$()" [gameArea]="area">
      </mc-game-area>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameComponent {
  private _presenter = inject(GamePresenter);

  public gameState$ = this._presenter.gameState$;
  public gameAreas$ = computed(() => {
    return [...this._presenter.gameAreas$().values()];
  });
}
