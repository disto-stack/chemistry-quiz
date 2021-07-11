import { Injectable } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { Answer } from 'src/app/types/answer';
import { AnswersService } from './answers.service';
import { PlayerService } from '../../providers/player.service';
import { QuestionsService } from './questions.service';

@Injectable()
export class ReviewService {

  constructor(
    private _player: PlayerService,
    private _question: QuestionsService,
    private _answers: AnswersService
  ) { }

  getReviewData(playerId: string) {
    return this._player.getPlayer(playerId, 'name', 'answers')
      .pipe(
        map(reviewData => ({ name: reviewData.name, answers: reviewData.answers }))
      )
  }

  /**
   * Method that combine player's of a player and their respective question
   * @param playerID
   * @param questionId 
   * @returns a Observable with the answer and question data
   */
  getReviewAnswerAndQuestionData(playerId: string, questionId: string) {
    return this._player.getPlayer(playerId, 'answers')
      .pipe(
        withLatestFrom(this._question.getQuestionById(questionId)),
        map(res => {
          const answers: Answer[] = res[0].answers;
          const question = res[1];

          const answer = answers.filter(answer => answer.questionId === questionId)[0];
          
          return { answer, ...question }
        })
      );
  }
}
