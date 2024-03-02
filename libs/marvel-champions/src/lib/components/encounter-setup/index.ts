import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { EncounterSetupPresenter } from '../../presenters/encounter-setup.presenter';
import { CardsDatabaseHttpService, GameSetupService } from '../../services';
import { CardComponentModule } from '../cards';
import { CardSelectorAddRemoveButtonsComponent } from './add-remove-buttons.component';
import { CardsSelectorComponent } from './card-set-selector.component';
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
    CardComponentModule,
  ],
  declarations: [
    CardsSelectorComponent,
    SelectableCardComponent,
    CardSelectorAddRemoveButtonsComponent,
  ],
  exports: [CardsSelectorComponent],
})
export class EncounterSetupComponentModule {}
