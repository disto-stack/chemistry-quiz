import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPosition'
})
export class ZeroPositionPipe implements PipeTransform {

  transform(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
