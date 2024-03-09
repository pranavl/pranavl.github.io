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
import { CardSelectorAddRemoveButtonsComponent } from './add-remove-cards-button.component';
import { AddRemoveGameAreasComponent } from './add-remove-game-areas.component';
import { EncounterCardOrganizerComponent } from './card-organizer.component';
import { CardsSelectorComponent } from './card-set-selector.component';
import { GameConfiguratorComponent } from './game-configurator.component';
import { SelectableCardComponent } from './selectable-card.component';

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
  ],
  declarations: [
    CardsSelectorComponent,
    SelectableCardComponent,
    GameConfiguratorComponent,
    AddRemoveGameAreasComponent,
    EncounterCardOrganizerComponent,
    CardSelectorAddRemoveButtonsComponent,
  ],
  exports: [CardsSelectorComponent, GameConfiguratorComponent],
})
export class EncounterSetupComponentModule {}
