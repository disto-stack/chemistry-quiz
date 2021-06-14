import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { Answer } from 'src/app/types/answer';

import { PlayerService } from './player.service';

@Injectable()
export class AnswersService {
  constructor(
    private _player: PlayerService    
  ) { }

  saveAnswers(time: number): Observable<void> {
    const playerId = localStorage.getItem('player');
    const answers: Answer[] = JSON.parse(localStorage.getItem('answers'));

    const playerData = {
      answers,
      time,
      isCompleted: true
    };

    this.deleteAnswersFromLocalStorage();
    
    return from(this._player.updatePlayer(playerId, playerData));
  }

  private deleteAnswersFromLocalStorage(): void {
    localStorage.removeItem('answers');
  }
}
