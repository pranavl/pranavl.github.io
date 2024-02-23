import { Component } from '@angular/core';
import { ConnectionsModule } from 'connections';

@Component({
  standalone: true,
  imports: [ConnectionsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'games';
}
