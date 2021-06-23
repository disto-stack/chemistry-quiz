import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, pipe, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Answer } from 'src/app/types/answer';
import { Player } from "src/app/types/player";

import { PlayerService } from './player.service';

@Injectable()
export class ScoreService {
  private playersDocs: AngularFirestoreCollection<Player>

  private subscription: Subscription;

  constructor(
    private _afs: AngularFirestore,
    private _player: PlayerService
  ) {
    this.playersDocs = this._afs.collection<Player>('players');
  }

  /**
   * Method that get the index on ordened by score array
   * @param playerId player to get the index
   * @returns a observable with the number of index
   */
  getPosition(playerId: string): Observable<number> {
    return this._player.getSortedPlayers()
      .pipe(
        map(players => {
          return players.map((player, index) => ({ id: player['playerId'], position: (index + 1) }));
        }),
        map(players => {
          return players.filter(player => player.id === playerId)[0].position;
        })
      )   
  }

  /**
   * Score calculation: 100 points by correct option
   */
  calculateScore(answers: Answer[]): number {
    const answersFilter = answers.filter(answer => answer.isCorrect).map(() => 100)
    return (answersFilter.length > 0) ? answersFilter.reduce((totalScore, current) => totalScore += current) : 0;
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
