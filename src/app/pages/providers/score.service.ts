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
   * Get player score from database
   * @param playerId The player Id saved in localstorage
   * @returns Observable with playerScore
   */
  getScore(playerId: string) {
    return this.playersDocs.doc(playerId).get()
      .pipe(
        map(data => data.data()),
        map(data => data['score']),
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
