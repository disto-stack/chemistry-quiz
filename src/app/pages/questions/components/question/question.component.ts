import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Question } from 'src/app/types/question';

import { QuestionsService } from '../../providers/questions.service';
import { TimerService } from '../../providers/timer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input() questionId: string;
  time: number = 0;
  question: Question;

  constructor(
    private _timer: TimerService,
    private _questions: QuestionsService
  ) {
    this.subscription = this._questions.getQuestionById('3lEYb68k9BtYY8FkeZOE')
      .subscribe(data => {
        this.question = data;
      });
  }

  ngOnInit(): void {
    this.timer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get optionKey() {
    return 3;
  }

  private timer() {
    setInterval(() => {
      this.time = this._timer.actualTime;
    }, 1000)
  }
}
