import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Answer } from 'src/app/types/answer';
import { Player } from "src/app/types/player";

@Injectable()
export class ScoreService {
  private playersDocs: AngularFirestoreCollection<Player>

  constructor(
    private _afs: AngularFirestore
  ) {
    this.playersDocs = this._afs.collection<Player>('players');
  }

  /**
   * Score calculation: 100 points by correct option
   */
  calculateScore(answers: Answer[]): number {
    return answers.filter(answer => answer.isCorrect)
      .map(() => 100)
      .reduce((totalScore, current) => totalScore += current);
  }

  /**
   * Get player score and time from database
   * @param playerId The player Id saved in localstorage
   * @returns Observable with playerScore and playerTime
   */
  getScoreAndTime(playerId: string): Observable<{score: number, time: number}> {
    return this.playersDocs.doc(playerId).get()
      .pipe(
        map(data => data.data()),
        map(data => ({ score: data['score'], time: data['time'] })),
      )
  }

  /**
   * @param playerId The player Id saved in localstorage
   * @returns Observable with the hit percent
   */
  getScoreHit(playerId: string): Observable<number> {
    return this.playersDocs.doc(playerId).get()
      .pipe(
        map(data => data.data()),
        map(data => data['answers']),
        map(answers => {
          const totalPoints = answers.map(() => 100).reduce((total, current) => total += current);
          const playerScore = this.calculateScore(answers);

          return Math.round((playerScore * 100) / totalPoints);
        })
      )
  }
}
