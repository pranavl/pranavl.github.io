import { Component, ViewEncapsulation, computed, effect } from '@angular/core';
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
        class="tw-grid tw-grid-cols-4 tw-gap-2 tw-min-w-[60vw] tw-max-w-[90vw]"
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
                'tw-min-w-[80px] tw-h-[88px] tw-flex tw-bg-gray-100 tw-rounded-lg tw-justify-center tw-items-center tw-text-wrap tw-cursor-pointer',
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

      <!-- Lives remaining -->
      <div
        class="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-2"
      >
        <span class="tw-font-light">Mistakes remaining:</span>
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

      <!-- Buttons -->
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
      >
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
          *ngIf="canPlay$()"
          pButton
          class="p-button-rounded p-button-secondary"
          label="Submit"
          [disabled]="!game.userHasPlayed || !isPlaying$()"
          (click)="onClickSubmit()"
        ></button>
        <!-- Show results -->
        <button
          *ngIf="!canPlay$()"
          pButton
          class="p-button-rounded p-button-outlined p-button-secondary"
          label="See results"
          (click)="onShowResults()"
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

      <!-- End of game dialog -->
      <p-dialog
        [header]="endOfGameDialogHeader"
        [(visible)]="endOfGameDialogVisible"
        [style]="{ 'max-width': '450px', 'width': '80vw' }"
        [draggable]="false"
        [modal]="true"
        [dismissableMask]="true"
        (onHide)="onShowSolution()"
      >
        <!-- Grid of colors -->
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6"
        >
          <span>Your results</span>

          <div class="tw-flex tw-flex-col tw-gap-1">
            <div
              *ngFor="let row of score$().levels"
              class="tw-flex tw-flex-row tw-gap-1"
            >
              <span
                *ngFor="let col of row"
                [ngClass]="[
                  'tw-w-[2rem] tw-h-[2rem] tw-rounded-md',
                  COLOR_CLASSES[col]
                ]"
              ></span>
            </div>
          </div>

          <!-- Share -->
          <button
            pButton
            class="p-button-rounded p-button-secondary p-button-outlined"
            [label]="
              resultsCopiedToClipboard
                ? 'Copied to clipboard!'
                : 'Share your results'
            "
            [disabled]="resultsCopiedToClipboard"
            (click)="onClickShare()"
          ></button>
        </div>
      </p-dialog>
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

  public readonly score$ = this.gameService.score$;

  public readonly lives$ = computed(() => {
    const gameState = this.game$();
    const lives = Array(gameState.maxLives).fill(false);
    for (let i = 0; i < gameState.livesRemaining; i++) {
      lives[i] = true;
    }
    return lives;
  });

  public readonly canPlay$ = computed(
    () => ![GameStatus.OVER, GameStatus.WIN].includes(this.game$()?.gameStatus)
  );

  public readonly isPlaying$ = computed(
    () => this.game$().gameStatus === GameStatus.PLAYING
  );

  public readonly selectedCard$ = this.gameService.selectedCard$;

  public endOfGameDialogVisible: boolean = false;
  public endOfGameDialogHeader: string = null;
  private shownEndOfGameDialog: boolean = false;
  public resultsCopiedToClipboard: boolean = false;

  public COLOR_CLASSES = CATEGORY_COLORS;

  constructor(private gameService: ConnectionsGameService) {
    // What to do on a game over
    effect(() => {
      if (!this.canPlay$() && !this.shownEndOfGameDialog) {
        this.shownEndOfGameDialog = true;
        const gameStatus = this.game$()?.gameStatus;
        this.onGameOver(gameStatus);
      }
    });
  }

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

  onGameOver(status: GameStatus) {
    if (status == GameStatus.OVER) {
      this.endOfGameDialogHeader = 'Game Over!';
    } else if (status == GameStatus.WIN) {
      this.endOfGameDialogHeader = 'Congratulations!';
    }

    setTimeout(() => {
      this.endOfGameDialogVisible = true;
    }, 500);
  }

  onShowResults() {
    this.endOfGameDialogVisible = true;
  }

  onClickShare() {
    this.gameService.shareScore();
    this.resultsCopiedToClipboard = true;
  }

  onShowSolution() {
    this.resultsCopiedToClipboard = false;
    this.gameService.solveForGameOver();
  }

  // Dev functions ------------------------------------------------------------

  _onClickReset() {
    this.shownEndOfGameDialog = false;
    this.gameService._devReset();
  }

  _onClickSolve() {
    this.gameService._devSolve();
  }
}
