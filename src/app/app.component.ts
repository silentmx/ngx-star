import { Component } from '@angular/core';
import { NgxLocaleService } from '@silentmx/ngx-star/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  date = new Date();
  localeId: string = "zh-Hans";
  active: boolean = false;

  constructor(
    public ngxLocaleService: NgxLocaleService,
  ) {

  }

  changeLocale() {
    this.ngxLocaleService.updateLocale(this.localeId);
  }
}
