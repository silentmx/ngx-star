import { Component } from '@angular/core';
import { rotateAnimation } from '@silentmx/ngx-star/animatios';
import { NgxToast } from '@silentmx/ngx-star/toast';
@Component({
  templateUrl: "./other.component.html",
  animations: [
    rotateAnimation({
      time: 300
    })
  ]
})
export class OtherComponent {
  message: string = undefined;

  constructor(
    private ngxToast: NgxToast
  ) {

  }

  openToast() {
    this.ngxToast.success({
      message: "",
    })
  }
}