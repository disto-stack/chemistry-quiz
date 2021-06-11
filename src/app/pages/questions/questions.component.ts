import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
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
  private $subscriptions: Subscription;
  private level: string;
  
  questions: Question[];

  constructor(
    private _questions: QuestionsService,
    private _timer: TimerService,
    private _route: ActivatedRoute
  ) { 
    this.$subscriptions = new Subscription();
    this.$subscriptions.add(this._route.params.subscribe(params => this.level = params['level']))    
  }

  ngOnInit(): void {
    this.getQuestionsByLevel();
    this._timer.startCount();
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }

  private getQuestionsByLevel(): void {
    let $sub = this._questions.getQuestionsByLevel(this.level)
      .subscribe(
        data => this.questions = data,
        error => console.error(error)
      )
    
    this.$subscriptions.add($sub)
  }

  get actualTime(): number {
    return this._timer.actualTime;
  }
}
