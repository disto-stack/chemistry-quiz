import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styles: [
  ]
})
export class TimerComponent implements OnInit {
  @Input() time: string;

  constructor() { }

  ngOnInit(): void {
  }

}
