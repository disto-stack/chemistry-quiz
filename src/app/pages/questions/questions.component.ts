import { Component, ViewChild, ViewContainerRef, OnInit, OnDestroy, AfterViewInit, QueryList, ViewChildren } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../../providers/questions.service';
import { TimerService } from './providers/timer.service';

import { Subscription } from 'rxjs';

import { Question } from 'src/app/types/question';
import { AnswersService } from '../providers/answers.service';
import { LocalstorageService } from 'src/app/providers/localstorage.service';

import { QuestionComponent } from "./components/question/question.component";
import { DynamicComponentsService } from './providers/dynamic-components.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('dynamicComponentHost', { read: ViewContainerRef }) questionContainerRef: QueryList<ViewContainerRef>;
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
    private _localstorage: LocalstorageService,
    private _dynamicComponents: DynamicComponentsService
  ) { 
    this.subscriptions = new Subscription();
    this.subscriptions.add(this._route.params.subscribe(params => this.level = params['level']))    
  }

  ngOnInit(): void {
    this._localstorage.deleteAnswers();

    this.getQuestionsByLevel();
    this._timer.startCount();
  }

  ngAfterViewInit(): void {

    const containerSubscription = this.questionContainerRef.changes.subscribe(() => {
      if (this.questionContainerRef.length > 0) {
        this.loadComponent();
      }
    });

    this.subscriptions.add(containerSubscription);
  }

  loadComponent(): void {
    const questionComponentRef = this._dynamicComponents.createComponent(QuestionComponent, this.questionContainerRef.first);
    
    questionComponentRef.instance.questionId = this.actualQuestionId;
    questionComponentRef.instance.questionNumber = this.actualIndex;
    questionComponentRef.instance.questionsLength = this.questionsLength;
    
    questionComponentRef.instance.answeredEmitter.subscribe(isAnswered => {
      if (isAnswered) {
        this.getActualQuestionId();
      }
    })
  }

  destroyQuestionComponent() {
    this._dynamicComponents.destroyComponent();
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
          this.getActualQuestionId(true); // Get first question
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
  getActualQuestionId(firstLoad = false) {
    this.destroyQuestionComponent();

    if (this.questions.length === 0) {
      const sub = this.saveAnswers().subscribe(() => this._router.navigateByUrl('score'), error => console.error(error));
      this.subscriptions.add(sub);
    } else {
      this.actualQuestionId = this.questions.shift().id;
      this.actualIndex += 1;

      if (!firstLoad) this.loadComponent(); 
      
    }

  } 
}