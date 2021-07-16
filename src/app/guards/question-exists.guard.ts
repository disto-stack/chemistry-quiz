import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionsService } from '../providers/questions.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionExistsGuard implements CanActivate {
  constructor(
    private _questions: QuestionsService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._questions.exitsQuestion(route.paramMap.get('questionId'))
            .pipe(
              map(questionExistsInDB => {
                if (!questionExistsInDB) {
                  this._router.navigateByUrl('/review')
                  return false;
                }

                return true;
              })
            )
  }
  
}
