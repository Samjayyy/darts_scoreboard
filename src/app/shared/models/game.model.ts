import { Player } from './player.model';

export class Game {
  public players: Player[] = [];
  public selected: number;
  public completed: boolean = false;
  public redoScores: number[] = [];
  public totalThrowCount: number = 0;
  public numberOfLegs: number = 1;
  public startScore: number = 301;

  constructor() {
    this.selected = 0;
  }

  public handleThrownScore(thrownScore: number): boolean {
    if (this.completed) {
      return false; // already a winner
    }
    if (this.selectedPlayer.score < thrownScore) {
      return false; // death
    }
    this.addThrownScore(thrownScore);
    if (this.redoScores.length > 0) {
      this.redoScores = [];
    }
    return true;
  }

  private addThrownScore(thrownScore: number) {
    this.selectedPlayer.score -= thrownScore;
    this.selectedPlayer.subscores.push(thrownScore);
    if (this.selectedPlayer.score === 0) {
      this.completed = true;
    } else {
      this.next();
    }
    this.totalThrowCount++;
  }

  public undoLastThrownScore(): boolean {
    if (this.totalThrowCount <= 0) {
      return false;
    }
    if (this.completed) {
      this.completed = false;
    } else {
      this.previous();
    }
    var lastScore = this.selectedPlayer.subscores.pop();
    if (!lastScore && lastScore !== 0) {
      throw new Error('Game is not in a valid state');
    }
    this.selectedPlayer.score += lastScore;
    this.redoScores.push(lastScore);
    this.totalThrowCount--;
    return true;
  }

  public redoLastUndoneThrownScore(): boolean {
    var redoScore = this.redoScores.pop();
    if (!redoScore && redoScore !== 0) {
      return false;
    }
    this.addThrownScore(redoScore);
    return true;
  }

  public static fromPlayers(players: Player[]) {
    const game = new Game();
    game.players = players;
    players.forEach((p) => game.resetPlayer(p));
    game.selectedPlayer.selected = true;
    return game;
  }

  private resetPlayer(player: Player): void {
    player.score = this.startScore;
    player.selected = false;
    player.subscores = [];
  }

  public get selectedPlayer(): Player {
    if (!this.players[this.selected]) {
      throw new Error('No player selected');
    }
    return this.players[this.selected];
  }

  private previous() {
    this.selectedPlayer.selected = false;
    this.selected--;
    if (this.selected < 0) {
      this.selected = this.players.length - 1;
    }
    this.selectedPlayer.selected = true;
  }

  private next() {
    this.selectedPlayer.selected = false;
    this.selected++;
    if (this.selected >= this.players.length) {
      this.selected = 0;
    }
    this.selectedPlayer.selected = true;
  }
}
