import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Player } from 'src/app/types/player';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() players: Player[];

  constructor() { }

  ngOnInit(): void { }

  private get convertedPlayers() {
    return this.players.map((player, index) => {
      return {
        position: index + 1,
        name: player.name,
        score: player.score
      };
    });
  }

  get notPodiumPlayers() {
    return this.convertedPlayers.filter((player => (player.position > 3)))
  }    
}
