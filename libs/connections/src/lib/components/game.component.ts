import { Component, ViewEncapsulation, computed } from '@angular/core';
import { ConnectionsGameService } from '../services/game.service';

@Component({
  selector: 'connections-game',
  template: `
    <div *ngIf="game$() as game" class="tw-flex tw-flex-col tw-gap-8">
      <!-- Board -->
      <div class="tw-grid tw-grid-cols-4 tw-gap-2 tw-max-w-[80vw] tw-pt-10">
        <ng-container *ngFor="let row of game.categories; index as rowIdx">
          <!-- Correct row -->
          <div
            *ngIf="row.solved; else cardRow"
            [ngClass]="[
              'tw-min-h-[88px] tw-w-full tw-col-span-4 tw-flex tw-flex-col tw-rounded-lg tw-items-center tw-justify-center tw-mb-4',
              COLOR_CLASSES[row.solved.level]
            ]"
          >
            <span class="tw-font-bold">
              {{ row.solved.name }}
            </span>
            <span>{{ row.cards.join(', ') }}</span>
          </div>
          <!-- Cards -->
          <ng-template #cardRow>
            <div
              *ngFor="let card of row.cards; index as colIdx"
              class="tw-px-10 tw-py-8 tw-bg-gray-100 tw-rounded-lg tw-text-center tw-font-bold tw-mb-4"
              pDraggable
              pDroppable
              (onDragStart)="dragStart(rowIdx, colIdx)"
              (onDrop)="onDrop(rowIdx, colIdx)"
            >
              {{ card }}
            </div>
          </ng-template>
          <!-- <div>{{ row.numCorrect === 3 ? 'One away' : '' }}</div> -->
        </ng-container>
      </div>

      <!-- Bottom row -->
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
      >
        <div
          class="tw-flex tw-flex-row tw-justify-start tw-items-center tw-gap-2 tw-min-w-[15rem]"
        >
          <span>Tries left:</span>
          <ng-container *ngFor="let life of lives$()">
            <i [ngClass]="['fas fa-star', !life ? 'tw-opacity-0' : '']"></i>
          </ng-container>
        </div>
        <!-- Shuffle -->
        <button
          pButton
          class="p-button-rounded p-button-outlined p-button-secondary"
          label="Shuffle"
          (click)="onClickShuffle()"
        ></button>
        <!-- Submit -->
        <button
          pButton
          class="p-button-rounded p-button-secondary"
          label="Submit"
          (click)="onClickSubmit()"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
      .p-draggable-enter {
        @apply tw-bg-gray-200;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionsGameComponent {
  public readonly game$ = this.gameService.gameState$;

  public readonly lives$ = computed(() => {
    const gameState = this.game$();
    const lives = Array(gameState.maxLives).fill(false);
    for (let i = 0; i < gameState.livesRemaining; i++) {
      lives[i] = true;
    }
    return lives;
  });

  public COLOR_CLASSES = [
    'tw-bg-yellow-200',
    'tw-bg-green-400',
    'tw-bg-blue-200',
    'tw-bg-purple-400',
  ];

  constructor(private gameService: ConnectionsGameService) {}

  dragStart(rowIdx: number, colIdx: number) {
    this.gameService.dragCard(rowIdx, colIdx);
  }

  onDrop(rowIdx: number, colIdx: number) {
    this.gameService.dropCard(rowIdx, colIdx);
  }

  onClickShuffle() {
    this.gameService.shuffleCardsInGame();
  }

  onClickSubmit() {
    this.gameService.updateGame();
  }
}
