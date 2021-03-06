import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { Subject } from 'rxjs';
import { Player } from 'src/app/shared/models/player.model';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Configuration } from 'src/app/app.constants';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  players: Player[];
  filteredPlayers: Player[] = [];
  game: Game | null = null;
  playerscount: number = 0;

  constructor(private gameStore: GameStore, private router: Router) {
    this.playerscount = 3; // most common setting
    this.players = [];
    for (let i = 0; i < Configuration.MaxNumberOfPlayers; i++) {
      this.players.push(new Player());
    }
    this.refreshFilteredPlayers();
  }

  ngOnInit() {
    this.gameStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store: Store<Game>) => {
        if (!store.data) {
          return;
        }
        this.playerscount = store.data.players.length;
        for (let i = 0; i < this.playerscount; i++) {
          this.players[i] = store.data.players[i];
        }
        this.refreshFilteredPlayers();
      });
  }

  refreshFilteredPlayers(): void {
    this.filteredPlayers = this.players.slice(0, this.playerscount);
  }

  createGame(): boolean {
    for (const player of this.filteredPlayers) {
      if (!player.name || player.name.length < 1) {
        return false;
      }
    }
    const game = Game.fromPlayers(this.filteredPlayers);
    this.gameStore.next(game);
    this.gameStore.save(game);
    this.router.navigate(['/intro']);
    return true;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
