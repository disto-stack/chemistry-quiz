import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionClass'
})
export class PositionClassPipe implements PipeTransform {

  transform(position: string): string {
    return `text-podium-${position.toLowerCase()}`;
  }

}
