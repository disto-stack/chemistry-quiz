import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { LocalstorageService } from '../providers/localstorage.service';
import { PlayerService } from '../providers/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerExistsGuard implements CanActivate, OnDestroy {
  private subjectDestroyer$ = new Subject();

  constructor(
    private _router: Router,
    private _localstorage: LocalstorageService,
    private _player: PlayerService
  ) { 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.existsPlayerInLocalStorage()) {
      this._localstorage.playerExistsListener().pipe(takeUntil(this.subjectDestroyer$))
      .subscribe(playerInLocalStorage => {              
        this.redirect(playerInLocalStorage);

        this._player.existsPlayer(this._localstorage.playerID).pipe(first(), takeUntil(this.subjectDestroyer$))
          .subscribe(playerExistsInDB => {
            this.redirect(playerExistsInDB);
          })
          
      
      }, err => console.error(err));
    } else {
      this.redirect(this.existsPlayerInLocalStorage())
    }
    
    return this.existsPlayerInLocalStorage();
  }

  existsPlayerInLocalStorage(): boolean {
    return typeof this._localstorage.playerID === 'string' ? true : false;
  }
  
  private redirect(flag: boolean): void {
    if (!flag) this._router.navigateByUrl('/');
  }

  ngOnDestroy(): void {    
    this.subjectDestroyer$.next();
    this.subjectDestroyer$.complete();
  }
}
