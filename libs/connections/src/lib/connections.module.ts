import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { ConnectionsGameComponent } from './components/game.component';
import { ConnectionsGameService } from './services/game.service';

@NgModule({
  providers: [ConnectionsGameService],
  imports: [CommonModule, HttpClientModule, ButtonModule, DragDropModule],
  declarations: [ConnectionsGameComponent],
  exports: [ConnectionsGameComponent],
})
export class ConnectionsModule {}
