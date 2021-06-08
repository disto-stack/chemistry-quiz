import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from './providers/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() level: string;

  constructor(
    private _questions: QuestionsService
  ) { }

  ngOnInit(): void {
  }



}
