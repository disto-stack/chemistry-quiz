import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Player } from '../types/player';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersDocs: AngularFirestoreCollection<Player>;

  constructor(
    private _afs: AngularFirestore
  ) {
    this.playersDocs = this._afs.collection<Player>('players');
    this.playersDocs.valueChanges().subscribe(player => {
      console.log('Value Changes', player);
    })
   }

  addPlayer(player: Player): any {
    from(this.playersDocs.add(player))
      .subscribe(res => {
        return res;
      });
  }
}
