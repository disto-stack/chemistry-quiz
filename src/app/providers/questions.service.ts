import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/types/question';

@Injectable({
  providedIn: 'root'
})
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
          res.forEach(doc => {
            questions.push({id: doc.id, ...doc.data()})
          })

          return questions;
        }),
        map(questionArr => {
          for (let index = questionArr.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [questionArr[index], questionArr[randomIndex]] = [questionArr[randomIndex], questionArr[index]]
          }

          return questionArr;
        })
      )
  }

  getQuestionById(Id: string): Observable<Question> {
    return this.questionsDocs.doc(Id).get().pipe(map(res => res.data()))
  }

  existsQuestion(questionId: string): Observable<boolean> {
    return this.questionsDocs.doc(questionId).valueChanges()
      .pipe(
        map(res => res !== undefined ? true : false)
      );
  }
}
