import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-game',
  template: `Playing game`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelChampionsGameComponent {
  private _presenter = inject(EncounterSetupPresenter);
}
