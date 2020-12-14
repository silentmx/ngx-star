import { Component } from '@angular/core';
import { NgxToast } from '@silentmx/ngx-star/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-star';

  constructor(
    private ngxToast: NgxToast
  ) {
    this.ngxToast.success("ok");
  }
}