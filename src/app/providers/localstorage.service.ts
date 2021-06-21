import { Injectable } from '@angular/core';

import { Answer } from '../types/answer';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

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

  deletePlayer() {
    if (localStorage.getItem('player')) localStorage.removeItem('player');
  }

  deleteAnswers() {
    if (localStorage.getItem('answers')) localStorage.removeItem('answers');
  }
}
