import { Component, ViewEncapsulation } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-card-set-selector',
  template: `
    <div class="tw-flex tw-h-[100vh]">
      <!-- List of sets -->
      <p-listbox
        class="tw-w-[20rem] tw-overflow-y-auto"
        [options]="cardSetList$()"
        [group]="true"
        (onChange)="onChangeSelectedSet($event)"
        [filter]="true"
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

      <!-- Right content -->
      <div class="tw-flex tw-flex-col tw-w-full">
        <!-- Header -->
        <div
          class="tw-flex tw-min-h-[3rem] tw-px-4 tw-bg-orange-200 tw-items-center tw-justify-between"
        >
          <div *ngIf="selectedSet$(); else noSetSelected;">
            {{ selectedSet$().card_set_name }}
          </div>

          <ng-template #noSetSelected>
            Select a set
          </ng-template>

          <div class="tw-flex tw-gap-2">
            <button
              pButton
              class="p-button-rounded p-button-primary tw-text-sm"
              icon="fa-solid fa-plus"
              label="Add"
              [disabled]="!selectedSet$()"
            ></button>
            <button
              pButton
              class="p-button-rounded p-button-secondary tw-text-sm"
              icon="fa-solid fa-forward"
              label="Set aside"
              [disabled]="!selectedSet$()"
            ></button>
          </div>
        </div>
        <!-- Card list -->
        <div
          class="tw-flex tw-flex-wrap tw-gap-4 tw-w-full tw-overflow-y-auto tw-p-4 tw-justify-center"
          cdkScrollable
        >
          <div *ngIf="cardsToSelect$().length === 0; else cardsList">
            Select a set
          </div>

          <ng-template #cardsList>
            <div *ngFor="let card of cardsToSelect$()">
              <mc-selectable-card
                [card]="card"
                [showImage]="true"
              ></mc-selectable-card>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .p-listbox-header {
        @apply tw-bg-gray-300;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .p-listbox-item-group {
        @apply tw-bg-gray-200;
      }
    `,
  ],
})
export class CardsSelectorComponent {
  public cardSetList$ = this._presenter.cardSetListViewModel$;
  public cardsToSelect$ = this._presenter.cardsInSelectedSet$;
  public selectedSet$ = this._presenter.selectedSet$;

  constructor(private _presenter: EncounterSetupPresenter) {}

  onChangeSelectedSet($event) {
    this._presenter.updateSelectedSet($event?.value);
    console.log(this.cardsToSelect$());
  }
}
