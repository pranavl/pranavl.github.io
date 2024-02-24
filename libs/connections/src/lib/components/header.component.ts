import { Component, ViewEncapsulation } from '@angular/core';
import { ConnectionsGameService } from '../services/game.service';

@Component({
  selector: 'connections-header',
  template: `
    <div class="tw-w-screen tw-flex tw-flex-col">
      <!-- Top row -->
      <div
        class="tw-flex tw-flex-row tw-items-end tw-gap-4 tw-py-4 tw-px-20 tw-border-b tw-border-gray-400"
      >
        <div class="tw-text-2xl tw-font-bold">Connections++</div>
        <div class="tw-text-base tw-font-light">
          {{ puzzle$()?.print_date | date }}
        </div>
      </div>
      <!-- Second row -->
      <div
        class="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-justify-between tw-py-2 tw-px-20 tw-border-b tw-border-gray-400"
      >
        <div class="tw-text-base tw-font-light tw-text-gray-500">
          Puzzle by {{ puzzle$()?.editor }}
        </div>
        <button
          pButton
          icon="fas fa-question tw-text-xl"
          class="p-button-icon p-button-rounded p-button-outlined p-button-secondary"
          (click)="showHelp()"
        ></button>
      </div>

      <!-- Help dialog -->
      <p-dialog
        header="How to Play"
        [(visible)]="visible"
        [style]="{ width: '50vw' }"
        [draggable]="false"
        [modal]="true"
        [dismissableMask]="true"
      >
        <div class="tw-flex tw-flex-col tw-gap-4">
          <span class="tw-text-lg">
            Find groups of four items that share something in common.
          </span>
          <ul class="tw-list-disc tw-pl-[2rem] tw-font-light">
            <li>
              Swap words by clicking on two cards, or by dragging one onto
              another.
            </li>
            <li>Organize words groups in each row.</li>
            <li>
              The bar under each row shows how many words in the row are in a
              category.
            </li>
            <li>Find all groups of words without making 4 mistakes.</li>
          </ul>
          <span>
            Each puzzle has exactly one solution. Watch out for words that seem
            to belong to multiple categories!
          </span>
        </div>
      </p-dialog>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionsHeaderComponent {
  public readonly puzzle$ = this.gameService.puzzle$;
  visible: boolean = false;

  constructor(private gameService: ConnectionsGameService) {}

  showHelp() {
    this.visible = true;
  }
}
