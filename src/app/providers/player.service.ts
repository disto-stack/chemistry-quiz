import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore'
import { Player } from '../types/player';
import { from, Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
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
}
