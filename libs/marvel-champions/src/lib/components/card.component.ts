import { Component, Input } from '@angular/core';
import { ICard } from '../interfaces';

@Component({
  selector: 'mc-card',
  template: `
    <p-card
      [header]="card.name"
      [subheader]="card.subname"
      [style]="{ width: '360px' }"
    >
      <ng-template pTemplate="header">
        <img
          [alt]="card.name"
          [src]="'https://marvelcdb.com' + card.imagesrc"
          class="tw-object-scale-down tw-max-h-[15rem]"
        />
      </ng-template>
      <div class="tw-text-sm" [innerHTML]="card.text"></div>
    </p-card>
  `,
})
export class CardComponent {
  @Input() card: ICard;
}
