import { Injectable, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Answer } from '../types/answer';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements OnInit, OnDestroy {
  private subjectSource: Subject<boolean>
  private playerExists$: Observable<boolean>

  constructor() { 
    this.subjectSource = new Subject<boolean>();
    this.playerExists$ = this.subjectSource.asObservable();
  }

  ngOnInit(): void {  }

  addPlayerId(playerId: string): void {
    localStorage.setItem('player', playerId)
  }

  addAnswers(answers: Answer[]): void {
    localStorage.setItem('answers', JSON.stringify(answers));
  }

  get playerID(): string | undefined {
    return localStorage.getItem('player');
  }

  get answers(): Answer[] | undefined {
    return localStorage.getItem('answers') ? JSON.parse(localStorage.getItem('answers')) : []
  }

  deletePlayer(): void {
    if (localStorage.getItem('player')) localStorage.removeItem('player');
  }

  deleteAnswers(): void {
    if (localStorage.getItem('answers')) localStorage.removeItem('answers');
  }

  playerExistsListener() {
    this.listenStorage();

    return this.playerExists$;
  }

  private listenStorage() {
    window.addEventListener('storage', () => {
      this.subjectSource.next(typeof this.playerID === 'string')
    });
  }

  ngOnDestroy() {
    window.removeEventListener("storage", () => {});
    this.subjectSource.complete();
  }
}
