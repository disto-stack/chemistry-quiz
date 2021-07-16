import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalstorageService } from '../providers/localstorage.service';
import { PlayerService } from '../providers/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerIsNotCompletedGuard implements CanActivate {
  private subscription: Subscription;

  constructor(
    private _player: PlayerService,
    private _localStorage: LocalstorageService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      /*
      const isCompleteSubscription = this._player.playerIsCompleted(this._localStorage.playerID).subscribe(isCompleted => {
        if (!isCompleted) {
          this._router.navigateByUrl('/choose');
        }
      })

      this.subscription = isCompleteSubscription;
      */

      return this._player.playerIsCompleted(this._localStorage.playerID)
        .pipe(
          map(isComplete => {
            if (isComplete) {
              this._router.navigateByUrl('/score');
              return false;
            }

            return true;
          })
        );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
