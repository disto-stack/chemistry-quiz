import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Answer } from 'src/app/types/answer';

@Injectable()
export class AnswersService {
  private answersDocs: AngularFirestoreCollection<any>;

  constructor(
    private _afs: AngularFirestore
    
  ) {
    this.answersDocs = this._afs.collection<any>('answers');
    this.answersDocs.valueChanges();
  }

  saveAnswers() {
    const player = localStorage.getItem('player');
    const answers: Answer[] = JSON.parse(localStorage.getItem('answers'));

    return from(this.answersDocs.add({ answers }))
  }
}
