import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { Answer } from 'src/app/types/answer';
import { ReviewService } from '../../providers/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {
  reviewData: { name: string, answers: Answer[] };

  subscription: Subscription
  
  constructor(
    private _review: ReviewService,
    private _localsorage: LocalstorageService
  ) {
    this.subscription = this._review.getReviewData(this._localsorage.playerID)
      .subscribe(reviewData => this.reviewData = reviewData);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
