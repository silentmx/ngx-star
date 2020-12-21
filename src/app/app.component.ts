import { Component, Inject } from '@angular/core';
import { NgxLocaleService, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { NgxToast } from '@silentmx/ngx-star/toast';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  date = new Date();
  localeId: string = "zh-Hans";
  localeOptions = [
    { name: "简体中文", value: "zh-Hans" },
    { name: "繁体中文", value: "zh-Hant" },
    { name: "English", value: "en" },
    { name: "日语", value: "ja" },
    { name: "德语", value: "de" },
    { name: "法语", value: "fr" }
  ];

  constructor(
    private ngxToast: NgxToast,
    private ngxLocaleService: NgxLocaleService,
    @Inject(NGX_LOCALE_ID) public ngxLocaleId$: BehaviorSubject<string>,
  ) {
    this.ngxToast.success("okfsdfsdfsd fds f dsfsd ffsdf sdf dsf sdf sdf sdf dsf sdf sf df sd");
  }

  changeLocale() {
    this.ngxLocaleService.updateLocale(this.localeId);
  }
}
