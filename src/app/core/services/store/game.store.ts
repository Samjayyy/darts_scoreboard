import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Game } from 'src/app/shared/models/game.model';
import { Player } from 'src/app/shared/models/player.model';
import { StoreService } from './stores';

@Injectable({ providedIn: 'root' })
export class GameStore extends StoreService<Game> {
  constructor() {
    super();
  }

  public refreshFromLocalStorage(): void {
    const data = localStorage.getItem('game');
    if (!data) {
      return;
    }
    var game = plainToInstance(Game, JSON.parse(data));
    game.players = plainToInstance(Player, game.players);
    this.next(game);
  }

  public save(game: Game): void {
    localStorage.setItem('game', JSON.stringify(game));
  }
}
