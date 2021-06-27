import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortOption'
})
export class ShortOptionPipe implements PipeTransform {

  transform(value: string): string {
    const option = value.replace(/option/g, '');    
    return option;
  }

}
