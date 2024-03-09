import { Route } from '@angular/router';
import { CardsSelectorComponent } from './components/encounter-setup/card-set-selector.component';
import { MarvelChampionsGameComponent } from './components/game/game.component';

export const marvelChampionsRoutes: Route[] = [
  {
    path: 'setup',
    component: CardsSelectorComponent,
  },
  {
    path: 'play',
    component: MarvelChampionsGameComponent,
  },
];
