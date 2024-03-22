import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameCard } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-card',
  template: `
    <div class="tw-flex tw-flex-row tw-gap-1 tw-p-1 tw-rounded-lg tw-bg-gray-100">
      <!-- Card -->
      <mc-card [card]="card.card" [showImage]="true"></mc-card>
      <!-- Buttons -->
      <div class="tw-flex tw-flex-col tw-justify-center tw-bg-gray-100 tw-rounded-lg">
        <button
          pButton
          class="p-button-outlined p-button-icon p-button-danger"
          icon="fas fa-trash"
          pTooltip="Discard"
          tooltipPosition="right"
          (click)="discard()"
        ></button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class GameCardComponent {
  private _presenter = inject(GamePresenter);

  @Input({ required: true }) card: IGameCard;
  @Input({ required: true }) areaId: string;
  @Input() showImage: boolean = true;

  discard() {
    this._presenter.discard(this.card, this.areaId);
  }
}
