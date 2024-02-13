import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EncounterSetupComponentModule } from './components';
import { EncounterSetupPresenter } from './presenters/encounter-setup.presenter';
import { CardsDatabaseHttpService, GameSetupService } from './services';

@NgModule({
  providers: [EncounterSetupPresenter, GameSetupService, CardsDatabaseHttpService],
  imports: [CommonModule, HttpClientModule, EncounterSetupComponentModule],
  declarations: [],
  exports: [EncounterSetupComponentModule],
})
export class MarvelChampionsModule {}
