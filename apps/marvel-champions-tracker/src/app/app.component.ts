import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarvelChampionsModule } from 'marvel-champions';

@Component({
  standalone: true,
  imports: [RouterModule, MarvelChampionsModule],
  selector: 'apps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
