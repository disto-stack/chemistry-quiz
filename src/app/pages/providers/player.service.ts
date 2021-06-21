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
    this.playersDocs.valueChanges();
   }

  addPlayer(player: Player): Observable<string> {
    return from(this.playersDocs.add(player))
            .pipe(map(res => res.id))
  }

  updatePlayer(playerId: string, playerObject: { answers: Answer[], time?: number, score?: number, isCompleted: boolean }): Observable<void> {
    return from(this.playersDocs.doc(playerId).update(playerObject))
  }
}
