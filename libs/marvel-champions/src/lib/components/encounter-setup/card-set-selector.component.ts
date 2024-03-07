import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-card-set-selector',
  template: `
    <div class="tw-flex tw-h-full">
      <!-- Left content -->
      <div class="tw-w-[25rem] tw-flex tw-flex-col">
        <!-- Top of list -->
        <div
          class="tw-flex tw-justify-center tw-min-h-[3rem] tw-py-2 tw-bg-blue-100"
        >
          <button
            pButton
            class="p-button-rounded p-button-primary"
            label="START"
            [disabled]="!hasCardsSelected$()"
            (click)="onClickStartGame()"
          ></button>
        </div>
        <!-- List of sets -->
        <p-listbox
          class="tw-overflow-y-auto"
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
              [ngClass]="[
                'tw-flex tw-flex-row tw-w-full tw-justify-between tw-text-sm',
                item.hasCardsInGame ? 'tw-font-semibold' : ''
              ]"
            >
              <div>{{ item.label }}</div>
              <!-- Number of cards in the set that have been added/set aside -->
              <div *ngIf="item.hasCardsInGame">
                <span class="tw-px-2 tw-py-1 tw-rounded-full tw-bg-orange-100">
                  {{ item.numCardsInGame }}
                </span>
              </div>
            </div>
          </ng-template>
        </p-listbox>
      </div>

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

    <!-- Game configuration dialog -->
    <p-dialog
      header="Set up game"
      [(visible)]="gameConfiguratorDialogVisible"
      [style]="{ 'min-width': '50vw', 'max-width': '90vw' }"
      [draggable]="false"
      [modal]="true"
      [dismissableMask]="true"
      (onHide)="debug()"
    >
      <mc-game-configurator></mc-game-configurator>
    </p-dialog>
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
  private _presenter = inject(EncounterSetupPresenter);

  public setListViewModel$ = this._presenter.cardSetListViewModel$;
  public selectedSetViewModel$ = this._presenter.cardSetViewModel$;

  public gameConfiguratorDialogVisible: boolean = false;

  public selectedSetButtonViewModel$ = computed(() => {
    const vm = this._presenter.cardSetViewModel$();
    return {
      isInGame: vm.numCardsInGame > 0,
    };
  });

  /**
   * Have any cards been added to the game?
   */
  public hasCardsSelected$ = computed(
    () => this._presenter.cardsInGame$()?.size > 0
  );

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

  onClickStartGame() {
    console.log(this._presenter.cardsInGame$());
    this.gameConfiguratorDialogVisible = true;
  }

  debug() {
    console.log(this._presenter.gameState$());
  }
}
