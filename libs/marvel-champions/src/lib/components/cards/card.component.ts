import { Component, Input } from '@angular/core';
import { ICard } from '../../interfaces';

@Component({
  selector: 'mc-card',
  template: `
    <div
      [ngClass]="[
        'tw-border tw-border-gray-500 tw-rounded-lg tw-flex tw-flex-col',
        classes
      ]"
    >
      <!-- Title -->
      <div
        class="tw-p-2 tw-text-base tw-font-medium tw-font-semibold tw-bg-gray-200 tw-rounded-t-lg"
      >
        {{ card.name }}
      </div>
      <!-- Card type -->
      <div class="tw-py-1 tw-px-2 tw-text-xs tw-bg-gray-100 tw-italic">
        {{ card.type_name }}
      </div>
      <!-- Contents -->
      <div class="tw-p-2 tw-flex tw-flex-row tw-justify-center tw-items-center">
        <div *ngIf="showImage && !showText; else cardTextTemplate">
          <img
            [alt]="card.text"
            [src]="'https://marvelcdb.com' + card.imagesrc"
            (error)="handleError()"
            class="tw-object-scale-down tw-max-h-[20rem]"
          />
        </div>

        <ng-template #cardTextTemplate>
          <div class="tw-text-xs" [innerHTML]="card.text"></div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      ::ng-deep .p-card-body {
        @apply tw-p-0;
      }

      ::ng-deep .p-card-content {
        @apply tw-p-0;
      }
    `,
  ],
})
export class CardComponent {
  @Input() card: ICard;
  @Input() showImage: boolean = true;
  @Input() classes: string = '';

  public showText: boolean = false;

  public handleError() {
    this.showText = true;
  }
}
