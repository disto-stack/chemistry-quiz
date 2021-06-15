import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { Answer } from 'src/app/types/answer';

import { PlayerService } from './player.service';
import { ScoreService } from './score.service';

@Injectable()
export class AnswersService {
  constructor(
    private _player: PlayerService,
    private _score: ScoreService    
  ) { }

  saveAnswers(time: number, level: string): Observable<void> {
    const playerId = localStorage.getItem('player');
    const answers: Answer[] = JSON.parse(localStorage.getItem('answers'));
    const score = this._score.calculateScore(answers);

    const playerData = {
      answers,
      time,
      score,
      level,
      isCompleted: true
    };

    this.deleteAnswersFromLocalStorage();
    
    return from(this._player.updatePlayer(playerId, playerData));
  }

  private deleteAnswersFromLocalStorage(): void {
    localStorage.removeItem('answers');
  }
}
