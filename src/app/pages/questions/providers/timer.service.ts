import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class TimerService {
  private $timer: Observable<number>;
  private timerSubscription: Subscription;
  private time = 0;

  constructor() {
    this.$timer = new Observable(observer => {
      let timerCount = 0;

      if (timerCount < 0) observer.error('Negative timer error');

      setInterval(() => {
        timerCount += 1;
        observer.next(timerCount);
      }, 1000);
    })
  }

  startCount(): void {
    this.timerSubscription = this.$timer.subscribe(timer => this.time = timer, 
      error => console.error(error)
    )
  }

  stopCount(): void {
    this.timerSubscription.unsubscribe();
  }

  resetCount(): void {
    this.stopCount();
    this.time = 0;   
  }

  get actualTime(): number {    
    return this.time;
  }
}
