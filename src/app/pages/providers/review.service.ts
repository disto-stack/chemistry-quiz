import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AnswersService } from './answers.service';
import { PlayerService } from './player.service';

@Injectable()
export class ReviewService {

  constructor(
    private _player: PlayerService,
    private _answers: AnswersService
  ) { }

  getReviewData(playerId: string) {
    return this._player.getPlayer(playerId, 'name', 'answers')
      .pipe(
        map(reviewData => ({ name: reviewData.name, answers: reviewData.answers }))
      )
  }
}
