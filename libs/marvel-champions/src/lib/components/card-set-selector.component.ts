import { Component, ViewEncapsulation } from '@angular/core';
import { CardsSelectorPresenter } from '../presenters/cards-selector.presenter';

@Component({
  selector: 'mc-card-set-selector',
  template: `
    <div class="tw-flex tw-gap-4">
      <!-- List of sets -->
      <div class="tw-flex tw-w-[20rem]" cdkScrollable>
        <p-listbox
          class="tw-w-full"
          [options]="cardSetList$()"
          [group]="true"
          (onChange)="onChangeSelectedSet($event)"
          [filter]="true"
          [listStyle]="{ 'max-height': '90vh' }"
        >
          <ng-template let-group pTemplate="group">
            <div class="tw-flex tw-text-sm">
              <span>{{ group.label }}</span>
            </div>
          </ng-template>
          <ng-template let-item pTemplate="item">
            <div class="tw-flex tw-text-sm">
              <span>{{ item.label }}</span>
            </div>
          </ng-template>
        </p-listbox>
      </div>
      <!-- Cards in set -->
      <div class="tw-flex tw-flex-wrap tw-gap-4 tw-w-full tw-h-[90vh]" cdkScrollable>
        <div *ngIf="cardsToSelect$().length === 0; else cardsList">
          Select a set
        </div>
        <ng-template #cardsList>
          <div *ngFor="let card of cardsToSelect$()">
            <mc-card [card]="card"></mc-card>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .p-listbox-item-group {
        @apply tw-bg-gray-200;
      }
    `,
  ],
})
export class CardsSelectorComponent {
  public cardSetList$ = this._presenter.cardSetListViewModel$;
  public cardsToSelect$ = this._presenter.cardsInSelectedSet$;

  constructor(private _presenter: CardsSelectorPresenter) {}

  onChangeSelectedSet($event) {
    this._presenter.updateSelectedSet($event?.value);
  }
}
