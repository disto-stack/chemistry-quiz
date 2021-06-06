import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'back-button',
  templateUrl: './back.component.html'
})
export class BackComponent {
  @Input() toRoute: string;

  constructor(
    private _router: Router
  ) { }

  navigate(): void {
    this._router.navigateByUrl(this.toRoute);
  }

}
