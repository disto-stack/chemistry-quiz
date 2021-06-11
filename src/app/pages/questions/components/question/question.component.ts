import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from '../../providers/timer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  time: number = 0;

  constructor(
    private _timer: TimerService
  ) { }

  ngOnInit(): void {
    this.timer();
  }

  private timer() {
    setInterval(() => {
      this.time = this._timer.actualTime;
    }, 1000)
  }
}
