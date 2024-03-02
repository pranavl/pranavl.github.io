import { Component, ViewEncapsulation, computed } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-card-set-selector',
  template: `
    <div class="tw-flex tw-h-[100vh]">
      <!-- List of sets -->
      <p-listbox
        class="tw-w-[25rem] tw-overflow-y-auto"
        [options]="setListViewModel$()"
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
          <div
            class="tw-flex tw-flex-row tw-w-full tw-justify-between tw-text-sm"
          >
            <span> {{ item.label }}</span>
            <!-- Number of cards in the set that have been added/set aside -->
            <div *ngIf="item.numCardsInGame + item.numCardsSetAside > 0">
              <span
                class="tw-px-2 tw-py-1 tw-rounded-l-full tw-bg-orange-100"
                >{{ item.numCardsInGame }}</span
              >
              <span class="tw-px-2 tw-py-1 tw-rounded-r-full tw-bg-gray-100">{{
                item.numCardsSetAside
              }}</span>
            </div>
          </div>
        </ng-template>
      </p-listbox>

      <!-- Right content -->
      <div class="tw-flex tw-flex-col tw-overflow-y-auto tw-w-full">
        <div *ngIf="selectedSetViewModel$() as vm; else noSetSelected">
          <!-- Header -->
          <div
            class="tw-flex tw-min-h-[3rem] tw-px-4 tw-bg-orange-200 tw-items-center tw-justify-between"
          >
            {{ vm.setInfo?.card_set_name }}
            <!-- Add remove buttons -->
            <mc-add-remove-buttons
              [cardState]="selectedSetButtonViewModel$()"
              (addToGame)="addCardsInSetToGame()"
              (removeFromGame)="removeCardsInSetFromGame()"
              (addToSetAside)="addCardsInSetToSetAside()"
              (removeFromSetAside)="removeCardsInSetFromSetAside()"
            ></mc-add-remove-buttons>
          </div>
          <!-- Card list -->
          <div
            class="tw-flex tw-flex-wrap tw-gap-4 tw-w-full tw-overflow-y-auto tw-p-4 tw-justify-center"
            cdkScrollable
          >
            <div
              *ngFor="let card of selectedSetViewModel$()?.cardsInSelectedSet"
            >
              <mc-selectable-card
                [card]="card"
                [showImage]="true"
              ></mc-selectable-card>
            </div>
          </div>
        </div>

        <!-- If no set has been selected yet -->
        <ng-template #noSetSelected>
          <div class="tw-flex tw-items-center tw-justify-center tw-h-full">
            Select a set
          </div>
        </ng-template>
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
  public setListViewModel$ = this._presenter.cardSetListViewModel$;
  public selectedSetViewModel$ = this._presenter.cardSetViewModel$;
  public selectedSetButtonViewModel$ = computed(() => {
    const vm = this._presenter.cardSetViewModel$();
    return {
      isInGame: vm.numCardsInGame > 0,
      isSetAside: vm.numCardsSetAside > 0,
    };
  });

  constructor(private _presenter: EncounterSetupPresenter) {}

  onChangeSelectedSet($event) {
    this._presenter.updateSelectedSet($event?.value);
  }

  addCardsInSetToGame() {
    this._presenter.addCardsToGame(
      ...this.selectedSetViewModel$().cardsInSelectedSet
    );
  }

  removeCardsInSetFromGame() {
    this._presenter.removeCardsFromGame(
      ...this.selectedSetViewModel$().cardsInSelectedSet
    );
  }

  addCardsInSetToSetAside() {
    this._presenter.addCardsToSetAside(
      ...this.selectedSetViewModel$().cardsInSelectedSet
    );
  }

  removeCardsInSetFromSetAside() {
    this._presenter.removeCardsFromSetAside(
      ...this.selectedSetViewModel$().cardsInSelectedSet
    );
  }
}
