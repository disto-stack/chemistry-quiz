import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LocalstorageService } from '../providers/localstorage.service';
import { PlayerService } from '../providers/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerIsCompletedGuard implements CanActivate {

  constructor(
    private _player: PlayerService,
    private _localStorage: LocalstorageService,
    private _router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this._player.playerIsCompleted(this._localStorage.playerID)
        .pipe(
          map(isCompleted => {
            if (!isCompleted) {
              this._router.navigateByUrl('/choose');
              return false;
            }

            return true;
          })
        );
  }
  
}
