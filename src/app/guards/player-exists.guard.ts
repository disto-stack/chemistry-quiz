import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { LocalstorageService } from '../providers/localstorage.service';
import { PlayerService } from '../providers/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerExistsGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;

  constructor(
    private _router: Router,
    private _localstorage: LocalstorageService,
    private _player: PlayerService
  ) { 
    this.subscription = new Subscription();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

    if (this.existsPlayerInLocalStorage()) {
      const listenerSubscription = this._localstorage.playerExistsListener().subscribe(playerInLocalStorage => {              
        this.redirect(playerInLocalStorage);

        const playerExistsSubscription = this._player.existsPlayer(this._localstorage.playerID).subscribe(playerExistsInDB => {
          this.redirect(playerExistsInDB);
        }, err => console.error(err));

        this.subscription.add(playerExistsSubscription);
      
      }, err => console.error(err));

      this.subscription.add(listenerSubscription);
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
    this.subscription.unsubscribe();
  }
}
