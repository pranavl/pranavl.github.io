import { Component, Input, ViewEncapsulation, computed } from '@angular/core';
import { ICard } from '../../interfaces';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-selectable-card',
  template: `
    <div *ngIf="viewModel$() as viewModel" class="tw-flex-col tw-rounded-lg">
      <mc-card
        [card]="card"
        [showImage]="true"
        [classes]="
          viewModel.isInGame
            ? CARD_IN_GAME_STYLE
            : viewModel.isSetAside
            ? CARD_SET_ASIDE_STYLE
            : ''
        "
      ></mc-card>
      <!-- Add remove buttons -->
      <mc-add-remove-buttons
        classes="tw-mt-[-16px]"
        [cardState]="viewModel"
        (addToGame)="addCardToGame()"
        (removeFromGame)="removeCardFromGame()"
        (addToSetAside)="addCardToSetAside()"
        (removeFromSetAside)="removeCardFromSetAside()"
      ></mc-add-remove-buttons>
    </div>
  `,
  styles: [
    `
      button .p-button-label {
        @apply !tw-text-sm;
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

  public CARD_IN_GAME_STYLE = 'tw-border-4 tw-border-orange-600';
  public CARD_SET_ASIDE_STYLE = 'tw-border-4 tw-border-dashed tw-border-gray-600';

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
