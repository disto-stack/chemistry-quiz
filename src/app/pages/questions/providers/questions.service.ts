import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Question } from 'src/app/types/question';

@Injectable()
export class QuestionsService {
  private questionsDocs: AngularFirestoreCollection<Question>
   
  constructor(
    private _afs: AngularFirestore
  ) {
    this.questionsDocs = this._afs.collection('questions');   
  }

  getQuestionsByLevel(level: string): Observable<Question[]> {
    return from(this.questionsDocs.ref.where("level", "==", level).get())
      .pipe(
        map(res => {
          let questions: Question[] = [];
          res.forEach(doc => questions.push(doc.data()))

          return questions;
        })
      )
  }
}
