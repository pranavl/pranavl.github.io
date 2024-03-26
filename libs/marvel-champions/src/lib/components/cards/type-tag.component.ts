import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardTypeDefinitions, ECardType } from '../../interfaces';

@Component({
  selector: 'mc-card-type-tag',
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="[
        'tw-p-1 tw-text-xs tw-uppercase tw-rounded-md tw-text-center tw-font-semibold',
        style
      ]"
    >
      {{ label }}
    </div>
  `,
  standalone: true,
})
export class CardTypeTagComponent {
  @Input({ required: true }) type: ECardType;

  get label() {
    return CardTypeDefinitions[this.type].label;
  }

  get style() {
    return CardTypeDefinitions[this.type].style;
  }
}
