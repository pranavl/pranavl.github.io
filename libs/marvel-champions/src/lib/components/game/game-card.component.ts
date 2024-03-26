import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { IGameCard } from '../../interfaces';
import { GamePresenter } from '../../presenters/game.presenter';

@Component({
  selector: 'mc-game-card',
  template: `
    <div
      class="tw-flex tw-flex-row tw-gap-1 tw-p-1 tw-rounded-lg tw-bg-gray-100"
    >
      <!-- Card -->
      <mc-card [card]="card.card" [showImage]="true"></mc-card>
      <!-- Buttons -->
      <div
        class="tw-flex tw-flex-col tw-justify-between tw-bg-gray-100 tw-rounded-lg"
      >
        <!-- Top content -->
        <div class="tw-flex tw-flex-col tw-gap-1">
          <div
            *ngIf="card.inPlayState.usesHealth"
            class="tw-w-full tw-p-2 tw-rounded-lg tw-text-center tw-bg-red-100 tw-text-red-500 tw-font-semibold"
            pTooltip="Health"
            tooltipPosition="right"
            [showDelay]="500"
          >
            {{ card.inPlayState.health }}
          </div>
          <div
            *ngIf="card.inPlayState.usesThreat"
            class="tw-w-full tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-orange-100 tw-text-orange-500"
            pTooltip="Threat"
            tooltipPosition="right"
            [showDelay]="500"
          >
            <span
              class="tw-font-semibold tw-p-2 tw-border-b tw-border-orange-400"
            >
              {{ card.inPlayState.threat }}
            </span>
            <span class="tw-font-light">
              {{ card.inPlayState.maxThreat }}
            </span>
          </div>
          <div
            *ngIf="card.inPlayState.usesCounters"
            class="tw-w-full tw-p-2 tw-rounded-lg tw-text-center tw-bg-green-100 tw-text-green-500 tw-font-semibold"
            pTooltip="Counters"
            tooltipPosition="right"
            [showDelay]="500"
          >
            {{ card.inPlayState.counters }}
          </div>
        </div>
        <!-- Bottom buttons -->
        <div class="tw-flex tw-flex-col tw-gap-1">
          <button
            pButton
            class="p-button-outlined p-button-icon"
            icon="fas fa-square-arrow-up-right"
            pTooltip="Open in action panel"
            tooltipPosition="right"
            [showDelay]="500"
            (click)="focusOnCard()"
          ></button>
          <button
            pButton
            class="p-button-outlined p-button-icon p-button-danger"
            icon="fas fa-trash"
            pTooltip="Discard"
            tooltipPosition="right"
            [showDelay]="500"
            (click)="discard()"
          ></button>
        </div>
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

  focusOnCard() {
    this._presenter.focusOnArea(this.areaId, this.card)
  }

  discard() {
    this._presenter.discard(this.card, this.areaId);
  }
}
