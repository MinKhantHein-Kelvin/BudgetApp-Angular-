import { Injectable, Type } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modal: BsModalService) { }

  public show(component: Type<any>, initialState: ModalOptions) {
    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    return this.modal.show(component, Object.assign(config, initialState));
  }

  public hide() {
    this.modal.hide();
  }
}
