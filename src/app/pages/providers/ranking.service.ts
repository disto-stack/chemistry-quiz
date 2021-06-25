import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/types/player';
import { PlayerService } from './player.service';

@Injectable()
export class RankingService {

  constructor(
    private _player: PlayerService
  ) { }

  getOrderedPlayersByLevel(level: string): Observable<Player[]> {
    return this._player.getSortedPlayers()
      .pipe(
        map(players => players.filter(player => player.level === level))
      )
  }
}
