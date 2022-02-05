import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  game: Game | null = null;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private gameStore: GameStore, private router: Router) {}

  ngOnInit() {
    // get the game
    this.gameStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store: Store<Game>) => {
        this.game = store.data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
