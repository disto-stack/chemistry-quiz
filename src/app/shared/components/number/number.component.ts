import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styles: [
  ]
})
export class NumberComponent implements OnInit {
  @Input() firstNumber: number;
  @Input() lastNumber: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
