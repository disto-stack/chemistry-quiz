import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { PlayerService } from '../../providers/player.service';
import { ScoreService } from '../../providers/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  position: string;
  successRate: number;
  score: number;
  time: number;
  level: string;

  constructor(
    private _score: ScoreService,
    private _player: PlayerService,
    private _localstorage: LocalstorageService
  ) {
    this.subscriptions = new Subscription();

    const scoreSubscriptions = [
      this._score.getScoreHit(this._localstorage.playerID).subscribe(success => this.successRate = success, err => console.error(err)),
      this._player.getPlayer(this._localstorage.playerID, 'score', 'time', 'level').subscribe(({ score, time, level }) => {
        this.score = score;
        this.time = time;
        this.level = level;
      }, err => console.error(err))
    ]

    scoreSubscriptions.forEach(subs => this.subscriptions.add(subs))
  }

  ngOnInit() {
    this._score.getPosition(this._localstorage.playerID).subscribe(position => {
      this.position = this.positionPodium(position);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  positionPodium(position: number): string {
    const podium = {
      1: 'gold',
      2: 'silver',
      3: 'bronze'
    }

    return podium[position] || 'default';
  }
}