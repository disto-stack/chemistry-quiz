import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../providers/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LevelExistsGuard implements CanActivate {
  constructor(
    private router: Router,
    private _localstorage: LocalstorageService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const validLevel = this.validLevel(route.paramMap.get('level').toLowerCase());
    this.redirect(validLevel, state.url);

    return validLevel;
  }
  

  private redirect(flag: boolean, route: string) {
    if (!flag) {
      const redirectRoute = this.getRedirectRoute(route.toLocaleLowerCase());

      this.router.navigateByUrl(redirectRoute);
    }
  }

  private getRedirectRoute(route: string): string {
    if (route.includes('questions')) {
      if (this._localstorage.answers.length > 0) {
        this._localstorage.deleteAnswers();
      }
      
      return '/choose';
    } else if (route.includes('ranking')) {
      return '/score';
    }

    return '/'
  }

  private validLevel(level: string): boolean {
    const availableLevels = ['easy', 'medium'];

    return availableLevels.includes(level);
  }

}
