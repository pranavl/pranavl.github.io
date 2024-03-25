import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';
import { CardsDatabaseHttpService, GameSetupService } from '../../services';
import { CardComponentModule } from '../cards';
import { EncounterDeckAreaComponent } from './encounter-deck-area.component';
import { MarvelChampionsGameAreaComponent } from './game-area.component';
import { GameCardComponent } from './game-card.component';
import { MarvelChampionsGameComponent } from './game.component';
import { GameAreaToolbarComponent } from './game-area-toolbar.component';

@NgModule({
  providers: [
    EncounterSetupPresenter,
    GameSetupService,
    CardsDatabaseHttpService,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ListboxModule,
    CardModule,
    ButtonModule,
    SelectButtonModule,
    DialogModule,
    FormsModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    CardComponentModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  declarations: [
    MarvelChampionsGameComponent,
    MarvelChampionsGameAreaComponent,
    EncounterDeckAreaComponent,
    GameCardComponent,
    GameAreaToolbarComponent
  ],
  exports: [
    MarvelChampionsGameComponent,
    MarvelChampionsGameAreaComponent,
    EncounterDeckAreaComponent,
    GameCardComponent,
    GameAreaToolbarComponent
  ],
})
export class MarvelChampionsGameComponentModule {}
