import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-game-configurator',
  template: `
    <div class="tw-flex tw-flex-row tw-gap-4">
      <!-- Left content -->
      <div
        class="tw-flex tw-flex-col tw-gap-8 tw-p-4 tw-rounded-lg tw-bg-gray-100"
      >
        <!-- Select number of players -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <span class="tw-text-gray-500 tw-font-semibold tw-uppercase">
            Players
          </span>
          <p-selectButton
            [options]="numPlayersOptions"
            [(ngModel)]="numPlayers"
          ></p-selectButton>
        </div>
        <!-- Add and remove game areas -->
        <mc-add-remove-game-areas></mc-add-remove-game-areas>
      </div>

      <!-- Right content -->
      <mc-card-organizer> </mc-card-organizer>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class GameConfiguratorComponent {
  private _presenter = inject(EncounterSetupPresenter);

  public readonly cardsInGame$ = this._presenter.cardsInGame$;

  public readonly numPlayersOptions = [1, 2, 3, 4];
  public numPlayers: number = 1;

  onClickStartGame() {
    this._presenter.startGame();
  }
}
