import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConnectionsGameComponent } from './components/game.component';
import { ConnectionsHeaderComponent } from './components/header.component';
import { ConnectionsGameService } from './services/game.service';

@NgModule({
  providers: [ConnectionsGameService],
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    DragDropModule,
    ProgressBarModule,
  ],
  declarations: [ConnectionsGameComponent, ConnectionsHeaderComponent],
  exports: [ConnectionsGameComponent, ConnectionsHeaderComponent],
})
export class ConnectionsModule {}
