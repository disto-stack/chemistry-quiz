import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../providers/questions.service';
import { TimerService } from './providers/timer.service';

import { Subscription } from 'rxjs';

import { Question } from 'src/app/types/question';
import { AnswersService } from '../providers/answers.service';
import { LocalstorageService } from 'src/app/providers/localstorage.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private subscriptions: Subscription;
  private level: string;
  
  questions: Question[];
  actualQuestionId: string;
  actualIndex: number = 0;
  questionsLength: number;

  constructor(
    private _questions: QuestionsService,
    private _timer: TimerService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _answers: AnswersService,
    private _localstorage: LocalstorageService
  ) { 
    this.subscriptions = new Subscription();
    this.subscriptions.add(this._route.params.subscribe(params => this.level = params['level']))    
  }

  ngOnInit(): void {
    this._localstorage.deleteAnswers();

    this.getQuestionsByLevel();
    this._timer.startCount();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getQuestionsByLevel(): void {
    let sub = this._questions.getQuestionsByLevel(this.level)
      .subscribe(
        data => {
          this.questions = data;
          this.questionsLength = this.questions.length;
          this.getActualQuestionId(); // Get first question
        },
        error => console.error(error)
      )
    
    this.subscriptions.add(sub)
  }

  private saveAnswers() {
    if (localStorage.getItem('answers') && localStorage.getItem('player')) {
      const time = this.stopAndGetTime();

      return this._answers.saveAnswers(time, this.level);
    }
  }

  private stopAndGetTime(): number {  
    this._timer.stopCount();
    const time = this._timer.actualTime;
    this._timer.resetCount();

    return time;
  }

  /**
   * This method get the first element of question array from firestore
   * and save the answers if the array length is 0. If the answers is saved,
   * the app is redirected to result component.
   */
  getActualQuestionId() {
    if (this.questions.length === 0) {
      const sub = this.saveAnswers().subscribe(() => this._router.navigateByUrl('score'), error => console.error(error));
      this.subscriptions.add(sub);
    } else {
      this.actualQuestionId = this.questions.shift().id;
      this.actualIndex += 1;
    }
  } 
}