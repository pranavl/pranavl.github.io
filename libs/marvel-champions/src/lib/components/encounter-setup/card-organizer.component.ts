import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-card-organizer',
  template: `

  `,
  encapsulation: ViewEncapsulation.None,
})
export class EncounterCardOrganizerComponent {
  private _presenter = inject(EncounterSetupPresenter);

  public readonly cardsInGame$ = this._presenter.cardsInGame$;


  onClickStartGame() {
    this._presenter.startGame();
  }
}
