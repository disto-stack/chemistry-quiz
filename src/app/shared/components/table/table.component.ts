import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  test = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor() { }

  ngOnInit(): void {
  }

}
