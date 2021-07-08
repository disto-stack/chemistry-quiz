import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/providers/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnDestroy {
  @Input() modalText: string;

  constructor(
    private _modal: ModalService
  ) { }

  closeModal() {
    this._modal.closeModal();
  }

  ngOnDestroy(): void {
    this._modal.closeModal();
  }
}
