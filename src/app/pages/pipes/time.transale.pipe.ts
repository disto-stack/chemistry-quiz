import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransale'
})
export class TimeTransalePipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value - (minutes * 60);

    const minutesExpression = (minutes == 1) ? `${minutes} minuto` : (minutes > 1) ? `${minutes} minutos` : '';
    const connector = ((minutes > 0 && seconds > 0)) ? 'con' : ''; 
    const secondsExpression = (seconds > 0) ? `${seconds} segundos` : '';

    return `${minutesExpression} ${connector} ${secondsExpression}`
  }
}
