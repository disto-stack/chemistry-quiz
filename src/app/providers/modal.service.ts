import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalIsOpened: boolean = false;

  constructor() { }

  openModal() {
    this.modalIsOpened = true;
  }

  closeModal() {
    this.modalIsOpened = false;
  }
}
