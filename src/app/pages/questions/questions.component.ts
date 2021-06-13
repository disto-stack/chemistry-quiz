import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from './providers/questions.service';
import { TimerService } from './providers/timer.service';

import { Subscription } from 'rxjs';

import { Question } from 'src/app/types/question';

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
    private _router: Router
  ) { 
    this.subscriptions = new Subscription();
    this.subscriptions.add(this._route.params.subscribe(params => this.level = params['level']))    
  }

  ngOnInit(): void {
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

  getActualQuestionId() {
    if (this.questions.length === 0) {
      this._router.navigateByUrl('/');
    } else {
      this.actualQuestionId = this.questions.shift().id;
      this.actualIndex += 1;
    }
  } 
}
