import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { CardsSelectorComponent } from './components';
import { CardComponent } from './components/card.component';
import { CardsSelectorPresenter } from './presenters/cards-selector.presenter';
import { CardsDatabaseHttpService, CardsService } from './services';

@NgModule({
  providers: [CardsSelectorPresenter, CardsService, CardsDatabaseHttpService],
  imports: [CommonModule, HttpClientModule, ListboxModule, CardModule],
  declarations: [CardsSelectorComponent, CardComponent],
  exports: [CardsSelectorComponent, CardComponent],
})
export class MarvelChampionsModule {}
