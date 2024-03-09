import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { marvelChampionsRoutes } from 'marvel-champions';

const REDIRECT: string = 'setup';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [...marvelChampionsRoutes, { path: '**', redirectTo: REDIRECT }],
      {
        enableTracing: false,
        scrollPositionRestoration: 'top',
      }
    ),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutesModule {}
