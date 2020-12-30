import { Component } from '@angular/core';
import { rotateAnimation } from '@silentmx/ngx-star/animatios';
@Component({
  templateUrl: "./other.component.html",
  animations: [
    rotateAnimation({
      time: 300
    })
  ]
})
export class OtherComponent {

}