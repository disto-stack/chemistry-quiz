import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/types/player';
import { RankingService } from '../../providers/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  players: Player[];

  constructor(
    private route: ActivatedRoute,
    private _ranking: RankingService
  ) {
    this.subscription = new Subscription();

    const paramsSub = this.route.params.subscribe(params => {
      const level = params.level;

      const playersSub = this._ranking.getOrderedPlayersByLevel(level).subscribe(
        players => this.players = players,
        err => console.error(err)
      );
      this.subscription.add(playersSub);
    })

    this.subscription.add(paramsSub);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
