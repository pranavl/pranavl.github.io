import { Component, ViewEncapsulation } from '@angular/core';
import { ConnectionsGameService } from '../services/game.service';

@Component({
  selector: 'connections-header',
  template: `
    <div class="tw-w-screen tw-flex tw-flex-col">
      <!-- Top row -->
      <div
        class="tw-flex tw-flex-row tw-items-end tw-gap-4 tw-py-4 tw-px-10 tw-border-b tw-border-gray-400"
      >
        <div class="tw-text-2xl tw-font-bold">Connections++</div>
        <div class="tw-text-base tw-font-light">
          {{ puzzle$()?.print_date | date }}
        </div>
      </div>
      <!-- Second row -->
      <div
        class="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-justify-between tw-py-2 tw-px-10 tw-border-b tw-border-gray-400"
      >
        <div class="tw-text-base tw-font-light tw-text-gray-500">
          Puzzle by {{ puzzle$()?.editor ?? '...' }}
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
        [(visible)]="infoDialogVisible"
        [style]="{ 'min-width': '40vw', 'max-width': '700px'}"
        [draggable]="false"
        [modal]="true"
        [dismissableMask]="true"
      >
        <div class="tw-flex tw-flex-col tw-gap-4">
          <!-- Info -->
          <span class="tw-text-lg">
            Find groups of four items that share something in common.
          </span>
          <ul class="tw-list-disc tw-pl-[2rem] tw-font-light">
            <li>
              Swap words by clicking on two cards, or by dragging one onto
              another.
            </li>
            <li>
              Organize words into groups in each row. Try and solve all groups
              at the same time before <b>submitting</b>!
            </li>
            <li>
              The bar under each row shows how many words in that row are in a
              category.
            </li>
            <li>Find all groups of words without making 4 mistakes.</li>
          </ul>
          <span>
            Each puzzle has exactly one solution. Watch out for words that seem
            to belong to multiple categories!
          </span>

          <!-- Disclaimer -->
          <a
            class="tw-mt-4 tw-p-4 tw-bg-purple-100 tw-rounded-md"
            href="https://www.nytimes.com/games/connections"
          >
            This game is an extension of The New York Times' Connections.<br />
            <b>Click here to play the original.</b>
          </a>
        </div>
      </p-dialog>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionsHeaderComponent {
  public readonly puzzle$ = this.gameService.puzzle$;
  public infoDialogVisible: boolean = false;

  constructor(private gameService: ConnectionsGameService) {}

  showHelp() {
    this.infoDialogVisible = true;
  }
}
