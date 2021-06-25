import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/types/player';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {
  @Input() players: Player[];

  playerPodium: Player[];

  constructor() {   
  
  }

  ngOnInit(): void {
  }

  get firstPlace(): Player {
    return this.players[0];
  }

  get secondPlace(): Player {
    return this.players[1];
  }

  get thirdPlace(): Player {
    return this.players[2];
  }
}
