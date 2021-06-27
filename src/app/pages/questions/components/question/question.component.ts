import { Component, Input, OnDestroy, OnInit, Output, Renderer2, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { Subscription } from 'rxjs';

import { Question } from 'src/app/types/question';
import { Answer } from 'src/app/types/answer';

import { QuestionsService } from '../../../providers/questions.service';
import { TimerService } from '../../providers/timer.service';
import { LocalstorageService } from 'src/app/providers/localstorage.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription;

  @Input() questionId: string;
  @Input() questionNumber: number;
  @Input() questionsLength: number;

  @Output() answeredEmitter = new EventEmitter<boolean>();

  time: number = 0;
  question: Question;

  isAnswered: boolean = false; // Used for button disabled controle

  private isCorrect: boolean;

  constructor(
    private _timer: TimerService,
    private _questions: QuestionsService,
    private _localstorage: LocalstorageService,
    private renderer2: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadQuestion();
  }

  ngOnInit(): void {
    this.loadQuestion();
    this.timer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  answer(optionButton: HTMLButtonElement): void {
    if (!this.isAnswered) {
      this.isCorrect = optionButton.value === this.question.correctOption;
      this.renderer2.addClass(optionButton, this.isCorrect ? 'correct' : 'wrong');
      this.isAnswered = true;

      this.saveAnswer(optionButton.value);
    }
  }

  private timer() {
    setInterval(() => {
      this.time = this._timer.actualTime;
    }, 1000)
  }

  /**
   * Load and reset question data from questionId Input 
   */
  private loadQuestion() {
    this.isAnswered = false;

    this.subscription = this._questions.getQuestionById(this.questionId)
      .subscribe(data => {
        this.question = data;
      });
  }

  private saveAnswer(selectedOption: string) {
    setTimeout(() => {
      let answersArray: Answer[] = this._localstorage.answers;
      
      answersArray.push({
        number: this.questionNumber,
        questionId: this.questionId,
        selectedOption,
        isCorrect: this.isCorrect
      });

      this._localstorage.addAnswers(answersArray)
      this.answeredEmitter.emit(true);
    }, 1000);
  }
}
