import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {}

  submitUser(player: string): void {
    if (!localStorage.getItem('player')) {
      localStorage.setItem('player', player); 
    }

    this._router.navigateByUrl('/choose');
  }
}
