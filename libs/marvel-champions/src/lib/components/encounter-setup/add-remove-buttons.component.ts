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
      <div
        class="tw-flex tw-flex-row tw-gap-2"
        *ngIf="!cardState.isInGame && !cardState.isSetAside; else removeButton"
      >
        <!-- Add buttons -->
        <button
          pButton
          class="p-button-rounded p-button-primary"
          icon="fa-solid fa-plus"
          (click)="onClickAddToGame()"
        >
          <span class="tw-ml-2 tw-text-xs">Add</span>
        </button>
        <button
          pButton
          class="p-button-rounded p-button-secondary"
          icon="fa-solid fa-share"
          (click)="onClickAddToSetAside()"
        >
          <span class="tw-ml-2 tw-text-xs">Set aside</span>
        </button>
      </div>
    </div>

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
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CardSelectorAddRemoveButtonsComponent {
  @Input() cardState: { isInGame: boolean; isSetAside: boolean } = {
    isInGame: false,
    isSetAside: false,
  };
  @Input() classes = '';

  @Output() addToGame = new EventEmitter<void>();
  @Output() removeFromGame = new EventEmitter<void>();
  @Output() addToSetAside = new EventEmitter<void>();
  @Output() removeFromSetAside = new EventEmitter<void>();

  onClickAddToGame() {
    this.addToGame.emit();
  }

  onClickAddToSetAside() {
    this.addToSetAside.emit();
  }

  onClickRemove() {
    if (this.cardState.isInGame) {
      this.removeFromGame.emit();
      return;
    }
    if (this.cardState.isSetAside) {
      this.removeFromSetAside.emit();
      return;
    }
    console.error('Error when clicking remove button', this.cardState);
  }
}
