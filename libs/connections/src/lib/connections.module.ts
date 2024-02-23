import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConnectionsGameComponent } from './components/game.component';
import { ConnectionsGameService } from './services/game.service';
import { DragDropModule } from 'primeng/dragdrop';


@NgModule({
  providers: [ConnectionsGameService],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    DragDropModule,
    ProgressBarModule,
  ],
  declarations: [ConnectionsGameComponent],
  exports: [ConnectionsGameComponent],
})
export class ConnectionsModule {}
