import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-erlenmeyer',
  templateUrl: './erlenmeyer.component.html',
  styles: ['']
})
export class ErlenmeyerComponent implements OnInit {
  @Input() position: string;
  @Input() widthClass: string;

  constructor() {  }

  ngOnInit(): void {

  }

  

}
