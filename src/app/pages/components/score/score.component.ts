import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { PlayerService } from '../../providers/player.service';
import { ScoreService } from '../../providers/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  private subscriptions: Subscription;

  successRate: number;
  score: number;
  time: number;

  constructor(
    private _score: ScoreService,
    private _localstorage: LocalstorageService
  ) {
    this.subscriptions = new Subscription();

    const scoreSubscriptions = [
      this._score.getScoreHit(this._localstorage.playerID).subscribe(success => this.successRate = success, err => console.error(err)),
      this._score.getScoreAndTime(this._localstorage.playerID).subscribe(scoreData => {this.score = scoreData.score, this.time = scoreData.time}, err => console.error(err))      
    ]

    scoreSubscriptions.forEach(subs => this.subscriptions.add(subs))
   }

  ngOnInit() {
    
  }
}
