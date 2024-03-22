import {
  Component,
  Input,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { ICard } from '../../interfaces';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';

@Component({
  selector: 'mc-selectable-card',
  template: `
    <div *ngIf="viewModel$() as viewModel" class="tw-flex-col tw-rounded-lg">
      <mc-card
        [card]="card"
        [showImage]="true"
        [classes]="viewModel.isInGame ? CARD_IN_GAME_STYLE : ''"
      ></mc-card>
      <!-- Add remove buttons -->
      <mc-add-remove-cards-button
        classes="tw-mt-[-16px]"
        [cardState]="viewModel"
        (addToGame)="addCardToGame()"
        (removeFromGame)="removeCardFromGame()"
        [showLabel]="false"
      ></mc-add-remove-cards-button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SelectableCardComponent {
  private _presenter = inject(EncounterSetupPresenter);

  @Input({ required: true }) card: ICard;
  @Input() showImage: boolean = true;

  public viewModel$ = computed(() => ({
    isInGame: this._presenter.cardsInGame$().has(this.card.code),
  }));

  public CARD_IN_GAME_STYLE = 'tw-border-4 tw-border-orange-600';

  addCardToGame() {
    this._presenter.addCardsToGame(this.card);
  }

  removeCardFromGame() {
    this._presenter.removeCardsFromGame(this.card);
  }
}
