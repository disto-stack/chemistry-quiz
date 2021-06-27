import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { Answer } from 'src/app/types/answer';
import { ReviewService } from '../../providers/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewData: { name: string, answers: Answer[] };
  
  constructor(
    private _review: ReviewService,
    private _localsorage: LocalstorageService
  ) {
    this._review.getReviewData(this._localsorage.playerID)
      .subscribe(reviewData => this.reviewData = reviewData);
  }

  ngOnInit(): void {
  }

}
