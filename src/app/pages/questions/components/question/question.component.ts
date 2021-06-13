import { AfterContentInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';

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
  @Input() questionNumber: number;
  @Input() questionsLength: number;
  
  time: number = 0;
  question: Question;


 
  isAnswered: boolean = false;

  constructor(
    private _timer: TimerService,
    private _questions: QuestionsService, 
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadQuestion();
    this.timer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  verifyOption(optionButton: HTMLButtonElement): void {
    if (!this.isAnswered) {
      const isCorrect = optionButton.value === this.question.correctOption;
      this.renderer2.addClass(optionButton, isCorrect ? 'correct' : 'wrong');
      this.isAnswered = true;
    }
  }

  private timer() {
    setInterval(() => {
      this.time = this._timer.actualTime;
    }, 1000)
  }

  private loadQuestion() {
    this.subscription = this._questions.getQuestionById(this.questionId)
      .subscribe(data => {
        this.question = data;
      });
  }
}
