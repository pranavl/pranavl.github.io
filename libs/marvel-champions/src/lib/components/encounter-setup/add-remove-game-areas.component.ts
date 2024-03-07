import { Component, ViewEncapsulation, inject } from '@angular/core';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-add-remove-game-areas',
  template: `
    <div class="tw-flex tw-flex-col tw-gap-2">
      <span class="tw-text-gray-500 tw-text-xs tw-font-semibold tw-uppercase">
        Configure game areas
      </span>
      <div *ngFor="let ga of gameAreas$()" class="tw-flex tw-flex-row tw-gap-2">
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
      </div>
      <!-- Add button -->
      <button
        pButton
        class="p-button-rounded p-button-outlined tw-w-[170px]"
        icon="fa-solid fa-plus"
        (click)="addGameArea()"
      >
        <span class="tw-ml-2 tw-text-xs">Add game area</span>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AddRemoveGameAreasComponent {
  private _presenter = inject(EncounterSetupPresenter);

  readonly gameAreas$ = this._presenter.gameAreas$;

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
