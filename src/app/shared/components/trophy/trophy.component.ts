import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html',
  styleUrls: ['./trophy.component.css']
})
export class TrophyComponent implements OnInit {
  @Input() position: string;
  constructor() { }

  ngOnInit(): void {
  }

}
