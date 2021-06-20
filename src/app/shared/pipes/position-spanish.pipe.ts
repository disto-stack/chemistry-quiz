import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionSpanish'
})
export class PositionSpanishPipe implements PipeTransform {

  transform(position: string): string {
    const translate = {
      gold: 'oro',
      silver: 'plata',
      bronze: 'bronce'
    }

    return translate[position.toLowerCase()] || position;
  }

}
