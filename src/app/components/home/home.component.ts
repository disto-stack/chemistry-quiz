import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/types/player';
import { PlayerService } from '../../providers/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _player: PlayerService
  ) { }

  ngOnInit(): void {}

  submitUser(playerName: string): void {
    let player: Player = {
      name: playerName,
      answers: [],
    }

    let playerID = this._player.addPlayer(player);
    
    

    /* 
    if (!localStorage.getItem('player')) {
      
      localStorage.setItem('player', player); 
    }

    this._router.navigateByUrl('/choose');
    */
  }
}
