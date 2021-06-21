import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private _player: PlayerService 
  ) {
    this.subscriptions = new Subscription();

    const scoreSubscriptions = [
      this._score.getScoreHit(this._player.getLocalPlayer()).subscribe(success => this.successRate = success, err => console.error(err)),
      this._score.getScore(this._player.getLocalPlayer()).subscribe(score => this.score = score, err => console.error(err))      
    ]

    scoreSubscriptions.forEach(subs => this.subscriptions.add(subs))
   }

  ngOnInit() {
    
  }
}
