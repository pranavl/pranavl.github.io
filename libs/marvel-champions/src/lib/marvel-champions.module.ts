import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EncounterSetupComponentModule } from './components';
import { EncounterSetupPresenter } from './presenters/encounter-setup.presenter';
import { CardsDatabaseHttpService, CardsService } from './services';

@NgModule({
  providers: [EncounterSetupPresenter, CardsService, CardsDatabaseHttpService],
  imports: [CommonModule, HttpClientModule, EncounterSetupComponentModule],
  declarations: [],
  exports: [EncounterSetupComponentModule],
})
export class MarvelChampionsModule {}
