import { Component, Inject } from '@angular/core';
import { NGX_TOAST_DATA } from './ngx-toast-config';

@Component({
  templateUrl: "./simple-toast.component.html",
  styleUrls: ["./simple-toast.component.scss"],
})
export class SimpleToastComponent {
  /**
   * Data that was injected into the toast
   */
  data: { message: string, type: string }

  constructor(
    @Inject(NGX_TOAST_DATA) data: any
  ) {
    this.data = data;
  }

}