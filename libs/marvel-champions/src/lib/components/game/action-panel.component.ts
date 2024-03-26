import { Component, ViewEncapsulation, inject } from '@angular/core';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-action-panel',
  template: `
    <div class="tw-h-full tw-pr-2">
      <div class="tw-h-full tw-p-4 tw-rounded-lg tw-bg-gray-300 tw-overflow-y-auto">
        {{ data$() | json }}
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionPanelComponent {
  private _presenter = inject(GamePresenter);

  public data$ = this._presenter.focused$;
}
