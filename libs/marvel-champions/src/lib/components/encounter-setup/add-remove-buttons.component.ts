import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mc-add-remove-buttons',
  template: `
    <div
      [ngClass]="['tw-flex tw-flex-row tw-gap-2 tw-justify-center', classes]"
    >
      <!-- Add button -->
      <button
        *ngIf="!cardState.isInGame; else removeButton"
        pButton
        class="p-button-rounded p-button-primary"
        icon="fa-solid fa-plus"
        (click)="onClickAddToGame()"
      >
        <span class="tw-ml-2 tw-text-xs">Add</span>
      </button>

      <!-- Remove button -->
      <ng-template #removeButton>
        <button
          pButton
          class="p-button-rounded p-button-danger"
          icon="fa-solid fa-minus"
          (click)="onClickRemove()"
        >
          <span class="tw-ml-2 tw-text-xs">Remove</span>
        </button>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CardSelectorAddRemoveButtonsComponent {
  @Input() cardState: { isInGame: boolean } = {
    isInGame: false,
  };
  @Input() classes = '';

  @Output() addToGame = new EventEmitter<void>();
  @Output() removeFromGame = new EventEmitter<void>();

  onClickAddToGame() {
    this.addToGame.emit();
  }

  onClickRemove() {
    if (this.cardState.isInGame) {
      this.removeFromGame.emit();
      return;
    }
    console.error('Error when clicking remove button', this.cardState);
  }
}
