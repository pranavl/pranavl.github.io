import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CardsDatabaseHttpService, GameSetupService } from '../../services';
import { CardComponent } from './card.component';

@NgModule({
  providers: [GameSetupService, CardsDatabaseHttpService],
  imports: [CommonModule, CardModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardComponentModule {}
