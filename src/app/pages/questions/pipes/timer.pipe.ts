import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: number): string {
    let minutes = Math.floor(value / 60);
    let seconds = value - (minutes *60);

    return `${this.transformDigits(minutes)}:${this.transformDigits(seconds)}`;
  }

  private transformDigits(value: number): string {
    return `${(value >= 10) ? value : `0${value}`}`;
  }
}
