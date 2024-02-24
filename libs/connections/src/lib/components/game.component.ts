import { Component, ViewEncapsulation, computed } from '@angular/core';
import { CATEGORY_COLORS } from '../config';
import { GameStatus } from '../interfaces';
import { ConnectionsGameService } from '../services/game.service';

@Component({
  selector: 'connections-game',
  template: `
    <div *ngIf="game$() as game" class="tw-flex tw-flex-col tw-gap-8">
      <div class="tw-text-center tw-font-light">
        Create four groups of four!
      </div>
      <!-- Board -->
      <div
        class="tw-shrink tw-grid tw-grid-cols-4 tw-gap-2 tw-min-w-[50vw] tw-max-w-[90vw]"
      >
        <ng-container
          *ngFor="
            let row of game.categories;
            index as rowIdx;
            trackBy: _trackByRowIdx
          "
        >
          <!-- Answer row -->
          <div
            *ngIf="row.solved; else cardRow"
            [ngClass]="[
              'tw-flex tw-min-h-[88px] tw-w-full tw-col-span-4 tw-flex tw-flex-col tw-rounded-lg tw-items-center tw-justify-center',
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
            <!-- class="tw-px-10 tw-py-8 tw-bg-gray-100 tw-rounded-lg tw-text-center tw-font-bold" -->
            <div
              *ngFor="let card of row.cards; index as colIdx"
              [ngClass]="[
                'tw-h-[88px] tw-flex tw-bg-gray-100 tw-rounded-lg tw-justify-center tw-items-center tw-text-wrap tw-cursor-pointer',
                selectedCard$()?.row === rowIdx &&
                selectedCard$()?.column === colIdx
                  ? 'tw-bg-gray-300'
                  : 'tw-bg-gray-100'
              ]"
              pDraggable
              pDroppable
              (onDragStart)="dragStart(rowIdx, colIdx)"
              (onDrop)="onDrop(rowIdx, colIdx)"
              (click)="clickCard(rowIdx, colIdx)"
            >
              <span
                [ngClass]="[
                  'tw-font-bold tw-max-w-[80px] tw-text-wrap tw-text-center',
                  card.length > 6 ? 'tw-text-sm' : ''
                ]"
              >
                {{ card }}
              </span>
            </div>
          </ng-template>

          <!-- Num correct -->
          <div class="tw-col-span-4 tw-mb-4">
            <p-progressBar
              [value]="(row.numCorrect / 4) * 100"
              styleClass="!tw-h-[5px] !tw-bg-gray-300"
              [showValue]="false"
            ></p-progressBar>
          </div>
        </ng-container>
      </div>

      <!-- Bottom row -->
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
      >
        <div
          class="tw-flex tw-flex-row tw-justify-start tw-items-center tw-gap-2"
        >
          <span>Tries:</span>
          <ng-container
            *ngFor="let life of lives$(); index as i; trackBy: _trackByLife"
          >
            <i
              [ngClass]="[
                'fas fa-star tw-transition-opacity tw-text-gray-600',
                !life ? 'tw-opacity-0' : 'tw-opacity-1'
              ]"
            ></i>
          </ng-container>
        </div>
        <!-- Shuffle -->
        <button
          pButton
          class="p-button-rounded p-button-outlined p-button-secondary"
          label="Shuffle"
          [disabled]="!canPlay$()"
          (click)="onClickShuffle()"
        ></button>
        <!-- Submit -->
        <button
          pButton
          class="p-button-rounded p-button-secondary"
          label="Submit"
          [disabled]="!game.userHasPlayed || !isPlaying$()"
          (click)="onClickSubmit()"
        ></button>
      </div>

      <!-- Dev tools -->
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
      >
        <!-- Solve -->
        <button
          pButton
          class="p-button-rounded p-button-warning"
          label="Reset"
          (click)="_onClickReset()"
        ></button>
        <!-- Solve -->
        <button
          pButton
          class="p-button-rounded p-button-success"
          label="Solve"
          (click)="_onClickSolve()"
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

  public readonly canPlay$ = computed(
    () => ![GameStatus.OVER, GameStatus.WIN].includes(this.game$().gameStatus)
  );

  public readonly isPlaying$ = computed(
    () => this.game$().gameStatus === GameStatus.PLAYING
  );

  public readonly selectedCard$ = this.gameService.selectedCard$;

  public COLOR_CLASSES = CATEGORY_COLORS;

  constructor(private gameService: ConnectionsGameService) {}

  _trackByRowIdx(index: number) {
    return `row-${index}`;
  }

  _trackByLife(index: number) {
    return `star-${index}`;
  }

  clickCard(rowIdx: number, colIdx: number) {
    this.gameService.clickCard(rowIdx, colIdx);
  }

  dragStart(rowIdx: number, colIdx: number) {
    this.gameService.dragCard(rowIdx, colIdx);
  }

  onDrop(rowIdx: number, colIdx: number) {
    this.gameService.dropCard(rowIdx, colIdx);
  }

  onClickShuffle() {
    this.gameService.shuffleCards();
  }

  onClickSubmit() {
    this.gameService.updateGame();
  }

  // Dev functions ------------------------------------------------------------

  _onClickReset() {
    this.gameService._devReset();
  }

  _onClickSolve() {
    this.gameService._devSolve();
  }
}
