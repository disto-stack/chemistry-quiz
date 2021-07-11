import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { Player } from 'src/app/types/player';
import { PlayerService } from '../../../providers/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _player: PlayerService,
    private _localstorage: LocalstorageService
  ) { }

  ngOnInit(): void {}

  submitUser(playerName: string): void {
    let player: Player = {
      name: playerName,
      isCompleted: false
    }

    this._player.addPlayer(player)
      .subscribe(playerId => {
        this._localstorage.deletePlayer();
        this._localstorage.addPlayerId(playerId)
      }, 
      error => console.error(error),
      () => this._router.navigateByUrl('/choose'));
  }
}
