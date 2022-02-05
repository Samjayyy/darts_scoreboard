import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameStore } from 'src/app/core/services/store/game.store';
import { Store } from 'src/app/core/services/store/stores';
import { Game } from 'src/app/shared/models/game.model';
import {
  DEL,
  ENTER,
  LEFT,
  MENU,
  RIGHT,
  X,
} from '../../../numkeyboard/utils/keys';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  game: Game | null = null;
  givenNumber: number = 0;
  processing: boolean = false;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private gameStore: GameStore, private router: Router) {}

  ngOnInit() {
    // get the game
    this.givenNumber = 0;
    this.gameStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store: Store<Game>) => {
        this.game = store.data;
      });
  }

  handleKey(key: string): void {
    if (key.length === 1) {
      var num = key.charCodeAt(0) - '0'.charCodeAt(0);
      if (num >= 0 && num <= 9) {
        this.handleDigit(num);
        return;
      }
    }
    if (this.handleAction(key) && this.game) {
      this.gameStore.save(this.game);
    }
  }

  get shouldDisableKey(): (key: string) => boolean {
    return (key: string) => {
      if (!this.game || this.processing) {
        return key !== MENU;
      }
      if (key.length === 1) {
        var num = key.charCodeAt(0) - '0'.charCodeAt(0);
        if (num >= 0 && num <= 9) {
          return (
            (this.givenNumber === 0 && num === 0) ||
            this.givenNumber * 10 + num > this.game.selectedPlayer.score
          );
        }
      }
      switch (key) {
        case LEFT:
          return this.game.totalThrowCount === 0;
        case RIGHT:
          return this.game.redoScores.length === 0;
        case ENTER:
        case DEL:
          return this.givenNumber <= 0;
        case MENU:
          return false;
      }
      return false;
    };
  }

  private handleDigit(digit: number) {
    var nextNumber = this.givenNumber * 10 + digit;
    if (nextNumber > 180) {
      return;
    }
    this.givenNumber = nextNumber;
  }

  private handleAction(action: string): boolean {
    if (this.game === null) {
      if (action === MENU) {
        this.router.navigate(['/menu']);
        return true;
      }
      return false;
    }
    switch (action) {
      case DEL:
        this.givenNumber = Math.floor(this.givenNumber / 10);
        return true;
      case X:
        // FAILED ATTEMPT / 0-score
        if (this.game.handleThrownScore(0)) {
          this.resetScoreSlowely();
          return true;
        }
        return false;
      case ENTER:
        // confirm score
        if (
          this.givenNumber > 0 &&
          this.game.handleThrownScore(this.givenNumber)
        ) {
          this.resetScoreSlowely();
          return true;
        }
        return false;
      case LEFT:
        return this.game.undoLastThrownScore();
      case RIGHT:
        return this.game.redoLastUndoneThrownScore();
      case MENU:
        this.router.navigate(['/menu']);
        return true;
    }
    return false;
  }

  resetScoreSlowely(): void {
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      this.givenNumber = 0;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
