import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ICard } from '../../interfaces';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-selectable-card',
  template: `
    <div class="tw-flex-col">
      <mc-card [card]="card" [showImage]="true"></mc-card>
      <div class="tw-mt-[-16px] tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-text-sm">
        <button
          pButton
          class="p-button-rounded p-button-primary tw-text-sm"
          icon="fa-solid fa-plus"
          label="Add"
        ></button>
        <button
          pButton
          class="p-button-rounded p-button-secondary tw-text-sm"
          icon="fa-solid fa-forward"
          label="Set aside"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
      button .p-button-label {
        @apply tw-text-sm;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SelectableCardComponent {
  @Input() card: ICard;
  @Input() showImage: boolean = true;

  constructor(private _presenter: EncounterSetupPresenter) {}
}
