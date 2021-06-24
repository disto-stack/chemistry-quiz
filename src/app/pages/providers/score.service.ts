import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { Answer } from 'src/app/types/answer';
import { Player } from "src/app/types/player";

import { PlayerService } from './player.service';

@Injectable()
export class ScoreService {
  private playersDocs: AngularFirestoreCollection<Player>

  constructor(
    private _afs: AngularFirestore,
    private _player: PlayerService
  ) {
    this.playersDocs = this._afs.collection<Player>('players');
  }

  /**
   * Method that get the position on ordened by score array, a observable 
   * that gets the player's level is combined with the previous observable  
   * @param playerId player to get the index
   * @returns a observable with the number of position
   */
  getPosition(playerId: string): Observable<number> {
    return this._player.getSortedPlayers()
      .pipe(
        withLatestFrom(this._player.getPlayer(playerId, 'level')),
        map(data => { // The data contains an array with the player in the index 0 ans the level object in the index 1
          const players = data[0];
          const level = data[1]['level'];

          return players.filter(player => player.level === level);
        }),
        map(players => players.map((player, index) => ({ id: player['playerId'], position: (index + 1) }))),
        map(players => players.filter(player => player.id === playerId)[0].position)
      );
  }

  /**
   * Score calculation: 100 points by correct option
   */
  calculateScore(answers: Answer[]): number {
    const answersFilter = answers.filter(answer => answer.isCorrect).map(() => 100)
    return (answersFilter.length > 0) ? answersFilter.reduce((totalScore, current) => totalScore += current) : 0;
  }

  /**
   * Get player score, time and level from database
   * @param playerId The player Id saved in localstorage
   * @returns Observable with object that contains player score, time and level 
   */
  getScoreData(playerId: string): Observable<{ score: number, time: number, level: string }> {
    return this.playersDocs.doc(playerId).get()
      .pipe(
        map(data => data.data()),
        map(data => ({ score: data['score'], time: data['time'], level: data['level'] })),
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
