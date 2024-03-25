import { Component, ViewEncapsulation, inject } from '@angular/core';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-action-panel',
  template: ` <div class="tw-h-full tw-bg-gray-500 tw-border tw-border-red-500">
    hello world
  </div> `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionPanelComponent {
  private _presenter = inject(GamePresenter);
}
