import { Component, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';
import { checkouts } from '../../util/checkouts';

@Component({
  selector: 'app-playerscore',
  templateUrl: './playerscore.component.html',
  styleUrls: ['./playerscore.component.scss'],
})
export class PlayerScoreComponent {
  @Input()
  public player: Player | null = null;

  suggest(score: number): string {
    return checkouts[score];
  }
}
