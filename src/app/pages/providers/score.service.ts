import { Injectable } from '@angular/core';
import { Answer } from 'src/app/types/answer';

@Injectable()
export class ScoreService {

  constructor() {

  }

  /**
   * Score calculation: 100 points by correct option
   */
  calculateScore(answers: Answer[]): number {
    return answers.filter(answer => answer.isCorrect)
      .map(() => 100)
      .reduce((totalScore, current) => totalScore += current);
  }
}
