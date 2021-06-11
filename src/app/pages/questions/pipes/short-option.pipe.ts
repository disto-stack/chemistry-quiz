import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortOption'
})
export class ShortOptionPipe implements PipeTransform {

  transform(value: string): unknown {
    const option = value.replace(/option/g, '');    
    return option;
  }

}
