import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { Answer } from 'src/app/types/answer';
import { Question } from 'src/app/types/question';
import { ReviewService } from '../../providers/review.service';

@Component({
  selector: 'app-review-question',
  templateUrl: './review-question.component.html',
  styleUrls: ['./review-question.component.css']
})
export class ReviewQuestionComponent implements OnInit, OnDestroy {
  answer: Answer;
  questionData: Question;

  subscription: Subscription;

  constructor(
    private _review: ReviewService,
    private _localstorage: LocalstorageService,
    private _route: ActivatedRoute
  ) {
    this.subscription = new Subscription();
   }

  ngOnInit(): void {
    const routeSub = this._route.params.subscribe(param => {      
      const questionId: string = param['questionId'];      

      const reviewSub = this._review.getReviewAnswerAndQuestionData(this._localstorage.playerID, questionId).subscribe(data => {        
        const { answer, ...question } = data;

        this.answer = answer;
        this.questionData = question;
      });

      this.subscription.add(reviewSub);
    }, error => console.error(error))

    this.subscription.add(routeSub);
  }

  ngOnDestroy(): void {    
    this.subscription.unsubscribe();
  }

}
