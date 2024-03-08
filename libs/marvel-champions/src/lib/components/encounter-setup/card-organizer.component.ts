import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Table } from 'primeng/table';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-card-organizer',
  template: `
    <p-table
      #dt1
      *ngIf="vm$() as vm"
      [value]="vm.cardsInGame"
      [tableStyle]="{ 'min-width': '60rem' }"
      styleClass="p-datatable-sm"
      [globalFilterFields]="['setName', 'name', 'type', 'gameAreaLabel']"
    >
      <ng-template pTemplate="caption">
        <div class="tw-flex tw-justify-between">
          <button
            pButton
            label="Clear"
            class="p-button-outlined"
            icon="pi pi-filter-slash"
            (click)="clear(dt1)"
          ></button>
          <span class="p-input-icon-left ml-auto">
            <i class="pi pi-search"></i>
            <input
              pInputText
              class="p-inputtext-sm"
              type="text"
              (input)="dt1.filterGlobal($any($event.target).value, 'contains')"
              placeholder="Search for cards"
            />
          </span>
        </div>
      </ng-template>
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="setName" style="width:15%">
            Set <p-sortIcon field="setName"></p-sortIcon>
          </th>
          <th pSortableColumn="name" style="width:25%">
            Name <p-sortIcon field="name"></p-sortIcon>
          </th>
          <th pSortableColumn="type" style="width:10%">
            Type <p-sortIcon field="type"></p-sortIcon>
          </th>
          <th pSortableColumn="gameAreaLabel" style="width:20%">
            Area <p-sortIcon field="gameAreaLabel"></p-sortIcon>
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-row>
        <tr>
          <td>{{ row.setName }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.type }}</td>
          <td>
            <p-selectButton
              [options]="vm.gameAreaOptions"
              optionValue="value"
              [ngModel]="row.gameAreaId"
              (onChange)="onRowGameAreaChanged(row.id, $event.value)"
            >
              <ng-template let-item pTemplate>
                <i *ngIf="item.icon" [class]="item.icon"></i>
                <span *ngIf="!item.icon">{{
                  item.label
                }}</span>
              </ng-template></p-selectButton
            >
          </td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="4">No cards found.</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EncounterCardOrganizerComponent {
  private _presenter = inject(EncounterSetupPresenter);

  public readonly vm$ = this._presenter.cardConfiguratorViewModel$;

  onRowGameAreaChanged(cardId: string, gameAreaId: string) {
    console.log(cardId, gameAreaId);
    // this._presenter.addCardToGameArea(cardId, gameAreaId);
  }

  clear(table: Table) {
    table.clear();
  }
  onClickStartGame() {
    this._presenter.startGame();
  }
}
