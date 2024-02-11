import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CardsDatabaseHttpService, CardsService } from '../../services';
import { CardComponent } from './card.component';

@NgModule({
  providers: [CardsService, CardsDatabaseHttpService],
  imports: [CommonModule, CardModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardComponentModule {}
