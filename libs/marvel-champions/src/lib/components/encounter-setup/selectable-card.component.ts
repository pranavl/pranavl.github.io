import { Component, Input, ViewEncapsulation, computed } from '@angular/core';
import { ICard } from '../../interfaces';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-selectable-card',
  template: `
    <div class="tw-flex-col">
      <mc-card [card]="card" [showImage]="true"></mc-card>
      <div
        class="tw-mt-[-16px] tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-text-sm"
      >
        <!-- Add/remove cards from game -->
        <button
          *ngIf="!viewModel$().isInGame; else removeCardFromGameButton"
          pButton
          class="p-button-rounded p-button-primary tw-text-sm"
          icon="fa-solid fa-plus"
          label="Add"
          (click)="addCardToGame()"
        ></button>
        <ng-template #removeCardFromGameButton>
          <button
            pButton
            class="p-button-rounded p-button-primary tw-text-sm"
            icon="fa-solid fa-minus"
            label="Remove"
            (click)="removeCardFromGame()"
          ></button>
        </ng-template>
        <!-- Add remove cards from "set aside" -->
        <button
          *ngIf="!viewModel$().isSetAside; else removeCardFromSetAsideButton"
          pButton
          class="p-button-rounded p-button-secondary tw-text-sm"
          icon="fa-solid fa-forward"
          label="Set aside"
          (click)="addCardToSetAside()"
        ></button>
        <ng-template #removeCardFromSetAsideButton>
          <button
            pButton
            class="p-button-rounded p-button-secondary tw-text-sm"
            icon="fa-solid fa-reply"
            label="Remove from set aside"
            (click)="removeCardFromSetAside()"
          ></button>
        </ng-template>
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

  public viewModel$ = computed(() => ({
    isInGame: this._presenter.cardsInGame$().has(this.card.code),
    isSetAside: this._presenter.cardsSetAside$().has(this.card.code),
  }));

  addCardToGame() {
    this._presenter.addCardsToGame(this.card);
  }

  removeCardFromGame() {
    this._presenter.removeCardsFromGame(this.card);
  }

  addCardToSetAside() {
    this._presenter.addCardsToSetAside(this.card);
  }

  removeCardFromSetAside() {
    this._presenter.removeCardsFromSetAside(this.card);
  }
}
