import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Player } from 'src/app/types/player';
import { Answer } from 'src/app/types/answer';

@Injectable()
export class PlayerService {
  private playersDocs: AngularFirestoreCollection<Player>;

  constructor(
    private _afs: AngularFirestore
  ) {
    this.playersDocs = this._afs.collection<Player>('players');
   }

  addPlayer(player: Player): Observable<string> {
    return from(this.playersDocs.add(player))
            .pipe(map(res => res.id))
  }

  getPlayers(): Observable<Player[]> {
    return this.playersDocs.valueChanges({ idField: 'playerId' })
  }

  updatePlayer(playerId: string, playerObject: { answers: Answer[], time?: number, score?: number, isCompleted: boolean }): Observable<void> {
    return from(this.playersDocs.doc(playerId).update(playerObject))
  }

  getPlayer(playerId: string, ...playerFields: string[]): Observable<Player> {
    return this.playersDocs.doc(playerId).valueChanges()
      .pipe(
        map(player => {
          if (playerFields.length > 0) {
            const playerData = {};            

            playerFields.forEach(field => {
              if (player[field]) playerData[field] = player[field];
            })

            return playerData as Player;
          }

          return player;
        })
      )
  }

  /**
   * Method that get sorted players array.
   * Sorted by score and time (if the score is tied)
   * @returns sorted players array
   */
  getSortedPlayers(): Observable<Player[]> {
    return this.getPlayers()
      .pipe(
        map(players => players.filter(player => player.isCompleted)),
        map(players => {          
            players.sort((playerA, playerB): number => {
            const comparison = playerB.score - playerA.score;
            if (comparison === 0) return playerA.time - playerB.time;

            return comparison;
          });
          
          return players;
        })
      )
  }
}
