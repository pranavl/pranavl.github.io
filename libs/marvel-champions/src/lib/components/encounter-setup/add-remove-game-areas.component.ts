import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-add-remove-game-areas',
  template: `
    <div class="tw-flex tw-flex-col tw-gap-4 tw-overflow-y-auto tw-p-1">
      <span class="tw-text-gray-500 tw-font-semibold tw-uppercase">
        Configure game areas
      </span>
      <div *ngFor="let ga of gameAreas$()" class="tw-flex tw-flex-row tw-gap-2">
        <!-- Default game areas  -->
        <div
          *ngIf="ga.isDefault; else userAddedGameArea"
          class="tw-flex tw-gap-2 tw-items-center tw-text-gray-500"
        >
          <i [ngClass]="[ga.icon, 'tw-min-w-[1.5rem] tw-text-gray-500']"></i>
          <span>{{ ga.label }}</span>
        </div>
        <!-- User created game areas -->
        <ng-template #userAddedGameArea>
          <input
            pInputText
            class="p-inputtext-sm"
            type="text"
            [disabled]="ga.isDefault"
            [ngModel]="ga.label"
            (ngModelChange)="renameGameArea(ga.id, $event)"
          />
          <p-button
            *ngIf="!ga.isDefault"
            icon="fas fa-trash-can"
            pTooltip="Delete game area"
            [showDelay]="500"
            tooltipPosition="right"
            class="tw-flex"
            styleClass="p-button-rounded p-button-text p-button-danger"
            (onClick)="removeGameArea(ga.id)"
          ></p-button>
        </ng-template>
      </div>
      <!-- Add button -->
      <div class="tw-px-4">
        <button
          pButton
          class="p-button-rounded p-button-outlined"
          icon="fa-solid fa-plus"
          label="Add game area"
          (click)="addGameArea()"
        >
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AddRemoveGameAreasComponent {
  private _presenter = inject(EncounterSetupPresenter);

  readonly gameAreas$ = this._presenter.gameAreasList$;

  addGameArea() {
    this._presenter.addGameArea('New game area');
  }

  removeGameArea(id: string) {
    this._presenter.removeGameArea(id);
  }

  renameGameArea(id: string, name: string) {
    this._presenter.renameGameArea(id, name);
  }
}
