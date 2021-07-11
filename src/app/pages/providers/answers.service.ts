import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalstorageService } from 'src/app/providers/localstorage.service';

import { Answer } from 'src/app/types/answer';
import { Player } from 'src/app/types/player';

import { PlayerService } from '../../providers/player.service';
import { ScoreService } from './score.service';

@Injectable()
export class AnswersService {
  constructor(
    private _player: PlayerService,
    private _score: ScoreService,
    private _localstorage: LocalstorageService  
  ) { }

  saveAnswers(time: number, level: string): Observable<void> {
    const playerId = this._localstorage.playerID;
    const answers: Answer[] = this._localstorage.answers;
    const score = this._score.calculateScore(answers);

    const playerData = {
      answers,
      time,
      score,
      level,
      isCompleted: true
    };

    this._localstorage.deleteAnswers();
    
    return from(this._player.updatePlayer(playerId, playerData));
  }

  /**
   * Method that get the answers stored in player document
   * @param playerId 
   */
  getAnswersByPlayerId(playerId: string) {
    return this._player.getPlayer(playerId, 'answers')
      .pipe(
        map(answersObject => answersObject.answers)
      )
  }
}
